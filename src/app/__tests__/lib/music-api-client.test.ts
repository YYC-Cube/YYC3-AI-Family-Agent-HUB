/**
 * @file: music-api-client.test.ts
 * @description: MusicApiClient 单测 —— 基址解析/映射/超时降级（fetch 打桩，不触网）
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-17
 * @updated: 2026-11-17
 * @status: active
 * @tags: [test],[music],[api]
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MUSIC_API_BASE_STORAGE_KEY,
  fetchFavoriteIds,
  fetchLibrarySnapshot,
  getMusicApiBase,
  isMusicApiEnabled,
  setMusicApiBase,
} from "../../lib/music/MusicApiClient";

const BASE = "http://192.168.3.45:3030";

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    json: async () => body,
  } as unknown as Response;
}

describe("MusicApiClient", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("未配置基址时禁用远端（离线内置曲库模式）", () => {
    expect(getMusicApiBase()).toBe("");
    expect(isMusicApiEnabled()).toBe(false);
  });

  it("localStorage 覆盖优先，且拒绝非 http(s) 基址", () => {
    window.localStorage.setItem(MUSIC_API_BASE_STORAGE_KEY, "javascript:alert(1)");
    expect(getMusicApiBase()).toBe("");
    setMusicApiBase(`${BASE}/`);
    expect(getMusicApiBase()).toBe(BASE);
  });

  it("曲库快照映射：专辑归组/曲目字段/艺人聚合", async () => {
    setMusicApiBase(BASE);
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.includes("/artists")) {
        return jsonResponse({ artists: [{ id: "moyan", name: "沫言", bio: "家族之声" }] });
      }
      if (url.includes("/albums")) {
        return jsonResponse({ albums: [{ id: "family-ai", name_zh: "FAmily-AI 主题曲集", cover: "", year: null, artist_name: "沫言" }] });
      }
      if (url.includes("/songs")) {
        return jsonResponse({
          songs: [
            {
              id: "Music-Mp3/FAmily-AI/沫言-AI-Family",
              title: "AI-Family",
              artist: "沫言",
              album_id: "family-ai",
              album_cover: "",
              duration: 0,
              url: "/Music-Mp3/FAmily-AI/沫言-AI-Family.mp3",
              source: "local",
              moods: ["happy"],
              activities: ["morning"],
              play_count: 0,
            },
          ],
        });
      }
      if (url.includes("/videos")) return jsonResponse({ videos: [] });
      if (url.includes("/photos")) return jsonResponse({ photos: [] });
      throw new Error(`unexpected url: ${url}`);
    });

    const snapshot = await fetchLibrarySnapshot();
    expect(fetchMock).toHaveBeenCalled();
    expect(snapshot.songs).toHaveLength(1);
    expect(snapshot.songs[0].album).toBe("FAmily-AI 主题曲集");
    expect(snapshot.songs[0].url).toBe("/Music-Mp3/FAmily-AI/沫言-AI-Family.mp3");
    expect(snapshot.albums[0].songs).toHaveLength(1);
    expect(snapshot.artist.nameZh).toBe("沫言");
  });

  it("收藏拉取失败时静默返回空数组（不抛错）", async () => {
    setMusicApiBase(BASE);
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    await expect(fetchFavoriteIds()).resolves.toEqual([]);
  });
});
