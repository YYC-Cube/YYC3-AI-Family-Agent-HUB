/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / app
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import Fastify, { type FastifyInstance } from "fastify";
import type { DbPools } from "./db/pool";
import { corsPlugin } from "./plugins/cors";
import { familyHeadersPlugin } from "./plugins/family-headers";
import { engageRoutes } from "./routes/engage";
import { healthRoutes } from "./routes/health";
import { libraryRoutes } from "./routes/library";

/**
 * buildApp：组装 Fastify 实例（注入池由调用方创建，便于测试替身）。
 * 生产入口见 index.ts；测试用 inject() 免端口起服。
 * @param options.corsOrigins CORS 允许来源；缺省放行默认白名单（测试可显式指定）
 */
export function buildApp(
  pools: DbPools,
  options: { corsOrigins?: readonly string[] } = {},
): FastifyInstance {
  const app = Fastify({ logger: true });

  // 直接同步调用（addHook 立即生效）；register 的 avvio 异步封装在同步 buildApp 下时序不可靠
  void familyHeadersPlugin(app);
  void corsPlugin(app, options.corsOrigins ?? []);

  // 主备库失联统一 503（含降级不可用场景），避免裸 500；
  // Fastify 校验错误（error.validation）保持 400 语义
  app.setErrorHandler((error, _request, reply) => {
    const message = error instanceof Error ? error.message : "内部错误";
    if ((error as { validation?: unknown }).validation) {
      return reply.code(400).send({ error: "请求体校验失败", detail: message });
    }
    if (/ECONNREFUSED|ETIMEDOUT|connection terminated/i.test(message)) {
      return reply.code(503).send({ error: "数据库暂不可用（主备均失联或写操作时主库失联）" });
    }
    reply.log.error(error);
    return reply.code(500).send({ error: "内部错误" });
  });

  void healthRoutes(app, pools);
  void libraryRoutes(app, pools);
  void engageRoutes(app, pools);

  return app;
}
