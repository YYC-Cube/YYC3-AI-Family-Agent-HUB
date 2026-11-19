---
file: PACK.md
description: 智能外呼域包清单(DomainPack-lite)— 域标识、8 角色映射、技能子集引用、模型档位与事实源注记
author: YYC³ Team <admin@0379.email>
version: v1.1.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [DomainPack],[智能外呼],[域包清单],[8Agent复用]
category: domain-pack
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_

> 本文件为 **DomainPack-lite**（纯文档形态）：声明"一套 8 位人格 × 本业务域"的全部绑定关系。
> 运行时实现：`YYC3-AI-Intelligent-Calling`（Next.js 15 / Prisma 5.22 / PostgreSQL schema `yyc3_v2` / Redis 7）。

# PACK · 智能外呼域包

## 一、domain

| 字段 | 值 |
|---|---|
| `domain_id` | `intelligent-calling` |
| `domain_name` | 智能外呼与客户经营协同（智能外呼） |
| `base_pack` | **企业蓝图** → `../YYC3-AI-Family-Agent/YYC3-Family-AI-Agent-企业蓝图/`（五维五高五标五化；冻结只读参照，不改动） |
| 家族口径 | 8 位家族成员 × 九大职能域 × 九层架构（成员为定数，命名红线） |
| 域主链路 | 线索导入 → 意图分诊 → 合规预审（守护否决）→ 客户画像 → 时机预测 → 资源匹配 → 外呼执行 → 话术质检 → 留痕 |
| 运行时仓 | `YYC3-AI-Intelligent-Calling`：`lib/ai-family/`（8 智能体）、`app/api/ai/*`（意图/情感/对话）、`prisma/schema.prisma`（客户/通话/交互/会话/审计） |
| 域内资产 | 8 角色三件套（README/SKILL/Prompt）+ 编排总纲 1 份，含本 PACK/库根 README/USAGE/HANDOFF 共 29 份 md |

## 二、role_mapping（8 角色 × 域内职能 × 权限）

> 库内角色目录为 `YYC3-AI-Family-Agent/yyc3-<拼音>/`，与运行时 `yyc3-family-ai-agents/agents/` 同名同人格，仅换绑域 Prompt。
> **别名列**为历史域包（医疗合规等）所用旧 slug，二者指向同一家族成员，人格内核零漂移。

| 运行时目录 | 旧 slug 别名 | 家族成员 | 智能外呼域职能 | 权限 | 职能域卡 |
|---|---|---|---|---|---|
| yyc3-yuanqi-tianshu | yyc3-meta-oracle | 元启·天枢 | 外呼任务编排总控（三态裁决：呼 / 缓呼 / 转人工） | L3 | `ops-decision` |
| yyc3-zhiyun-shouhu | yyc3-sentinel | 智云·守护 | 合规预审（禁呼时段、话术红线、隐私脱敏，一票否决） | L0+否决 | `compliance-scan` |
| yyc3-yujian-xianzhi | yyc3-prophet | 预见·先知 | 最佳呼叫时机与成单/流失概率预测 | L0-L1 | `trend-forecast` |
| yyc3-yushu-wanwu | yyc3-thinker | 语枢·万物 | 客户画像洞察、通话记录归因、知识检索 | L0-L1 | `analysis-reporting` |
| yyc3-gewu-zongshi | yyc3-master | 格物·宗师 | 话术质检、ASR 准确率与通话质量抽检 | L1 | `quality-audit` |
| yyc3-zhiyu-bole | yyc3-bolero | 知遇·伯乐 | 客户-坐席-时段匹配（**不直接外呼**） | L2 执行 | `talent-matching` |
| yyc3-yanqi-qianhang | yyc3-navigator | 言启·千行 | 客户意图识别与路由（第一触点） | L1 | `intent-routing` |
| yyc3-chuangxiang-lingyun | yyc3-creative | 创想·灵韵 | 外呼话术脚本与跟进内容生成 | L1 | `brand-content` |

## 三、skills.subset（按 skill.id 引用 `../YYC3-AI-Family-Agent/yyc3-skills-library/`）

> 消费协议：PACK 经 `skills.subset` 按 `skill.id` 声明依赖；来源以登记层 `skill.source` 对账，失源条目以 `deprecated` 标记为准。
> 下表为本域按角色消费的**平台级技能子集**；各角色 `SKILL.md` 内的 6 大类×18 项为域内场景技能，不占登记层 skill.id。

| 消费角色 | 引用 skill.id | 域内用途 |
|---|---|---|
| 元启·天枢 | S-01-103 | 拨打策略加权决策（呼/缓呼/转人工三态裁决） |
| 言启·千行 | S-02-102 | 客户意图识别与路由分发 |
| 智云·守护 | S-04-101 | 外呼合规审查（禁呼时段/话术红线/隐私脱敏） |
| 语枢·万物 | S-06-114 | 客户画像与通话记录深度归因成文 |
| 格物·宗师 | S-03-103 | 话术与通话质检抽检、坏例发现 |
| 知遇·伯乐 | S-05-102 | 客户-坐席-时段画像匹配推荐 |
| 创想·灵韵 | S-08-116 | 外呼话术与跟进文案生成 |
| 全族共享 | S-00-101, S-00-110 | 通话录音/工单附件解析、知识源文档读取 |

**对账状态**：上列 9 个 skill.id 沿用同内核域包（医疗合规 PACK）已登记口径；本域首次生产时需按 `yyc3-skills-library` 登记层逐条复核，失源即停引。

**待反哺登记**（域内独有而登记层缺失，不占 skill.id）：禁呼时段合规规则库、外呼话术红线词典、通话情感-意图联合标注规范、号码频次抑制策略。

## 四、model.tier

| 角色 | 档位 | 理由 |
|---|---|---|
| 元启·天枢 | 强推理 | 多约束下的拨打策略裁决 |
| 智云·守护 | 强推理 + 规则硬闸 | 合规一票否决需确定性兜底 |
| 预见·先知 | 强推理 | 时序预测与情景建模 |
| 语枢·万物 | 标准 + 检索增强 | 画像与归因依赖知识源 |
| 格物·宗师 | 标准 | 质检以规则+抽检为主 |
| 知遇·伯乐 | 标准 | 匹配以向量召回+排序为主 |
| 言启·千行 | 轻量低延迟 | 第一触点要求首响应时延 |
| 创想·灵韵 | 标准 | 话术生成质量优先 |

## 五、snapshot（事实源三层）

| 层 | 位置 | 说明 |
|---|---|---|
| 定义层（本库） | `README.md` / `PACK.md` / `USAGE.md` / `HANDOFF.md` / `YYC3-AI-Family-Agent/` | 域 Prompt 与技能定义唯一源 |
| 人格层（总仓） | `yyc3-family-ai-agents/agents/<拼音>/`（IDENTITY/SYSTEM/SOUL） | 8 位成员人格内核，域内只换绑不改写 |
| 运行层（本项目） | `YYC3-AI-Intelligent-Calling/lib/ai-family/definitions.ts` | 代码侧定义，`LEGACY_ID_ALIASES` 保留旧 slug 兼容 |

## 六、验收自检

```bash
cd YYC3-AI-Family-Agent-智能外呼
find . -name "*.md" | wc -l          # 29
grep -c "^| yyc3-" PACK.md           # 8
ls YYC3-AI-Family-Agent | grep -c "^yyc3-"   # 8
```

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| --- | --- | --- | --- |
| v1.0.0 | 2026-11-20 | 初始域包清单：8 角色映射、技能子集、模型档位、三层事实源 | YYC³ Team |
| v1.1.0 | 2026-11-20 | 定义层纳入 `HANDOFF.md`；域内资产统计校正为 29 份 md；自检期望值同步 | YYC³ Team |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
