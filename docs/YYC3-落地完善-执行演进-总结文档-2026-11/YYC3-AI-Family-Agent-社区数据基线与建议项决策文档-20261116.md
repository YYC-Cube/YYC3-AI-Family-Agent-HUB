---
file: YYC3-AI-Family-Agent-社区数据基线与建议项决策文档-20261116.md
description: 即插即用生态社区真实数据基线(2026-11 四轮调研全量汇总,含来源)与建议项决策档案——每项含优势分析/详细执行链路/预期结果评估,分决策性与演进性,状态跟踪位供后续会话同步继承
author: YYC³ 对齐执行工程师 <ops@yyc3-22>
version: v1.0.0
created: 2026-11-16
updated: 2026-11-16
status: active
tags: [数据基线],[建议项],[决策档案],[状态跟踪],[会话继承]
category: decision-registry
language: zh-CN
---

> **_YanYuCloudCube_** _言启象限 | 语枢未来_
> 本文档是**活文档**:§三 状态跟踪位由后续每次会话同步更新(会话继承契约,已入记忆)。
> 数据口径:2026-11 四轮调研(TS 仓教科书六块 2026-11-16 + 主仓三轮 2026-11-16);网络数据均有时点标注,引用请带时点。

# 社区数据基线与建议项决策文档(2026-11-16)

## 一、社区真实数据基线(全量汇总 · 附来源)

### 1.1 分发形态生态数据

| 形态 | 指标 | 数据(时点) | 来源 |
|---|---|---|---|
| MCP 生态 | servers 总数/远程托管/clients | **20,561** / 7%(1,446)/ 395 | mcp.so(2026-11-15) |
| MCP 生态 | 官方参考服务器 stars | **92,013** | github.com/modelcontextprotocol/servers |
| MCP 生态 | awesome 清单 stars | **97,731** | punkpeye/awesome-mcp-servers |
| MCP 生态 | npm 周下载(11-08~14) | sdk **89.1M** · @playwright/mcp 10.8M · filesystem 1.27M · context7 1.22M · **mcp-remote 1.72M** | api.npmjs.org |
| MCP 生态 | SDK stars | TS 13,770 / Python 24,868 | modelcontextprotocol |
| 摩擦实测 | npx preferOnline 断网回退 | **~70 秒**(钉死版 1.3s→72.3s);Claude Code 30s 判败;11 并发 npx **6/11 超时** | blog.peng.ly / claude-code #60244 |
| Skills 生态 | anthropics/skills | **195,182 stars** / 19 技能+spec+template | github |
| Skills 生态 | 聚合目录 | awesome-agent-skills **37,206** | VoltAgent |
| Skills 生态 | 社区 marketplace | skillsmp.com 宣称 **80,000+** 免费 Skills;claudeskillsmarket.com 面向中小企业 | skillsmp.com |
| Skills 生态 | 开放标准 | SKILL.md 成跨平台标准(agentskills.io);结构=SKILL.md+references/scripts/assets,渐进披露 | Anthropic 工程博客 2025-10-16 |
| 宿主 | claude-code 155,759 / openai-codex 135,389 stars | — | GitHub |
| IDE | VS Code 开发者环境占比 | **75%**(Stack Overflow 2025,n=49,000+) | stackoverflow.co 调查 |
| IDE | Cline 装机 | **5M+**(Marketplace 开源 agent 之最) | VS Code Marketplace |
| IDE | VS Code 1.137(2026-10) | **Agent Host**:agent 插件独立为新分发形态(Dev Containers 隔离) | VS Code 官方 |
| 容器 | Docker 使用率 | **71.1%**(+17pp 榜首,"近乎普及") | Stack Overflow 2025 |
| 框架 | 同类多 Agent | OpenClaw **394,511 stars/周下载 3,056,454**(最高)· OpenHands 93,511/79,089 · MetaGPT 71,282/633 · AutoGen 61,851/46,860 · CrewAI 60,950/**601,103** · ChatDev 34,748/18 · CAMEL 18,034/12,442 | GitHub API+registry(2026-11-16) |
| 案例互动 | HN | Strata **133 分/66 评**(聚合单入口)· InsForge 62 分/7 评(部署即插即用) | news.ycombinator.com |
| 垂直共识 | 行业报告 | CRV(2026-08)/Rasa 企业指南(2026-03)/GCloud 垂直 agent 组合/医疗 12 层市场图(2026-10) | crv.com 等 |

### 1.2 三条经数据验证的规律(决策依据)

1. **低摩擦=分发竞争力**(Cline 5M+/OpenClaw 305 万/npx 70 秒反面):第一条调用发生的时间决定采用;
2. **声明式 persona 胜过代码式**(OpenClaw/CrewAI 走 YAML/md 年下载百万级,MetaGPT/ChatDev 代码式近零):YYC³ manifest+域包 md 正确站队;
3. **垂直行业 skill 供给稀缺**(8 万+市场以开发向为主):七域包是空位品类。

## 二、建议项决策档案(每项五要素)

> 分类:**[D]=决策性**(需拍板/跨仓/有窗口)**[E]=演进性**(条件触发例行推进)**[R]=例行**。

### B1 · [D] 七域包入 marketplace(原 P2)
- **优势分析**:垂直行业 skill 稀缺(规律 3),七包先占位即定义品类;SKILL.md 开放标准+ZCode/Claude 双市场通吃;边际成本极低(打包器已产 zip,只差 marketplace.json+仓库挂载)。
- **执行链路**:①新会话触发测试(用户侧一句话验证餐饮包)→②`gen-plugin` 式生成 `.zcode-plugin/plugin.json`+marketplace.json(参照 TS 仓 B4)→③七包+marketplace 清单入对外仓库(或先入 YYC-Cube org 内部仓)→④README 分发页(安装一行命令)→⑤digest 公示(对齐 M32 例行)。
- **预期结果评估**:两市场可发现/可一键装;预期 30 天内自然安装 ≥10 次(保守基线,垂直品类冷启动);风险:曝光为零→消化方案=挂 README 徽章+awesome 清单 PR。
- **依赖**:触发测试通过。**状态**:☐ 未启动

### B2 · [E] 线 2 登记层回灌(129→AgentSkills 包)
- **优势分析**:129 条是独有资产(五节结构+来源对账,市场包没有的治理深度);OpenClaw 同源**零语义转换**(映射表已在教科书 §五);产出=行业技能供给稀缺的直接回应。
- **执行链路**:①`tools/backfill-skills.py`(映射器:yyc3-skill/v1→AgentSkills frontmatter,kebab 命名防撞)→②批量产 129 目录+索引 SKILL(可选伞形包)→③抽 5 条真装验证(S-06-121/S-05-102 等)→④与托管池原件 diff 存档(证明增量=五节结构)。
- **预期结果评估**:一次会话完成;技能市场获 129 条带溯源的中文技能;回写闭环(使用→偏好沉淀→登记层)启动;风险:名称冲突→已用 `yyc3-` 前缀规避。
- **依赖**:B1 无依赖可并行。**状态**:☐ 未启动

### B3 · [D] 万物职能域卡补位(`analysis-reporting`)
- **优势分析**:立方体唯一缺格;补齐后 ID 桥 56/56 完整、七包域卡 8/8 带齐。
- **执行链路**:①主仓起草卡 YAML(对齐 E4a 八卡格式:tier/style/prompt_anchors 三锚)→②交 TS 仓会话按其 profiles 管线入库+profiles:check→③主仓重跑打包器(七包域卡自动 8/8)。
- **预期结果评估**:半天;三仓立方体闭合;风险:跨仓评审节奏→草案先行不阻塞。
- **依赖**:TS 会话配合。**状态**:☐ 草案可即出

### B4 · [D] IDE 扩展(VS Code 系,中期)
- **优势分析**:Cline 证明编辑器入口天花板(5M+);VS Code 1.137 Agent Host 新形态红利窗口;YYC³ MCP 底座已双传输,扩展=壳。
- **执行链路**:①封装选型(Extension 承载 MCP client 连 yyc3-family-server)→②最小可用:侧栏八家人会话+域包切换→③Marketplace 发布→4)对标 Cline 差异位=「家族协同+域红线」。
- **预期结果评估**:2-4 周工程;预期装机曲线保守 1k/季(有 Cline 先例背书形态);风险:投入产出比→**决策建议维持中期项,触发条件=MCP/Skill 形态累计真实用户 ≥50**。
- **依赖**:B1/B2 生态成型。**状态**:☐ 挂起(触发条件明示)

### B5 · [E] E5b 域场景 MCP 挂载(随第二波解冻)
- **优势分析**:形态 2(远程 MCP)增长 7%/mcp-remote 172 万周下载;域 Prompt 挂入 family-server 后,九形态第 2 格对七域闭合。
- **执行链路**:解冻令后①family-server 增场景资源装载(域 PACK 为清单)→②三闸挂域 Prompt→③NAS gateway 传 user_id(判据 3/4 数据源)→④两周积累复核。
- **预期结果评估**:判据补齐+消费流量从 0 起步(11-21 复核窗衔接);风险:解冻窗口未知。
- **依赖**:第二波解冻令。**状态**:☐ 排队

### B6 · [E] judge_consistency 方法移植(七域人格持续回归)
- **优势分析**:Python 仓已证方法有效(87.5% 达标+拒绝语境豁免);主仓现状=一次性点测(7/7),移植后红线纪律成 CI 资产。
- **执行链路**:①借其评测器设计(不搬代码)写主仓 `tools/persona-regression.py`(七域 sentinel×诱惑题集,题集入库版本化)→②真机跑(经 aify)→③阈值基线化,入打包前门禁。
- **预期结果评估**:人格回归 56 用例(7 域×8 题);预期首跑 ≥90% 合格;风险:模型换代漂移→正因如此才要回归。
- **依赖**:无(可即做)。**状态**:☐ 未启动

### B7 · [R] 11-21 复核窗 | **状态**:☐ 11-21 当日
`cat ~/YYC-Cube/.../data/metrics-usage.json` 对照判据表;TS 仓教科书 P0 既定观察点。

### B8 · [R] matrix 前端千里→知遇正名 | **状态**:☐ 前端迭代顺带

### B9 · [D] 同步漂移后处理(docs/ 3GB+yyc3-ai-family/,裁定=C 屏蔽中)
- **优势分析/链路**:裁定 A 清理(停同步→删→复查)/B 移位入档(按新结构重写台账);**评估**:A 十分钟,B 半天+台账重构。
- **状态**:☐ 屏蔽中(用户令 C)

### B12 · [D] 四仓统一许可证 YFPL-1.0(2026-11-17 用户令+已落地)
- **优势分析**:原四仓全为纯 MIT——代码全开放但 AI-Family 文化与 UI 设计**零保护**;YFPL-1.0 双轨制(源代码 MIT 轨+品牌文化保护轨)既保社区开放度又保留独有 IP;对标业内"source-available + reserved assets"成熟实践(Unreal/Elastic/Figma 模式)。
- **执行链路**:①设计 YFPL-1.0 文本(定义/双轨/分发要求/商业授权通道 admin@0379.email/附录 A 品牌清单)→②四仓部署(HUB/TS/Python/主仓)→③npm package.json license 字段同步→④Family-Docs 建仓时随附(附录 A 已列)。
- **预期结果评估**:AI-FAmily 真实截图 18 张/九层态势环 UI/八成员人格档案/藏字联/智慧工坊之歌/创世法典全部进入**保护轨**;fork 可继续但须移除品牌资产;商业联名有明确授权通道。
- **依赖**:无。**状态**:✅ 已落地(四仓部署+HUB/TS npm 字段同步;commit 主仓/TS `1b14cc7`/Python/HUB 四笔)
- **注意**:npm 已发布包(2.54.0)保持原 MIT 授权历史不变;新版本起适用 YFPL-1.0——npm license 字段新版本生效。

### B13 · [D] HUB 业务空间八域包迁移(2026-11-18 启动,Phase 0 已落地)
- **优势分析**:HUB 业务空间 8 项此前全是 PlannedModulePage 占位(落档 49);八域包已审核放行+真机验证(餐饮 113 行作战本)。接入即让"规划中"变"已就绪",这是 HUB 从"框架壳"变"业务平台"的关键一步;路由路径已预留,零改造成本。
- **执行链路(三阶段)**:Phase 0 数据可视化(✅ 已落地)——主仓 `tools/export-domain-json.py` 导出 domain-packs.json(8域/64角色/64份完整人格载荷)→ HUB DomainWorkspacePage 读取渲染(角色路由表+可展开 Prompt)+Sidebar 徽标 planned→ready;Phase 1 对话接入——复用 HUB 现有 SDKChatPanel 流式基建,选域→选角色→注入人格 Prompt→网关三闸调用(aify :10086);Phase 2 会话记忆与域内多轮——按域隔离上下文,接 NAS gateway 传 user_id(判据 3/4 数据源)。
- **预期结果评估**:Phase 0 已完成——type-check 通过+新增 5 例测试+全量 252 文件 4350 例全绿;用户可见"已就绪"徽标+8 角色人格可读可复制;Phase 1 完成后 HUB 内即可直接域内对话(消除"域包只能命令行用"的最后一跳)。
- **依赖**:Phase 1 需确认 HUB 现有模型网关配置(useBigModelSDK/网关地址)。
- **状态**:Phase 0 ✅(HUB `8728a39` / 主仓 `882f14e`);**Phase 1 ✅(HUB `8fb44e3`,2026-11-18)**:DomainChatPanel 落地——角色人格 Prompt 注入 system+多轮对话+切角色清会话,经 HUB 统一 `callConfiguredModel` **自动适配四类网关**(DeepSeek 官方/智谱官方/本地 Ollama 原生 /api/chat/YYC 多节点,含 openai+anthropic 双格式与同源反代);未激活模型引导跳 /models;新增 6 例测试,全量 **253 文件 4356 例全绿**。Phase 2 ☐(会话持久化+按域隔离+NAS gateway 传 user_id 补判据 3/4)

### B14 · [D] 与 YYC3 全端台账衔接(2026-11-18 已完成)
- **优势分析**:`~/models/YYC3-OPS/00-YYC3-终极台账.md`(v1.2.0,八维)与数据库台账是**全端上位权威源**;本仓此前 OPS/PACK 自持端点口径,已产生真实分裂(N2:8100 实机不存在)。对齐后:本仓只管域包层,硬件/模型/数据一律引用上位台账,单一事实源。
- **执行链路**:①OPS 增 §〇 权威源指针表(9 条上位源+7节点21模型速览)→②§二 校正现役口径(122B/DGX super-vl/77 兜底)+数据面注(NAS PG17 主库)→③§三 补 HUB 四类网关消费面→④§九 故障表 +6 行(PG 只读误连/升主 11s/复制 lag/kb/端口锁/备份)→⑤八包 PACK model.tier 加删除线+校正注+权威源改指。
- **预期结果评估**:已完成——本仓与上位台账口径统一;域包 model.tier 不再传播失效端点;数据库读写纪律(PG 主库 45/从库 22)入运维手册。
- **依赖**:无(全文档级)。**状态**:✅ `3e4e7c7`

### B10 · [D] 推理档拍板(2026-11 中旬,外部触发)
材料三件在档(golden 方差带 94.6~95.7%/判据终版 v1.2.0/数据路径);拍板后回填四 PACK+tier 占位。**状态**:☐ 等报表

## 三、状态跟踪表(后续会话同步更新本表 · 继承契约)

| 项 | 状态 | 更新会话/日期 | 备注 |
|---|---|---|---|
| B1 触发+marketplace | ✅ 触发测试 PASS(六字触发→主动调用→纪律涌现 10/10,六项逐字);marketplace 尾段待入 | 本会话 11-16 | 评估报告已落档 |
| B2 回灌 | ✅ 映射器+129 全量产出+5 条已装 | 本会话 11-16 | marketplace 入册随 B1 |
| B3 万物卡 | ☐ | — | 草案可即出 |
| B4 IDE 扩展 | ☐ 挂起 | — | 触发=真实用户≥50 |
| B5 E5b | ☐ | — | 等解冻令 |
| B6 人格回归 | ✅ 56/56=100%(题集 v1.0.1+拒绝语境豁免;首跑基线 94.6% 零真违规) | 本会话 11-16 | 门禁阈值 ≥95% |
| B7 复核窗 | ☐ | — | 11-21 |
| B8 前端正名 | ☐ | — | 例行 |
| B9 漂移 | ☑ 屏蔽 + **部分已入档** | 本档 11-18 | 裁定 C;`beede52` 随 DGX 实测批带入 50 项工作区改名:创新范式/演进实施补 `Agent` 前缀(方向合规),**网关部署去 `archive-` 前缀(取消归档语义,待在档 README 告示保留,待用户确认是否重申)**;`docs/` 3GB 与 `yyc3-ai-family/` 仍屏蔽 |
| B10 拍板 | ☐ | — | 等报表 |
| B14 全端台账衔接 | ✅ | 11-18 | OPS 权威源指针+八包 model.tier 校正 |
| B13 HUB 域包迁移 | Phase 0 ✅ / Phase 1 ✅ / Phase 2 ☐ | 11-18 | 8 域可视化+就绪徽标+**域内对话(四类网关自动适配)**;Phase 2=会话持久化/域隔离/user_id |
| B12 YFPL 许可证 | ✅ 四仓落地+**注册商标执法口径升格**(11-17:引用 YANYUCLOUDCUBE 注册商标 89467384-88 五类,专用权至 2036-07-13) | 11-17/18 | Family-Docs 随附;五类恰覆盖域包生态(09软件/35营销/38通讯/41教育/42设计) |

---

**© 2025-2026 YYC³ Team. All Rights Reserved.**
