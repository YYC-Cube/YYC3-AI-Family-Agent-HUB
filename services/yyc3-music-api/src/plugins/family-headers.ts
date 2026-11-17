/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / family-headers
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

/**
 * 家族 API 网关注入头（标规《标头标尾》§七）：
 * 所有响应统一携带 X-Family* 系列头，与 Nginx 注入配置保持同一取值。
 * 注意：HTTP 头值必须 ASCII（Node 对非 ASCII 抛 ERR_INVALID_CHAR），
 * 含中文/玫瑰的头值以 UTF-8 百分号编码传输（%F0%9F%8C%B9 即 🌹）。
 */
export async function familyHeadersPlugin(app: FastifyInstance): Promise<void> {
  app.addHook("onSend", async (_request, reply, payload) => {
    reply.header("X-Family", "YYC3-AI-FAmily-Agent-");
    reply.header("X-Family-Motto", encodeURI("人从众曌众从人 · 亦师亦友亦伯乐"));
    reply.header("X-Family-Core", encodeURI("拟人为本，AI为核，纯粹为心"));
    reply.header("X-Powered-By", encodeURI("YYC3-AI-FAmily-Agent- · 永久开源"));
    reply.header("X-Family-Rose", encodeURI("🌹"));
    return payload;
  });
}
