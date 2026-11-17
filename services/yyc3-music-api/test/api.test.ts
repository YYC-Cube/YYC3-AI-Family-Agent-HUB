/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / api-test
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 */

import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "../src/app";
import type { DbPools } from "../src/db/pool";
import { runMigrations } from "../src/db/migrate";
import { runSeed } from "../src/seed/seed";

/**
 * 真库集成测试：MUSIC_API_TEST_PG 提供连接串时执行（CI postgres:17 service container /
 * 本地 docker run postgres:17），否则整组跳过——静态种子校验见 catalog.test.ts。
 */
const TEST_PG = process.env.MUSIC_API_TEST_PG ?? "";
const dbIt = TEST_PG ? it : it.skip;

describe("yyc3-music-api 集成（真库）", () => {
  let pools: DbPools;
  let app: ReturnType<typeof buildApp>;

  beforeAll(async () => {
    if (!TEST_PG) return;
    const primary = new pg.Pool({ connectionString: TEST_PG });
    // 每次测试重建 schema，保证用例独立
    await primary.query("drop schema public cascade");
    await primary.query("create schema public");
    await runMigrations(primary);
    await runSeed(primary);
    pools = { primary, standby: null };
    app = buildApp(pools, { corsOrigins: ["http://localhost:3218", "https://matrix.yyc3.vip"] });
  });

  afterAll(async () => {
    if (!TEST_PG) return;
    await app.close();
    await pools.primary.end();
  });

  dbIt("健康检查返回服务与库状态", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.statusCode).toBe(200);
    expect(res.json().service).toBe("yyc3-music-api");
    expect(res.json().database.primary).toBe("up");
  });

  dbIt("所有响应注入 X-Family 系列头（标规）", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.headers["x-family"]).toBe("YYC3-AI-FAmily-Agent-");
    // HTTP 头值必须 ASCII：🌹 以 UTF-8 百分号编码传输
    expect(res.headers["x-family-rose"]).toBe(encodeURI("🌹"));
    expect(decodeURI(String(res.headers["x-family-motto"]))).toContain("人从众曌众从人");
  });

  dbIt("GET /api/music/artists 返回三位种子艺人", async () => {
    const res = await app.inject({ method: "GET", url: "/api/music/artists" });
    expect(res.statusCode).toBe(200);
    expect(res.json().artists.map((a: { id: string }) => a.id).sort()).toEqual(["dongxiaojie", "moyan", "moyu"]);
  });

  dbIt("GET /api/music/albums/:id 附曲目列表", async () => {
    const res = await app.inject({ method: "GET", url: "/api/music/albums/music-a" });
    expect(res.statusCode).toBe(200);
    expect(res.json().songs).toHaveLength(7);
    expect(res.json().album.artist_name).toBe("沫言");
  });

  dbIt("GET /api/music/songs 支持 mood 过滤与关键字检索", async () => {
    const moodRes = await app.inject({ method: "GET", url: "/api/music/songs?mood=calm" });
    expect(moodRes.statusCode).toBe(200);
    for (const song of moodRes.json().songs as { moods: string[] }[]) {
      expect(song.moods).toContain("calm");
    }
    const qRes = await app.inject({ method: "GET", url: "/api/music/songs?q=宝贝" });
    expect(qRes.json().songs.length).toBeGreaterThanOrEqual(2);
  });

  dbIt("未知曲目返回 404", async () => {
    const res = await app.inject({ method: "GET", url: "/api/music/songs/not-exist" });
    expect(res.statusCode).toBe(404);
  });

  dbIt("收藏：添加 → 列表 → 移除 全链路", async () => {
    const songId = "Music-Mp3/FAmily-AI/沫言-AI-Family";
    const add = await app.inject({ method: "PUT", url: `/api/music/favorites/${encodeURIComponent(songId)}`, payload: {} });
    expect(add.statusCode).toBe(201);
    const list = await app.inject({ method: "GET", url: "/api/music/favorites" });
    expect(list.json().favorites.map((f: { id: string }) => f.id)).toContain(songId);
    const del = await app.inject({ method: "DELETE", url: `/api/music/favorites/${encodeURIComponent(songId)}` });
    expect(del.statusCode).toBe(204);
    const reList = await app.inject({ method: "GET", url: "/api/music/favorites" });
    expect(reList.json().favorites.map((f: { id: string }) => f.id)).not.toContain(songId);
  });

  dbIt("播放历史：记录后可见且热度自增", async () => {
    const songId = "Music-Mp3/Music-B/沫语-浮生似梦";
    const before = await pools.primary.query<{ play_count: number }>("select play_count from songs where id = $1", [songId]);
    const rec = await app.inject({ method: "POST", url: "/api/music/history", payload: { song_id: songId } });
    expect(rec.statusCode).toBe(201);
    const after = await pools.primary.query<{ play_count: number }>("select play_count from songs where id = $1", [songId]);
    expect(after.rows[0].play_count).toBe(before.rows[0].play_count + 1);
    const list = await app.inject({ method: "GET", url: "/api/music/history" });
    expect(list.json().history[0].id).toBe(songId);
  });

  dbIt("推荐：心情标签返回匹配曲目与中文理由", async () => {
    const res = await app.inject({ method: "GET", url: "/api/music/recommendations?mood=calm&limit=5" });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.reason).toContain("平静");
    expect(body.mood).toBe("calm");
    expect(body.songs.length).toBeGreaterThan(0);
    expect(body.songs.length).toBeLessThanOrEqual(5);
  });

  dbIt("推荐：缺参 400 · 双参 400 · 非法标签 400", async () => {
    expect((await app.inject({ method: "GET", url: "/api/music/recommendations" })).statusCode).toBe(400);
    expect(
      (await app.inject({ method: "GET", url: "/api/music/recommendations?mood=calm&activity=focus" })).statusCode,
    ).toBe(400);
    expect((await app.inject({ method: "GET", url: "/api/music/recommendations?mood=hacker" })).statusCode).toBe(400);
  });

  dbIt("POST /api/music/songs 可新增曲目（JSON Schema 校验）", async () => {
    const bad = await app.inject({ method: "POST", url: "/api/music/songs", payload: { title: "缺 artist 与 url" } });
    expect(bad.statusCode).toBe(400);
    const ok = await app.inject({
      method: "POST",
      url: "/api/music/songs",
      payload: { title: "测试曲", artist: "沫言", url: "/Music-Mp3/test/demo-song.mp3", moods: ["happy"] },
    });
    expect(ok.statusCode).toBe(201);
    expect(ok.json().song.id).toBe("Music-Mp3/test/demo-song");
    expect(ok.json().song.source).toBe("local");
  });

  dbIt("CORS：白名单来源预检 204 且放行头正确", async () => {
    const res = await app.inject({
      method: "OPTIONS",
      url: "/api/music/songs",
      headers: { origin: "http://localhost:3218", "access-control-request-method": "GET" },
    });
    expect(res.statusCode).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:3218");
    expect(String(res.headers["access-control-expose-headers"])).toContain("X-Family");
  });

  dbIt("CORS：非白名单来源不下发放行头", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/health",
      headers: { origin: "https://evil.example.com" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
