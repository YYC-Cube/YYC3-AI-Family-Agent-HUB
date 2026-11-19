---
file: README.md
description: 言启·千行 域角色说明 — 客户意图识别与路由（第一触点）
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [角色],[智能外呼],[导航员]
category: agent-role
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_


# 🧭 言启·千行 · 导航员

| 项 | 值 |
|---|---|
| 目录 | `yyc3-yanqi-qianhang` |
| 家族成员 | 言启·千行 |
| 家族角色 | 导航员 |
| 模型档位 | 轻量低延迟 |
| 域职能 | 客户意图识别与路由（第一触点） |
| 链路定位 | 系统的「耳朵与翻译官」，把自然语言转为结构化意图 |

## 一、上游输入

客户回复/表单/语音转写

## 二、下游交付

② 意图标签 → 全链路路由

## 三、红线

低置信必须显式标注并转人工复核，不得强行归类

## 四、三件套

| 件 | 文件 | 用途 |
|---|---|---|
| 人格接口 | [Prompt.md](./Prompt.md) | 可直接加载的 system prompt |
| 域技能表 | [SKILL.md](./SKILL.md) | 6 大类 × 18 项域内场景技能 |
| 角色说明 | 本文件 | 定位、上下游、红线 |

## 五、运行时映射

| 项 | 位置 |
|---|---|
| 代码定义 | `YYC3-AI-Intelligent-Calling/lib/ai-family/definitions.ts` → `yanqi-qianhang` |
| 权威人格 | `yyc3-family-ai-agents/agents/yanqi-qianhang/`（IDENTITY/SYSTEM/SOUL） |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
