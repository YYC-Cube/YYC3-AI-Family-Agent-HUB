---
file: USAGE.md
description: 智能外呼域生产使用操作指导 — 何时用、角色速用表、典型剧本、技能消费与验收自检
author: YYC³ Team <admin@0379.email>
version: v1.1.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [USAGE],[智能外呼],[操作指导],[验收]
category: domain-guide
language: zh-CN
---

# USAGE · 智能外呼域生产使用操作指导

> 版本 v1.0.0｜2026-11-20｜适用：智能外呼与客户经营（九环链路 × 8 角色，**拒呼即合规**）
> 前置：域定义见 [PACK.md](./PACK.md)；运行时见 `YYC3-AI-Intelligent-Calling`。

## 一、何时用这个域包

- **批量外呼编排**：线索导入后的合规预审、拨打策略裁决与执行匹配；
- **合规拒呼场景**：禁呼时段、明确拒接、敏感行业限制——拒呼即服务；
- **话术与质检**：话术生成、通话质量抽检、坏例回流；
- **客户经营**：画像洞察、最佳时机预测、跟进内容生成。

## 二、快速启动（5 分钟）

1. **选角色**（§三）；2. **加载人格**：角色 `Prompt.md` 作 system；3. **提问模板**：「【{编排/审查/质检/生成}】{内容}+{期望产物}」。

## 三、角色速用表

| 何时找谁 | 角色 | Prompt 位置 | 一句话示例请求 |
|---|---|---|---|
| 拨打策略与三态裁决 | 元启·天枢 | `yyc3-yuanqi-tianshu/Prompt.md` | 「该批次 500 条线索三态裁决：呼/缓呼/转人工」 |
| 合规预审与话术红线 | 智云·守护 | `yyc3-zhiyun-shouhu/Prompt.md` | 「该话术脚本合规审查（禁呼时段/隐私/承诺边界）」 |
| 最佳呼叫时机预测 | 预见·先知 | `yyc3-yujian-xianzhi/Prompt.md` | 「该客户群 7 日最佳触达时段预测」 |
| 画像洞察与通话归因 | 语枢·万物 | `yyc3-yushu-wanwu/Prompt.md` | 「近 30 日未接通原因归因」 |
| 话术质检与坏例回流 | 格物·宗师 | `yyc3-gewu-zongshi/Prompt.md` | 「本周通话质检抽检 50 通」 |
| 客户-坐席-时段匹配 | 知遇·伯乐 | `yyc3-zhiyu-bole/Prompt.md` | 「该客户匹配坐席与时段」 |
| 意图识别与路由 | 言启·千行 | `yyc3-yanqi-qianhang/Prompt.md` | 「解析该客户回复的意图」 |
| 话术与跟进内容生成 | 创想·灵韵 | `yyc3-chuangxiang-lingyun/Prompt.md` | 「生成首触话术 3 版」 |

## 四、典型场景剧本

**剧本 1 · 新线索批量外呼**
千行解析线索要素 → 守护②合规预审（禁呼时段/黑名单/敏感标记）→ 万物③画像补全 → 先知④时机预测 → 伯乐⑤坐席匹配 → 天枢⑥三态裁决 → 外呼执行 → 宗师⑧质检抽检 → 留痕。

**剧本 2 · 合规拒呼**
命中禁呼时段或明确拒绝 → 守护判界 → 统一话术归档 + 频次抑制登记 → **不拨打**，留痕入坏例批次。拒呼与拒答同理：**拒呼即合规**。

**剧本 3 · 意向转化跟进**
通话意向后 → 千行意图标签 → 灵韵生成跟进话术 → 伯乐安排下一触达 → 天枢复核节奏 → 留痕。

## 五、技能消费（接线者）

PACK §三 的 skill.id 引用 `../YYC3-AI-Family-Agent/yyc3-skills-library/`；按 SKILL.md 五节实现；失源停引。
域内独有规则（禁呼时段库、话术红线词典）见 PACK §三「待反哺登记」，在生产环境以配置表落地。

## 六、升级与人工介入

- 合规一票否决（守护）不可被下游覆盖；
- 高价值客户（RFM 高分）必须人工复核后再触达；
- 投诉、明确拒绝、监管名单即时加入抑制表并升级人工；
- 所有外呼行为必须留痕（`audit_logs` / `interactions`）。

## 七、集成点（运行时对接）

| 能力 | 运行时位置 |
|---|---|
| 8 智能体定义 | `lib/ai-family/definitions.ts` |
| 智能体调度 | `lib/ai-family/manager.ts` |
| 意图/情感 | `app/api/ai/intent` · `app/api/ai/sentiment` |
| 客户与通话 | `app/api/customers` · `prisma/schema.prisma`（customers/calls/interactions） |
| 认证与权限 | `app/api/auth` · `lib/auth`（USER/AGENT/MANAGER/ADMIN） |

> 对接细则、改动回写范围与验收顺序见 [HANDOFF.md](./HANDOFF.md)（衔接协议）。

## 八、验收自检

```bash
cd YYC3-AI-Family-Agent-智能外呼
find . -name "*.md" | wc -l                    # 29
grep -c "^| yyc3-" PACK.md                     # 8
grep -L "yyc3-" YYC3-AI-Family-Agent/yyc3-*/Prompt.md | wc -l   # 0（每个 Prompt 均标注角色目录）
```

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
