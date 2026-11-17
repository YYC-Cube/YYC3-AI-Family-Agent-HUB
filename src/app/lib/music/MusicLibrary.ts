/**
 * @file: MusicLibrary.ts
 * @description: 音乐空间曲库加载器 —— API 优先、内置兜底、快照缓存与降级信号
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-17
 * @updated: 2026-11-17
 * @status: active
 * @tags: [lib],[music],[data]
 */

import {
  fetchApiRecommendation,
  fetchFavoriteIds,
  fetchLibrarySnapshot,
  isMusicApiEnabled,
  reportPlay,
  syncFavoriteApi,
} from "./MusicApiClient";
import { ALBUMS, ARTIST, PHOTOS, VIDEOS } from "./MusicData";
import type {
  MusicActivity,
  MusicAlbum,
  MusicArtist,
  MusicMood,
  MusicPhoto,
  MusicRecommendation,
  MusicSong,
  MusicVideo,
} from "./types";

/**
 * 曲库单一入口：优先 NAS yyc3-music-api，未配置或不可达时无缝回退内置曲库。
 * 所有 UI/Hook 只从此处取数，API 接入对上层透明。
 */

export interface MusicLibrarySnapshot {
  albums: MusicAlbum[];
  artist: MusicArtist;
  photos: MusicPhoto[];
  videos: MusicVideo[];
  songs: MusicSong[];
  /** 数据来源：api = NAS 曲库；builtin = 内置演示曲库（离线兜底） */
  source: "api" | "builtin";
}

/** 内置曲库快照（离线/未配置时的基线） */
export function getBuiltinLibrary(): MusicLibrarySnapshot {
  return {
    albums: ALBUMS,
    artist: ARTIST,
    photos: PHOTOS,
    videos: VIDEOS,
    songs: ALBUMS.flatMap((album) => album.songs),
    source: "builtin",
  };
}

let cached: MusicLibrarySnapshot | null = null;
let inflight: Promise<MusicLibrarySnapshot> | null = null;

/** 加载曲库（并发去重 + 结果缓存；force 强制重新拉取） */
export async function loadMusicLibrary(force = false): Promise<MusicLibrarySnapshot> {
  if (!force && cached) return cached;
  if (inflight) return inflight;

  inflight = (async (): Promise<MusicLibrarySnapshot> => {
    if (!isMusicApiEnabled()) {
      cached = getBuiltinLibrary();
      return cached;
    }
    try {
      const remote = await fetchLibrarySnapshot();
      // 曲库为空视为异常（迁移/种子未跑），回退内置避免空界面
      cached =
        remote.songs.length > 0
          ? {
              ...remote,
              // 相册为空的早期曲库补内置展示图，避免艺人页留白
              photos: remote.photos.length > 0 ? remote.photos : PHOTOS,
              source: "api",
            }
          : getBuiltinLibrary();
    } catch {
      cached = getBuiltinLibrary();
    }
    return cached;
  })().finally(() => {
    inflight = null;
  });

  return inflight;
}

/** 同步取当前可用曲目（供检索/本地推荐等同步 API 使用） */
export function getActiveSongs(): MusicSong[] {
  return cached?.songs ?? getBuiltinLibrary().songs;
}

/** 远端推荐（未启用/失败返回 null，由调用方保留本地结果） */
export async function fetchLibraryRecommendation(
  query: { mood?: MusicMood; activity?: MusicActivity },
): Promise<MusicRecommendation | null> {
  if (!isMusicApiEnabled()) return null;
  return fetchApiRecommendation(query);
}

/** 播放历史上报（未启用时为空操作） */
export function reportSongPlay(songId: string): void {
  void reportPlay(songId);
}

/** 收藏同步（未启用时为空操作） */
export function syncSongFavorite(songId: string, liked: boolean): void {
  void syncFavoriteApi(songId, liked);
}

/** 拉取已收藏曲目 id（未启用/失败返回空数组） */
export function fetchLikedSongIds(): Promise<string[]> {
  return fetchFavoriteIds();
}
