---
file: 006-AI-FAmily-Skills与插件分类.md
title: Skills 与插件分类规范 — 自研 · 调用 · 混合
description: 定义 Skills 与插件的自研、调用、混合三类边界、判定矩阵、注册字段、生命周期与治理要求
author: YYC3 Team <admin@0379.email>
version: v0.1.0
created: 2026-11-09
updated: 2026-11-09
status: reserved
tags: [yyc3, skill, plugin, taxonomy, reserved]
category: technical
language: zh-CN
audience: developers,managers
complexity: advanced
project: yyc3-ai-family-agent
scope: engineering
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- — 人从众曌众从人
  亦师亦友亦伯乐 · 一言一语一协同
  拟人为本，AI为核，纯粹为心
  ============================================================
  Document: Skills 与插件分类规范 — 自研 · 调用 · 混合
  Version : v0.1.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.top
  ============================================================
-->

# Skills 与插件分类规范 — 自研 · 调用 · 混合

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 文档状态

| 项 | 值 |
| ---- | ---- |
| 状态 | reserved（骨架已建，细则待补全） |
| 所属域 | `04-AI-FAmily-技能层/` |
| 上游入口 | [YYC3-AI-FAmily-Agent-模型架构-总控清单.md](../YYC3-AI-FAmily-Agent-模型架构-总控清单.md) |
| 架构规划 | [文档架构与命名规划](../00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md) |

## 一、目的

统一 Skills 与插件的分类口径，避免把“自研能力、外部调用、混合封装”混为一谈，导致权限、版本、成本、安全和回退责任不清。

## 二、分类定义

| 类型 | 定义 | 代码/数据归属 | 维护责任 | 典型例子 |
| ---- | ---- | ---- | ---- | ---- |
| 自研 Skill | 由 YYC3 编写和维护的提示词、流程、知识与脚本 | 内部 | YYC3 | 评测 rubric、评审流程、台账模板 |
| 调用 Skill | 对第三方 API、模型或工具的最小封装 | 外部 | 外部供应商 + 适配层维护者 | 搜索、翻译、外部评测服务 |
| 混合 Skill | 内部逻辑 + 外部调用，内部负责编排、校验与回退 | 混合 | YYC3 为主，供应商为辅 | 外部模型 + 内部 rubric、MCP 工具 + 内部权限 |
| 自研插件 | 完全内部的运行时插件 | 内部 | YYC3 | 本地评测运行器、台账写入器 |
| 外部插件 | 第三方 MCP Server、连接器或扩展 | 外部 | 供应商 | 第三方数据库/搜索连接器 |
| 混合插件 | 内部封装外部服务，附加权限、审计与降级 | 混合 | YYC3 为主 | 外部工具网关、内部策略代理 |

## 三、判定矩阵

| 判定项 | 自研 | 调用 | 混合 |
| ---- | ---- | ---- | ---- |
| 是否需要内部数据 | 可用 | 禁止或脱敏 | 明确数据边界 |
| 是否允许外部网络 | 不需要 | 需要 | 需要，须白名单 |
| 版本控制 | 内部版本 | 供应商版本 + 适配层版本 | 双版本矩阵 |
| 安全评审 | 常规 | 供应商尽调 + 数据协议 | 供应商尽调 + 内部权限/审计 |
| 失败回退 | 内部重试 | 降级/替代 | 内部回退 + 外部降级 |
| 成本归属 | 内部算力 | 外部计费 | 内部预算 + 外部计费 |
| 日志与审计 | 内部台账 | 供应商日志 + 调用记录 | 全链路台账 + 脱敏 |
| 退出方案 | 版本回滚 | 替换供应商 | 内部降级 + 外部替代 |

## 四、注册表字段

| 字段 | 必填 | 说明 |
| ---- | ---- | ---- |
| `id` | 是 | 全局唯一标识，建议 `skill-` / `plugin-` 前缀 |
| `name` | 是 | 人类可读名称 |
| `type` | 是 | `skill` / `plugin` |
| `origin` | 是 | `self` / `external` / `hybrid` |
| `version` | 是 | 语义版本，外部依赖另记供应商版本 |
| `owner` | 是 | 内部责任人；外部类型注明供应商 |
| `description` | 是 | 做什么 + 何时使用 |
| `input_schema` | 是 | 输入 JSON Schema |
| `output_schema` | 是 | 输出 JSON Schema |
| `dependencies` | 否 | 模型、工具、数据、运行时依赖 |
| `permissions` | 是 | 文件、网络、写操作、跨 Agent 权限 |
| `data_classification` | 是 | 公开/内部/机密/受限 |
| `failure_modes` | 是 | 错误分类、重试上限、回退路径 |
| `eval_suite` | 是 | 对应评测用例与黄金集 ID |
| `status` | 是 | draft/active/deprecated/retired |
| `deprecation_policy` | 是 | 弃用通知、替代方案、保留期 |

## 五、与 MCP / A2A / Workflow 的关系

| 机制 | 解决的问题 | 与 Skill/插件的关系 |
| ---- | ---- | ---- |
| MCP | Agent 如何连接工具/数据源 | 适合“调用/混合”类插件；外部插件优先走 MCP |
| A2A | Agent 之间如何发现、委派与协作 | 适合跨 Agent 任务；委派方对最终证据等级负责 |
| Workflow | 如何确定性执行 SOP | 适合把稳定流程从自由 Agent 中剥离；脚本即资产 |
| Skill | 如何复用能力 | 适合渐进披露与按需加载；不承担工具连接职责 |

## 六、分类决策流程

1. 是否完全由 YYC3 编写与维护？是 → 自研；否 → 进入 2。
2. 是否只是对第三方能力的最小封装、无内部业务逻辑？是 → 调用；否 → 混合。
3. 是否需要访问内部数据或写操作？是 → 必须走混合并增加权限、审计、回退。
4. 是否可以由 Workflow 确定性编排？是 → 优先 Workflow，不包装成自由 Skill。
5. 是否需要跨 Agent 委派？是 → 设计 A2A 边界与证据责任，不直接共享内部记忆。

## 七、治理要求

- 外部与混合类型必须完成供应商尽调、数据协议、退出方案与安全评审。
- 写操作、删除操作、跨 Agent 委派必须人工确认。
- 所有类型必须有版本、owner、失败模式与评测套件；缺失任一项不得进入 active。
- 程序记忆与技能描述不得自动写入；须经评审闸门。
- 每月复核一次外部依赖的版本、价格、限额与停服风险。

## 八、待补全内容

- 各分类的模板与示例。
- 插件清单与权限矩阵。
- 供应商尽调清单。
- 弃用与替换演练方案。

## 九、关联文档

- [YYC3-AI-FAmily-Agent-模型架构-总控清单.md](../YYC3-AI-FAmily-Agent-模型架构-总控清单.md)
- [技能注册表](001-AI-FAmily-技能注册表.md)
- [技能发现](002-AI-FAmily-技能发现.md)
- [工具调用契约](003-AI-FAmily-工具调用契约.md)
- [插件注册规范](007-AI-FAmily-插件注册规范.md)
- [Skills 与插件生命周期](008-AI-FAmily-Skills与插件生命周期.md)
- [文档架构与命名规划](../00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md)

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v0.1.0 | 2026-11-09 | 建立 Skills/插件分类骨架，定义自研、调用、混合三类边界与判定矩阵 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
