/**
 * @file: MusicApiClient.ts
 * @description: yyc3-music-api 浏览器客户端 —— 基址解析（localStorage/env）、超时控制、响应映射
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-17
 * @updated: 2026-11-17
 * @status: active
 * @tags: [lib],[music],[api]
 */

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
 * 后端 yyc3-music-api（NAS · 3030）浏览器客户端。
 * 基址解析优先级：localStorage 运行时覆盖 → VITE_AFH_MUSIC_API_BASE → 未启用（走内置曲库）。
 * 安全：仅允许 http/https 基址；请求路径固定为 API 常量，不接受任意用户 URL。
 */

/** 运行时基址覆盖键（供设置页写入，如 http://192.168.3.45:3030） */
export const MUSIC_API_BASE_STORAGE_KEY = "yyc3.music.apiBase";

const DEFAULT_TIMEOUT_MS = 4_000;

/** API 曲目行（snake_case，对齐 yyc3_music.songs） */
interface ApiSong {
  id: string;
  title: string;
  artist: string;
  album_id: string | null;
  album_cover: string;
  duration: number;
  url: string;
  source: MusicSong["source"];
  moods: string[];
  activities: string[];
  play_count: number;
}

interface ApiAlbum {
  id: string;
  name_zh: string;
  cover: string;
  year: number | null;
  artist_name: string | null;
}

interface ApiArtist {
  id: string;
  name: string;
  bio: string;
}

interface ApiVideo {
  id: string;
  title_zh: string;
  thumbnail: string;
  year: number | null;
  url: string;
}

interface ApiPhoto {
  id: string;
  title: string;
  image_url: string;
}

/** 曲库快照（映射为前端既有类型，UI 无需感知 API 形状） */
export interface ApiLibrarySnapshot {
  albums: MusicAlbum[];
  artist: MusicArtist;
  photos: MusicPhoto[];
  videos: MusicVideo[];
  songs: MusicSong[];
}

/** 解析基址：localStorage → env → 空串（未启用） */
export function getMusicApiBase(): string {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(MUSIC_API_BASE_STORAGE_KEY);
      if (stored && /^https?:\/\//i.test(stored)) return stored.replace(/\/+$/, "");
    } catch {
      // 隐私模式等场景 localStorage 不可用，忽略
    }
  }
  const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
  const configured = env?.VITE_AFH_MUSIC_API_BASE?.trim() ?? "";
  return /^https?:\/\//i.test(configured) ? configured.replace(/\/+$/, "") : "";
}

/** 是否启用远端 API（未配置时全程走内置曲库，离线可用） */
export function isMusicApiEnabled(): boolean {
  return getMusicApiBase().length > 0;
}

/** 运行时切换基址（传空串清除覆盖） */
export function setMusicApiBase(base: string): void {
  if (typeof window === "undefined") return;
  try {
    if (base.trim()) {
      window.localStorage.setItem(MUSIC_API_BASE_STORAGE_KEY, base.trim());
    } else {
      window.localStorage.removeItem(MUSIC_API_BASE_STORAGE_KEY);
    }
  } catch {
    // 忽略写入失败
  }
}

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = getMusicApiBase();
  if (!base) throw new Error("music-api 未配置");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetch(`${base}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    });
    if (!response.ok) throw new Error(`music-api ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/** 曲目行 → MusicSong（album 名由 albumId 映射补齐） */
function toMusicSong(song: ApiSong, albumNames: Map<string, string>): MusicSong {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist,
    album: song.album_id ? (albumNames.get(song.album_id) ?? "") : "",
    albumCover: song.album_cover,
    duration: song.duration,
    url: song.url,
    moods: song.moods as MusicMood[],
    activities: song.activities as MusicActivity[],
    source: song.source,
  };
}

/** 最近一次曲库快照的专辑名映射（推荐接口回填 album 展示名用） */
let albumNameCache = new Map<string, string>();

/** 拉取全量曲库并映射（专辑内曲目按 API 顺序归组） */
export async function fetchLibrarySnapshot(): Promise<ApiLibrarySnapshot> {
  const [artistRes, albumRes, songRes, videoRes, photoRes] = await Promise.all([
    requestJson<{ artists: ApiArtist[] }>("/api/music/artists"),
    requestJson<{ albums: ApiAlbum[] }>("/api/music/albums"),
    requestJson<{ songs: ApiSong[] }>("/api/music/songs?limit=200"),
    requestJson<{ videos: ApiVideo[] }>("/api/music/videos"),
    requestJson<{ photos: ApiPhoto[] }>("/api/music/photos"),
  ]);

  const albumNames = new Map(albumRes.albums.map((album) => [album.id, album.name_zh]));
  albumNameCache = albumNames;

  const albums: MusicAlbum[] = albumRes.albums.map((album) => ({
    id: album.id,
    nameZh: album.name_zh,
    cover: album.cover,
    year: album.year ?? 0,
    songs: songRes.songs
      .filter((row) => row.album_id === album.id)
      .map((row) => toMusicSong(row, albumNames)),
  }));

  const songs = songRes.songs.map((song) => toMusicSong(song, albumNames));

  const artistNames = artistRes.artists.map((artist) => artist.name);
  const artist: MusicArtist = {
    name: "YYC³",
    nameZh: artistNames.length > 0 ? artistNames.join(" · ") : "家族音乐空间",
    avatar: "",
    bio:
      artistRes.artists[0]?.bio ??
      `来自 yyc3_music 曲库的 ${songs.length} 首曲目 · 人从众曌众从人 🌹`,
  };

  return {
    albums,
    artist,
    photos: photoRes.photos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      imageUrl: photo.image_url,
    })),
    videos: videoRes.videos.map((video) => ({
      id: video.id,
      titleZh: video.title_zh,
      thumbnail: video.thumbnail,
      year: video.year ?? 0,
    })),
    songs,
  };
}

/** 服务端推荐（心情/场景二选一），失败返回 null 由调用方降级 */
export async function fetchApiRecommendation(
  query: { mood?: MusicMood; activity?: MusicActivity },
  limit = 12,
): Promise<MusicRecommendation | null> {
  const params = new URLSearchParams();
  if (query.mood) params.set("mood", query.mood);
  if (query.activity) params.set("activity", query.activity);
  params.set("limit", String(limit));
  try {
    const res = await requestJson<{
      songs: ApiSong[];
      reason: string;
      mood?: MusicMood;
      activity?: MusicActivity | null;
    }>(`/api/music/recommendations?${params.toString()}`);
    return {
      songs: res.songs.map((song) => toMusicSong(song, albumNameCache)),
      reason: res.reason,
      mood: res.mood,
      activity: res.activity ?? undefined,
    };
  } catch {
    return null;
  }
}

/** 播放历史上报（fire-and-forget，失败静默） */
export async function reportPlay(songId: string): Promise<void> {
  if (!isMusicApiEnabled()) return;
  try {
    await requestJson("/api/music/history", {
      method: "POST",
      body: JSON.stringify({ song_id: songId }),
    });
  } catch {
    // 行为日志失败不影响播放
  }
}

/** 收藏同步（fire-and-forget，失败静默） */
export async function syncFavoriteApi(songId: string, liked: boolean): Promise<void> {
  if (!isMusicApiEnabled()) return;
  try {
    await requestJson(`/api/music/favorites/${encodeURIComponent(songId)}`, {
      method: liked ? "PUT" : "DELETE",
      body: liked ? JSON.stringify({}) : undefined,
    });
  } catch {
    // 收藏同步失败不阻断本地交互
  }
}

/** 拉取收藏曲目 id 列表（失败返回空数组） */
export async function fetchFavoriteIds(): Promise<string[]> {
  if (!isMusicApiEnabled()) return [];
  try {
    const res = await requestJson<{ favorites: ApiSong[] }>("/api/music/favorites");
    return res.favorites.map((song) => song.id);
  } catch {
    return [];
  }
}
