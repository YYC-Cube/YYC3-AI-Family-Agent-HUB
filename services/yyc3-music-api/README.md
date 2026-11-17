---
file: README.md
title: YYC3 音乐空间服务（yyc3-music-api）— 曲库 · 行为 · 推荐 REST API
description: yyc3_music 库服务端：艺人/专辑/曲目/MV、收藏、播放历史与心情场景推荐
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-17
updated: 2026-11-17
status: stable
tags: [api, backend, database, music]
category: api
language: zh-CN
audience: developers
complexity: intermediate
project: yyc3-ai-family-agent
scope: engineering
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- — 人从众曌众从人
  亦师亦友亦伯乐，一言一语一协同
  拟人为本，AI为核，纯粹为心
  ============================================================
  Document: YYC3 音乐空间服务（yyc3-music-api）
  Version : v1.0.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.vip
  ============================================================
-->

# YYC3 音乐空间服务（yyc3-music-api）— 曲库 · 行为 · 推荐 REST API

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 一、定位

为 Family HUB 音乐空间提供后端能力：**yyc3_music** 库（PG 17 主备双机）+ NAS Docker 常驻服务。一期覆盖曲库 CRUD、收藏、播放历史与心情/场景推荐，替代前端内置假数据（`src/app/lib/music/MusicData.ts` 仅为回退）。

| 项 | 值 |
| ---- | ---- |
| 主库 | NAS PG 17 · 5433（读写，迁移与种子仅在此执行） |
| 备库 | 本机 PG 17 · 5433（热备只读，主库失联时 GET 降级） |
| 服务 | Fastify + node-postgres · 端口 3030（标规端口规范） |
| 部署 | `docker compose -p yyc3-music-api`（NAS） |

## 二、快速开始

```bash
# 本地开发（仓库根目录）
pnpm install
pnpm --filter @yyc3/music-api build
MUSIC_API_TEST_PG=postgresql://postgres:postgres@127.0.0.1:5433/yyc3_music_test \
  pnpm --filter @yyc3/music-api test      # 真库集成测试（无 env 时仅跑静态校验）

# NAS 部署
cp services/yyc3-music-api/.env.example services/yyc3-music-api/.env  # 填主备连接串
docker compose -p yyc3-music-api -f services/yyc3-music-api/docker-compose.yml up -d --build
docker exec yyc3-music-api node dist/seed/seed.js                      # 首次种子（幂等）
```

## 三、API 一览（/api/music，路径 kebab-case）

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| GET | `/health` | 主备库状态与降级观测 |
| GET | `/api/music/artists` · `/:id` | 艺人（含曲目数） |
| GET | `/api/music/albums` · `/:id` | 专辑（详情附曲目） |
| GET | `/api/music/songs` | 列表：`q` 检索 · `mood`/`activity` 标签 · `album_id` · 分页 |
| POST/DELETE | `/api/music/songs` · `/:id` | 新增/删除曲目（JSON Schema 校验） |
| GET | `/api/music/videos` · `/api/music/photos` | MV 与相册 |
| GET/PUT/DELETE | `/api/music/favorites(/:songId)` | 收藏（`user_key` 家用单用户） |
| POST/GET | `/api/music/history` | 播放历史（热度自增同事务） |
| GET | `/api/music/recommendations` | `mood` 或 `activity` 二选一，热度优先随机补齐 |

所有响应注入家族网关头（`X-Family` / `X-Family-Motto` / `X-Family-Core` / `X-Powered-By` / `X-Family-Rose`）。

## 四、数据模型（migrations/001-init.sql）

`artists` · `albums` · `songs`（`moods`/`activities` 为 `text[]` + GIN 索引，`id` = 前端静态资源相对路径）· `photos` · `videos` · `favorites` · `play_history`（推荐热度来源）。种子固化真实媒体清单：3 艺人（沫言/沫语/董小姐）· 5 专辑 · 27 曲 · 7 MV。

## 五、主备策略

- 写操作（POST/PUT/DELETE、迁移、种子）：仅主库；主库失联返回 503
- 读操作（GET）：默认主库，失联且配置备库时自动降级（`/health` 可观测 `standbyInRecovery`）
- 备库处于流复制恢复模式，schema 变更由主库经流复制同步，**严禁直写备库**

## 六、质量门禁（对齐根 CI）

`pnpm --filter @yyc3/music-api lint` · `type-check` · `test`（CI 于 postgres:17 service container 中执行全量集成测试）

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-17 | 一期交付：曲库 CRUD + 收藏/历史/推荐 · 主备降级 · NAS Docker 部署 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.vip">matrix.yyc3.vip</a></sub>
</p>
