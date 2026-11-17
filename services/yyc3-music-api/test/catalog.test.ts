/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / catalog-test
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 */

import { describe, expect, it } from "vitest";
import { SEED_ALBUMS, SEED_ARTISTS, SEED_SONGS, SEED_VIDEOS } from "../src/seed/catalog";

/** 种子目录静态校验（无需数据库，CI 必跑） */
describe("seed catalog", () => {
  it("曲目 id 唯一（id = 静态资源相对路径）", () => {
    const ids = SEED_SONGS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("曲目 url 以 / 开头且指向 mp3 资源", () => {
    for (const song of SEED_SONGS) {
      expect(song.url.startsWith("/")).toBe(true);
      expect(song.url.endsWith(".mp3")).toBe(true);
      expect(song.url.slice(1, -4)).toBe(song.id);
    }
  });

  it("曲目 album_id 均指向已登记专辑", () => {
    const albumIds = new Set(SEED_ALBUMS.map((a) => a.id));
    for (const song of SEED_SONGS) {
      if (song.album_id !== null) expect(albumIds.has(song.album_id)).toBe(true);
    }
  });

  it("专辑 artist_id 均指向已登记艺人（对唱合集除外）", () => {
    const artistIds = new Set(SEED_ARTISTS.map((a) => a.id));
    for (const album of SEED_ALBUMS) {
      if (album.artist_id !== null) expect(artistIds.has(album.artist_id)).toBe(true);
    }
  });

  it("moods/activities 取值对齐前端枚举白名单", () => {
    const moods = new Set(["happy", "sad", "energetic", "calm", "romantic", "melancholy", "upbeat", "peaceful"]);
    const activities = new Set(["focus", "relax", "exercise", "sleep", "party", "commute", "morning", "evening"]);
    for (const song of SEED_SONGS) {
      for (const m of song.moods) expect(moods.has(m)).toBe(true);
      for (const a of song.activities) expect(activities.has(a)).toBe(true);
    }
  });

  it("视频 id 唯一且指向 mp4 资源", () => {
    const ids = SEED_VIDEOS.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const video of SEED_VIDEOS) expect(video.url.endsWith(".mp4")).toBe(true);
  });
});
