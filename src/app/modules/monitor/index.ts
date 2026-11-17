/**
 * @file: index.ts
 * @description: Monitor 模块 barrel · YYC3-AI-Family-HUB 分离版 —— 设备矩阵页面已随分离移除，
 *               仅保留 AI 建议 / SDK 对话 / 统一模型选择器（AI 与运维类目仍在消费）
 * @author: YanYuCloudCube Team
 * @version: v2.0.0
 * @created: 2026-07-25
 * @updated: 2026-11-17
 * @status: active
 * @tags: [module],[monitor],[barrel]
 */

// AI 建议
export { AISuggestionPanel } from './AISuggestionPanel';
export { ActionRecommender } from './ActionRecommender';
export { PatternAnalyzer } from './PatternAnalyzer';
export { SDKChatPanel } from './SDKChatPanel';

// 通用组件
export { UnifiedModelSelector } from './UnifiedModelSelector';
