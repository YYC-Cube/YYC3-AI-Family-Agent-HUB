---
file: ROADMAP.md
title: YYC3 AI Family HUB — 路线图与立项规划
description: 全域差距分析后的立项清单 — 命名双轨 / 音乐二期 / NAS CD / LFS 治理 / 生产基址
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: active
tags: [roadmap, planning, backlog]
category: project
language: zh-CN
audience: developers,managers,stakeholders
complexity: intermediate
project: yyc3-ai-family-agent
scope: governance
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- — 人从众曌众从人
  亦师亦友亦伯乐 · 一言一语一协同
  ============================================================
  Document: YYC3 AI Family HUB — 路线图与立项规划
  Version : v1.0.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.vip
  ============================================================
-->

# YYC3 AI Family HUB — 路线图与立项规划

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 一、立项背景（2026-11-20 全域差距分析）

对 2026-11-17~20 五条工作线（独立仓 CI/Pages、yyc3-music-api、UI 审计闭环、导航重构、质量收尾）做全局落地核查，识别出 **5 项结构缺失 + 2 项运维隐患**。本路线图为唯一立项真源，完成一项销一项。

## 二、立项清单

### P1-1 · 命名双轨统一（专项重构）

| 项 | 内容 |
| ---- | ---- |
| 现状 | 内部技术标识 `YYC3-AI-Family-HUB` / `yyc3-ai-family-hub`（约 10 处代码 + 测试 + electron publish）与仓库名 `YYC3-AI-Family-Agent-HUB` 双轨并存 |
| 方案 | 二选一：① 全量改 `YYC3-AI-Family-Agent-HUB`（改动面：app-brand projectId/slug、bridge-client、ipc-handlers、page-config、导航注释、i18n 测试断言、package.json name）；② 裁定保留双轨（短标识 vs 仓库名）并写入标规 |
| 影响 | 方案①涉及 electron-builder 产物名 / 自动更新 repo 校验；需一次专项 + 全量回归 |
| 工作量 | 0.5 天（①）/ 0.5 小时（②文档化） |

### P1-2 · 音乐空间二期（业务闭环补全)

| 项 | 内容 |
| ---- | ---- |
| photos 空 | `yyc3_music.photos` 0 行，前端回退 placeholder 占位图——需真实图源（艺人相册/MV 截图）后补种子 |
| 多用户 | favorites/play_history 单用户键 `family`——家庭多成员区分需接入鉴权或本机身份选择器 |
| 音频直出 | 现由前端静态资源（LFS 124MB）供流；NAS 本地媒体（/Volume1/yyc3_hd/Music）经 API Range 流式直出可摆脱 LFS 依赖（与 P2-2 联动） |
| 歌词 | FAmily-AI 曲目已有 `.md` 歌词伴文件，可入库做歌词滚动 |
| 工作量 | 每子项 0.5~1 天 |

### P1-3 · NAS 部署 CD 化（消除手工成品包）

| 项 | 内容 |
| ---- | ---- |
| 现状 | NAS 部署为手工流程：本机 `npm install --omit=dev` 打包 → scp → NAS compose up（因 NAS 出网受限无法远端构建） |
| 方案 | GitHub Actions `service-deploy.yml`：CI 构建 dist + 生产依赖树 tar → artifact → `ssh yyc3-45` 触发拉取/解包/重建（NAS 侧配置 deploy key 或 Tailscale 内 SSH） |
| 收益 | music-api 迭代零手工；变更可追溯；回滚 = 重发旧 tag |
| 工作量 | 1 天（含 NAS 侧 SSH 密钥与安全边界设计） |

### P2-1 · 生产基址注入（Pages 线上曲库）

| 项 | 内容 |
| ---- | ---- |
| 现状 | Pages 生产构建未设 `VITE_AFH_MUSIC_API_BASE` → 线上走内置曲库；NAS API 仅 dev/Electron 生效 |
| 方案 | Pages 部署 workflow 注入 `http://100.65.172.88:3030`（Tailscale 出口）或引导用户运行时 localStorage 配置；需同步评估公网暴露面（建议只走 Tailscale，不开公网 3030） |
| 工作量 | 0.5 天 |

### P2-2 · LFS 带宽治理

| 项 | 内容 |
| ---- | ---- |
| 现状 | public/ 音视频 124MB 走 Git LFS；每次 CI 构建 job 拉全量 LFS，免费配额 1GB/月，高频推送会触限 |
| 方案 | ① P1-2 音频直出后从 LFS 移除 mp3/mp4（仓库瘦身到 <10MB，一劳永逸）；② 或 GH LFS 付费包；③ 或媒体外置对象存储（rustfs 已在 NAS 跑 9000 端口） |
| 工作量 | 0.5 天（方案①） |

### P2-3 · crypto-vault SALT 品牌化（带迁移）

| 项 | 内容 |
| ---- | ---- |
| 现状 | PBKDF2 SALT 字符串含母项目历史品牌词（`YYC3-CloudIntelli-Matrix-vault-salt-2026`），CI 守卫已豁免该文件 |
| 方案 | salt 改品牌值 + 存量密文迁移（旧 salt 解密 → 新 salt 重加密的一次性 migration），或接受用户重新保存配置 |
| 工作量 | 0.5 天 |

### P1-4 · 治理总仓（YYC3-AI-Family-Agent）权威源统一

> 2026-11-20 基于 session_2c75f186 / session_516cca80 两会话衔接分析立项。

| 项 | 内容 |
| ---- | ---- |
| 定位 | 该仓是 AI Family 体系的**上级治理总仓**（OPS 运维总纲 · 三轨许可证族 · 全端台账 · 企业管理蓝图），与本应用仓是上位/姊妹关系，非文档子集 |
| 现状 | **本机四副本三 HEAD**：① 主库 `docs/YYC3-AI-Family-Agent`（e8a93c8 最新"文档归仓"，无 remote，196MB 实体被误入索引后已移除）② `personal/YYC3-AI-FAmily-Agent`（2b6930a，remote→`YYC-Cube/YYC3-AI-Family-Agents`）③ `YANYUCLOUDCUBE/YYC3-AI-Family-Agent`（e8a93c8，无 remote）④ `personal/YYC3-Family-AI-Agents`（41501e1，remote→`YYC-Cube/YYC3-Family-AI-Agents` 复数仓）——**GitHub 远端也双轨** |
| 方案 | ① 裁定唯一权威工作副本（建议 `personal/YYC3-AI-FAmily-Agent`，remote 已通）并把最新提交 e8a93c8 推上远端；② GitHub 双轨裁定（`YYC3-Family-AI-Agents` 复数仓归档/重定向）；③ 主库 `docs/` 下 196MB 实体移除，替换为 `GOVERNANCE-POINTER.md` 指针文档（沿用该仓 OPS.md 自身的"权威源指针"纪律）；④ 确需版本化引用时再 `git submodule add` pin commit |
| 工作量 | 0.5 天（①②③）/ submodule 版另加 0.5 天 |

### P1-2 追注 · music-api 鉴权边界（2026-11-20 审计联动）

Mimosa 审计（scan-…-adcb18cbdeb6）将 `DELETE /api/music/favorites|songs` 判为"敏感操作无角色/权限约束"（MEDIUM·candidate）。这是**已知设计边界**而非漏洞：家用单用户威胁模型下 3030 仅 LAN/Tailscale 可达；P1-2 多用户项落地时必须同步引入鉴权（最简单：`X-Family-Key` 头比对 env 密钥），若未来开公网则升格为 P0。

### P3 · 运维清理（随手项）

- NAS 主库 `yyc3_music_test`（7.6MB）为早期手工验证残留，确认无引用后 `drop database`
- Dependabot 交叉合并曾两致 lockfile 失配：建议单个 PR 合并后即本地 `pnpm install --lockfile-only` 补提交
- `src/app/docs/*.ts` 交付档案随大版本归档（现仅 2 处有意保留的历史标注，健康）

## 三、已闭环项（本路线图前身，存档）

| 日期 | 闭环 | 提交 |
| ---- | ---- | ---- |
| 11-17 | 独立仓首推 / CI 四门禁 / Pages 过期守卫 / LFS checkout | f83d1ef..6fb5fda |
| 11-17~18 | yyc3-music-api 一期 + NAS 上线 + 前端接入 + CORS | c57503a..5235edd, c128a85, af37055, c9e3dac |
| 11-18 | AI 入口中心圆化 + 全域 UI 审计整改闭环（令牌双语义单源） | 69509dd, 42c067e |
| 11-18 | 导航重构（裁撤 3 页 / Family终端归置）五入口全量 | 648b6a0 |
| 11-20 | flaky 用例根修 / docs 档案同步 / 品牌残留清零 + 守卫收紧 / 解钉 | 9d9670f, 本批 |

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-20 | 初版：全域差距分析立项（P1×3 / P2×3 / P3×1）+ 已闭环存档 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.vip">matrix.yyc3.vip</a></sub>
</p>
