---
file: YYC3-AI-Family-Agent-域包与登记技能即插即用封装指南-教科书版.md
description: 主仓资产(七域包×8 人格 Prompt/129+3 登记技能/域红线)如何封装成便捷可用的插件·Skills·本地即插即用——三线封装设计+社区真实数据(2026-11 三轮调研)+落地路线,TS 仓《即插即用封装方案-教科书版》姊妹篇
author: YYC³ 对齐执行工程师 <ops@yyc3-22>
version: v1.1.0
created: 2026-11-16
updated: 2026-11-16
status: stable
tags: [即插即用],[DomainPack],[Skills 封装],[登记层回灌],[教科书]
category: engineering-guide
language: zh-CN
---

> **_YanYuCloudCube_**
> _言启象限 | 语枢未来_
> _万象归元于云枢 | 深栈智启新纪元_

> **定位**:TS 仓教科书(v1.0.0,2026-11-16)回答「内核如何封装为 MCP/Skill/嵌入」;本篇回答它的镜像问题——**「主仓的行业资产如何被消费」**:餐饮店长、医学编辑、课程作者拿到的是**域包**,不是内核。两篇合起来才是完整答案。

# YYC³ 域包与登记技能 · 即插即用封装指南(主仓教科书版)

## 〇、结论先行(30 秒)

**一句话答案**:主仓资产的即插即用 = **三条线,一次对齐**——①每个域包封装成一个**标准 Skill 包**(SKILL.md 开放格式,解包即用,零网络);②129 条登记技能**回灌为 AgentSkills 格式**(与 OpenClaw 托管池同源,字段映射即得);③域 Prompt 作为**场景资源**挂入 TS 仓 `family-server`(MCP 形态的域场景接口)。三线共用的唯一事实源仍是各域 `PACK.md` 与 `family-manifest.yaml`。

| 你的场景 | 首选线 | 最小路径 | 现状 |
|---|---|---|---|
| 我是行业用户(店长/医生/教师),要在 ZCode/Claude 里直接用 | **线 1 · 域包 Skill 化** | 解包 `yyc3-<domain>.skill` → `~/.zcode/skills/` | 🟡 设计就绪(§四),缺打包脚本 |
| 我想复用某条登记技能(如 S-06-121 Odoo 库存) | **线 2 · 登记层回灌** | 解包 dist/backfilled/ 对应目录 → `~/.zcode/skills/` | ✅ 映射器落成:129/129 全量产出(含 S-D 32/P 3),5 条样例已装;发布前建议跑 B6 人格回归(56 例≈3 分钟) |
| 我要程序化调用八家人×域场景(任何 MCP host) | **线 3 · MCP 域场景** | `yyc3-family-server` + 域 Prompt 注入 | ✅ 底座生产就绪(TS 仓 v2.56.0),域挂载随 E5b |

**决策口诀:人用走 Skill(线1),技能复用走回灌(线2),程序走 MCP(线3)——与 TS 仓口诀「access=MCP / procedure=Skill / embed=内核」一一对应。**

---

## 一、未达项与未执行项检索(压缩记录 · 2026-11-16)

> 十天窗口(11-06→11-16)两侧仓的增量与遗留,全部经实测核对。

### 1.1 已达成(并行会话完成,勿重复)

| 项 | 完成情况 | 证据 |
|---|---|---|
| TS 仓 P0:host 接入治本 | H5 握手死锁修复+一键接入脚本+全局 bin 直调(v2.55.0) | `a76f6b8`/`fcc7062` |
| **TS 仓 P1:封装深化全量** | B3 成员技能组+B4 插件装配+A3 HTTP 常驻+C1 脚手架+C2 内核样板(v2.56.0,**门禁 388/388**) | `7bb3996`/`ef664e5` |
| TS 仓《即插即用封装方案-教科书版》 | 含社区数据六块+三形态+路线图,P0/P1 全 ✅ | docs/…教科书版.md |
| npm 双包 2.54.0 上架 latest | M41 持久化+M41.5 serve 循环;`npx yyc3-family-server` 直连 ZCode/Claude | 演进集 v1.2.12 |
| 计量持久化 | `data/metrics-usage.json` 跨进程累计(11-14 复核窗量具) | 演进集 v1.2.10 |

### 1.2 未执行项(按触发条件排队)

| # | 项 | 触发 | 责任侧 |
|---|---|---|---|
| 1 | **同步事故漂移待裁定**(本日发现):工作区被带入 `docs/`(3.0GB/48940 文件)与 `yyc3-ai-family/`(15M)两个巨目录,另有 `网关部署` 无前缀回归、创新范式/演进实施内容移位——已全部退回未暂存,**零入仓**,等您裁定(清理/移位/.gitignore 屏蔽三选) | **用户裁定** | 用户+执行会话 |
| 2 | **本指南三线落地**:线 1 ✅(七包,餐饮/教育已装)/线 2 ✅(129 全量回灌)/线 3 域挂载随 E5b | — | 主仓会话 |
| 3 | 接入后的**真实流量**:TS 仓零流量归因已定案,11-21 复核窗看 `metrics-usage.json` | 11-21 | 用户日常使用 |
| 4 | 判据顺延轮次 2(11-14 已过,判据材料三件在档) | 11 月中拍板 | 天枢 |
| 5 | matrix 前端「千里·伯乐」→「知遇·伯乐」 | 前端迭代 | 前端会话 |
| 6 | 冻结区 28 文件内容/Mimosa 完整审计 | 解冻令/网络 | — |

---

## 二、社区真实数据基准(2026-11 调研 · 主仓视角三轮)

> TS 仓教科书 §二 已给六块(MCP 生态/Skills 生态/ZCode 插件/同类框架/HN 案例/摩擦趋势,20,561 servers、anthropics/skills 195,182 stars 等);本节只补**主仓资产视角**的三轮增量,不重复。

### 2.1 SKILL.md 已是跨平台开放标准(线 1/2 的格式依据)

- Anthropic 为 Claude Code 引入的 SKILL.md 格式**已成为开放标准**(agentskills.io),同一技能文件可跨平台使用;官方文档明确 Skills 用于「把领域专业知识和组织知识打包」——**这正是域包的定义**([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)、[code.claude.com 技能文档](https://code.claude.com/docs/zh-CN/skills))。
- 结构约定:目录 = `SKILL.md(frontmatter: name+description)+ references/ + scripts/ + assets/`,渐进披露;ZCode 四级发现路径 `.zcode/skills → .agents/skills → ~/.zcode/skills → ~/.agents/skills`(TS 仓教科书 §2.3 已实测)。
- 分发侧:marketplace 机制已成主流([skillsmp.com 宣称收录 80,000+ 免费 Skills](https://skillsmp.com)、claudeskillsmarket.com 面向中小企业与代理机构;社区有"6 个自制 skill 起步自建 marketplace"的个人案例)——**域包 skill 包天然可入 marketplace**。

### 2.2 垂直行业 Agent 是被验证的方向(域包的存在依据)

- CRV《Vertical AI Agents: Build One That Reach Production》(2026-08)与《The 2026 Playbook》:垂直 agent 处理**行业术语、法规、工作流**的能力是通用模型不可替代的([crv.com](https://www.crv.com/content/vertical-ai-agents));
- Rasa《Best AI Agents by Vertical》企业指南(2026-03):按行业的监管约束与运营需求选型已成企业标准动作([rasa.com](https://rasa.com/guides/best-ai-agents-by-vertical-the-rmas-enterprise-guide));
- 医疗栈 12 层市场图(2026-10)与餐饮 9-agent 案例:垂直化在具体行业已有完整供给栈;Google Cloud 也开出预建垂直 agent 组合([cloud.google.com/solutions/vertical-ai-agents](https://cloud.google.com/solutions/vertical-ai-agents))。
- **对照**:我们的七域包 = 垂直 agent 的「人格+流程+红线」层,且**七域共享 8 人格内核**——比"每行业一套 agent"的通用做法多一层复用(对标总结 §5.2 已论证)。

### 2.3 OpenClaw 同构(线 2 的零成本依据)

- OpenClaw(394,511 stars/npm 周下载 305 万,TS 仓教科书 §2.4)的 agent 定义 = **IDENTITY.md + SOUL.md + 三层 skills**,SKILL.md 遵循 AgentSkills 规范([docs.openclaw.ai/tools/skills](https://docs.openclaw.ai/zh-CN/tools/skills)、[SOUL.md 指南](https://docs.openclaw.ai/zh-CN/concepts/soul));
- **我们的 129 条登记技能本就源自 OpenClaw 托管池(`~/.openclaw-autoclaw/skills/`)的标准化重写**——回灌 = 把 `yyc3-skill/v1` frontmatter 映射回 AgentSkills 字段,**格式同源,零语义转换**;
- 运行时仓 `yyc3-family-ai-agents/agents/*/`(IDENTITY/SYSTEM/SOUL)与 OpenClaw bootstrap 文件**一一对应**——未来若要"OpenClaw 形态分发",家人档案目录直接可用(退役仓的第二生命)。

---

## 三、主仓资产盘点(封装原料)

| # | 资产 | 规模 | 封装角色 |
|---|---|---|---|
| 1 | 七域包 PACK.md | 7 份七字段(含 role_mapping/skills.subset/model.tier/snapshot) | **线 1 的路由中枢**(skill 内索引层) |
| 2 | 8 人格×7 域 Prompt.md | 56 份可加载 system(真机纪律验证 7/7) | **线 1 的载荷主体** / 线 3 的场景资源 |
| 3 | 登记层 129+3 条 | `yyc3-skill/v1` 五节结构,来源对账零失源 | **线 2 的回灌原料** |
| 4 | 域红线(食安/诚信/适龄…) | 各域 sentinel Prompt 红线节 | 线 1 的**不可剥离件**(封装时整包携带) |
| 5 | 七域 USAGE.md | 快速启动/剧本/速用表 | 线 1 的 references 素材 |
| 6 | 运行时家人档案 | IDENTITY/SYSTEM/SOUL×8(退役中) | 线 3 挂载源(OpenClaw 同构) |

---

## 四、线 1 · 域包 Skill 化(设计定稿,可直接施工)

**目标**:行业用户从拿到包到第一次域内协同 **≤1 分钟,零网络零配置**。

### 4.1 包结构(以餐饮为例,标准 AgentSkills 目录)

```text
yyc3-restaurant-ops/            # name=域包 domain_id(kebab-case)
├── SKILL.md                    # 唯一入口:frontmatter + 路由表
├── references/
│   ├── PACK.md                 # 域定义(七字段,原样拷贝)
│   ├── USAGE.md                # 使用指导(原样拷贝)
│   ├── roles.md                # 8 角色速用表(USAGE §三 合成)
│   └── prompts/                # 56 份域 Prompt 中的 8 份(该域)
│       ├── yyc3-meta-oracle.md
│       ├── yyc3-sentinel.md    # 红线人格(不可剥离)
│       └── …×8
└── assets/                     # (可选)域物料样例
```

### 4.2 SKILL.md 模板(frontmatter 逐字段,skill-creator 约定)

```markdown
---
name: yyc3-restaurant-ops
description: YYC³ 餐饮门店七环运营协同(日报→异常→归因→方案→执行→回访→复盘)。用户提到门店经营/菜品毛利/排班/食安/差评处理/备货预测时使用;含 8 位家人格(知遇·伯乐/智云·守护等)域内分工与红线(食安一票否决)。
---

# 餐饮门店域包(七环运营闭环)

## 何时用本技能
(USAGE §一 原文三行)

## 路由表(提到谁→加载谁)
| 用户提到 | 加载 | 文件 |
|---|---|---|
| 经营编排/方案比选 | 元启·天枢 | references/prompts/yyc3-meta-oracle.md |
| 食安/折扣审批 | 智云·守护 | references/prompts/yyc3-sentinel.md |
| …(8 行,同 PACK §二) |

## 红线(整包不可剥离)
食安红线高于经营目标;守护否决不接受经营理由挑战(见 sentinel Prompt 红线节)。

## 深度定义
references/PACK.md(七字段)· references/USAGE.md(操作指导)
```

**description 纪律**(TS 仓教科书 B2 同款):触发信号前置(pushy)、含域关键词与成员名号、控制在 3 行内。

### 4.3 打包与安装(P0 脚本级)

```bash
# 打包(待施工脚本 tools/pack-domain.py,本指南即其规格书)
python3 tools/pack-domain.py 餐饮门店          # → dist/yyc3-restaurant-ops.zip(确定性)
# 安装(用户侧,任一形态)
unzip yyc3-restaurant-ops.zip -d ~/.zcode/skills/   # ZCode(四级发现最高级)
unzip yyc3-restaurant-ops.zip -d ~/.claude/skills/  # Claude(开放标准同格式)
```

**验收**:新开会话提「店里牛肉进货价涨了怎么办」→ 触发技能 → 按 SKILL.md 路由表加载天枢/万物域 Prompt → 产出含三方案决策卡骨架。**红线回归**:「临期食材先入库行吗」→ 拒绝话术与 sentinel Prompt 一致(对齐 11-06 真机测试基准)。

## 五、线 2 · 登记技能回灌(129 → AgentSkills)

**字段映射表**(打包器核心规格):

| yyc3-skill/v1 | AgentSkills SKILL.md | 变换 |
|---|---|---|
| skill.name(标准名) | frontmatter name | `决策·多方案加权决策编排.Skill` → `yyc3-s01-103-multi-weigh-decision`(kebab,前缀防撞) |
| 五节正文(输入→处理→输出→异常→示例) | 正文(渐进披露:首段=何时用,细节下沉 references/) | 直拷,frontmatter 加 description(=一句话职责+触发词) |
| skill.source | 正文「来源」节 | 保留(溯源是对账制特色,社区包没有的优势) |
| skill.level/granularity | tags | 直映 |

- **实现即回源**:登记层本就是 OpenClaw 池的标准化视图,回灌包与池内原件并存不冲突(我们的版本多五节结构与对账元数据);
- **反哺闭环**:回灌包若在 ZCode/Claude 被用出好实践 → 经 `S-03-102 偏好沉淀` 流程回写登记层——**登记层成为技能的双向枢纽**(池→登记→skill 包→使用→沉淀→登记)。

## 六、线 3 · MCP 域场景(衔接 TS 仓,不重复施工)

- 底座已生产就绪:`yyc3-family-server`(stdio+HTTP 双传输,v2.56.0);
- 主仓侧挂载点(随 E5b):域 Prompt 注入 = family-server 的**场景资源文件**(域包 PACK 作为场景清单,`skills.subset` 作为能力面);
- 近期可做(文档级):在 TS 仓接入指南补「域场景」一节,把本指南 §四 的包结构标注为 MCP 形态的 data 目录候选。

## 七、落地路线

| 阶段 | 动作 | 验收 | 依赖 |
|---|---|---|---|
| **P0(文档级,即刻)** | 本指南落档;线 1 规格定稿(§4.1-4.3 即施工图) | 评审通过 | 无 |
| **P0+(已落地 2026-11-16)** | **ID 桥**:七 PACK role_mapping 已增「职能域卡(E4a)」列(56 行映射,万物标 TS 待补 analysis-reporting);TS 域卡正名千里→知遇全层收敛(40 文件,门禁 388) | §2.2-1 校验通过 | 三仓分析 §2.2 |
| P1(脚本级,一次会话) | `tools/pack-domain.py`(七域七包;**打包时按 ID 桥自动带入 references/profiles/ 域卡,§2.2-2 联动就绪**)+ 线 2 映射器;抽餐饮/教育两包真装 ZCode 验证 | 触发测试+红线回归通过 | 漂移裁定(§1.2-1)=C 已收 |
| P2(分发级) | 七包入 marketplace/Release 附 digest(M32 例行) | 外部一键装 | P1 |
| P3(E5b 域场景) | family-server 域挂载 | MCP 调用域人格 | 第二波解冻 |

## 八、即插即用形态全景(2026-11-16 补全 · 大数据+社区案例)

> 本节回答"多场景即插即用到底有哪些方式"。数据=本指南三轮+TS 仓教科书六块+本轮增量(IDE 插件/容器/Agent Host)。

### 8.1 形态矩阵(九形态 × 真实数据)

| # | 形态 | 载体/安装 | 生态数据(时点) | 适用场景 | YYC³ 对应资产 |
|---|---|---|---|---|---|
| 1 | **MCP 服务器**(stdio) | mcpServers 一行/npx 或全局 bin | mcp.so 收录 20,561 servers;官方参考服务器 92,013 stars;@playwright/mcp 周下载 10.8M | 任何 MCP host 程序化调用工具能力 | TS 仓 `yyc3-family-server`(npm latest ✅) |
| 2 | **MCP 远程(HTTP/SSE)** | URL 直连 | mcp.so 远程托管占 7%;mcp-remote 周下载 172 万 | 多端共享/免本地进程 | 同上 A3 双传输 ✅(v2.56.0) |
| 3 | **Skill 包(开放标准)** | 目录解包 `~/.zcode/skills/` 等 | SKILL.md 成跨平台开放标准(agentskills.io);anthropics/skills 195,182 stars;skillsmp.com 宣称 80,000+ | 人用协同流程(会话触发) | **本指南线 1 七包 ✅(已装 2)**;TS 仓 B1/B3 ✅ |
| 4 | **插件(marketplace)** | `/plugin marketplace add` | ZCode 官方缓存 25 插件/251 SKILL;Claude 插件机制类包管理器 | 团队/公开分发 | TS 仓 B4 `gen-plugin` ✅;主仓 P2 排队 |
| 5 | **npm 双包** | `npm i -g`/`import` | npm 生态周下载以亿计(sdk 89.1M);OpenClaw 周下载 305 万同类最高 | 开发者嵌入/CLI | `@yyc3/ai-family-kernel`+`ai-family-agent` ✅ 2.54.0 |
| 6 | **IDE 扩展(VS Code 系)** | Extension Marketplace | VS Code 开发者环境占 75%;**Cline 装机 5M+**(开源 agent 之最) | 编辑器内协同 | 暂无(见 8.3 建议) |
| 7 | **Agent Host 容器形态** | VS Code 1.137(2026-10)Dev Containers 隔离跑 agent | Docker 使用率 **71.1%**(Stack Overflow 2025,+17pp 榜首) | 沙箱执行/隔离 | Python 仓 docker-compose ✅(家族容器群) |
| 8 | **Python 包** | `pip install` | AutoGen 周下载 4.7 万/CrewAI 60 万 | Python 开发者复用 | Python 仓《13-方案》C 路径(规划) |
| 9 | **docker 镜像** | `docker run` | 同 7(容器即分发) | 自托管全家桶 | Python 仓 deploy ✅ |

### 8.2 社区案例(真实互动)

- **Cline 现象**(VS Code 5M+ 安装):单 IDE 插件形态做到开源 agent 装机之最——**入口离用户越近,采用越大**;佐证 TS 仓教科书"启示 5:低摩擦=分发竞争力";
- **VS Code 1.137 Agent Host**(2026-10):官方将 agent 插件从普通扩展**独立为新分发形态**(隔离容器运行)——"agent 即插件"正在被平台正式建制化,先占标准者吃红利;
- **Strata**(HN 133 分/66 评):"One MCP server for thousands of tools"聚合单入口被认可——TS 仓 45 技能单服务同构;
- **skillsmp.com 8 万+ Skills**:SKILL.md 市场供给爆炸,但**垂直行业 skill 稀缺**(多为开发向)——七域行业包是差异化空位;
- **OpenClaw**(394k stars/周下载 305 万):IDENTITY+SOUL+三层 skills 声明式 persona 被市场验证——主仓登记层/家人档案同构,线 2 回灌顺水推舟。

### 8.3 YYC³ 全资产 × 九形态映射与优先级

| 资产 | 已就绪 | 建议补位 |
|---|---|---|
| TS 内核(45 技能/8 员) | 形态 1/2/3/4/5 ✅ | 6(VS Code 扩展,中期) |
| 主仓七域包 | 形态 3 ✅(七包,已装 2) | 4(P2 入 marketplace)/2(随 E5b) |
| 登记层 129+3 | —(线 2 排队) | 3(回灌包)/4 |
| Python 家臣运行时 | 形态 7/9 ✅ | 8(pip,规划中) |

**优先级建议(附理由+决策建议)**:
1. **P2 域包入 marketplace**——理由:SKILL.md 市场垂直行业 skill 稀缺,七域包是差异化空位,先占位者定义品类;决策建议:新会话触发测试通过后即入,与 P1 收尾同批;
2. **线 2 登记层回灌**——理由:129 条是独有资产、OpenClaw 同源零转换,供给市场稀缺的行业技能;决策建议:P1 验证后紧接,映射器半天工作量;
3. **IDE 扩展(形态 6)**——理由:Cline 证明编辑器入口天花板最高(5M+),但工程量最大;决策建议:**中期项**,待 MCP/Skill 生态成型(有真实用户反馈)后再投,避免入口先行而内容空心。

## 九、红线与反模式(教科书纪律)

1. **人格单一事实源**:线 1 的 prompts/ 是**视图拷贝**,人格定义源仍在域包(主仓)与 family-manifest(TS 仓)——打包器必须从源生成,禁手改副本(TS 仓 B3 同律);
2. **红线整包不可剥离**:任何裁剪不得去掉 sentinel Prompt 与红线节——"精简版域包"是违禁品;
3. **计数纪律延续**:包内 SKILL.md 声明的角色数/技能数附计数命令;
4. **不造私有格式**:目录/ZIP/frontmatter 全按 AgentSkills 开放标准——私有格式是分发毒药(TS 仓反模式 6 同款);
5. **登记层不做运行时**:回灌包教 host「怎么用技能」,执行仍归 host 工具链——登记层保持登记定位;
6. **漂移未裁定前不动工作区**:`docs/`(3GB)与 `yyc3-ai-family/` 保持未暂存,禁止顺手清理。

## 十、附录 · 数据与回链

- 主仓视角三轮调研:[Claude Platform Docs·Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) · [code.claude.com Skills 中文](https://code.claude.com/docs/zh-CN/skills) · [skillsmp.com](https://skillsmp.com) · [claudeskillsmarket.com](https://claudeskillsmarket.com) · [CRV Vertical AI Agents](https://www.crv.com/content/vertical-ai-agents) · [Rasa 垂直企业指南](https://rasa.com/guides/best-ai-agents-by-vertical-the-rmas-enterprise-guide) · [Google Cloud 垂直 agent](https://cloud.google.com/solutions/vertical-ai-agents) · [OpenClaw Skills 文档](https://docs.openclaw.ai/zh-CN/tools/skills) · [OpenClaw SOUL.md](https://docs.openclaw.ai/zh-CN/concepts/soul)
- 姊妹篇:TS 仓《即插即用封装方案-教科书版》(v1.0.0,2026-11-16,社区六块数据+内核三形态)
- 主仓回链:`OPS.md`(运维)·《全领域审核评估与对标总结-20261106》(§5 真机纪律基准)· 各域 `USAGE.md`

---

**© 2025-2026 YYC³ Team. All Rights Reserved.**
