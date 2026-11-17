/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / index
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import { buildApp } from "./app";
import { loadConfig } from "./config";
import { closePools, createPools } from "./db/pool";

/** 生产入口：加载配置 → 建池 → 监听（默认 0.0.0.0:3030，标规端口规范） */
async function main(): Promise<void> {
  const config = loadConfig();
  const pools = createPools(config);
  const app = buildApp(pools);

  try {
    await app.listen({ port: config.port, host: config.host });
    console.log(`🌹 yyc3-music-api 已就绪 @ ${config.host}:${config.port}`);
    console.log(`   主库: ${maskUrl(config.primaryUrl)} · 备库: ${config.standbyUrl ? maskUrl(config.standbyUrl) : "未配置"}`);
  } catch (error) {
    app.log.error(error);
    await closePools(pools);
    process.exit(1);
  }

  const shutdown = async (signal: string) => {
    console.log(`收到 ${signal}，优雅关停…`);
    await app.close();
    await closePools(pools);
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

/** 日志脱敏：连接串中的密码打码 */
function maskUrl(url: string): string {
  return url.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");
}

void main();
