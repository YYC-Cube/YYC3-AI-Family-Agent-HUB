/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / cors
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 */

import type { FastifyInstance } from "fastify";

/**
 * 零依赖 CORS 插件（浏览器端 Pages / Electron / 本地开发跨源调用本服务）：
 * - 来源白名单来自配置 CORS_ORIGINS（默认含本地端口、Pages 生产域、Electron 的 Origin: null）
 * - 预检 OPTIONS 直接 204 返回，避免进入业务路由
 * - 暴露 X-Family* 家族头，便于前端读取网关注入信息
 * - 无 Origin 的请求（curl / 服务间调用）不做任何 CORS 处理
 */

const EXPOSED_HEADERS = [
  "X-Family",
  "X-Family-Motto",
  "X-Family-Core",
  "X-Powered-By",
  "X-Family-Rose",
].join(", ");

export function corsPlugin(app: FastifyInstance, allowedOrigins: readonly string[]): void {
  const allowAll = allowedOrigins.includes("*");

  app.addHook("onRequest", async (request, reply) => {
    const origin = request.headers.origin;
    if (!origin) return;

    const allowed = allowAll || allowedOrigins.includes(origin);
    if (!allowed) return;

    reply.header("Access-Control-Allow-Origin", allowAll ? "*" : origin);
    reply.header("Vary", "Origin");
    reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    reply.header("Access-Control-Allow-Headers", "Content-Type");
    reply.header("Access-Control-Expose-Headers", EXPOSED_HEADERS);
    reply.header("Access-Control-Max-Age", "86400");

    if (request.method === "OPTIONS") {
      reply.code(204).send();
    }
  });
}
