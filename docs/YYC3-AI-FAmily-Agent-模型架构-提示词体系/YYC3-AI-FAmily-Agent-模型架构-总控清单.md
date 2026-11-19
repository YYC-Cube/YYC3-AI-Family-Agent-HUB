---
file: YYC3-AI-FAmily-Agent-模型架构-总控清单.md
title: YYC3 AI-FAmily-Agent 模型架构 — 总控清单
description: YYC3 AI-FAmily-Agent 模型架构与提示词体系的总控清单 — 1+8+3 架构、文档状态、命名规则与建设顺序
author: YYC3 Team <admin@0379.email>
version: v2.3.0
created: 2026-11-09
updated: 2026-11-09
status: stable
tags: [yyc3, manifest, index, agent, prompt]
category: technical
language: zh-CN
audience: developers,managers
complexity: advanced
project: yyc3-ai-family-agent
scope: document-architecture
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- — 人从众曌众从人
  亦师亦友亦伯乐 · 一言一语一协同
  拟人为本，AI为核，纯粹为心
  ============================================================
  Document: YYC3 AI-FAmily-Agent 模型架构 — 总控清单
  Version : v2.1.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.top
  ============================================================
-->

# YYC3 AI-FAmily-Agent 模型架构 — 总控清单

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 一、总控职责

本文件是 YYC3 AI-FAmily-Agent 模型架构与提示词体系的唯一入口，负责：

- 定义 1+8+3 架构与目录边界；
- 记录每份文档的路径、版本、状态与依赖；
- 规定命名、标头标尾、补全顺序与验收标准；
- 作为新增、重命名、弃用与迁移的登记处。

## 二、总体架构

| 层级 | 内容 | 作用 |
| ---- | ---- | ---- |
| 1 | `YYC3-AI-FAmily-Agent-模型架构-总控清单.md` | 唯一入口与状态总表 |
| 8 | `01-AI-FAmily-契约层` ~ `08-AI-FAmily-治理层` | 契约、持久化、认知、技能、审计、迭代、沟通、治理 |
| 3 | `09-AI-FAmily-评测层`、`10-AI-FAmily-运行时层`、`11-AI-FAmily-资产层` | 评测资产、运行时接口、模板与红队资产 |

## 三、文档状态总表

> 当前阶段为「框架搭建」：除 `YYC3-AI-FAmily-Agent-模型架构-总控清单.md` 外，其余文档为 `reserved` 占位或已归入的标规文档；正文按建设顺序补全。

### `00-AI-FAmily-架构规划/` — 架构规划

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [YYC3-AI-FAmily-Agent-专属设计-文化链路.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-专属设计-文化链路.md) | YYC3-AI-FAmily-Agent-专属设计-文化链路 | v1.0.0 | stable |
| [YYC3-AI-FAmily-Agent-徽章设计-文化总铭.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-徽章设计-文化总铭.md) | YYC3-AI-FAmily-Agent-徽章设计-文化总铭 | v1.0.0 | stable |
| [YYC3-AI-FAmily-Agent-文档架构-命名规范.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-文档架构-命名规范.md) | YYC3-AI-FAmily-Agent 文档架构 — 命名规范 | v1.0.0 | stable |
| [YYC3-AI-FAmily-Agent-文档架构-标头标尾.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-文档架构-标头标尾.md) | YYC3-AI-FAmily-Agent 文档架构 — 标头标尾规范 | v1.0.0 | stable |
| [YYC3-AI-FAmily-Agent-模型架构-分析对比与建设指导.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-分析对比与建设指导.md) | YYC3 模型架构与 Agent 提示词体系 — 行业对比、审核分析与建设指导 | v1.3.0 | stable |
| [YYC3-AI-FAmily-Agent-模型架构-教科书级提示词大纲.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-教科书级提示词大纲.md) | YYC3 大模型训练架构师、Agent研发指导兼评测师 · 教科书级提示词大纲 | v1.3.0 | stable |
| [YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md) | YYC3 模型架构与 Agent 提示词体系 — 文档架构与命名规划 | v1.2.0 | stable |

### `01-AI-FAmily-契约层/` — 契约层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-系统级提示词.md](01-AI-FAmily-契约层/001-AI-FAmily-系统级提示词.md) | 系统级提示词：YYC3 大模型训练架构师、Agent研发指导兼专职评测师 | v1.2.0 | stable |
| [002-AI-FAmily-角色身份与能力边界.md](01-AI-FAmily-契约层/002-AI-FAmily-角色身份与能力边界.md) | 角色身份与能力边界 | v0.1.0 | reserved |
| [003-AI-FAmily-指令优先级栈.md](01-AI-FAmily-契约层/003-AI-FAmily-指令优先级栈.md) | 指令优先级栈 | v0.1.0 | reserved |
| [004-AI-FAmily-结论等级与判定权.md](01-AI-FAmily-契约层/004-AI-FAmily-结论等级与判定权.md) | 结论等级与判定权 | v0.1.0 | reserved |
| [005-AI-FAmily-回退协议.md](01-AI-FAmily-契约层/005-AI-FAmily-回退协议.md) | 回退协议 | v0.1.0 | reserved |
| [006-AI-FAmily-反模式清单.md](01-AI-FAmily-契约层/006-AI-FAmily-反模式清单.md) | 反模式清单 | v0.1.0 | reserved |

### `02-AI-FAmily-持久化层/` — 持久化层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-会话生命周期.md](02-AI-FAmily-持久化层/001-AI-FAmily-会话生命周期.md) | 会话生命周期 | v0.1.0 | reserved |
| [002-AI-FAmily-总结文档规范.md](02-AI-FAmily-持久化层/002-AI-FAmily-总结文档规范.md) | 总结文档规范 | v0.1.0 | reserved |
| [003-AI-FAmily-记忆分层.md](02-AI-FAmily-持久化层/003-AI-FAmily-记忆分层.md) | 记忆分层 | v0.1.0 | reserved |
| [004-AI-FAmily-上下文预算策略.md](02-AI-FAmily-持久化层/004-AI-FAmily-上下文预算策略.md) | 上下文预算策略 | v0.1.0 | reserved |
| [005-AI-FAmily-跨会话召回.md](02-AI-FAmily-持久化层/005-AI-FAmily-跨会话召回.md) | 跨会话召回 | v0.1.0 | reserved |

### `03-AI-FAmily-认知层/` — 认知层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-主动思维循环.md](03-AI-FAmily-认知层/001-AI-FAmily-主动思维循环.md) | 主动思维循环 | v0.1.0 | reserved |
| [002-AI-FAmily-计划执行协议.md](03-AI-FAmily-认知层/002-AI-FAmily-计划执行协议.md) | 计划-执行协议 | v0.1.0 | reserved |
| [003-AI-FAmily-自评Rubric.md](03-AI-FAmily-认知层/003-AI-FAmily-自评Rubric.md) | 自评 rubric | v0.1.0 | reserved |
| [004-AI-FAmily-反思与归因.md](03-AI-FAmily-认知层/004-AI-FAmily-反思与归因.md) | 反思与归因 | v0.1.0 | reserved |
| [005-AI-FAmily-元认知守卫.md](03-AI-FAmily-认知层/005-AI-FAmily-元认知守卫.md) | 元认知守卫 | v0.1.0 | reserved |

### `04-AI-FAmily-技能层/` — 技能层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-技能注册表.md](04-AI-FAmily-技能层/001-AI-FAmily-技能注册表.md) | 技能注册表 | v0.1.0 | reserved |
| [002-AI-FAmily-技能发现.md](04-AI-FAmily-技能层/002-AI-FAmily-技能发现.md) | 技能发现 | v0.1.0 | reserved |
| [003-AI-FAmily-工具调用契约.md](04-AI-FAmily-技能层/003-AI-FAmily-工具调用契约.md) | 工具调用契约 | v0.1.0 | reserved |
| [004-AI-FAmily-工具失败处理.md](04-AI-FAmily-技能层/004-AI-FAmily-工具失败处理.md) | 工具失败处理 | v0.1.0 | reserved |
| [005-AI-FAmily-技能编写规范.md](04-AI-FAmily-技能层/005-AI-FAmily-技能编写规范.md) | 技能编写规范 | v0.1.0 | reserved |
| [006-AI-FAmily-Skills与插件分类.md](04-AI-FAmily-技能层/006-AI-FAmily-Skills与插件分类.md) | Skills 与插件分类规范 — 自研 · 调用 · 混合 | v0.1.0 | reserved |
| [007-AI-FAmily-插件注册规范.md](04-AI-FAmily-技能层/007-AI-FAmily-插件注册规范.md) | 插件注册规范 — Manifest · 权限 · 版本兼容 | v0.1.0 | reserved |
| [008-AI-FAmily-Skills与插件生命周期.md](04-AI-FAmily-技能层/008-AI-FAmily-Skills与插件生命周期.md) | Skills 与插件生命周期 — 提案 · 评审 · 注册 · 弃用 | v0.1.0 | reserved |

### `05-AI-FAmily-审计层/` — 审计层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-日志Schema.md](05-AI-FAmily-审计层/001-AI-FAmily-日志Schema.md) | 日志 Schema | v0.1.0 | reserved |
| [002-AI-FAmily-决策台账.md](05-AI-FAmily-审计层/002-AI-FAmily-决策台账.md) | 决策台账 | v0.1.0 | reserved |
| [003-AI-FAmily-训练落档.md](05-AI-FAmily-审计层/003-AI-FAmily-训练落档.md) | 训练落档 | v0.1.0 | reserved |
| [004-AI-FAmily-评测运行台账.md](05-AI-FAmily-审计层/004-AI-FAmily-评测运行台账.md) | 评测运行台账 | v0.1.0 | reserved |
| [005-AI-FAmily-保留与访问控制.md](05-AI-FAmily-审计层/005-AI-FAmily-保留与访问控制.md) | 保留与访问控制 | v0.1.0 | reserved |
| [YYC3-AI-FAmily-Agent-文档架构-文档闭环.md](05-AI-FAmily-审计层/YYC3-AI-FAmily-Agent-文档架构-文档闭环.md) | YYC3-AI-FAmily-Agent 文档架构 — 文档闭环标准 | v1.0.0 | stable |

### `06-AI-FAmily-迭代层/` — 迭代层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-版本命名.md](06-AI-FAmily-迭代层/001-AI-FAmily-版本命名.md) | 版本命名 | v0.1.0 | reserved |
| [002-AI-FAmily-退化协议.md](06-AI-FAmily-迭代层/002-AI-FAmily-退化协议.md) | 退化协议 | v0.1.0 | reserved |
| [003-AI-FAmily-对齐税闸门.md](06-AI-FAmily-迭代层/003-AI-FAmily-对齐税闸门.md) | 对齐税闸门 | v0.1.0 | reserved |
| [004-AI-FAmily-研创记录.md](06-AI-FAmily-迭代层/004-AI-FAmily-研创记录.md) | 研创记录 | v0.1.0 | reserved |
| [005-AI-FAmily-变更传播.md](06-AI-FAmily-迭代层/005-AI-FAmily-变更传播.md) | 变更传播 | v0.1.0 | reserved |

### `07-AI-FAmily-沟通层/` — 沟通层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-语气与角色.md](07-AI-FAmily-沟通层/001-AI-FAmily-语气与角色.md) | 语气与角色 | v0.1.0 | reserved |
| [002-AI-FAmily-输出契约.md](07-AI-FAmily-沟通层/002-AI-FAmily-输出契约.md) | 输出契约 | v0.1.0 | reserved |
| [003-AI-FAmily-不确定性语言.md](07-AI-FAmily-沟通层/003-AI-FAmily-不确定性语言.md) | 不确定性语言 | v0.1.0 | reserved |
| [004-AI-FAmily-受众适配.md](07-AI-FAmily-沟通层/004-AI-FAmily-受众适配.md) | 受众适配 | v0.1.0 | reserved |

### `08-AI-FAmily-治理层/` — 治理层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-合规映射.md](08-AI-FAmily-治理层/001-AI-FAmily-合规映射.md) | 合规映射 | v0.1.0 | reserved |
| [002-AI-FAmily-提示词安全.md](08-AI-FAmily-治理层/002-AI-FAmily-提示词安全.md) | 提示词安全 | v0.1.0 | reserved |
| [003-AI-FAmily-Agent治理.md](08-AI-FAmily-治理层/003-AI-FAmily-Agent治理.md) | Agent 治理 | v0.1.0 | reserved |
| [004-AI-FAmily-互操作治理.md](08-AI-FAmily-治理层/004-AI-FAmily-互操作治理.md) | 互操作治理 | v0.1.0 | reserved |
| [YYC3-AI-FAmily-Agent-文档架构-开发文档.md](08-AI-FAmily-治理层/YYC3-AI-FAmily-Agent-文档架构-开发文档.md) | YYC3-AI-FAmily-Agent 文档架构 — AI 协同开发文档 | v1.0.0 | stable |
| [YYC3-AI-FAmily-Agent-文档架构-开发标准.md](08-AI-FAmily-治理层/YYC3-AI-FAmily-Agent-文档架构-开发标准.md) | YYC3-AI-FAmily-Agent 文档架构 — 统一开发标准 | v1.0.0 | stable |

### `09-AI-FAmily-评测层/` — 评测层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-基准注册表.md](09-AI-FAmily-评测层/001-AI-FAmily-基准注册表.md) | 基准注册表 | v0.1.0 | reserved |
| [002-AI-FAmily-黄金集规范.md](09-AI-FAmily-评测层/002-AI-FAmily-黄金集规范.md) | 黄金集规范 | v0.1.0 | reserved |
| [003-AI-FAmily-评分Rubric.md](09-AI-FAmily-评测层/003-AI-FAmily-评分Rubric.md) | 评分 Rubric | v0.1.0 | reserved |
| [004-AI-FAmily-回归报告模板.md](09-AI-FAmily-评测层/004-AI-FAmily-回归报告模板.md) | 回归报告模板 | v0.1.0 | reserved |
| [005-AI-FAmily-Agent沙箱规范.md](09-AI-FAmily-评测层/005-AI-FAmily-Agent沙箱规范.md) | Agent 沙箱规范 | v0.1.0 | reserved |

### `10-AI-FAmily-运行时层/` — 运行时层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |
| [001-AI-FAmily-模型适配器.md](10-AI-FAmily-运行时层/001-AI-FAmily-模型适配器.md) | 模型适配器 | v0.1.0 | reserved |
| [002-AI-FAmily-MCP工具适配器.md](10-AI-FAmily-运行时层/002-AI-FAmily-MCP工具适配器.md) | MCP 工具适配器 | v0.1.0 | reserved |
| [003-AI-FAmily-记忆存储.md](10-AI-FAmily-运行时层/003-AI-FAmily-记忆存储.md) | 记忆存储 | v0.1.0 | reserved |
| [004-AI-FAmily-评测运行器.md](10-AI-FAmily-运行时层/004-AI-FAmily-评测运行器.md) | 评测运行器 | v0.1.0 | reserved |
| [005-AI-FAmily-台账写入器.md](10-AI-FAmily-运行时层/005-AI-FAmily-台账写入器.md) | 台账写入器 | v0.1.0 | reserved |
| [006-AI-FAmily-策略引擎.md](10-AI-FAmily-运行时层/006-AI-FAmily-策略引擎.md) | 策略引擎 | v0.1.0 | reserved |

### `11-AI-FAmily-资产层/` — 资产层

| 文档 | 标题 | 版本 | 状态 |
| ---- | ---- | ---- | ---- |


## 四、命名与标头规则

1. 目录：`{两位序号}-{英文域}`，序号与 manifest 一致。
2. 文件：`{两位序号}-{英文主题}.md`；新增文件追加序号，不覆盖旧号。
3. `file` 必须与磁盘文件名一致；`title` 必须与 H1 一致。
4. 全部文档使用统一 front matter、五段式品牌引用块与标准页脚。
5. 占位文档 `status: reserved`、`version: v0.1.0`；通过评审后升级为 `v1.0.0`。
6. 重命名或迁移时，必须同步更新本 manifest 与所有引用链接。

## 五、建设顺序

| 阶段 | 重点 | 交付物 | 退出标准 |
| ---- | ---- | ---- | ---- |
| Phase 0 | 框架与命名 | 目录、占位文档、manifest、架构规划 | 所有目录存在，标头标尾完整，链接可达 |
| Phase 1 | 契约与持久化 | `01-AI-FAmily-契约层`、`02-AI-FAmily-持久化层` | 身份、权限、回退、记忆 schema 可判定 |
| Phase 2 | 认知、技能、审计 | `03-AI-FAmily-认知层`、`04-AI-FAmily-技能层`、`05-AI-FAmily-审计层` | Skills/插件分类、失败矩阵、台账字段通过评审 |
| Phase 3 | 评测、运行时、治理 | `09-AI-FAmily-评测层`、`10-AI-FAmily-运行时层`、`08-AI-FAmily-治理层` | 黄金集、沙箱、发布门禁可运行 |
| Phase 4 | 通信、迭代、资产 | `06-AI-FAmily-迭代层`、`07-AI-FAmily-沟通层`、`11-AI-FAmily-资产层` | 版本传播、报告模板、红队用例完备 |

## 六、入口与关联文档

- [文档架构与命名规划](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md)
- [系统级提示词](01-AI-FAmily-契约层/001-AI-FAmily-系统级提示词.md)
- [教科书级提示词大纲](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-教科书级提示词大纲.md)
- [行业对比、审核分析与建设指导](00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-分析对比与建设指导.md)
- [目录索引 README](./README.md)

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-09 | 建立总控清单与 1+8+3 文档状态总表 | YYC3 Team |
| v1.1.0 | 2026-11-09 | 补齐 Skills/插件分类、注册、生命周期与 Agent 沙箱；登记 57 份文档 | YYC3 Team |
| v2.0.0 | 2026-11-09 | 按 YYC3-AI-FAmily 命名规范重构目录与文档；系统级提示词迁入契约层；登记 58 份体系文档 | YYC3 Team |
| v2.1.0 | 2026-11-09 | 迁入 7 份 AI-FAmily 标规文档（命名、标头标尾、文档闭环、开发标准、开发文档、文化链路、徽章设计），登记 63 份体系文档 | YYC3 Team |
| v2.2.0 | 2026-11-09 | 统一应用 AI-FAmily 专项标头标尾、文化链路与徽章标准；正文品牌统一为 YYC3；补充 project/scope 与文档注释头 | YYC3 Team |
| v2.3.0 | 2026-11-09 | 文化链路与徽章设计归入架构规划，消除 07/11 重复副本；同步 README 与状态表 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
