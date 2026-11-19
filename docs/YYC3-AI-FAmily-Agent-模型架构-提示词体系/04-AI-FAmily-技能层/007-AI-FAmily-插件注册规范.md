---
file: 007-AI-FAmily-插件注册规范.md
title: 插件注册规范 — Manifest · 权限 · 版本兼容
description: 定义插件 manifest 字段、权限声明、版本兼容、校验规则与注册流程
author: YYC3 Team <admin@0379.email>
version: v0.1.0
created: 2026-11-09
updated: 2026-11-09
status: reserved
tags: [yyc3, plugin, registry, manifest, reserved]
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
  Document: 插件注册规范 — Manifest · 权限 · 版本兼容
  Version : v0.1.0
  Contact : admin@0379.email
  Homepage: https://matrix.yyc3.top
  ============================================================
-->

# 插件注册规范 — Manifest · 权限 · 版本兼容

> **_YYC3-AI-FAmily-Agent-_**（人从众曌众从人 · 永久开源）
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 文档状态

| 项 | 值 |
| ---- | ---- |
| 状态 | reserved（骨架已建，字段与校验待补全） |
| 所属域 | `04-AI-FAmily-技能层/` |
| 上游入口 | [YYC3-AI-FAmily-Agent-模型架构-总控清单.md](../YYC3-AI-FAmily-Agent-模型架构-总控清单.md) |
| 架构规划 | [文档架构与命名规划](../00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md) |

## 一、目的

让插件可被注册、发现、授权、审计与替换；任何插件进入运行时之前，必须有可校验的 manifest、权限声明、版本约束与退出方案。

## 二、Manifest 最小结构

```yaml
id: plugin-example
name: 示例插件
type: plugin
origin: hybrid          # self / external / hybrid
version: v0.1.0
owner: YYC3 Team
description: 做什么 + 何时使用
protocol: mcp           # mcp / http / local / a2a
endpoint: https://example.invalid
permissions:
  filesystem: read-only
  network: allowlist
  write_actions: confirm
  cross_agent: false
data_classification: internal
input_schema: ./11-01-AI-FAmily-Schema/input.json
output_schema: ./11-01-AI-FAmily-Schema/output.json
dependencies:
  runtime: ">=1.0.0"
  models: []
  tools: []
failure_modes:
  - timeout
  - auth_error
  - schema_mismatch
eval_suite: eval-plugin-example
status: draft
deprecation_policy: 提前 30 天通知，提供替代插件
```

## 三、字段与校验规则

| 字段 | 必填 | 校验 |
| ---- | ---- | ---- |
| `id` | 是 | 全局唯一，`plugin-` 前缀，小写 kebab-case |
| `type` | 是 | 固定 `plugin` |
| `origin` | 是 | `self` / `external` / `hybrid` |
| `version` | 是 | 语义版本；外部依赖另记供应商版本 |
| `owner` | 是 | 内部责任人；外部类型注明供应商 |
| `protocol` | 是 | `mcp` / `http` / `local` / `a2a` |
| `permissions` | 是 | 文件、网络、写操作、跨 Agent 四类 |
| `data_classification` | 是 | `public` / `internal` / `confidential` / `restricted` |
| `input_schema` / `output_schema` | 是 | JSON Schema 可解析、可校验 |
| `failure_modes` | 是 | 至少覆盖超时、鉴权、schema、限流 |
| `eval_suite` | 是 | 关联评测用例 ID |
| `status` | 是 | `draft` / `active` / `deprecated` / `retired` |

## 四、权限模型

- **文件系统**：`none` / `read-only` / `read-write`；写操作必须人工确认。
- **网络**：`none` / `allowlist` / `open`；默认 `allowlist`。
- **写操作**：`deny` / `confirm` / `allow`；默认 `confirm`。
- **跨 Agent**：`false` / `delegate-only` / `true`；默认 `false`。
- 外部插件不得直接访问内部数据库；混合插件通过内部网关访问。

## 五、版本兼容

- manifest 声明运行时版本范围、模型版本范围与工具 schema 版本。
- 外部插件升级须保留旧版本回退窗口；混合插件须同时记录内部适配层版本与供应商版本。
- 破坏性变更升主版本，并在决策台账登记影响范围与重跑评测。

## 六、注册流程

`提交 manifest → schema 校验 → 权限评审 → 安全评审 → 评测套件 → 注册 → 监控`。任一步失败不得进入 `active`。

## 七、待补全内容

- 完整 JSON Schema 与示例文件。
- 外部插件尽调清单与数据协议模板。
- 权限矩阵与最小权限基线。
- 插件市场/内部目录的检索字段。

## 八、关联文档

- [YYC3-AI-FAmily-Agent-模型架构-总控清单.md](../YYC3-AI-FAmily-Agent-模型架构-总控清单.md)
- [Skills 与插件分类规范](006-AI-FAmily-Skills与插件分类.md)
- [Skills 与插件生命周期](008-AI-FAmily-Skills与插件生命周期.md)
- [工具调用契约](003-AI-FAmily-工具调用契约.md)
- [工具失败处理](004-AI-FAmily-工具失败处理.md)
- [文档架构与命名规划](../00-AI-FAmily-架构规划/YYC3-AI-FAmily-Agent-模型架构-文档架构与命名规划.md)

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v0.1.0 | 2026-11-09 | 建立插件 manifest、权限、版本兼容与注册流程骨架 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
