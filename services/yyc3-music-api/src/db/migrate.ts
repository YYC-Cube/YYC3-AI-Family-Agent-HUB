/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / migrate
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
import { loadConfig } from "../config";
import { apply001 } from "./schema";

/**
 * 迁移执行器：按版本序执行，schema_migrations 记录已应用版本。
 * 仅在主库执行（备库处于流复制恢复模式，schema 由主库同步）。
 * DDL 语句见 schema.ts（静态字面量，无用户输入）。
 */

const MIGRATIONS = [
  { version: "001-init", apply: apply001 },
] as const;

/** 对给定池执行未应用的迁移（测试与 CLI 共用，每版本单事务） */
export async function runMigrations(pool: pg.Pool): Promise<void> {
  await pool.query("create table if not exists schema_migrations (version text primary key, applied_at timestamptz not null default now())");
  const appliedResult = await pool.query("select version from schema_migrations");
  const applied = new Set(appliedResult.rows.map((row) => String(row.version)));

  for (const migration of MIGRATIONS) {
    if (applied.has(migration.version)) continue;
    const client = await pool.connect();
    try {
      await client.query("begin");
      await migration.apply(client);
      await client.query("insert into schema_migrations (version) values ($1)", [migration.version]);
      await client.query("commit");
      console.log(`✅ 迁移已应用: ${migration.version}`);
    } catch (error) {
      await client.query("rollback");
      throw error;
    } finally {
      client.release();
    }
  }
}

async function main(): Promise<void> {
  const config = loadConfig();
  const pool = new pg.Pool({ connectionString: config.primaryUrl });
  try {
    await runMigrations(pool);
    console.log("🌹 yyc3_music 迁移完成");
  } finally {
    await pool.end();
  }
}

if (process.env.NODE_ENV !== "test") {
  main().catch((error: unknown) => {
    console.error("❌ 迁移失败:", error);
    process.exitCode = 1;
  });
}
