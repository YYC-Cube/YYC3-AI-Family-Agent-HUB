---
file: YYC3-AI-FAmily-Agent-设计系统-令牌规范.md
title: YYC3-AI-FAmily-Agent 设计系统 — 令牌规范
description: YYC3 AI Family 设计令牌单一真源规范 — 品牌双语义裁定、全量令牌表、引用规则与审计闭环
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-18
updated: 2026-11-18
status: stable
tags: [standard, design-system, tokens, audit]
category: policy
language: zh-CN
audience: developers,designers
complexity: intermediate
project: yyc3-ai-family-agent
scope: design
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- — 人从众曌众从人
  亦师亦友亦伯乐 · 一言一语一协同
  拟人为本，AI为核，纯粹为心
  ============================================================
  Document: YYC3-AI-FAmily-Agent 设计系统 — 令牌规范
  Version : v1.0.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.vip
  ============================================================
-->

# YYC3-AI-FAmily-Agent 设计系统 — 令牌规范

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 一、单一真源与引用铁律

| 项 | 规定 |
| ---- | ---- |
| 真源文件 | `src/styles/theme.css`（`@theme inline` 桥接 Tailwind v4） |
| 实时取值 | `getCSSVar()` / `setCSSVar()`（`src/app/config/design-system.ts`） |
| 可视化 | 设计系统页 →「令牌库 Live」（`TokenLiveView.tsx`，computed 实时渲染） |
| 定制入口 | 主题定制页（编辑即 `setProperty` 生效并持久化） |

**五条铁律**：

1. 页面一律引用令牌（`var(--token)`），**禁止硬编码色值 / 字号 / 阴影 / 字距**
2. 品牌三语义（操作青 / 辉光青 / 渐变紫）各自单源，**禁止跨语义混用**
3. 字号不得低于 `--font-size-micro`（10px）
4. 阴影一律引用 `--shadow-glow-*` / `--shadow-drop-*` 档位
5. `--family-*` 八色仅用于成员主题语义，不得挪作装饰色

---

## 二、品牌双语义裁定（2026-11-18 全域审计闭环）

审计发现品牌青 / 紫各存在两个近似值混用（ΔB=43 的青双源、两套紫）。裁定**双语义各自单源**，视觉语境全部保留：

| 语义 | 令牌 | 值 | 用途 | 收拢的原硬编码 |
| ---- | ---- | ---- | ---- | ---- |
| 操作主色 | `--primary` | `#00d4ff` | 按钮 / 链接 / 激活态 | —（原有） |
| 辉光品牌色 | `--color-brand-glow` | `#00F0FF` | 时钟盘文字 / 辉光 / 描边 | AIFamilyPage 31 处 |
| 辉光 RGB 三元组 | `--glow-rgb` | `0, 240, 255` | `rgba(var(--glow-rgb), α)` 组装 | 同上 |
| 渐变紫 | `--color-brand-purple` | `#7b2ff7` | 品牌渐变终点（浮窗 / 顶栏 / 登录） | 5 文件 17 处 |
| 周末语义色 | `--color-weekend` | `#ff006e` | 时钟盘日期周末着色 | AIFamilyPage 3 处 |
| 周末 RGB 三元组 | `--weekend-rgb` | `255, 0, 110` | 周末辉光 textShadow | 同上 |
| 品牌字距 | `--tracking-brand` | `1px` | 品牌行 | inline 1px |
| 时间字距 | `--tracking-time` | `2px` | 时钟时间 | inline 2px |

> **不合并说明**：`--color-brand-purple #7b2ff7` 与 `--family-creator #BF00FF` 语义不同（渐变语境 vs 成员主题色），强行归一会破坏两个语境的现有视觉，故双语义并行、各自单源。

---

## 三、颜色令牌全表（color.*）

### 3.1 基础色

| 令牌 | 值 | 语义 |
| ---- | ---- | ---- |
| `--background` | `#060e1f` | 页面底色 |
| `--foreground` | `#e0f0ff` | 主文字 |
| `--card` / `--card-foreground` | `rgba(10,30,60,0.7)` / `#e0f0ff` | 卡片 |
| `--popover` / `--popover-foreground` | `rgba(10,30,60,0.85)` / `#e0f0ff` | 弹层 |
| `--muted` / `--muted-foreground` | `rgba(0,120,200,0.2)` / `#6bb8d9` | 弱化 |
| `--accent` / `--accent-foreground` | `rgba(0,200,255,0.1)` / `#00d4ff` | 强调 |
| `--border` | `rgba(0,180,255,0.2)` | 描边（页面 border 一律引用） |
| `--ring` | `rgba(0,212,255,0.5)` | 焦点环 |
| `--input` / `--input-background` | `transparent` / `rgba(0,40,80,0.5)` | 表单 |

### 3.2 状态色（语义组件专用）

| 令牌 | 值 |
| ---- | ---- |
| `--success` | `#00ff88` |
| `--warning` | `#ffaa00` |
| `--error` / `--destructive` | `#ff3366` |

### 3.3 家族成员色（仅成员语义）

`--family-navigator #FFD700` · `--family-thinker #FF69B4` · `--family-prophet #00BFFF` · `--family-bolero #FFD700` · `--family-sentinel #00FF88` · `--family-master #FFD700` · `--family-oracle #00BFFF` · `--family-creator #BF00FF`

### 3.4 图表色

`--chart-1 #00d4ff` · `--chart-2 #00ff88` · `--chart-3 #ff6600` · `--chart-4 #aa55ff` · `--chart-5 #ffdd00`

---

## 四、字体令牌（typography.*）

| 类 | 令牌 | 值 |
| ---- | ---- | ---- |
| 字族 | `--font-family-display` | `'Orbitron', sans-serif`（品牌展示**必须**走此族） |
| | `--font-family-body` | `'Rajdhani', sans-serif`（正文默认） |
| | `--font-family-mono` | `'JetBrains Mono', monospace`（时间 / 代码） |
| 字阶 | `--font-size-micro` → `--font-size-hero` | 0.625 / 0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 2 / 3 rem（**下限 10px**） |
| 字重 | `--font-weight-normal/medium/semibold/bold` | 400 / 500 / 600 / 700 |
| 字距 | `--tracking-brand` / `--tracking-time` | 1px / 2px |

---

## 五、圆角 / 间距 / 阴影 / 动效 / 层级

| 类 | 令牌与档位 |
| ---- | ---- |
| 圆角 | `--radius-sm 4px` · `md 8px` · `lg 12px` · `xl 16px` · `2xl 24px` · `full 9999px`（基准 `--radius 0.75rem`） |
| 间距 | `--spacing-4xs 2px` · `3xs 4px` · `2xs 6px` · `xs 8px` · `sm 12px` · `md 16px` · `lg 24px` · `xl 32px` · `2xl 48px` |
| 阴影 | `--shadow-glow-sm/md/lg/xl`（15/30/40/60px 辉光）· `--shadow-glow-primary/success/danger`（语义辉光）· `--shadow-drop-sm/lg`（投影） |
| 动效 | `--animation-micro 100ms` · `fast 200ms` · `normal 300ms` · `smooth 500ms` · `slow 800ms`（均 ease 系） |
| 层级 | `--z-base 0` → `dropdown 10` → `sticky 20` → `fixed 30` → `modal 40` → `popover 50` → `tooltip 60` → `toast 70` → `max 9999` |

---

## 六、导航信息架构（2026-11-18 重构裁定）

| 动作 | 条目 | 去向 |
| ---- | ---- | ---- |
| ✂️ 裁撤 | 开发指南 `/dev-guide` | 页面 / 路由 / 测试 / i18n 全链路移除 |
| ✂️ 裁撤 | 重构分析 `/refactoring` | 同上 |
| ✂️ 裁撤 | 架构审计 `/architecture` | 同上 |
| 📦 归置 | 终端 → **Family终端** | AI Family 类目（路径 `/terminal` 不变） |
| 📦 归置 | 设计系统 / 主题定制 | AI Family 类目 |
| 🗑️ 移除 | 「开发工具」类目 | children 归置后整体删除（`nav.catDev` 弃用） |

---

## 七、审计整改闭环记录

| # | 等级 | 问题 | 处置 | 状态 |
| ---- | ---- | ---- | ---- | ---- |
| C1/C2 | 🔴 | 品牌青双源（31 处 `#00F0FF` 硬编码） | `--color-brand-glow` 收拢，页面全量引用 | ✅ |
| C3 | 🔴 | 品牌紫双源（17 处 `#7b2ff7`） | `--color-brand-purple` 收拢 | ✅ |
| C5 | 🟡 | 周末色 `#FF006E` ≠ `--error` | `--color-weekend` 语义单源 | ✅ |
| F1 | 🟠 | 品牌行误用 body 字族 | 改 `--font-family-display`（Orbitron） | ✅ |
| F2/F3 | 🟠 | 字号 8.38/6.7px 低于字阶下限 | `Math.max(0.625, ·)` 保 10px | ✅ |
| F7 | 🟠 | 字距无令牌 | `--tracking-brand/time` | ✅ |
| B1 | 🟠 | 中心圆描边偏离 `--border` | 辉光语境令牌化 `rgba(var(--glow-rgb), .3)` | ✅ |
| S1-S4 | 🟠 | 阴影 inline 硬编码 | `--shadow-glow-md/lg` 引用（pulse-glow 动画同步） | ✅ |
| I1 | 🟠 | 中心圆 logo 取 32.png 位图 | size 64（取 64.png 源） | ✅ |
| ST3 | 🟡 | 浮窗按钮缺 focus-visible | 补 `focus-visible:ring-2` | ✅ |
| SP3 | 🟡 | 中心圆→时间块 6px 脱网格 | 归 `+4px` | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-18 | 初版发布 · 品牌双语义裁定 · 全量令牌表 · 导航信息架构裁定 · 审计整改闭环记录 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.vip">matrix.yyc3.vip</a></sub>
</p>
