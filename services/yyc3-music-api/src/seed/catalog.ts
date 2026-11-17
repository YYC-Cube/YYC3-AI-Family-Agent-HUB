/*
 * ============================================================
 * YYC3-AI-FAmily-Agent- — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC3-AI-FAmily-Agent- (永久开源)
 * @Module   : yyc3-music-api / seed-catalog
 * @Author   : YYC3 Team
 * @Date     : 2026-11-17
 * @Homepage : https://matrix.yyc3.vip
 * @Repo     : https://github.com/YYC-Cube/YYC3-AI-Family-Agent-HUB
 * @License  : MIT
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

/**
 * 初始曲库目录（固化自 public/ 真实媒体清单，2026-11-17）：
 * - 曲目 id = 前端静态资源相对路径去扩展名（如 Music-Mp3/Music-A/沫言-往事如风）
 * - url 为前端部署根下的相对路径（Pages / Electron 静态资源）
 * - 根目录 Music-Mp3/*.mp3 与 FAmily-AI/ 子目录为同一批文件，种子仅登记 FAmily-AI/ 一份
 * - moods/activities 对齐前端 MusicMood / MusicActivity 枚举，按曲风人工标注（可后补）
 */

export interface SeedArtist {
  id: string;
  name: string;
  name_en: string | null;
  bio: string;
}

export interface SeedAlbum {
  id: string;
  name_zh: string;
  artist_id: string | null;
}

export interface SeedSong {
  id: string;
  title: string;
  artist: string;
  album_id: string | null;
  url: string;
  moods: string[];
  activities: string[];
}

export interface SeedVideo {
  id: string;
  title_zh: string;
  url: string;
}

export const SEED_ARTISTS: SeedArtist[] = [
  { id: "moyan", name: "沫言", name_en: "MoYan", bio: "AI Family 主题曲歌者 · 言语云枢之声" },
  { id: "moyu", name: "沫语", name_en: "MoYu", bio: "半生系叙事歌者 · 浮生如渡" },
  { id: "dongxiaojie", name: "董小姐", name_en: "DongXiaoJie", bio: "岁月民谣歌者 · 秋风不问梧桐意" },
];

export const SEED_ALBUMS: SeedAlbum[] = [
  { id: "family-ai", name_zh: "FAmily-AI 主题曲集", artist_id: "moyan" },
  { id: "music-a", name_zh: "Music-A · 沫言单曲集", artist_id: "moyan" },
  { id: "music-b", name_zh: "Music-B · 沫语半生集", artist_id: "moyu" },
  { id: "music-c", name_zh: "Music-C · 董小姐歌集", artist_id: "dongxiaojie" },
  { id: "music-d", name_zh: "Music-D · 对唱合集", artist_id: null },
];

const familyAi = "Music-Mp3/FAmily-AI";
const musicA = "Music-Mp3/Music-A";
const musicB = "Music-Mp3/Music-B";
const musicC = "Music-Mp3/Music-C";
const musicD = "Music-Mp3/Music-D";

export const SEED_SONGS: SeedSong[] = [
  // ── FAmily-AI 主题曲集（沫言） ─────────────────────────
  {
    id: `${familyAi}/沫言-AI-Family`,
    title: "AI-Family",
    artist: "沫言",
    album_id: "family-ai",
    url: `/${familyAi}/沫言-AI-Family.mp3`,
    moods: ["happy", "upbeat"],
    activities: ["morning", "party"],
  },
  {
    id: `${familyAi}/沫言-Family-AI-智慧工坊`,
    title: "Family-AI-智慧工坊",
    artist: "沫言",
    album_id: "family-ai",
    url: `/${familyAi}/沫言-Family-AI-智慧工坊.mp3`,
    moods: ["calm"],
    activities: ["focus"],
  },
  {
    id: `${familyAi}/沫言-Family-AI`,
    title: "Family-AI",
    artist: "沫言",
    album_id: "family-ai",
    url: `/${familyAi}/沫言-Family-AI.mp3`,
    moods: ["romantic"],
    activities: ["evening"],
  },
  // ── Music-A（沫言） ────────────────────────────────────
  { id: `${musicA}/沫言-往事如风`, title: "往事如风", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-往事如风.mp3`, moods: ["melancholy"], activities: ["evening"] },
  { id: `${musicA}/沫言-昨日的酒`, title: "昨日的酒", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-昨日的酒.mp3`, moods: ["sad", "melancholy"], activities: ["evening"] },
  { id: `${musicA}/沫言-不必完美`, title: "不必完美", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-不必完美.mp3`, moods: ["calm"], activities: ["relax"] },
  { id: `${musicA}/沫言-永远宝贝`, title: "永远宝贝", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-永远宝贝.mp3`, moods: ["romantic"], activities: ["sleep"] },
  { id: `${musicA}/沫言-渡船也是过客`, title: "渡船也是过客", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-渡船也是过客.mp3`, moods: ["peaceful"], activities: ["commute"] },
  { id: `${musicA}/沫言-你为何如此疲惫`, title: "你为何如此疲惫", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-你为何如此疲惫.mp3`, moods: ["melancholy"], activities: ["sleep"] },
  { id: `${musicA}/沫言-AI Family`, title: "AI Family", artist: "沫言", album_id: "music-a", url: `/${musicA}/沫言-AI Family.mp3`, moods: ["happy", "upbeat"], activities: ["party"] },
  // ── Music-B（沫语） ────────────────────────────────────
  { id: `${musicB}/沫语-浮生如渡`, title: "浮生如渡", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-浮生如渡.mp3`, moods: ["peaceful"], activities: ["relax"] },
  { id: `${musicB}/沫语-半生清醒`, title: "半生清醒", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-半生清醒.mp3`, moods: ["calm"], activities: ["commute"] },
  { id: `${musicB}/沫语-半世浮生`, title: "半世浮生", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-半世浮生.mp3`, moods: ["melancholy"], activities: [] },
  { id: `${musicB}/沫语-不负流年`, title: "不负流年", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-不负流年.mp3`, moods: ["romantic"], activities: ["evening"] },
  { id: `${musicB}/沫语-半生风雨`, title: "半生风雨", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-半生风雨.mp3`, moods: ["sad"], activities: [] },
  { id: `${musicB}/沫语-浮生似梦`, title: "浮生似梦", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-浮生似梦.mp3`, moods: ["calm", "peaceful"], activities: ["sleep"] },
  { id: `${musicB}/沫语-半世云烟`, title: "半世云烟", artist: "沫语", album_id: "music-b", url: `/${musicB}/沫语-半世云烟.mp3`, moods: ["melancholy"], activities: ["relax"] },
  // ── Music-C（董小姐） ──────────────────────────────────
  { id: `${musicC}/董小姐-过客`, title: "过客", artist: "董小姐", album_id: "music-c", url: `/${musicC}/董小姐-过客.mp3`, moods: ["melancholy"], activities: [] },
  { id: `${musicC}/董小姐-歌岁月`, title: "歌岁月", artist: "董小姐", album_id: "music-c", url: `/${musicC}/董小姐-歌岁月.mp3`, moods: ["calm"], activities: ["relax"] },
  { id: `${musicC}/董小姐-忘了曾经`, title: "忘了曾经", artist: "董小姐", album_id: "music-c", url: `/${musicC}/董小姐-忘了曾经.mp3`, moods: ["sad"], activities: ["evening"] },
  { id: `${musicC}/董小姐-我的宝贝`, title: "我的宝贝", artist: "董小姐", album_id: "music-c", url: `/${musicC}/董小姐-我的宝贝.mp3`, moods: ["romantic"], activities: ["sleep"] },
  { id: `${musicC}/董小姐-秋风不问梧桐意`, title: "秋风不问梧桐意", artist: "董小姐", album_id: "music-c", url: `/${musicC}/董小姐-秋风不问梧桐意.mp3`, moods: ["melancholy", "peaceful"], activities: ["evening"] },
  // ── Music-D（董小姐 · 沫言 对唱） ─────────────────────
  { id: `${musicD}/董小姐-沫言-奉陪`, title: "奉陪", artist: "董小姐 · 沫言", album_id: "music-d", url: `/${musicD}/董小姐-沫言-奉陪.mp3`, moods: ["romantic"], activities: ["evening"] },
  { id: `${musicD}/董小姐-沫言-时光`, title: "时光", artist: "董小姐 · 沫言", album_id: "music-d", url: `/${musicD}/董小姐-沫言-时光.mp3`, moods: ["calm"], activities: ["commute"] },
  { id: `${musicD}/董小姐-沫言-浮生如渡`, title: "浮生如渡（对唱版）", artist: "董小姐 · 沫言", album_id: "music-d", url: `/${musicD}/董小姐-沫言-浮生如渡.mp3`, moods: ["peaceful"], activities: ["relax"] },
  { id: `${musicD}/董小姐-沫言-岁月如歌`, title: "岁月如歌", artist: "董小姐 · 沫言", album_id: "music-d", url: `/${musicD}/董小姐-沫言-岁月如歌.mp3`, moods: ["happy"], activities: ["party"] },
  { id: `${musicD}/董小姐-沫言-渡心·时序`, title: "渡心·时序", artist: "董小姐 · 沫言", album_id: "music-d", url: `/${musicD}/董小姐-沫言-渡心·时序.mp3`, moods: ["peaceful"], activities: ["sleep"] },
];

export const SEED_VIDEOS: SeedVideo[] = [
  { id: "D-Music/D-98-Mp4/Music-1989", title_zh: "Music-1989", url: "/D-Music/D-98-Mp4/Music-1989.mp4" },
  { id: "D-Music/D-98-Mp4/Music-1990", title_zh: "Music-1990", url: "/D-Music/D-98-Mp4/Music-1990.mp4" },
  { id: "D-Music/D-98-Mp4/Music-1991", title_zh: "Music-1991", url: "/D-Music/D-98-Mp4/Music-1991.mp4" },
  { id: "D-Music/D-98-Mp4/Music-1992", title_zh: "Music-1992", url: "/D-Music/D-98-Mp4/Music-1992.mp4" },
  { id: "D-Music/D-98-Mp4/Music-1993", title_zh: "Music-1993", url: "/D-Music/D-98-Mp4/Music-1993.mp4" },
  { id: "D-Music/D-98-Mp4/Music-1994", title_zh: "Music-1994", url: "/D-Music/D-98-Mp4/Music-1994.mp4" },
  { id: "D-Music/D-98-Mp4/Music-1995", title_zh: "Music-1995", url: "/D-Music/D-98-Mp4/Music-1995.mp4" },
];
