/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / db-pool
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import pg from "pg";
import type { MusicApiConfig } from "../config";

/**
 * 主备双池（NAS 主库读写 · 本机备库只读降级）：
 * - 写操作：路由侧直接用 pools.primary（主库失联由全局错误处理器转 503；备库恢复模式写入必败）
 * - 读操作：pickReadPool() 探活主库，失联且配置备库时降级
 *
 * 安全约定：SQL 一律字符串字面量 + $n 占位参数（仓库全链路如此），
 * 任何用户输入只经 values 传递，禁止拼接进 SQL。
 */

export interface DbPools {
  primary: pg.Pool;
  standby: pg.Pool | null;
}

export function createPools(config: MusicApiConfig): DbPools {
  const primary = new pg.Pool({ connectionString: config.primaryUrl, max: 10, idleTimeoutMillis: 30_000 });
  const standby = config.standbyUrl
    ? new pg.Pool({ connectionString: config.standbyUrl, max: 5, idleTimeoutMillis: 30_000 })
    : null;
  return { primary, standby };
}

export async function closePools(pools: DbPools): Promise<void> {
  await Promise.all([pools.primary.end().catch(() => undefined), pools.standby?.end().catch(() => undefined)]);
}

/** 读池选取：主库探活（字面量 SQL），失联降级备库（热备可读，数据可能略旧） */
export async function pickReadPool(pools: DbPools): Promise<pg.Pool> {
  if (!pools.standby) return pools.primary;
  try {
    await pools.primary.query("select 1");
    return pools.primary;
  } catch {
    return pools.standby;
  }
}

/** 健康探测：分别对主/备执行探活与恢复状态检查 */
export async function probe(pools: DbPools): Promise<{
  primary: "up" | "down";
  standby: "up" | "down" | "off";
  standbyInRecovery: boolean | null;
}> {
  const checkPool = async (pool: pg.Pool) => {
    try {
      await pool.query("select 1");
      return "up" as const;
    } catch {
      return "down" as const;
    }
  };
  const [primaryState, standbyState] = await Promise.all([
    checkPool(pools.primary),
    pools.standby ? checkPool(pools.standby) : Promise.resolve("off" as const),
  ]);
  let standbyInRecovery: boolean | null = null;
  if (pools.standby && standbyState === "up") {
    const result = await pools.standby.query<{ in_recovery: boolean }>(
      "select pg_is_in_recovery() as in_recovery",
    );
    standbyInRecovery = result.rows[0]?.in_recovery ?? null;
  }
  return { primary: primaryState, standby: standbyState, standbyInRecovery };
}
