/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / health
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import type { FastifyInstance } from "fastify";
import type { DbPools } from "../db/pool";
import { probe } from "../db/pool";

/** GET /health — 主备库状态与降级观测（只读，不落库） */
export async function healthRoutes(app: FastifyInstance, pools: DbPools): Promise<void> {
  app.get("/health", async () => {
    const status = await probe(pools);
    const healthy = status.primary === "up" || status.standby === "up";
    return {
      status: healthy ? "ok" : "degraded",
      service: "yyc3-music-api",
      database: status,
      timestamp: new Date().toISOString(),
    };
  });
}
