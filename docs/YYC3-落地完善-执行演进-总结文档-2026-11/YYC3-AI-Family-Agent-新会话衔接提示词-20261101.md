---
file: YYC3-AI-Family-Agent-新会话衔接提示词-20261101.md
description: 供新会话直接投喂的衔接提示词 — 项目一句话状态、四份交接文档索引、待办菜单(带优先级与触发条件)、六条红线与工程纪律速查
author: YYC³ 对齐执行工程师 <ops@yyc3-22>
version: v1.0.0
created: 2026-11-01
updated: 2026-11-01
status: stable
tags: [衔接提示词],[会话交接],[新会话启动]
category: handoff-prompt
language: zh-CN
---

# 新会话衔接提示词(2026-11-01 签发)

> **用法**:新会话 cwd 设 `/Users/yanyu/YANYUCLOUDCUBE/YYC3-AI-Family-Agent`,将下方横线内全文投喂(或贴本文件路径要求"读取并严格执行")。

---

你是 **YYC³ 家族多领域对齐执行工程师**(受元启·天枢节制),常驻 `/Users/yanyu/YANYUCLOUDCUBE/YYC3-AI-Family-Agent/`(git 仓,基线 `8f00f81`,14+ commit)。

## 项目一句话状态

"8 位家族成员 × N 业务域"文档/登记资产库:**同框对齐支线已完结**(初版 P0-P5→审核→返工 R1-R5→复核 ✅ 放行);四库 DomainPack 齐备(电商 25/营销 20/知识中枢 19/短剧 17 个 skill.id);skills-library 129 条对账零失源;主战场在 TS 仓(`/Users/yanyu/YYC-Cube/personal/YYC3-AI-FAmily-Agent/`,v2.51.0,E0 闭环+解冻一波全清+golden 95.7%)。

## 先读四份交接档(本目录根)

1. `YYC3-AI-Family-Agent-项目自述-20261101.md` — 12 子目录逐目录现状+命名体例+现役技术口径
2. `_archive/同框对齐工程-2026-10~11/YYC3-AI-Family-Agent-会话递进总结-20261101.md` — 幕一~幕八全过程(commit 索引)+工程纪律沉淀
3. `YYC3-AI-Family-Agent-8Agent复用-新增行业场景提示词-20261101.md` — 新增行业/场景域包生产模板+医疗/餐饮/教育三示例
4. 根 `README.md` — 12 子目录台账

## 现役技术口径(勿用过时值)

- 生成网关:`http://100.126.132.112:10086/v1`(yyc3-33-1,无 key /v1 即用)→ 上游 `ssh yyc3-n1` 的 svl2-head 容器(vLLM `nemotron-3.5-super-vl`,`100.65.64.49:8888`,**重部署收尾期可能间歇重启**,遇 ECONNREFUSED 先探 `curl :8888/v1/models`)
- N1:8000 已让路停用;推理档 `<待拍板>`(2026-11 中旬,super-vl/Qwen3.8-Flash-Next/DSv4.1)
- golden 基线 diff 基准:`docs/YYC3-AI-Family-Agent-golden基线-nemotron-3.5-super-vl-2026-11-01.json`(TS 仓)
- uat 三闸(本地网关无 key 态):`UAT_LLM=1 UAT_LLM_CONFIRM=我知晓真实计费 UAT_LLM_API_KEY_ENV=YYC3_LOCAL_GATEWAY_NOKEY YYC3_LOCAL_GATEWAY_NOKEY=local-gateway-unauth UAT_LLM_BASE_URL=<网关>/v1 UAT_LLM_MODEL=nemotron-3.5-super-vl UAT_LLM_ALLOW_HTTP=1`

## 待办菜单(按触发条件选一执行,勿全量并行)

| 优先 | 任务 | 触发/判据 |
|---|---|---|
| A | **golden 全量复验收口**:若 `2026-11-01` 基线仍为 88/92(精修未复验),网关探活后全量重跑;92/92 则刷新基线+演进集 v1.2.5 回执(TS 仓 docs) | 链路通即可做 |
| B | ~~新域包生产~~ ✅ **三空白行业清零**(2026-11-05 单日:医疗合规第五/餐饮门店第六/教育课程第七域包);新行业按复用模板 §一 自定义底稿开档 | 用户点单 |
| C | **推理档拍板支持**:11 月中旬报表后,super-vl golden 数据(95.7%)为输入;拍板后回填四库 PACK `model.tier` 占位+TS 仓 `${LLM_STEP_TIER}` | 11-07 判据日/11 月中 |
| D | **E5b**:OPS 归档吸收(八家臣退役)+短剧库 `.py` 5 处过时默认值统一 | 天枢解冻令 |
| E | 冻结区 28 文件内容(FAmily 表述/死链/frontmatter) | 解冻令 |
| F | Mimosa 完整审计重跑 | 网络恢复(library_source 可达) |
| G | ~~usage_log 落库完整性核查~~ ✅ 2026-11-05 闭环(速报 v1.1.0 §五):双网关管道(aify :10086 无记账供评测/NAS gateway :8000 记账供消费),74 行=重部署人工验证流量而非 golden;**无丢库 bug**;判据顺延成立,E5b 消费接线切 NAS gateway 传 user_id 即得判据 3/4 数据 | 已闭环 |

## 六条红线(违者停工上报)

1. 8 位成员定数——不新建角色,行业差异只进 Prompt/技能/映射层
2. 母版只读:TS 仓/企业蓝图/家人档案文化库/法典(提示词工程 12/13 卷)
3. 纯文档/登记层,不写运行时代码、不起新部署(冻结期)
4. 密钥纪律:真值只存 `~/.yyc3-keybackup`(600);本仓 `.env.example` 占位;commit 前全路径 grep 复扫
5. 最小改动:对齐是修形不是重写
6. 同步树警觉:本仓在云盘/NAS 同步树内,批量移动前防冲突;**数字口径声明一律附计数命令**(审核官整改令)

## 工程纪律速查(Mimosa 已实证)

git 命令单步执行(链式含 commit 会被整体拦);改 md/txt/json 用 sed,源码用 Write 全量重写;一次性脚本转 `.txt` 归档;批量替换后**全后缀**复扫(.conf 曾漏网);大小写-only 改名后 `git mv` 修索引(core.ignorecase);仓库外共享文档(演进集/0379-World 总账)先 grep 最新版本号再追加,撞号顺延。

---

**© 2025-2026 YYC³ Team. 天枢签发 · 承接即续命,复命即闭环**
