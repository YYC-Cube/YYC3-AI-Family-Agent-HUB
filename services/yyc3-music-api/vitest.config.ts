/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / vitest-config
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    // 真库集成测试：MUSIC_API_TEST_PG 提供连接串时才执行（CI service container / 本地 docker）
    envPrefix: ["MUSIC_API_TEST_"],
    testTimeout: 15_000,
  },
});
