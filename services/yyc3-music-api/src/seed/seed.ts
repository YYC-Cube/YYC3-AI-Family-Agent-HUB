/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / seed
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import pg from "pg";
import { loadConfig } from "../config";
import { SEED_ALBUMS, SEED_ARTISTS, SEED_SONGS, SEED_VIDEOS } from "./catalog";

/**
 * 种子执行器（可重入，on conflict 幂等）：
 * 仅主库执行；先跑 migrate 再跑 seed。
 */

/** 对给定池执行种子（测试与 CLI 共用） */
export async function runSeed(pool: pg.Pool): Promise<void> {
  for (const artist of SEED_ARTISTS) {
    await pool.query(
      `insert into artists (id, name, name_en, bio) values ($1, $2, $3, $4)
       on conflict (id) do update set name = excluded.name, name_en = excluded.name_en, bio = excluded.bio`,
      [artist.id, artist.name, artist.name_en, artist.bio],
    );
  }
  for (const album of SEED_ALBUMS) {
    await pool.query(
      `insert into albums (id, name_zh, artist_id) values ($1, $2, $3)
       on conflict (id) do update set name_zh = excluded.name_zh, artist_id = excluded.artist_id`,
      [album.id, album.name_zh, album.artist_id],
    );
  }
  for (const song of SEED_SONGS) {
    await pool.query(
      `insert into songs (id, title, artist, album_id, url, source, moods, activities)
       values ($1, $2, $3, $4, $5, 'local', $6, $7)
       on conflict (id) do update set title = excluded.title, artist = excluded.artist,
         album_id = excluded.album_id, url = excluded.url, moods = excluded.moods, activities = excluded.activities`,
      [song.id, song.title, song.artist, song.album_id, song.url, song.moods, song.activities],
    );
  }
  for (const video of SEED_VIDEOS) {
    await pool.query(
      `insert into videos (id, title_zh, url) values ($1, $2, $3)
       on conflict (id) do update set title_zh = excluded.title_zh, url = excluded.url`,
      [video.id, video.title_zh, video.url],
    );
  }
  console.log(
    `🌹 种子完成：${SEED_ARTISTS.length} 艺人 · ${SEED_ALBUMS.length} 专辑 · ${SEED_SONGS.length} 曲目 · ${SEED_VIDEOS.length} MV`,
  );
}

async function main(): Promise<void> {
  const config = loadConfig();
  const pool = new pg.Pool({ connectionString: config.primaryUrl });
  try {
    await runSeed(pool);
  } finally {
    await pool.end();
  }
}

if (process.env.NODE_ENV !== "test") {
  main().catch((error: unknown) => {
    console.error("❌ 种子失败:", error);
    process.exitCode = 1;
  });
}
