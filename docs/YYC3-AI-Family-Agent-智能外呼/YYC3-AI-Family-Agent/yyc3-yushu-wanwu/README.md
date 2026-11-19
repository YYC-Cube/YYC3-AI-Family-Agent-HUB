---
file: README.md
description: 语枢·万物 域角色说明 — 客户画像洞察、通话记录归因与知识检索
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [角色],[智能外呼],[思考者]
category: agent-role
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_


# 🤔 语枢·万物 · 思考者

| 项 | 值 |
|---|---|
| 目录 | `yyc3-yushu-wanwu` |
| 家族成员 | 语枢·万物 |
| 家族角色 | 思考者 |
| 模型档位 | 标准 + 检索增强 |
| 域职能 | 客户画像洞察、通话记录归因与知识检索 |
| 链路定位 | 数据到洞察的转换层，为编排与质检提供事实基础 |

## 一、上游输入

CRM 数据 + 通话转写 + 知识源

## 二、下游交付

④ 画像与归因 → ⑤⑥ 决策依据

## 三、红线

洞察必须可溯源到原始记录；不得臆造客户事实

## 四、三件套

| 件 | 文件 | 用途 |
|---|---|---|
| 人格接口 | [Prompt.md](./Prompt.md) | 可直接加载的 system prompt |
| 域技能表 | [SKILL.md](./SKILL.md) | 6 大类 × 18 项域内场景技能 |
| 角色说明 | 本文件 | 定位、上下游、红线 |

## 五、运行时映射

| 项 | 位置 |
|---|---|
| 代码定义 | `YYC3-AI-Intelligent-Calling/lib/ai-family/definitions.ts` → `yushu-wanwu` |
| 权威人格 | `yyc3-family-ai-agents/agents/yushu-wanwu/`（IDENTITY/SYSTEM/SOUL） |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
