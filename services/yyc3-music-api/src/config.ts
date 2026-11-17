/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / config
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

/**
 * 环境配置（单一真源）：
 * - PG_PRIMARY_URL   主库连接串（NAS PG 17 · 5433，读写）
 * - PG_STANDBY_URL   备库连接串（本机 PG 17 · 5433，只读降级兜底）
 * - PORT / HOST      监听端口（标规：开发端口自 3030 起）
 */

export interface MusicApiConfig {
  /** 主库（NAS）连接串 */
  primaryUrl: string;
  /** 备库（本机）连接串；缺省则不启用降级 */
  standbyUrl: string | null;
  port: number;
  host: string;
  /** 家用单用户键（多用户扩展时改为鉴权体系） */
  defaultUserKey: string;
  /** CORS 允许来源（浏览器端 Pages / Electron / 本地开发）；"*" 表示放行任意来源 */
  corsOrigins: string[];
}

/** 默认放行来源：本地开发端口 + Pages 生产域 + Electron file://（Origin: null） */
const DEFAULT_CORS_ORIGINS = [
  "http://localhost:3218",
  "http://127.0.0.1:3218",
  "http://localhost:3118",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "https://matrix.yyc3.vip",
  "null",
];

export function loadConfig(env: NodeJS.ProcessEnv = process.env): MusicApiConfig {
  const primaryUrl = env.PG_PRIMARY_URL ?? "";
  if (!primaryUrl) {
    throw new Error("缺少 PG_PRIMARY_URL（主库连接串，形如 postgresql://user:pass@nas-host:5433/yyc3_music）");
  }
  const corsOrigins = env.CORS_ORIGINS
    ? env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
    : DEFAULT_CORS_ORIGINS;
  return {
    primaryUrl,
    standbyUrl: env.PG_STANDBY_URL || null,
    port: Number(env.PORT ?? 3030),
    host: env.HOST ?? "0.0.0.0",
    defaultUserKey: env.DEFAULT_USER_KEY ?? "family",
    corsOrigins,
  };
}
