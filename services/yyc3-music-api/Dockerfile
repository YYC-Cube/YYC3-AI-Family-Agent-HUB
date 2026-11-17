# ============================================================
# YYC3-AI-FAmily-Agent- Configuration
# 人从众曌众从人 · 亦师亦友亦伯乐
# ============================================================
# @Module  : yyc3-music-api / Dockerfile（monorepo，build context = 仓库根）
# @Author  : YYC3 Team
# @Date    : 2026-11-17
# @License : MIT
# ============================================================

# ── 构建阶段：按 workspace filter 安装 + tsc 编译 ──────────
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
# workspace 清单 + 锁文件 + 服务包描述（filter 安装只需这三样）
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY services/yyc3-music-api/package.json services/yyc3-music-api/
RUN pnpm install --frozen-lockfile --filter @yyc3/music-api
COPY services/yyc3-music-api/tsconfig.json services/yyc3-music-api/tsconfig.build.json services/yyc3-music-api/
COPY services/yyc3-music-api/src services/yyc3-music-api/src
WORKDIR /app/services/yyc3-music-api
RUN pnpm build

# ── 运行阶段：仅产物 + 生产依赖 ────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY services/yyc3-music-api/package.json services/yyc3-music-api/
RUN pnpm install --frozen-lockfile --prod --filter @yyc3/music-api
COPY --from=build /app/services/yyc3-music-api/dist services/yyc3-music-api/dist
WORKDIR /app/services/yyc3-music-api
EXPOSE 3030
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:3030/health || exit 1
CMD ["node", "dist/index.js"]
