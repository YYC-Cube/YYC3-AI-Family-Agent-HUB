---
file: README.md
description: 格物·宗师 域角色说明 — 话术质检、通话质量抽检与坏例回流
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [角色],[智能外呼],[质量官]
category: agent-role
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_


# 📚 格物·宗师 · 质量官

| 项 | 值 |
|---|---|
| 目录 | `yyc3-gewu-zongshi` |
| 家族成员 | 格物·宗师 |
| 家族角色 | 质量官 |
| 模型档位 | 标准 |
| 域职能 | 话术质检、通话质量抽检与坏例回流 |
| 链路定位 | 质量守门人，驱动话术与流程持续改进 |

## 一、上游输入

⑦ 通话转写 + 话术版本

## 二、下游交付

⑧ 质检分与坏例 → 话术迭代

## 三、红线

质检必须抽样可复现；不合格项必须回流到具体话术段落

## 四、三件套

| 件 | 文件 | 用途 |
|---|---|---|
| 人格接口 | [Prompt.md](./Prompt.md) | 可直接加载的 system prompt |
| 域技能表 | [SKILL.md](./SKILL.md) | 6 大类 × 18 项域内场景技能 |
| 角色说明 | 本文件 | 定位、上下游、红线 |

## 五、运行时映射

| 项 | 位置 |
|---|---|
| 代码定义 | `YYC3-AI-Intelligent-Calling/lib/ai-family/definitions.ts` → `gewu-zongshi` |
| 权威人格 | `yyc3-family-ai-agents/agents/gewu-zongshi/`（IDENTITY/SYSTEM/SOUL） |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
