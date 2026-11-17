/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / schema
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

/**
 * yyc3_music 库 schema（版本化迁移，静态字面量 DDL，无任何用户输入参与）：
 * 001-init · artists / albums / songs / photos / videos / favorites / play_history
 */

/** 001 · 初始 schema */
export async function apply001(client: pg.PoolClient): Promise<void> {
  await client.query("create table if not exists artists (id text primary key, name text not null unique, name_en text, avatar text not null default $q$$q$, bio text not null default $q$$q$, created_at timestamptz not null default now())");
  await client.query("create table if not exists albums (id text primary key, name_zh text not null, cover text not null default $q$$q$, year integer, artist_id text references artists(id) on delete set null, created_at timestamptz not null default now())");
  await client.query("create table if not exists songs (id text primary key, title text not null, artist text not null, album_id text references albums(id) on delete set null, album_cover text not null default $q$$q$, duration integer not null default 0, url text not null, source text not null default $q$local$q$, moods text[] not null default array[]::text[], activities text[] not null default array[]::text[], play_count integer not null default 0, created_at timestamptz not null default now())");
  await client.query("create table if not exists photos (id text primary key, title text not null, image_url text not null, created_at timestamptz not null default now())");
  await client.query("create table if not exists videos (id text primary key, title_zh text not null, thumbnail text not null default $q$$q$, year integer, url text not null default $q$$q$, created_at timestamptz not null default now())");
  await client.query("create table if not exists favorites (user_key text not null default $q$family$q$, song_id text not null references songs(id) on delete cascade, created_at timestamptz not null default now(), primary key (user_key, song_id))");
  await client.query("create table if not exists play_history (id bigserial primary key, user_key text not null default $q$family$q$, song_id text not null references songs(id) on delete cascade, played_at timestamptz not null default now())");
  await client.query("create index if not exists idx_songs_moods on songs using gin (moods)");
  await client.query("create index if not exists idx_songs_activities on songs using gin (activities)");
  await client.query("create index if not exists idx_songs_album on songs (album_id)");
  await client.query("create index if not exists idx_history_user on play_history (user_key, played_at desc)");
}
