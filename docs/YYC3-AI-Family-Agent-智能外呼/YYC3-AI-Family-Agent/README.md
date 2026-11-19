---
file: README.md
description: 智能外呼编排总纲 — 8 角色索引表与九环标准链路（线索→分诊→预审→画像→时机→匹配→外呼→质检→留痕）
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-20
updated: 2026-11-20
status: stable
tags: [编排总纲],[智能外呼],[8Agent],[链路]
category: orchestration
language: zh-CN
---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_
> _万象归元于云枢 | 深栈智启新纪元_

# 智能外呼编排总纲

> 本文件为智能体区索引与链路定义。8 位成员人格内核来自总仓 `yyc3-family-ai-agents/agents/`，此处仅换绑域 Prompt。

## 一、8 角色索引

| 目录 | 家族成员 | 家族角色 | 域职能 |
|---|---|---|---|
| [yyc3-yuanqi-tianshu](./yyc3-yuanqi-tianshu/) | 元启·天枢 | 总指挥 | 外呼编排总控、三态裁决 |
| [yyc3-zhiyun-shouhu](./yyc3-zhiyun-shouhu/) | 智云·守护 | 安全官 | 合规预审、一票否决 |
| [yyc3-yujian-xianzhi](./yyc3-yujian-xianzhi/) | 预见·先知 | 预言家 | 时机与转化概率预测 |
| [yyc3-yushu-wanwu](./yyc3-yushu-wanwu/) | 语枢·万物 | 思考者 | 画像洞察与通话归因 |
| [yyc3-gewu-zongshi](./yyc3-gewu-zongshi/) | 格物·宗师 | 质量官 | 话术质检与坏例回流 |
| [yyc3-zhiyu-bole](./yyc3-zhiyu-bole/) | 知遇·伯乐 | 推荐官 | 客户-坐席-时段匹配（执行层） |
| [yyc3-yanqi-qianhang](./yyc3-yanqi-qianhang/) | 言启·千行 | 导航员 | 意图识别与路由（第一触点） |
| [yyc3-chuangxiang-lingyun](./yyc3-chuangxiang-lingyun/) | 创想·灵韵 | 创意官 | 话术与跟进内容生成 |

## 二、九环标准链路

```text
① 线索导入 ──→ ② 意图分诊 ──→ ③ 合规预审 ──→ ④ 客户画像
  (外部/CRM)      (千行 L1)       (守护 L0+否决)    (万物 L0-L1)
                                                       │
⑨ 留痕 ←── ⑧ 话术质检 ←── ⑦ 外呼执行 ←── ⑥ 三态裁决 ←── ⑤ 时机与匹配
(全部落库)    (宗师 L1)      (运行时)      (天枢 L3)     (先知+伯乐)
```

| 环节 | 责任角色 | 输入 | 输出 | 失败处理 |
|---|---|---|---|---|
| ① 线索导入 | — | CRM/名单/表单 | 标准化线索 | 格式校验拒绝 |
| ② 意图分诊 | 言启·千行 | 线索要素 | 意图标签 + 置信度 | 低置信→人工复核 |
| ③ 合规预审 | 智云·守护 | 线索 + 话术 | 通过/拒绝 + 理由 | 拒绝即终止（不可覆盖） |
| ④ 客户画像 | 语枢·万物 | 历史交互 | 画像 + 风险标记 | 缺失→标记待补 |
| ⑤ 时机与匹配 | 预见·先知 + 知遇·伯乐 | 画像 | 时段 + 坐席建议 | 无匹配→排队 |
| ⑥ 三态裁决 | 元启·天枢 | 前序全部产出 | 呼/缓呼/转人工 | 冲突→保守（缓呼） |
| ⑦ 外呼执行 | 运行时（Next.js API） | 拨打指令 | 通话记录 | 失败→重试策略 |
| ⑧ 话术质检 | 格物·宗师 | 通话转写 | 质检分 + 坏例 | 不合格→回流话术 |
| ⑨ 留痕 | 全族 | 全链路事件 | `audit_logs` / `interactions` | 缺失即阻断发布 |

## 三、协作模式

| 模式 | 适用 | 说明 |
|---|---|---|
| parallel | 画像补全 + 时机预测 | 无依赖，可并发 |
| sequential | 合规预审 → 三态裁决 | 存在硬闸依赖 |
| hierarchical | 天枢统一裁决 | 多角色结论冲突时 |
| consensus | 高价值客户复核 | 守护 + 宗师 + 天枢三方一致 |

## 四、红线

1. **守护否决不可被下游覆盖**（合规优先于转化率）；
2. **拒呼即合规**：命中禁呼条件必须终止并留痕；
3. 伯乐只做匹配，不直接发起外呼；
4. 所有外呼行为必须可追溯（时间、坐席、话术版本、结果）。

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
