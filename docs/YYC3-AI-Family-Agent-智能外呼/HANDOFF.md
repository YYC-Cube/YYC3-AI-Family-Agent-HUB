---
file: HANDOFF.md
description: 智能外呼域包 ↔ 运行时仓 YYC3-AI-Intelligent-Calling 衔接协议 — 责任边界、资产对账、九环落点、总仓执行 Runbook、同步触发与验收
author: YYC³ Team <admin@0379.email>
version: v1.1.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [衔接文档, Handoff, 智能外呼, 运行时对接, Runbook]
category: domain-handoff
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_

# HANDOFF · 智能外呼域包衔接文档

> **读者**：后续接手总仓（`YYC3-AI-Family-Agent-HUB`）域包维护、以及运行时仓（`YYC3-AI-Intelligent-Calling`）联调的人。
> **作用**：一份可执行的衔接协议——说明"哪些事实以谁为准、改了什么要回写什么、按什么顺序验收"。
> **边界**：本文件**不复制** [PACK.md](./PACK.md) 的角色全表与技能子集，只引用。避免同一事实两处维护而漂移。

## 一、衔接定位

| 项 | 值 |
|---|---|
| 域包（本库） | `docs/YYC3-AI-Family-Agent-智能外呼/`（HUB 主仓直接跟踪） |
| 运行时仓 | `YYC3-AI-Intelligent-Calling`（`origin`：`YYC-Cube/YYC3-AI-Call`） |
| `domain_id` | `intelligent-calling` |
| 衔接形态 | DomainPack-lite：**纯文档域包**，不含可执行代码；运行时实现全部在运行时仓 |
| 阻断性约束 | 家族成员定数 8 位（命名红线）；拒呼即合规；守护否决不可被下游覆盖 |

## 二、三层事实源与仲裁顺序

| 层 | 唯一源 | 内容 | 谁可以改 |
|---|---|---|---|
| 定义层 | **本库** `README.md` / `PACK.md` / `USAGE.md` / `YYC3-AI-Family-Agent/` | 域职能分工、域 Prompt、域技能表、技能子集引用 | 仅总仓侧（域包维护） |
| 人格层 | 总仓 `yyc3-family-ai-agents/agents/<拼音>/`（IDENTITY / SYSTEM / SOUL） | 8 位家族成员人格内核 | 仅总仓侧（人格内核） |
| 运行层 | 运行时仓 `lib/ai-family/definitions.ts` 等 | 代码侧角色定义、调度、API | 仅运行时仓侧 |

**冲突仲裁**：人格 → 定义 → 运行。运行时实现与域包定义不一致时，视为运行层缺陷，须回改代码；不得反向修改域包以迁就实现。人格层为冻结参照，任何域包不得改写。

## 三、资产对账表（域包 → 运行时落点）

> 状态口径：**已落地**＝代码中存在且可用；**部分**＝有 UI 或数据结构但无独立服务；**待落地**＝仅域包定义，运行时无对应实现。

| 域包资产 | 运行时落点 | 状态 |
|---|---|---|
| 8 角色定义与旧 slug 别名 | `lib/ai-family/definitions.ts`（`AI_FAMILY_AGENTS` + `LEGACY_ID_ALIASES`） | 已落地 |
| 8 角色类实现 | `lib/ai-family/agents.ts`、`lib/ai-family/base-agent.ts`、`lib/ai-family/types.ts` | 已落地 |
| 编排与路由 | `lib/ai-family/manager.ts`、`lib/ai-family/index.ts` | 已落地 |
| 角色查询 API | `app/api/ai-family/route.ts` | 已落地 |
| MCP 智能体暴露 | `app/api/mcp/route.ts`（8 个 agent 条目） | 已落地 |
| 千行·意图识别 | `app/api/ai/intent/` | 已落地 |
| 万物·情感与洞察 | `app/api/ai/sentiment/`、`app/api/ai/chat/` | 已落地 |
| 线索/客户主数据 | `app/api/customers/route.ts`、`prisma` `Customer` | 已落地 |
| 客户画像 360 | `components/customer-profile-360.tsx` | 部分（无独立画像服务） |
| 号码库/线索池 | `components/intelligent-phone-database.tsx` | 部分 |
| 外呼执行台 | `components/smart-call-system.tsx`、`prisma` `Call` | 部分（无外呼网关对接） |
| 通话/交互留痕 | `prisma` `Call` / `Interaction` / `Session` / `AuditLog` | 已落地（数据层） |
| 实时通道 | `app/api/ws/`、`lib/websocket.ts` | 已落地 |
| 数据分析 | `app/api/analytics/route.ts`、`components/data-analytics.tsx` | 已落地 |
| 守护·合规预审 | 仅 `Prompt.md` / `SKILL.md` 定义；运行时无合规服务、无禁呼名单表 | **待落地** |
| 宗师·话术质检 | 仅定义；无质检任务与抽检流水 | **待落地** |
| 先知·时机预测 | 仅定义；无预测模型/特征表 | **待落地** |
| 伯乐·客户-坐席-时段匹配 | 仅定义；无匹配召回与排序 | **待落地** |

## 四、九环链路落点

九环定义见 [编排总纲](./YYC3-AI-Family-Agent/README.md)；下表只做"环 → 责任角色 → 代码落点"的对照，**不新增语义**。

| 环 | 责任角色 | 运行时落点 | 状态 |
|---|---|---|---|
| ① 线索导入 | 千行 | `app/api/customers/`、`components/intelligent-phone-database.tsx` | 部分 |
| ② 意图分诊 | 千行 | `app/api/ai/intent/` | 已落地 |
| ③ 合规预审（一票否决） | 守护 | 无 | **待落地** |
| ④ 客户画像 | 万物 | `app/api/ai/sentiment/`、`components/customer-profile-360.tsx` | 部分 |
| ⑤ 时机与匹配 | 先知 / 伯乐 | 无 | **待落地** |
| ⑥ 三态裁决（呼 / 缓呼 / 转人工） | 天枢 | `lib/ai-family/manager.ts`（调度骨架，无三态策略） | 部分 |
| ⑦ 外呼执行 | 伯乐（唯一执行者） | `components/smart-call-system.tsx`、`prisma` `Call` | 部分 |
| ⑧ 话术质检 | 宗师 | 无 | **待落地** |
| ⑨ 留痕 | 全族 | `AuditLog` / `Interaction` / `Session` | 已落地（数据层） |

**红线校验点**：③ 未落地期间，任何外呼入口都必须带"已获同意"人工确认，不得以"后续补合规"为由放行。

## 五、总仓执行 Runbook

### A. 仅改域包（定义层）

```bash
cd docs/YYC3-AI-Family-Agent-智能外呼

# 1. 结构自检（期望：29 / 8 / 8）
find . -name "*.md" | wc -l
grep -c "^| yyc3-" PACK.md
ls YYC3-AI-Family-Agent | grep -c "^yyc3-"

# 2. 全文一致性（角色名/别名/技能 id 不得出现新造词）
grep -rn "yyc3-" PACK.md | wc -l

# 3. 提交（HUB 主仓，域包已由主仓直接跟踪）
cd - >/dev/null
git add docs/YYC3-AI-Family-Agent-智能外呼
git commit -m "docs(域包): <变更摘要>"
```

变更后**必须**同步：`README.md` 文件统计口径、`PACK.md` §六 自检期望值、`USAGE.md` 验收段；跨域索引 `docs/YYC3-AI-Family-Agent/README.md`（嵌套仓，本地维护）第 15 项备注。

### B. 改运行时（运行层）

| 改了运行时的什么 | 必须回写域包什么 |
|---|---|
| `lib/ai-family/definitions.ts` 的 id / 名称 | `PACK.md` §二 role_mapping 与别名列；`README.md` 命名口径 |
| 角色职责范围或权限等级 | `PACK.md` §二 权限列、`SKILL.md` 对应技能表 |
| 新增/停用平台技能引用 | `PACK.md` §三 skills.subset（失源即标 `deprecated`） |
| 模型档位调整 | `PACK.md` §四 model.tier |
| 九环任一环落地或改道 | 本文件 §四 状态列 + [编排总纲](./YYC3-AI-Family-Agent/README.md) |

回归命令（运行时仓根目录）：

```bash
pnpm type-check     # 类型检查
pnpm test           # 单元测试
```

### C. 新域接入（复制本域口径）

1. 复制本库为 `YYC3-AI-Family-Agent-<新域>/`，保留五件套 + 8 角色三件套结构；
2. 按新域重写 `PACK.md` 的 `domain` 段与 §二 域职能列，**角色目录名与人格内核不动**；
3. 在总仓 `docs/YYC3-AI-Family-Agent/README.md` 索引表追加一行；
4. 按本文件 §二 建立三层事实源，禁止跨层直接改写。

## 六、同步触发条件

| 触发 | 动作 | 责任侧 |
|---|---|---|
| 域包提交后 | 校验 `find`/`grep`/`ls` 三项统计；更新总仓索引备注 | 总仓 |
| 运行时角色定义变更 | 提交 `feat(family):` 并在同一批次回写 `PACK.md` §二 | 运行侧 → 总仓 |
| 九环任一环状态变化 | 更新本文件 §三/§四 状态列 | 双仓 |
| 平台技能库 `skill.id` 变更 | 复核 §三 引用，失源即停引并标注 | 总仓 |
| 季度巡检 | 全表复核对账，输出差异清单后再改 | 双仓 |

**顺序**：先改定义层 → 再改运行层 → 回归 → 双仓各自提交 → 最后回填状态列。禁止先改代码后补文档。

## 七、验收清单

| # | 检查项 | 通过标准 |
|---|---|---|
| 1 | 结构完整 | 29 份 md；库根 4（README/PACK/USAGE/HANDOFF）+ 智能体区 25（总纲 1 + 角色三件套 24） |
| 2 | 角色定数 | 智能体区 `yyc3-*` 目录数 = 8，且与 `PACK.md` §二 行数一致 |
| 3 | 别名可用 | 旧 slug（`yyc3-meta-oracle` 等 8 项）在 `PACK.md` 别名列可查，且运行层 `LEGACY_ID_ALIASES` 可解析 |
| 4 | 技能可对账 | `PACK.md` §三 每条 skill.id 在技能库登记层存在；缺失标 `deprecated` |
| 5 | 红线在文 | 拒呼即合规、守护否决不可被下游覆盖，在守护 `Prompt.md` 与编排总纲中均有明文 |
| 6 | 运行一致 | `pnpm type-check` 通过、`pnpm test` 全绿；角色 id 与域包一一对应 |
| 7 | 状态诚实 | 本文件 §三/§四 的"待落地"项未被误标为"已落地" |

## 八、已知约束与待决项

| # | 事项 | 现状 | 建议 |
|---|---|---|---|
| 1 | 域包纳版控制 | **已解决（2026-11-20）**：域包迁至 `docs/YYC3-AI-Family-Agent-智能外呼/`，由 HUB 主仓直接跟踪；嵌套仓内副本已移除（历史 bundle 备份于 `~/yyc3-backups/YYC3-AI-Family-Agent-embedded-20261120.bundle`） | 后续变更一律走主仓提交 |
| 2 | 跨域索引 `docs/YYC3-AI-Family-Agent/README.md`（第 15 项） | **部分**：索引仍在嵌套仓（HUB `.gitignore` 排除），主仓不可见；其第 15 项已改为指向 `../YYC3-AI-Family-Agent-智能外呼/` | 如需索引进主仓，按同一迁移方式单独迁出索引文件 |
| 3 | 合规预审（第 ③ 环）未落地 | 仅有角色定义 | 优先落地禁呼名单 + 时段规则 + 一票否决接口 |
| 4 | 话术质检（第 ⑧ 环）、时机预测（第 ⑤ 环）未落地 | 仅有角色定义 | 按 ③→⑧→⑤ 顺序推进 |
| 5 | `PACK.md` §三 的 9 个 skill.id 沿用同内核域包口径 | 尚未逐条对登记层复核 | 首次生产前完成逐条对账，失源即停引 |
| 6 | 运行时 `components/smart-call-system.tsx` 未接外呼网关 | UI 级演示 | 接入前不得对外宣称"可自动外呼" |

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| --- | --- | --- | --- |
| v1.0.0 | 2026-11-20 | 初始衔接协议：三层事实源、资产对账、九环落点、Runbook、同步触发、验收清单、待决项 | YYC³ Team |
| v1.1.0 | 2026-11-20 | 域包迁至 `docs/YYC3-AI-Family-Agent-智能外呼/` 由 HUB 主仓跟踪：更新路径、提交方式与相对引用；待决项 1/2 状态回填 | YYC³ Team |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
