// ============================================================
// YYC³（YanYuCloudCube™ · 注册商标）
// 言启象限 | 语枢未来 · Words Initiate Quadrants, Language Serves as Core for Future
// 万象归元于云枢 | 深栈智启新纪元
// All things converge in cloud pivot; Deep stacks ignite a new era of intelligence
// ============================================================
// Copyright (c) 2026 YanYuCloudCube™（YYC³）| admin@0379.email
// ============================================================

/**
 * @file: app-brand.ts
 * @description: 品牌常量单一真源（唯一名称 · 双轨取值）— 全端品牌文案统一从此处消费
 * @author: YYC³ Team
 * @version: v3.0.0
 * @created: 2026-11-10
 * @updated: 2026-11-17
 * @status: active
 * @tags: [config],[brand],[ssot]
 *
 * @brief: YYC3-AI-Family-HUB 品牌常量（分离自母项目 YYC3 CloudPivot Matrix Ops 运维面板）
 *
 * @details:
 * - 中文主名：言语云枢·AI Family 智枢 / 品牌英文名：YYC3 AI Family HUB
 * - 技术标识轨：YYC3-AI-Family-HUB / yyc3-ai-family-hub（纯 ASCII）
 * - 产品级 Slogan 仅用于登录页副标、大屏顶部、宣传物料
 * - 文件/目录/容器/镜像名禁用上标字符 ³，一律使用 slug 的 ASCII 形式
 *
 * @exports: APP_BRAND
 */

export const APP_BRAND = {
  /** Web 标签 / APP 中文名（页签固定值，不追加英文或副标题） */
  nameZh: "言语云枢·AI Family 智枢",
  /** APP 英文名（应用商店英文回退名） */
  nameEn: "YYC3 AI Family HUB",
  /** 产品对外正式全称（登录页、版权页、文档封面） */
  fullNameZh: "言语云枢 · YYC3 AI Family HUB 家族智能中枢",
  fullNameEn: "YYC3 AI Family HUB — Family AI Hub",
  /** 产品级 Slogan · 对外品牌版（Family中枢 八魂归一） */
  sloganZh: "八魂归一，云枢乃成",
  sloganEn: "Eight Souls as One, the Hub Complete",
  /** 产品级 Slogan · 对内协同版（交流中心、协同页） */
  sloganOpsZh: "亦师亦友亦伴乐，一言一语一协同",
  sloganOpsEn: "Mentor, Friend, Companion — One Word, One Voice, Together",
  /** 项目唯一技术标识（仓库名 / 文档文件名 / 镜像项目名） */
  projectId: "YYC3-AI-Family-HUB",
  /** 代码内部标识（常量 / 日志 Tag，全小写连字符） */
  slug: "yyc3-ai-family-hub",
  /** 环境变量前缀 */
  envPrefix: "AFH_",
  /** 生产域名（public/CNAME 为唯一真源，本仓 Pages 部署域；分离后待负责人定夺新域） */
  domain: "ops.yyc3.vip",
  author: "YYC³ Team",
  email: "admin@0379.email",
} as const;

export type AppBrand = typeof APP_BRAND;
