---
file: CHANGELOG.md
description: YYC3 AI Family HUB 版本更新日志 · 记录所有重要变更
author: YanYuCloudCube Team <admin@0379.email>
version: v1.1.0
created: 2026-11-17
updated: 2026-11-20
status: stable
tags: [changelog],[version],[release]
category: general
language: zh-CN
---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 更新日志 (CHANGELOG)

本文件记录 YYC3 AI Family HUB 项目的所有重要更改。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [1.1.0] - 2026-11-20

### Added

- 🎵 yyc3-music-api 服务端（services/yyc3-music-api）：Fastify + PostgreSQL 17 主备双库（NAS 主 / 本机热备只读降级），曲库 CRUD · 收藏 · 播放历史 · 心情场景推荐；NAS Docker 常驻（host 网络 3030），CORS 白名单 + X-Family 家族注入头
- 🎵 音乐空间前端接入真实曲库（27 曲 · 5 专辑 · 7 MV）：MusicApiClient / MusicLibrary（API 优先、离线回退内置曲库），播放上报与收藏双向同步
- 🎨 设计系统页新增「令牌库 Live」：theme.css 单一真源 computed 实时可视化（九类令牌分组）
- 🎨 主题定制页补全：编辑实时 setProperty 到 :root（原只存不应用）；新增品牌双语义编辑区
- 📐 设计令牌规范文档（docs/标规体系/YYC3-AI-FAmily-Agent-设计系统-令牌规范.md）
- 🗺️ ROADMAP 立项规划（docs/ROADMAP.md）：命名双轨统一 / 音乐二期 / NAS CD / LFS 治理 / 生产基址

### Changed

- 🧭 导航信息架构重构：裁撤 开发指南 / 重构分析 / 架构审计 三页；终端更名「Family终端」连同 设计系统 / 主题定制 归入 AI Family 类目；开发工具类目移除（Sidebar + BottomNav + TopBar + CommandPalette + useTerminal 五入口全量同步）
- 🧹 品牌双语义单源裁定（全域审计闭环）：辉光青 `--color-brand-glow` / 渐变紫 `--color-brand-purple` / 周末色 `--color-weekend` 收拢全站硬编码；时钟盘 31 处、渐变 17 处清零
- 🧹 母项目品牌残留清零：404 文案 / Mock 助手自述 / 文档与报告生成器 / ErrorBoundary / 配置导出源 / 注释（11 处）；CI 品牌守卫 pattern 补空格变体（`CloudPivot Matrix`）
- 🖼️ 表盘中心圆升级：AI 浮窗纯 logo 映射入圆（点击/键盘唤起 AI 助手），品牌行合并「YYC³ AI Family」下移，Orbitron 字族 + 64.png 防糊
- ⬆️ 依赖：Dependabot 批量合并（vite 8.1 / electron 45 / zod 4.6 等）；set-cookie-parser 供应链冷却期解钉

### Fixed

- 🐛 Pages 部署过期竞态：gate 守卫仅放行 main 最新 head（防旧 CI 后完成覆盖新版本）
- 🐛 CI 构建 LFS checkout：防 mp3/mp4 以指针文本入部署包
- 🐛 useBigModelSDK 流式用例：2.7~7.2s 真实定时器 vs 固定 5s 上限的必然超时 → 假时钟确定性推进
- 🐛 主题定制只存不应用；lockfile 两次与 package.json 失配（Dependabot 交叉合并）修复

### Security

- 🔐 Dependabot 17 项告警清零：undici 7.30.2 / follow-redirects 1.16.3 / qs 6.17.1 / basic-ftp 6.2.6 / fast-uri 3.1.9（作用域收敛，不跨大版本）/ minimatch 11.0.8 / vitest 4.1.12
- 🩹 `patches/ajv@8.20.0.patch`：ajv 的 URI `serialize()` / `resolve()` 失败降级为返回原值，消除外部畸形 `$id` 中断 schema 编译的边界（fast-uri 版本与安全修复不变）
- 📄 SECURITY.md 增「漏洞收敛实践」基线：作用域 override → 声明合规核对 → 最小补丁 → 四项回归 + 告警复验

---

## [1.0.0] - 2026-11-17

### Added

- 🎉 自 YYC3-CloudPivot-Matrix-Ops（v3.4.1 @ c8bb82e+）分离立项
- Family中枢（八魂归一时钟盘）立为首页 `/`；AI Family 导航类目及子菜单（Family中枢/首页/中心/模型/设置）置第一项
- 品牌重定义：言语云枢·AI Family 智枢 / YYC3 AI Family HUB（app-brand 单一真源 v3.0.0）

### Removed

- 设备矩阵体系完整移除：数据监控 / 性能监控 / 跟进管理 / 巡查模式 / 告警规则 页面、路由、导航与专属 hooks、测试
- `docs/` 文档台帐目录与 docs:check 门禁（不随分离）
- 历史死脚本条目（check:testid 等）与 precommit 引用

### Changed

- 本地部署服务默认端口 3118 → 3119（避免与母项目同机冲突）
- CI 品牌门禁反转：检「母项目品牌残留」（CloudPivot-Matrix / PivotMatrix）而非本项目名
- package.json / electron appId / PWA manifest / 页签 / README 全面对齐新品牌

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for Future</i><br>
  万象归元于云枢 | 深栈智启新纪元<br>
  <i>All things converge in cloud pivot; Deep stacks ignite a new era of intelligence</i><br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
