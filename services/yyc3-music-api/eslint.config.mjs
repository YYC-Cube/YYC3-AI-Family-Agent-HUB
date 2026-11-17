// ============================================================
// YYC3-AI-FAmily-Agent- Configuration
// 人从众曌众从人 · 亦师亦友亦伯乐
// ============================================================
// @Module  : yyc3-music-api / eslint
// @Author  : YYC3 Team
// @Date    : 2026-11-17
// @License : MIT
// ============================================================

import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "coverage/**"] },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
);
