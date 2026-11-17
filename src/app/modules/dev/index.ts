/**
 * @file: index.ts
 * @description: Dev 模块入口 — 统一导出所有公共 API
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-07-25
 * @updated: 2026-07-25
 * @status: active
 * @tags: [module],[dev],[barrel]
 *
 * @brief: Dev 开发工具独立功能模块
 *
 * @details:
 * - 设计系统 (Design System)
 * - 主题定制 (Theme Customizer)
 * - CLI 终端 (CLI Terminal · 2026-11-18 导航更名 Family终端)
 * - IDE 面板（已拆除——落档 36）
 * - 重构报告/架构审计/开发指南（已裁撤——2026-11-18 导航重构，dev 模块路由随裁撤移除）
 */

// 页面组件
export { DesignSystemPage } from './design-system/DesignSystemPage';
export { ThemeCustomizer } from './ThemeCustomizer';
export { CLITerminal } from './CLITerminal';
export { IntegratedTerminal } from './IntegratedTerminal';


// Hooks
export { useTerminal } from './hooks/useTerminal';

// Theme 子模块
export { ColorSwatch } from './theme/ColorSwatch';
export { ColorPicker } from './theme/ColorPicker';
export { formatOklch, hexToOklch, oklchToHex } from './theme/color-utils';
export {
  DEFAULT_BRANDING,
  DEFAULT_COLORS,
  DEFAULT_SHADOW,
  DEFAULT_TYPOGRAPHY,
  THEME_PRESETS,
} from './theme/theme-presets';
export type {
  BrandingConfig,
  ThemeColors,
  ThemePreset,
  ThemeShadow,
  ThemeTypography,
} from './theme/theme-presets';