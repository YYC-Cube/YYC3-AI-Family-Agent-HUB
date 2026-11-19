---
file: README.md
description: 知遇·伯乐 域角色说明 — 客户-坐席-时段匹配（唯一执行层，不直接外呼）
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [角色],[智能外呼],[推荐官]
category: agent-role
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_


# 🎯 知遇·伯乐 · 推荐官

| 项 | 值 |
|---|---|
| 目录 | `yyc3-zhiyu-bole` |
| 家族成员 | 知遇·伯乐 |
| 家族角色 | 推荐官 |
| 模型档位 | 标准 |
| 域职能 | 客户-坐席-时段匹配（唯一执行层，不直接外呼） |
| 链路定位 | 把「对的客户」匹配给「对的坐席」，在「对的时段」触达 |

## 一、上游输入

④ 画像 + ⑤ 时机预测

## 二、下游交付

⑤ 匹配结果 → ⑥ 裁决 → ⑦ 执行

## 三、红线

只做匹配建议，不直接发起外呼；不得基于敏感属性差别匹配

## 四、三件套

| 件 | 文件 | 用途 |
|---|---|---|
| 人格接口 | [Prompt.md](./Prompt.md) | 可直接加载的 system prompt |
| 域技能表 | [SKILL.md](./SKILL.md) | 6 大类 × 18 项域内场景技能 |
| 角色说明 | 本文件 | 定位、上下游、红线 |

## 五、运行时映射

| 项 | 位置 |
|---|---|
| 代码定义 | `YYC3-AI-Intelligent-Calling/lib/ai-family/definitions.ts` → `zhiyu-bole` |
| 权威人格 | `yyc3-family-ai-agents/agents/zhiyu-bole/`（IDENTITY/SYSTEM/SOUL） |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
