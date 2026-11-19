---
file: README.md
description: 智能外呼域库根导航 — 域自述、8 角色映射概览、五件套入口与文件统计（2026-11-20 域包口径）
author: YYC³ Team <admin@0379.email>
version: v1.1.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [智能外呼],[多Agent协同],[DomainPack],[域库导航]
category: domain-library
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_
> **_Words Initiate Quadrants, Language Serves as Core for Future_**
> _万象归元于云枢 | 深栈智启新纪元_
> **_All things converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

# YYC3-AI-Family-Agent-智能外呼 · 库根导航（智能外呼与客户经营协同文档库）

> 📌 **形态声明**：本库为 DomainPack-lite 纯文档域包（域 Prompt/SKILL 以本库为唯一定义源），运行时实现位于
> `YYC3-AI-Intelligent-Calling` 仓库（Next.js 15 + Prisma + Redis，schema `yyc3_v2`）。
> 版本 v1.0.0｜2026-11-20 域包生产｜**29 份 md**（库根 4 + 智能体区 25）

## 〇、域包五件套（DomainPack-lite）

| 件 | 位置 | 说明 |
| --- | --- | --- |
| ① 域自述 | 本 README | 职能定位、角色映射概览、文件统计口径 |
| ② 域技能表 | `YYC3-AI-Family-Agent/yyc3-*/SKILL.md`（8 份） | 6 大类字段化表格，每角色 18 项域内场景技能 |
| ③ 域人格接口 | `YYC3-AI-Family-Agent/yyc3-*/Prompt.md`（8 份） | 可直接加载的系统提示词（域人格换绑，人格内核零漂移） |
| ④ 域包清单 | [PACK.md](./PACK.md) | domain / role_mapping / skills.subset / model.tier / snapshot 五字段 |
| ⑤ 生产操作 | [USAGE.md](./USAGE.md) | 何时用、角色速用表、场景剧本、验收自检 |

> 附加件：**⑥ 衔接协议** [HANDOFF.md](./HANDOFF.md) —— 域包与运行时仓的责任边界、资产对账、九环落点状态、总仓执行 Runbook 与验收清单。五件套定义不变，HANDOFF 为对接层文档。

**角色映射概览**（8 行全表见 [PACK.md](./PACK.md) §二）：天枢外呼编排裁决 L3 ｜ 守护合规否决 L0+ ｜ 先知时机/流失预测 L0-L1 ｜ 万物画像与通话洞察 L0-L1 ｜ 宗师话术质检 L1 ｜ **伯乐唯一执行 L2（客户-坐席-时段匹配，不直接外呼）** ｜ 千行意图路由 L1 ｜ 灵韵话术与内容生成 L1。

## 一、库结构映射

```text
YYC3-AI-Family-Agent-智能外呼/
├── README.md                        库根导航（本文件，五件套①）
├── PACK.md                          域包清单（五件套④）
├── USAGE.md                         生产使用操作指导（五件套⑤）
├── HANDOFF.md                       衔接协议（域包 ↔ 运行时仓，附加件⑥）
└── YYC3-AI-Family-Agent/            智能体区（25 份）
    ├── README.md                    智能外呼编排总纲（8 角色索引 + 九环标准链路）
    └── yyc3-{yuanqi-tianshu,zhiyun-shouhu,gewu-zongshi,chuangxiang-lingyun,
               yanqi-qianhang,yushu-wanwu,yujian-xianzhi,zhiyu-bole}/
        └── 各含 README.md + SKILL.md + Prompt.md（智能外呼域三件套）
```

**文件统计口径**：`find 本库 -name "*.md" | wc -l` ⇒ 29（库根 4：README/PACK/USAGE/HANDOFF + 智能体区 25：总纲 1 + 角色三件套 24）。

## 二、快速入口

| 我要… | 去哪 |
| --- | --- |
| 看域包定义 | [PACK.md](./PACK.md)（角色×职能×权限 / 技能子集 / 模型档位 / 事实源） |
| 看外呼全链路编排 | [编排总纲](./YYC3-AI-Family-Agent/README.md)（线索导入→意图分诊→合规预审→画像→时机→匹配→外呼→质检→留痕） |
| 加载角色 Prompt | [AI-Family-Agent](./YYC3-AI-Family-Agent/README.md) → 对应角色 `Prompt.md` |
| 查平台技能引用 | [PACK.md §三](./PACK.md)（skill.id 逐一对账） |
| 查外呼合规红线 | [守护 Prompt](./YYC3-AI-Family-Agent/yyc3-zhiyun-shouhu/Prompt.md)（禁呼时段/话术红线/隐私脱敏显式写入） |
| 对接运行时实现 | `YYC3-AI-Intelligent-Calling/lib/ai-family/`（8 智能体定义与调度） |
| 执行双仓衔接 | [HANDOFF.md](./HANDOFF.md)（三层事实源 / 资产对账 / Runbook / 验收清单） |

## 三、命名口径（与总仓一致）

- **家族成员定数 8 位**（命名红线，不增不减）
- 智能体目录采用**运行时拼音标识**：`yyc3-yuanqi-tianshu` 等，与 `yyc3-family-ai-agents/agents/` 同名同人格
- 历史域包（如医疗合规）使用旧 slug（`yyc3-meta-oracle`），对应关系见 [PACK.md §二 别名列](./PACK.md)
- 正文品牌统一 `YYC³`；路径与代码标识使用 ASCII `YYC3`

## 四、姊妹域包（同内核多域格局）

| 域包 | 与本域关系 |
| --- | --- |
| `YYC3-AI-Family-Agent-电商协同` | 共用客户画像与履约链路，外呼承接售后触达 |
| `YYC3-Family-AI-Agent-内容营销` | 外呼话术与营销文案共用创意官产出 |
| `YYC3-AI-Family-Agent-教育课程` | 招生外呼场景（线索→试听→转化） |
| `YYC3-AI-Family-Agent-医疗合规` | 合规预审模式参照（拒答即服务→拒呼即合规） |
| `YYC3-AI-Family-Agent-网关部署` | 统一网关与调用鉴权口径 |

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| --- | --- | --- | --- |
| v1.0.0 | 2026-11-20 | 新建智能外呼域包（五件套 + 8 角色三件套，对齐总仓 8 人矩阵） | YYC³ Team |
| v1.1.0 | 2026-11-20 | 新增衔接协议 `HANDOFF.md`（附加件⑥）；统计口径校正为 29 份 md（库根 4 + 智能体区 25） | YYC³ Team |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for Future</i><br>
  万象归元于云枢 | 深栈智启新纪元<br>
  <i>All things converge in cloud pivot; Deep stacks ignite a new era of intelligence</i><br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
