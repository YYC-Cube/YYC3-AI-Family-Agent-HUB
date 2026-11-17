/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / engage
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
import { pickReadPool } from "../db/pool";

/**
 * 行为路由：收藏 / 播放历史 / 心情场景推荐。
 * 对齐前端 MusicRecommendation 模型（songs + reason + mood/activity）。
 * 全部 SQL 为静态字面量 + $n 占位参数。
 */

/** 心情/场景枚举的中文文案（对齐前端 i18n 取值，亦作白名单校验） */
const MOOD_ZH: Record<string, string> = {
  happy: "快乐",
  sad: "伤感",
  energetic: "活力",
  calm: "平静",
  romantic: "浪漫",
  melancholy: "忧郁",
  upbeat: "昂扬",
  peaceful: "安宁",
};
const ACTIVITY_ZH: Record<string, string> = {
  focus: "专注",
  relax: "放松",
  exercise: "运动",
  sleep: "入睡",
  party: "聚会",
  commute: "通勤",
  morning: "清晨",
  evening: "夜晚",
};

export async function engageRoutes(app: FastifyInstance, pools: DbPools): Promise<void> {
  // ── 收藏 ──────────────────────────────────────────────
  app.get<{ Querystring: { user_key?: string } }>("/api/music/favorites", async (request) => {
    const userKey = request.query.user_key ?? "family";
    const pool = await pickReadPool(pools);
    const result = await pool.query(
      "select s.*, f.created_at as favorited_at from favorites f join songs s on s.id = f.song_id where f.user_key = $1 order by f.created_at desc",
      [userKey],
    );
    return { favorites: result.rows };
  });

  app.put<{ Params: { songId: string }; Body: { user_key?: string } }>(
    "/api/music/favorites/:songId",
    {
      schema: {
        body: {
          type: "object",
          properties: { user_key: { type: "string", minLength: 1 } },
        },
      },
    },
    async (request, reply) => {
      const songId = request.params.songId;
      const userKey = request.body?.user_key ?? "family";
      const exists = await pools.primary.query("select 1 from songs where id = $1", [songId]);
      if (exists.rows.length === 0) return reply.code(404).send({ error: "曲目不存在" });
      await pools.primary.query(
        "insert into favorites (user_key, song_id) values ($1, $2) on conflict do nothing",
        [userKey, songId],
      );
      return reply.code(201).send({ favorited: true, song_id: songId });
    },
  );

  app.delete<{ Params: { songId: string }; Querystring: { user_key?: string } }>(
    "/api/music/favorites/:songId",
    async (request, reply) => {
      const userKey = request.query.user_key ?? "family";
      const result = await pools.primary.query(
        "delete from favorites where user_key = $1 and song_id = $2",
        [userKey, request.params.songId],
      );
      if ((result.rowCount ?? 0) === 0) return reply.code(404).send({ error: "未收藏该曲目" });
      return reply.code(204).send();
    },
  );

  // ── 播放历史（记一笔 + 曲目热度自增，同事务） ──────────
  app.post<{ Body: { song_id: string; user_key?: string } }>(
    "/api/music/history",
    {
      schema: {
        body: {
          type: "object",
          required: ["song_id"],
          properties: {
            song_id: { type: "string", minLength: 1 },
            user_key: { type: "string", minLength: 1 },
          },
        },
      },
    },
    async (request, reply) => {
      const songId = request.body.song_id;
      const userKey = request.body.user_key ?? "family";
      const exists = await pools.primary.query("select 1 from songs where id = $1", [songId]);
      if (exists.rows.length === 0) return reply.code(404).send({ error: "曲目不存在" });

      const client = await pools.primary.connect();
      try {
        await client.query("begin");
        await client.query("insert into play_history (user_key, song_id) values ($1, $2)", [userKey, songId]);
        await client.query("update songs set play_count = play_count + 1 where id = $1", [songId]);
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      return reply.code(201).send({ recorded: true, song_id: songId });
    },
  );

  app.get<{ Querystring: { user_key?: string; limit?: string } }>("/api/music/history", async (request) => {
    const userKey = request.query.user_key ?? "family";
    const limit = Math.min(Math.max(Number(request.query.limit ?? 50), 1), 200);
    const pool = await pickReadPool(pools);
    const result = await pool.query(
      "select s.*, h.played_at from play_history h join songs s on s.id = h.song_id where h.user_key = $1 order by h.played_at desc limit $2",
      [userKey, limit],
    );
    return { history: result.rows, limit };
  });

  // ── 推荐（心情/场景二选一，热度优先，不足随机补齐） ────
  app.get<{ Querystring: { mood?: string; activity?: string; limit?: string } }>(
    "/api/music/recommendations",
    async (request, reply) => {
      const { mood, activity } = request.query;
      if (!mood && !activity) {
        return reply.code(400).send({ error: "请提供 mood 或 activity 参数（二选一）" });
      }
      if (mood && activity) {
        return reply.code(400).send({ error: "mood 与 activity 只能二选一" });
      }
      const limit = Math.min(Math.max(Number(request.query.limit ?? 12), 1), 50);

      // 标签白名单校验（MOOD_ZH / ACTIVITY_ZH 即枚举表）
      if (mood && !(mood in MOOD_ZH)) {
        return reply.code(400).send({ error: `不支持的心情标签: ${mood}` });
      }
      if (activity && !(activity in ACTIVITY_ZH)) {
        return reply.code(400).send({ error: `不支持的场景标签: ${activity}` });
      }

      const pool = await pickReadPool(pools);
      // 两条静态 SQL 按维度分支，标签走参数
      const matched =
        mood !== undefined
          ? await pool.query("select * from songs where $1 = any(moods) order by play_count desc, random() limit $2", [mood, limit])
          : await pool.query("select * from songs where $1 = any(activities) order by play_count desc, random() limit $2", [activity, limit]);

      const songs = [...matched.rows];
      if (songs.length < limit) {
        const excludeIds = songs.map((song) => song.id);
        const filler = await pool.query(
          "select * from songs where not (id = any($1)) order by random() limit $2",
          [excludeIds, limit - songs.length],
        );
        songs.push(...filler.rows);
      }

      const reason =
        mood !== undefined
          ? `根据心情「${MOOD_ZH[mood]}」为你而选 🌹`
          : `适配场景「${ACTIVITY_ZH[activity ?? ""]}」，愿此刻合拍 🌹`;
      return { songs, reason, ...(mood !== undefined ? { mood } : { activity: activity ?? null }) };
    },
  );
}
