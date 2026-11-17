/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / library
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
 * 曲库路由（/api/music/*，路径 kebab-case，标规 §3.4）：
 * 读操作经 pickReadPool（主库失联降级备库）；写操作仅主库。
 * 全部 SQL 为静态字面量 + $n 占位参数（检索通配符在 JS 侧预拼后传参）。
 */

interface SongBody {
  title: string;
  artist: string;
  album_id?: string | null;
  album_cover?: string;
  duration?: number;
  url: string;
  source?: "preset" | "local" | "online" | "ai";
  moods?: string[];
  activities?: string[];
}

export async function libraryRoutes(app: FastifyInstance, pools: DbPools): Promise<void> {
  // ── 艺人 ──────────────────────────────────────────────
  app.get("/api/music/artists", async () => {
    const pool = await pickReadPool(pools);
    const result = await pool.query(
      "select a.*, (select count(*) from songs s where s.artist = a.name) as song_count from artists a order by a.created_at, a.id",
    );
    return { artists: result.rows };
  });

  app.get<{ Params: { id: string } }>("/api/music/artists/:id", async (request, reply) => {
    const pool = await pickReadPool(pools);
    const result = await pool.query("select * from artists where id = $1", [request.params.id]);
    if (result.rows.length === 0) return reply.code(404).send({ error: "艺人不存在" });
    return { artist: result.rows[0] };
  });

  // ── 专辑 ──────────────────────────────────────────────
  app.get("/api/music/albums", async () => {
    const pool = await pickReadPool(pools);
    const result = await pool.query(
      "select al.*, ar.name as artist_name, (select count(*) from songs s where s.album_id = al.id) as song_count from albums al left join artists ar on ar.id = al.artist_id order by al.created_at, al.id",
    );
    return { albums: result.rows };
  });

  app.get<{ Params: { id: string } }>("/api/music/albums/:id", async (request, reply) => {
    const pool = await pickReadPool(pools);
    const result = await pool.query(
      "select al.*, ar.name as artist_name from albums al left join artists ar on ar.id = al.artist_id where al.id = $1",
      [request.params.id],
    );
    if (result.rows.length === 0) return reply.code(404).send({ error: "专辑不存在" });
    const songs = await pool.query("select * from songs where album_id = $1 order by created_at, id", [
      request.params.id,
    ]);
    return { album: result.rows[0], songs: songs.rows };
  });

  // ── 曲目（列表：检索/标签过滤/分页，$n::text is null 直通式静态过滤） ──
  app.get<{
    Querystring: { q?: string; mood?: string; activity?: string; album_id?: string; limit?: string; offset?: string };
  }>("/api/music/songs", async (request) => {
    const { mood, activity, album_id } = request.query;
    const limit = Math.min(Math.max(Number(request.query.limit ?? 50), 1), 200);
    const offset = Math.max(Number(request.query.offset ?? 0), 0);
    // 检索通配符在 JS 侧预拼（SQL 无需引号字面量，且无拼接注入面）
    const pattern = request.query.q ? `%${request.query.q}%` : null;

    const pool = await pickReadPool(pools);
    const result = await pool.query(
      "select * from songs where ($1::text is null or title ilike $1 or artist ilike $1) and ($2::text is null or $2 = any(moods)) and ($3::text is null or $3 = any(activities)) and ($4::text is null or album_id = $4) order by created_at desc, id limit $5 offset $6",
      [pattern, mood ?? null, activity ?? null, album_id ?? null, limit, offset],
    );
    return { songs: result.rows, limit, offset };
  });

  app.get<{ Params: { id: string } }>("/api/music/songs/:id", async (request, reply) => {
    const pool = await pickReadPool(pools);
    const result = await pool.query("select * from songs where id = $1", [request.params.id]);
    if (result.rows.length === 0) return reply.code(404).send({ error: "曲目不存在" });
    return { song: result.rows[0] };
  });

  // ── 曲目写操作（仅主库） ──────────────────────────────
  app.post<{ Body: SongBody }>("/api/music/songs", {
    schema: {
      body: {
        type: "object",
        required: ["title", "artist", "url"],
        properties: {
          title: { type: "string", minLength: 1 },
          artist: { type: "string", minLength: 1 },
          album_id: { type: ["string", "null"] },
          album_cover: { type: "string" },
          duration: { type: "integer", minimum: 0 },
          url: { type: "string", minLength: 1 },
          source: { enum: ["preset", "local", "online", "ai"] },
          moods: { type: "array", items: { type: "string" } },
          activities: { type: "array", items: { type: "string" } },
        },
      },
    },
  }, async (request, reply) => {
    const body = request.body;
    const id = body.url.replace(/^\/+/, "").replace(/\.[a-z0-9]+$/i, "") || `song-${Date.now()}`;
    const result = await pools.primary.query(
      "insert into songs (id, title, artist, album_id, album_cover, duration, url, source, moods, activities) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) on conflict (id) do update set title = excluded.title, artist = excluded.artist, url = excluded.url returning *",
      [
        id,
        body.title,
        body.artist,
        body.album_id ?? null,
        body.album_cover ?? "",
        body.duration ?? 0,
        body.url,
        body.source ?? "local",
        body.moods ?? [],
        body.activities ?? [],
      ],
    );
    return reply.code(201).send({ song: result.rows[0] });
  });

  app.delete<{ Params: { id: string } }>("/api/music/songs/:id", async (request, reply) => {
    const result = await pools.primary.query("delete from songs where id = $1", [request.params.id]);
    if ((result.rowCount ?? 0) === 0) return reply.code(404).send({ error: "曲目不存在" });
    return reply.code(204).send();
  });

  // ── 视频 / 相册 ────────────────────────────────────────
  app.get("/api/music/videos", async () => {
    const pool = await pickReadPool(pools);
    const result = await pool.query("select * from videos order by year nulls last, id");
    return { videos: result.rows };
  });

  app.get("/api/music/photos", async () => {
    const pool = await pickReadPool(pools);
    const result = await pool.query("select * from photos order by created_at, id");
    return { photos: result.rows };
  });
}
