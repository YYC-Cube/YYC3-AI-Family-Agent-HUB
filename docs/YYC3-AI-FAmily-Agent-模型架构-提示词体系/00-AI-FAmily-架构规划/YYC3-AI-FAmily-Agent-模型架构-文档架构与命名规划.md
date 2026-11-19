---
file: YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md
title: YYC3 模型架构与 Agent 提示词体系 — 文档架构与命名规划
description: YYC3 本地自用提示词体系 — 1+8+3 文档架构、命名规范、Skills/插件分类、行业实践提炼与建设顺序
author: YYC3 Team <admin@0379.email>
version: v1.2.0
created: 2026-11-09
updated: 2026-11-09
status: stable
tags: [yyc3, model, agent, prompt, architecture, naming]
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
  Document: YYC3 模型架构与 Agent 提示词体系 — 文档架构与命名规划
  Version : v1.2.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.top
  ============================================================
-->

# YYC3 模型架构与 Agent 提示词体系 — 文档架构与命名规划

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 摘要

本文档把 YYC3 本地自用提示词体系从「大纲」推进到「可建设的文档架构」：确定 1 个总控清单、8 个文件域、3 个横切目录，给出完整目录与命名规则，补齐 Skills/插件分类（自研、调用、混合），并把 7 篇行业资料中可复用的做法提炼进架构规划。

本轮先完成「框架搭建」：创建全部目录与占位文档，统一注入标头标尾；具体正文按建设顺序逐步补全。

## 一、建设目标与范围

- **目标**：让提示词体系具备可导航、可补全、可评测、可追溯、可治理的工程结构。
- **范围**：本地持久化 Agent 运行时的提示词、技能、插件、评测、台账与治理文件。
- **不在范围**：具体模型训练代码、业务应用代码、对外商业产品实现。
- **建设原则**：规格优先、唯一入口、渐进披露、证据分级、最小权限、可回退、可评测、安全默认、持续校准。

## 二、总体架构：1 + 8 + 3

| 层级 | 内容 | 作用 |
| ---- | ---- | ---- |
| 1 | `YYC3-AI-FAmily-Agent-模型架构-总控清单.md` | 唯一入口：文件职责、依赖、补全顺序、状态与验收标准 |
| 8 | `01-AI-FAmily-契约层` ~ `08-AI-FAmily-治理层` | 契约、持久化、认知、技能、审计、迭代、沟通、治理 |
| 3 | `09-AI-FAmily-评测层`、`10-AI-FAmily-运行时层`、`11-AI-FAmily-资产层` | 评测资产、运行时接口、模板与红队资产 |

## 三、完整目录与命名规划

```text
YYC3-AI-FAmily-Agent-模型架构-提示词体系/
├── README.md
├── YYC3-AI-FAmily-Agent-模型架构-总控清单.md
├── 00-AI-FAmily-架构规划/
│   ├── README.md
│   ├── YYC3-AI-FAmily-Agent-模型架构-分析对比与建设指导.md
│   ├── YYC3-AI-FAmily-Agent-模型架构-教科书级提示词大纲.md
│   └── YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md
├── 01-AI-FAmily-契约层/
│   ├── 001-AI-FAmily-系统级提示词.md
│   ├── 002-AI-FAmily-角色身份与能力边界.md
│   ├── 003-AI-FAmily-指令优先级栈.md
│   ├── 004-AI-FAmily-结论等级与判定权.md
│   ├── 005-AI-FAmily-回退协议.md
│   ├── 006-AI-FAmily-反模式清单.md
│   └── README.md
├── 02-AI-FAmily-持久化层/
│   ├── 001-AI-FAmily-会话生命周期.md
│   ├── 002-AI-FAmily-总结文档规范.md
│   ├── 003-AI-FAmily-记忆分层.md
│   ├── 004-AI-FAmily-上下文预算策略.md
│   ├── 005-AI-FAmily-跨会话召回.md
│   └── README.md
├── 03-AI-FAmily-认知层/
│   ├── 001-AI-FAmily-主动思维循环.md
│   ├── 002-AI-FAmily-计划执行协议.md
│   ├── 003-AI-FAmily-自评Rubric.md
│   ├── 004-AI-FAmily-反思与归因.md
│   ├── 005-AI-FAmily-元认知守卫.md
│   └── README.md
├── 04-AI-FAmily-技能层/
│   ├── 001-AI-FAmily-技能注册表.md
│   ├── 002-AI-FAmily-技能发现.md
│   ├── 003-AI-FAmily-工具调用契约.md
│   ├── 004-AI-FAmily-工具失败处理.md
│   ├── 005-AI-FAmily-技能编写规范.md
│   ├── 006-AI-FAmily-Skills与插件分类.md
│   ├── 007-AI-FAmily-插件注册规范.md
│   ├── 008-AI-FAmily-Skills与插件生命周期.md
│   └── README.md
├── 05-AI-FAmily-审计层/
│   ├── 001-AI-FAmily-日志Schema.md
│   ├── 002-AI-FAmily-决策台账.md
│   ├── 003-AI-FAmily-训练落档.md
│   ├── 004-AI-FAmily-评测运行台账.md
│   ├── 005-AI-FAmily-保留与访问控制.md
│   └── README.md
├── 06-AI-FAmily-迭代层/
│   ├── 001-AI-FAmily-版本命名.md
│   ├── 002-AI-FAmily-退化协议.md
│   ├── 003-AI-FAmily-对齐税闸门.md
│   ├── 004-AI-FAmily-研创记录.md
│   ├── 005-AI-FAmily-变更传播.md
│   └── README.md
├── 07-AI-FAmily-沟通层/
│   ├── 001-AI-FAmily-语气与角色.md
│   ├── 002-AI-FAmily-输出契约.md
│   ├── 003-AI-FAmily-不确定性语言.md
│   ├── 004-AI-FAmily-受众适配.md
│   └── README.md
├── 08-AI-FAmily-治理层/
│   ├── 001-AI-FAmily-合规映射.md
│   ├── 002-AI-FAmily-提示词安全.md
│   ├── 003-AI-FAmily-Agent治理.md
│   ├── 004-AI-FAmily-互操作治理.md
│   └── README.md
├── 09-AI-FAmily-评测层/
│   ├── 001-AI-FAmily-基准注册表.md
│   ├── 002-AI-FAmily-黄金集规范.md
│   ├── 003-AI-FAmily-评分Rubric.md
│   ├── 004-AI-FAmily-回归报告模板.md
│   ├── 005-AI-FAmily-Agent沙箱规范.md
│   └── README.md
├── 10-AI-FAmily-运行时层/
│   ├── 001-AI-FAmily-模型适配器.md
│   ├── 002-AI-FAmily-MCP工具适配器.md
│   ├── 003-AI-FAmily-记忆存储.md
│   ├── 004-AI-FAmily-评测运行器.md
│   ├── 005-AI-FAmily-台账写入器.md
│   ├── 006-AI-FAmily-策略引擎.md
│   └── README.md
└── 11-AI-FAmily-资产层/
    ├── README.md
    ├── 11-01-AI-FAmily-Schema/
    │   └── README.md
    ├── 11-02-AI-FAmily-模板/
    │   └── README.md
    ├── 11-03-AI-FAmily-示例/
    │   └── README.md
    └── 11-04-AI-FAmily-红队用例/
        └── README.md
```

### 3.1 命名规则

1. 目录：`{两位序号}-AI-FAmily-{中文域}`，如 `01-AI-FAmily-契约层`。
2. 文件：`{三位序号}-AI-FAmily-{中文主题}.md`，如 `001-AI-FAmily-系统级提示词.md`。
3. 根文档：`YYC3-AI-FAmily-Agent-模型架构-{中文主题}.md`。
4. 标题：中文标题写在 H1 与 front matter `title`，两者必须一致。
5. 路径：只使用 ASCII 目录名与中文语义文件名；同一目录内风格一致。
6. 版本：占位文档 `v0.1.0`，可评审文档 `v1.0.0`，破坏性调整升主版本。

## 四、Skills 与插件分类

### 4.1 分类定义

| 类型 | 定义 | 代码/数据归属 | 维护责任 | 典型例子 |
| ---- | ---- | ---- | ---- | ---- |
| 自研 Skill | 由 YYC3 编写和维护的提示词、流程、知识与脚本 | 内部 | YYC3 | 评测 rubric、评审流程、台账模板 |
| 调用 Skill | 对第三方 API、模型或工具的最小封装 | 外部 | 外部供应商 + 适配层维护者 | 搜索、翻译、外部评测服务 |
| 混合 Skill | 内部逻辑 + 外部调用，内部负责编排、校验与回退 | 混合 | YYC3 为主，供应商为辅 | 外部模型 + 内部 rubric、MCP 工具 + 内部权限 |
| 自研插件 | 完全内部的运行时插件 | 内部 | YYC3 | 本地评测运行器、台账写入器 |
| 外部插件 | 第三方 MCP Server、连接器或扩展 | 外部 | 供应商 | 第三方数据库/搜索连接器 |
| 混合插件 | 内部封装外部服务，附加权限、审计与降级 | 混合 | YYC3 为主 | 外部工具网关、内部策略代理 |

### 4.2 判定矩阵

| 判定项 | 自研 | 调用 | 混合 |
| ---- | ---- | ---- | ---- |
| 是否需要内部数据 | 可用 | 禁止或脱敏 | 明确数据边界 |
| 是否允许外部网络 | 不需要 | 需要 | 需要，须白名单 |
| 版本控制 | 内部版本 | 供应商版本 + 适配层版本 | 双版本矩阵 |
| 安全评审 | 常规 | 供应商尽调 + 数据协议 | 供应商尽调 + 内部权限/审计 |
| 失败回退 | 内部重试 | 降级/替代 | 内部回退 + 外部降级 |
| 成本归属 | 内部算力 | 外部计费 | 内部预算 + 外部计费 |

### 4.3 注册表字段

`id`、`name`、`type`（skill/plugin）、`origin`（self/external/hybrid）、`version`、`owner`、`description`、`input_schema`、`output_schema`、`dependencies`、`permissions`、`data_classification`、`failure_modes`、`eval_suite`、`status`、`deprecation_policy`。

### 4.4 生命周期

`提案 → 设计 → 安全评审 → 实现 → 评测 → 注册 → 监控 → 弃用`。外部与混合类型必须额外经过供应商尽调、数据协议与退出方案评审；程序记忆与写操作类技能必须人工确认。

### 4.5 与 MCP / A2A 的关系

- **MCP**：Agent 到工具/数据源的连接标准，适合“调用/混合”类插件。
- **A2A**：Agent 到 Agent 的协作标准，适合跨 Agent 委派；委派方对最终证据等级负责。
- **Workflow**：确定性 SOP 编排，适合把稳定流程从自由 Agent 中剥离。
- **Skill**：可复用的能力包，适合渐进披露与按需加载。

## 五、行业实践提炼与编入位置

7 篇行业资料已完成提炼，原始文件已清除（备份保留于 `/tmp/yyc3_agent_docs_backup_20261109`）；以下为保留的有效做法与落点。

| 来源主题 | 精准有效内容 | 编入位置 | 采用级别 |
| ---- | ---- | ---- | ---- |
| 需求工程与原生验证 | 用交互式提问提取真实需求；用 HTML 规范替代超长 Markdown；把验证做成 Agent 原生能力 | `01-AI-FAmily-契约层/002-AI-FAmily-角色身份与能力边界.md`、`03-AI-FAmily-认知层/002-AI-FAmily-计划执行协议.md`、`09-AI-FAmily-评测层/002-AI-FAmily-黄金集规范.md` | A（直接采用） |
| Workflows 与 Code as Law | Workflow 负责确定性 SOP，Subagent 负责委派，Skill 负责复用能力，MCP 负责工具连接；脚本即资产；仪表盘可观测 | `04-AI-FAmily-技能层/006-AI-FAmily-Skills与插件分类.md`、`10-AI-FAmily-运行时层/006-AI-FAmily-策略引擎.md` | A-（预览功能，接口待观察） |
| 数据驱动微调 | 原始文档→解析/清洗/切分→样本生成→格式对齐（Alpaca/ShareGPT/CoT）→训练；动态数据调度 | `05-AI-FAmily-审计层/003-AI-FAmily-训练落档.md`、`06-AI-FAmily-迭代层/003-AI-FAmily-对齐税闸门.md`、`11-AI-FAmily-资产层/11-01-AI-FAmily-Schema/` | A（直接采用） |
| 实时多模态交互 | 低延迟双工、双脑协同、听/看/思/做一体 | `10-AI-FAmily-运行时层/001-AI-FAmily-模型适配器.md`、`07-AI-FAmily-沟通层/001-AI-FAmily-语气与角色.md` | C（未来观察） |
| 零基础 Agent 团队 | 角色、指令、工具、记忆四要素；先单 Agent 再多 Agent；交接协议与共享记忆 | `03-AI-FAmily-认知层/`、`08-AI-FAmily-治理层/003-AI-FAmily-Agent治理.md` | B（参考） |
| 大规模编排与自我改进 | 分层编排、脚本化控制、自我改进循环 | `10-AI-FAmily-运行时层/`、`08-AI-FAmily-治理层/003-AI-FAmily-Agent治理.md` | C（访谈与预测需核实） |
| 2026 Agent 全景 | 三代 Agent、六大趋势、五条商业化路径、DAA 与成本效率 | 本规划“建设背景”与路线图 | B（背景，数字需复核） |

### 5.1 需求与验证

- 需求提取优先于直接产出：先问清目标、受众、边界、成功判据，再进入方案。
- HTML 规范适合人类阅读与评审；规范应包含目标、范围、交互、验收、反例。
- 验证是 Agent 的原生能力：每次交付附带可执行验证步骤，支持 headless 运行。

### 5.2 编排边界

- 稳定、可重复、强合规的流程用 Workflow，不用自由 Agent。
- 需要探索与判断的任务用 Agent；需要复用能力用 Skill；需要连接工具用 MCP。
- 编排脚本、仪表盘、运行日志都应作为资产版本化。

### 5.3 数据与微调

- 数据格式对齐是隐性高风险点，Alpaca、ShareGPT、CoT 的字段错误会直接导致训练异常。
- 多数据源混合是分布问题，不是简单拼接；需要配比记录与动态调度。
- 训练落档必须记录数据版本、格式、配比、清洗规则与随机种子。

### 5.4 未来观察

- 实时多模态、低延迟双工交互将影响运行时与通信层，但不进入当前核心判据。
- 大规模编排与自我改进属于高不确定方向，先建立监控与治理，再谈自动化。

## 六、文档标头标尾与命名规则

1. 全部文档使用统一 front matter：`file`、`title`、`description`、`author`、`version`、`created`、`updated`、`status`、`tags`、`category`、`language`、`audience`、`complexity`。
2. H1 后注入五段式品牌引用块，文末使用「变更历史 + 居中页脚」。
3. `file` 必须与磁盘文件名一致；`title` 必须与 H1 一致。
4. 占位文档状态为 `reserved`，版本 `v0.1.0`；补全并通过评审后升级为 `v1.0.0`。
5. 文档间引用使用相对链接；重命名时同步更新所有引用与 manifest。

## 七、建设顺序与验收标准

| 阶段 | 重点 | 交付物 | 退出标准 |
| ---- | ---- | ---- | ---- |
| Phase 0 | 框架与命名 | 目录、占位文档、manifest、架构规划 | 所有目录存在，标头标尾完整，链接可达 |
| Phase 1 | 契约与持久化 | `01-AI-FAmily-契约层`、`02-AI-FAmily-持久化层` | 身份、权限、回退、记忆 schema 可判定 |
| Phase 2 | 认知、技能、审计 | `03-AI-FAmily-认知层`、`04-AI-FAmily-技能层`、`05-AI-FAmily-审计层` | Skills/插件分类、失败矩阵、台账字段通过评审 |
| Phase 3 | 评测、运行时、治理 | `09-AI-FAmily-评测层`、`10-AI-FAmily-运行时层`、`08-AI-FAmily-治理层` | 黄金集、沙箱、发布门禁可运行 |
| Phase 4 | 通信、迭代、资产 | `06-AI-FAmily-迭代层`、`07-AI-FAmily-沟通层`、`11-AI-FAmily-资产层` | 版本传播、报告模板、红队用例完备 |

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-09 | 新建文档架构与命名规划；确定 1+8+3 架构；补全 Skills/插件分类；提炼 7 篇行业资料并清除 | YYC3 Team |
| v1.1.0 | 2026-11-09 | 同步物理目录：补齐 Skills/插件分类、注册、生命周期与 Agent 沙箱文件 | YYC3 Team |
| v1.2.0 | 2026-11-09 | 按 YYC3-AI-FAmily 命名规范重构目录与文件名，同步更新引用 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
