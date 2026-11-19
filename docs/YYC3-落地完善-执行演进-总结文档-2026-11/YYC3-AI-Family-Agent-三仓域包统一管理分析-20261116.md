---
file: YYC3-AI-Family-Agent-三仓域包统一管理分析-20261116.md
description: TS 仓(职能域卡/manifest/成员技能)与 Python 仓(家臣运行时/evals/三路径封装)对比主仓七行业域包——优势分析与三层统一域包管理体系方案(语义层→参数层→执行层)
author: YYC³ 对齐执行工程师 <ops@yyc3-22>
version: v1.0.0
created: 2026-11-16
updated: 2026-11-16
status: stable
tags: [三仓统一],[域包管理],[ProfileRegistry],[家臣运行时],["对比分析"]
category: analysis-report
language: zh-CN
---

> **_YanYuCloudCube_** _言启象限 | 语枢未来_
> 分析对象:`personal/YYC3-AI-FAmily-Agent`(TS 五支柱,会话 session_2c75f186…)+ `personal/YYC3-Family-AI-Agents`(Python 运行时,会话 session_516cca80…)对比主仓七域包;两仓 git/文档实测 2026-11-16。

# 三仓域包统一管理分析(2026-11-16)

## 〇、结论先行

**Q1 能否统一管理?——能,且不是合并而是"正交分层":三仓各自持有域包体系的一层,拼成 7 行业域 × 8 职能域 × 8 家臣人格的立方体。**
**Q2 两仓的优势?——TS 仓赢在"机器可读+一致性工具链+计量原生",Python 仓赢在"活运行时+人格量化评估";主仓独有"行业语义深度+红线设计+对账制"。三者是语义→参数→执行的关系,不是竞争关系。**

```
主仓(曌)      七【行业】域包:餐饮/医疗/教育/电商/营销/知识中枢/短剧   ←语义层(哪个行业·什么红线)
TS 仓(内核)   八【职能】域卡(E4a)+family-manifest(69 条)          ←参数层(什么画像·什么档位·计量口径)
Python 仓(运行时) 1+8 家臣(IDENTITY/SYSTEM/SOUL)+evals            ←执行层(谁在跑·跑得合不合格)
```

## 一、三仓域包资产实测清单(2026-11-16)

| 资产 | 主仓 | TS 仓(v2.56.0) | Python 仓(#50) |
|---|---|---|---|
| 域定义载体 | 7 份 PACK.md(七字段,人读 md) | **8 张职能域卡 YAML**(`presets/profiles/domains/`:talent-matching/brand-content/compliance-scan/intent-routing/investor-briefing/ops-decision/quality-audit/trend-forecast) | 8 家臣三件套(IDENTITY/SYSTEM/SOUL) |
| 清单/事实源 | 各 PACK+对账表(129+3) | **family-manifest.yaml(69 条 id)**,人格单一事实源 | agents/* 目录即事实源 |
| 已上架技能 | 线 1 规格定稿(未打包) | **~/.zcode/skills/ 已装 9 个**(yyc3-ai-family-coding+8 成员视图,B3) | 尚未封装(方案刚立) |
| 封装方案 | 教科书姊妹篇(三线,`c891330`) | 教科书版(三形态 MCP/Skill/内核,P0/P1 全 ✅) | **《13-插件化封装方案》(三路径:MCP 服务/Claude 插件/Python 包×五步)** |
| 一致性工具 | 审计脚本(会话级人肉) | **skills:gen/manifest:check/member:check 零漂移门禁(388 例)** | evals(golden/judge/memory) |
| 计量 | model.tier 文字建议 | **域卡 tier/budget+llm-assisted@profileId 分口径计量(过门禁)** | usage/治理中枢计量 |
| 评估 | sentinel 纪律点测 7/7(11-06) | golden 92 题+方差带 | **judge_consistency(人格一致性 87.5%)/LongMemEval(100/100)** |

## 二、Q1 · 统一域包管理方案(三层正交,一处登记)

### 2.1 为什么是"正交分层"而非"合并"

- 主仓七域是**行业轴**(restaurant-ops/healthcare-compliance…),TS 八卡是**职能轴**(talent-matching/ops-decision…),命名空间天然不冲突且语义正交——一个餐饮伯乐 = `restaurant-ops`(主仓)× `talent-matching`(TS)× `zhiyu-bole`(Python),**56 个组合无需 56 份拷贝**;
- 主仓 PACK.role_mapping(8 行×域职能)实际上就是这张矩阵的**行业切片**;TS 域卡是**职能切片**;两边已经在描述同一个立方体,只是没人把它们连起来。

### 2.2 统一机制(三件套,全部轻量)

1. **ID 桥**(主仓侧动作):各 PACK 增一节 `profile_refs`,8 行各注对应 TS 域卡 id(如餐饮-伯乐行 → `talent-matching`)——md 对 YAML 的显式引用,机器可校验(域卡文件在则引用有效);
2. **打包器联动**(教科书线 1 扩展):`pack-domain.py` 打行业包时,按 profile_refs 自动把对应职能域卡 YAML 拷入 `references/profiles/`——行业用户开箱即得"行业语义+职能参数"双层;
3. **对账行**(登记层扩一列):skills-library 对账表加"三仓消费"列(某 id 被哪个 PACK 引用/哪个 manifest 条目派生),让 129+3 条真正成为**三仓共享的能力注册表**。

### 2.3 不统一的边界(防过度设计)

- **不建中央仓库/不改三仓自治**:三仓各有 git 与节奏,统一只在"引用层"(ID 桥+打包联动),任何仓不成为另一仓的瓶颈;
- **不复制家臣人格**:Python 仓 IDENTITY/SOUL 是执行层内部事实源,主仓只引名号(命名红线已有),不拷贝——人格单一事实源原则(TS 仓教科书红线 2 同律)。

## 三、Q2 · 两仓对比七域包的真实优势

### 3.1 TS 仓优势(参数化与一致性,主仓短板的正面补位)

| # | 优势 | 证据 | 主仓对应短板 |
|---|---|---|---|
| 1 | **机器可读可执行**:域卡 YAML 被运行时直接消费(换档分口径过门禁 v2.49.0) | profiles/domains/*.yaml | PACK.md 是 md,运行时解析靠人转译(E5b 前不能直接驱动执行) |
| 2 | **派生零漂移工具链**:skills:gen→skills:check→member:check,388 例门禁兜底 | pnpm 命令组 | 主仓一致性靠"审计脚本+计数纪律"的人工回路 |
| 3 | **计量原生**:tier/budget/`llm-assisted@<profileId>` 分口径计数器 | E4a 换档演示双例 | 主仓 model.tier 是建议文字,无计量挂钩 |
| 4 | **成员技能已上架**:9 个 skill 已在 `~/.zcode/skills/` 生效 | 本机实测 | 主仓线 1 尚在规格(教科书 §四) |
| 5 | **边缘成员管线**(E2a):非核心角色四闸门禁化生产 | presets/EDGE-MEMBERS.md | 主仓 8 员定数(红线),无角色扩产路径——TS 补上了"不破红线的扩" |

### 3.2 Python 仓优势(运行时与评估,主仓"纯文档"的天花板外)

| # | 优势 | 证据 | 主仓对应短板 |
|---|---|---|---|
| 1 | **活的家臣运行时**:治理中枢(审计/预算/熔断)+A2A+记忆,生产容器在跑 | deploy/dashboard/grafana | 七域包纯文档(短剧组件除外),E5b 前无执行 |
| 2 | **人格量化评估方法学**:judge_consistency(E1-2 达 87.5%)/SYSTEM 边界红线加固/拒绝语境豁免 | #38/#40 | 主仓纪律验证=7/7 点测(一次性),无持续人格回归 |
| 3 | **记忆评估**:LongMemEval 100/100 | run_memory_eval | 主仓无人格记忆面 |
| 4 | **第三种封装路径**:Python 包(C 路径)面向最大开发者群体;A 路径(MCP 服务)已实现线上 | 《13-插件化封装方案》 | 主仓教科书三线未覆盖 Python 生态 |
| 5 | **运维实件**:docker/systemd/dashboard 比主仓 OPS.md 手册更"硬" | ops.sh/deploy | — |

### 3.3 主仓不可替代的独有优势(对比的天平另一端)

七行业域的**语义深度**(九环/七环/六环域链路、域红线设计如食安法条/学术诚信)、**129+3 对账制**(来源治理)、**行业文档工程**(USAGE/剧本/自检)——两仓都没有;TS 域卡无行业概念,Python 家臣无域知识。**这就是"曌"的位置:语义首都,参数与执行在两翼。**

## 四、落地建议(按优先级)

1. ~~**P0·ID 桥**~~ ✅ 已落地(2026-11-16 晚):七 PACK role_mapping 增「职能域卡(E4a)」列(56 行,万物如实标 TS 待补 analysis-reporting);TS 正名收敛范围远超一处注释——**生产资产全层 40 文件**(family-manifest/8 域卡/packaging 全部/family-agents member-bole 19+qianhang 3/CONTRIBUTING),manifest:cards+member-skills 重派生,**regression 388/388 全绿**(TS commit 3d1fa80);
2. **P1·打包器联动**:教科书线 1 施工时实现 §2.2-2(餐饮样板包带 profiles);
3. **P2·对账表扩列**+三仓消费列;
4. **P3·评估方法学移植**:把 Python 仓 judge_consistency 方法借来评七域 sentinel 人格(从"点测 7/7"升格为"持续回归")——不打扰 Python 仓,只借方法。

## 五、结论

三仓不是三个域包体系,而是**一个域包立方体的三个面**:主仓给血肉(行业语义与红线),TS 仓给骨骼(参数与一致性),Python 仓给双腿(执行与评估)。统一管理 = 一张 56 格映射表 + 打包器联动 + 对账表扩列——**三天工作量,换来"封装教科书三线"全部拥有三仓合力**。

---

**© 2025-2026 YYC³ Team. All Rights Reserved.**
