---
file: YYC3-AI-Family-Agent-项目自述-20261101.md
description: YYC3-AI-Family-Agent 仓库完整自述 — 定位、三层资产地图、12 子目录逐目录现状、根级管理文档索引、命名体例与现役技术口径(2026-11-01 全量复核)
author: YYC³ 对齐执行工程师 <ops@yyc3-22>
version: v1.0.0
created: 2026-11-01
updated: 2026-11-01
status: stable
tags: [项目自述],[资产地图],[DomainPack],[家族体系]
category: project-guide
language: zh-CN
---

> **_YanYuCloudCube_**
> _言启象限 | 语枢未来_
> _万象归元于云枢 | 深栈智启新纪元_

# YYC3-AI-Family-Agent · 项目自述(2026-11-01)

## 一、这个仓库是什么

**"同一套 8 位家族人格 × N 个业务域"的文档与登记资产库**——不是每行业一套 Agent,而是 8 位定数成员(元启·天枢/智云·守护/预见·先知/语枢·万物/格物·宗师/知遇·伯乐/言启·千行/创想·灵韵)按域换绑 Prompt/技能/权限的场景化重映射。行业差异全部下沉到 **域包(DomainPack)层**,人格内核零漂移(命名红线)。

**统一口径**:8 位家族成员 × 九大职能域 × 九层架构;git 化(基线 `8f00f81` 起共 14+ commit,.env 真值外置 `~/.yyc3-keybackup`)。

## 二、三层资产地图(一图看清)

```text
YYC3-AI-Family-Agent/
│
├─ 🅐 运行时层(可执行)
│   └─ yyc3-family-ai-agents/          8 成员 IDENTITY/SYSTEM/SOUL + Flask agent_server v3.2
│      ⚠ 八家臣(Flask)已宣布退役(E5b 吸收对象改 OPS 归档),当前作历史运行时在档
│
├─ 🅑 域包层(提示词/登记/组件)——「8 人格 × 域」的主战场
│   ├─ 电商协同/         PACK✓(审核放行母版,25 id)
│   ├─ 内容营销/         PACK✓(20 id)
│   ├─ 知识中枢/         PACK✓(九环链路 role_mapping,19 id)
│   ├─ 视频短剧/         PACK✓(组件形态含视频线档,17 id;唯一带可运行 .py 的场景库)
│   └─ yyc3-skills-library/   129 条技能登记(yyc3-skill/v1;99 在池+25 归档源+2 仅登记+3 运行时锚点)
│
└─ 🅒 母版与文化层(冻结/归档)
    ├─ 企业蓝图/         五维五高五标五化(冻结只读,PACK 的 base_pack)
    ├─ 家人档案与人机协同文化库/   8 份人格档案+九层文化(冻结,原"编程体系"已正名)
    ├─ 情感公约/         拟人化协同公约 ×3
    ├─ archive-网关部署/  8-Agent 框架旧拷贝(已归档,三项已知缺陷告示)
    ├─ 演进实施/         E1-E4 演进方案 ×6
    └─ 创新范式/         九层架构最早规划(2026-03)×7
```

## 三、逐目录现状(2026-11-01 实测)

| # | 目录 | 规模 | 五件套/状态 | 现状一句话 |
|---|---|---|---|---|
| 1 | `yyc3-skills-library/` | 165 md/173 文件 | 登记层 | 129 条技能三向对账零失源;根 README 有「运行时消费协议」;对账表+SYNC-LOG+校验器在档;`_plan/make_tasks.py.txt` 为安全归档 |
| 2 | `YYC3-AI-Family-Agent-电商协同/` | 40 md/42 | **PACK✓ 五件套齐** | 审核放行母版;8 角色三件套+13 篇运维文档;README 口径 39→40 修正、死链清零 |
| 3 | `YYC3-Family-AI-Agent-内容营销/` | 41 md/41 | **PACK✓ 五件套齐** | 同构姊妹库(v1.1.0);FAmily 正名;姊妹库链接改本仓实况 |
| 4 | `YYC3-Family-AI-Agent-知识中枢/` | 44 md/44 | **PACK✓ 五件套齐** | role_mapping 按九环应答链路(①提问解析→⑨坏例回流);权限过滤前置红线入注 |
| 5 | `YYC3-AI-Family-Agent-视频短剧/` | 30 md/46(含 13 py) | **PACK✓** | 唯一组件代码形态(BaseAgent/mock 降级/drama_stage_adapter);模型映射已现役化(N2:8100 口径+视频线);YYC3-03 定格 v1.1.0 归档;`.py` 5 处过时默认值冻结待 E5b |
| 6 | `YYC3-Family-AI-Agent-企业蓝图/` | 17 md/17 | 母版**冻结** | PACK 的 base_pack;内嵌情感公约副本(重复资产,E5b 收敛) |
| 7 | `YYC3-AI-Family-Agent-家人档案与人机协同文化库/` | 16 md/16 | **冻结** | 原"编程体系"正名;8 份人格档案;内容零改写(文件名已随 R3 索引修统一) |
| 8 | `YYC3-Family-AI-Agent-情感公约/` | 3 md/3 | 文档 | 与智协同三公约(企业蓝图内含同内容副本) |
| 9 | `YYC3-AI-Family-Agent-archive-网关部署/` | 25 md/37 | **归档** | 旧拷贝+三项已知缺陷告示(`\b` 正则/base_agent 防线/milvus key 已修 env 读);最新代码看视频短剧库 |
| 10 | `YYC3-AI-Family-演进实施/` | 6 md/6 | 文档 | E1 记忆/E2 语音/E3 规则/E4 PWA 方案(外部审核报告链接已文字化) |
| 11 | `YYC3-AI-Family-创新范式/` | 7 md/7 | 文档 | 九层规划/家人档案/五维五高最早源流;2 文件名 FAmily 已正 |
| 12 | `yyc3-family-ai-agents/` | 25 md/57 | 运行时(退役中) | 8 成员三件套+agent_server+docker/systemd;`.env` 已外置 keybackup;systemd 标签已随伯乐正名;八家臣退役令见演进集 v1.2.0 |

**根级活文档 ×6**(2026-11-06 架构收敛后):README(台账)/ OPS(运维)/ 本自述 / 8Agent 复用模板 / 新会话衔接提示词 / 全领域审核评估与对标总结;历史过程档案 ×11 已归档至 `_archive/同框对齐工程-2026-10~11/`(含地形图/三份提示词/审核·完成报告/替换记录/递进总结/投产记录/判据速报)。

## 四、命名体例说明(为什么有三种前缀)

| 前缀 | 含义 | 例 |
|---|---|---|
| `YYC3-AI-Family-Agent-*` | 场景库/文化库原始世系(2026-10 建) | 电商协同、视频短剧、家人档案文化库、archive-网关部署 |
| `YYC3-Family-AI-Agent-*` | 2026-10-30 P1 正名(原 FAmily 笔误所生四目录) | 内容营销、知识中枢、企业蓝图、情感公约 |
| `yyc3-*`(小写) | 工程资产(运行时/登记层,kebab-case) | yyc3-family-ai-agents、yyc3-skills-library |

三者为**历史世系并存**,不是待修错误;新目录建议统一 `YYC3-AI-Family-Agent-<域名>`(场景)或小写 kebab(工程)。

## 五、现役技术口径(2026-11-01)

- **生成网关**:`http://100.126.132.112:10086/v1`(yyc3-33-1,无 key /v1 即用)→ 上游 `yyc3-n1` svl2-head(vLLM,`nemotron-3.5-super-vl`,1M ctx,`100.65.64.49:8888`);N1:8000 已让路停用
- **golden 基线**:88/92=95.7%(2026-11-01 版为 diff 基准;consumer-profile 30/30 满血)
- **推理档**:三候选(super-vl/Qwen3.8-Flash-Next/DSv4.1)2026-11 中旬拍板,各 PACK `model.tier` 占位待回填
- **嵌入/重排**:`:8002`/`:8003`;**视频线**:22 号机 Mac MLX `:11435` 等(Wan2.2/Qwen-Image/MiniMax 系,`~/models` 实况)
- **消费协议**:PACK 经 `skills.subset` 按 id 引用 skills-library;失源标 `deprecated` 停引

## 六、快速入口

| 我要… | 去 |
|---|---|
| 看域包定义/复制域包 | 各库 `PACK.md`(母版=电商) |
| 查技能能否复用 | `yyc3-skills-library/YYC3-skills-library-对账表-20261030.md`(129 行) |
| 了解对齐工程全过程 | `_archive/同框对齐工程-2026-10~11/`(完成报告 v1.1.0+审核报告 v1.1+递进总结) |
| 新增行业/场景 | 《YYC3-AI-Family-Agent-8Agent复用-新增行业场景提示词-20261101.md》(本目录) |
| 开新会话接续 | 《YYC3-AI-Family-Agent-新会话衔接提示词-20261101.md》(本目录) |

---

**© 2025-2026 YYC³ Team. All Rights Reserved.**
