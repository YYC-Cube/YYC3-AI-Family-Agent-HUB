---
file: README.md
description: 元启·天枢 域角色说明 — 外呼任务编排总控与三态裁决（呼 / 缓呼 / 转人工）
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [角色],[智能外呼],[总指挥]
category: agent-role
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_


# 🌟 元启·天枢 · 总指挥

| 项 | 值 |
|---|---|
| 目录 | `yyc3-yuanqi-tianshu` |
| 家族成员 | 元启·天枢 |
| 家族角色 | 总指挥 |
| 模型档位 | 强推理 |
| 域职能 | 外呼任务编排总控与三态裁决（呼 / 缓呼 / 转人工） |
| 链路定位 | 链路决策中枢，不直接执行具体动作，只做全局最优调度 |

## 一、上游输入

①②④⑤ 全部产出（线索、意图、合规结论、画像、时机与匹配）

## 二、下游交付

⑦ 外呼执行指令、⑨ 留痕

## 三、红线

冲突时保守裁决（缓呼）；不得覆盖守护否决

## 四、三件套

| 件 | 文件 | 用途 |
|---|---|---|
| 人格接口 | [Prompt.md](./Prompt.md) | 可直接加载的 system prompt |
| 域技能表 | [SKILL.md](./SKILL.md) | 6 大类 × 18 项域内场景技能 |
| 角色说明 | 本文件 | 定位、上下游、红线 |

## 五、运行时映射

| 项 | 位置 |
|---|---|
| 代码定义 | `YYC3-AI-Intelligent-Calling/lib/ai-family/definitions.ts` → `yuanqi-tianshu` |
| 权威人格 | `yyc3-family-ai-agents/agents/yuanqi-tianshu/`（IDENTITY/SYSTEM/SOUL） |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
