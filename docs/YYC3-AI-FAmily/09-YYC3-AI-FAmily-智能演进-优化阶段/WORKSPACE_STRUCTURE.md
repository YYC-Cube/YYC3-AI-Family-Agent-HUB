---
file: WORKSPACE_STRUCTURE.md
title: YYC3 CloudPivot Intelli-Matrix 工作区结构说明
description: YYC3 CloudPivot Intelli-Matrix 工作区结构说明文档，包含项目目录结构、
author: YYC3 Team <admin@0379.email>
version: v2.0.0
created: 2026-03-25
updated: 2026-11-08
status: stable
tags: [工作区结构, 目录结构, 文件组织, 归档管理]
category: project
language: zh-CN
audience: developers,managers
complexity: intermediate
project: YYC3-CloudPivot-Intelli-Matrix
scope: engineering
---

# YYC3 CloudPivot Intelli-Matrix 工作区结构说明

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 📁 工作区结构

```
YYC3-CloudPivot-Intelli-Matrix/
├── 📁 src/                          # 源代码目录
│   ├── app/                         # React 应用
│   │   ├── components/              # React 组件
│   │   ├── hooks/                   # 自定义 Hooks
│   │   ├── lib/                     # 工具库
│   │   ├── types/                   # TypeScript 类型定义
│   │   ├── i18n/                    # 国际化
│   │   └── __tests__/               # 单元测试
│   ├── styles/                      # 全局样式
│   └── main.tsx                     # 应用入口
│
├── 📁 electron/                     # Electron 主进程
│   ├── main.ts                      # 主进程入口
│   ├── preload.ts                   # 预加载脚本
│   └── resources/                   # Electron 资源
│
├── 📁 public/                       # 静态资源
│   ├── *.png                        # 图片资源
│   └── manifest.json               # PWA 配置
│
├── 📁 resources/                    # 项目资源
│   ├── entitlements.*               # macOS 权限配置
│   └── icons/                       # 应用图标
│
├── 📁 scripts/                      # 构建和部署脚本
│   ├── *.sh                         # Shell 脚本
│   ├── *.ts                         # TypeScript 脚本
│   └── *.js                         # JavaScript 脚本
│
├── 📁 tests/                        # 端到端测试
│   └── *.ts                         # 测试文件
│
├── 📁 项目归档/                     # 归档文件（非项目内容）
│   ├── 📁 archives/                  # 历史归档
│   ├── 📁 deploy/                    # 部署配置
│   ├── 📁 dist-electron/             # Electron 构建输出
│   ├── 📁 docs-B/                    # 备用文档
│   ├── 📁 logs/                      # 日志文件
│   ├── 📁 releases/                  # 发布版本
│   ├── 📁 temp/                      # 临时文件
│   ├── 📁 test-results/              # 测试结果
│   ├── 📁 workflows/                 # 工作流配置
│   ├── 📁 yyc3-ai-family/            # AI Family 源码（已集成）
│   └── 📄 归档文件                   # 各种归档文档
│
├── 📄 AGENTS.md                     # AI Agent 指南
├── 📄 AI_FAMILY_DEEP_AUDIT_REPORT.md # AI Family 深度审核报告
├── 📄 AI_FAMILY_PROJECT_COMPLETION_REPORT.md # AI Family 项目完成报告
├── 📄 eslint.config.js             # ESLint 配置
├── 📄 LICENSE                       # 开源许可证
├── 📄 package.json                  # 项目配置
├── 📄 pnpm-lock.yaml                # 依赖锁文件
├── 📄 pnpm-workspace.yaml          # PNPM 工作区配置
├── 📄 README.md                     # 项目说明
├── 📄 run-tests.sh                  # 测试运行脚本
├── 📄 tsconfig.json                 # TypeScript 配置
├── 📄 tsconfig.node.json            # Node.js TypeScript 配置
├── 📄 vite.config.ts                # Vite 配置
└── 📄 vitest.config.ts              # Vitest 配置
```

---

## 📂 核心目录说明

### 1. `src/` - 源代码目录

**React 应用核心代码**，包含：
- **Components**: UI 组件
- **Hooks**: 自定义 React Hooks
- **Lib**: 工具库和业务逻辑
- **Types**: TypeScript 类型定义
- **I18n**: 国际化配置

### 2. `electron/` - Electron 主进程

**桌面应用主进程代码**，包含：
- **main.ts**: 主进程入口
- **preload.ts**: 预加载脚本
- **resources**: Electron 资源

### 3. `public/` - 静态资源

**静态文件和资源**，包含：
- 图片资源（PNG、SVG、JPG）
- PWA 配置文件
- 其他静态资源

### 4. `scripts/` - 构建脚本

**构建和部署脚本**，包含：
- Shell 脚本
- TypeScript 脚本
- JavaScript 脚本

### 5. `tests/` - 端到端测试

**端到端测试文件**，包含：
- 测试用例
- 测试配置

### 6. `项目归档/` - 归档文件

**非项目内容归档**，包含：
- 历史归档
- 部署配置
- 备用文档
- 日志文件
- 发布版本
- 临时文件
- 测试结果
- 工作流配置
- AI Family 源码（已集成到 src/）
- 各种归档文档

---

## 📝 核心文档说明

### 项目文档

- **README.md**: 项目说明文档
- **AGENTS.md**: AI Agent 指南
- **LICENSE**: 开源许可证

### AI Family 文档

- **AI_FAMILY_DEEP_AUDIT_REPORT.md**: AI Family 深度审核报告
- **AI_FAMILY_PROJECT_COMPLETION_REPORT.md**: AI Family 项目完成报告

### 配置文件

- **package.json**: 项目配置和依赖
- **pnpm-lock.yaml**: 依赖锁文件
- **pnpm-workspace.yaml**: PNPM 工作区配置
- **tsconfig.json**: TypeScript 配置
- **tsconfig.node.json**: Node.js TypeScript 配置
- **vite.config.ts**: Vite 配置
- **vitest.config.ts**: Vitest 配置
- **eslint.config.js**: ESLint 配置

---

## 🎯 使用指南

### 开发环境启动

```bash
# 启动开发服务器（Web）
pnpm dev

# 启动 Electron（桌面应用）
pnpm electron:dev
```

### 构建项目

```bash
# 构建 Web 应用
pnpm build

# 构建 Electron 应用（当前平台）
pnpm build:electron

# 构建 macOS 应用
pnpm build:mac

# 构建 Windows 应用
pnpm build:win

# 构建 Linux 应用
pnpm build:linux
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试并监听
pnpm test:watch

# 生成测试覆盖率报告
pnpm test:coverage

# CI 模式（并行测试）
pnpm test:ci
```

### 代码检查

```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix
```

---

## 📦 依赖说明

### 核心依赖

- **React 19.2.4**: React 框架
- **React DOM 19.2.4**: React DOM
- **React Router 7.13.1**: 路由管理
- **TypeScript 5.9.3**: TypeScript 编译器
- **Vite 7.3.1**: 构建工具
- **Electron 28.0.0**: 桌面应用框架
- **TailwindCSS 4.2.1**: CSS 框架
- **Recharts 3.7.0**: 图表库
- **Radix UI**: UI 组件库
- **MUI Material 7.3.8**: Material UI 组件
- **Lucide icons 0.576.0**: 图标库
- **Motion 12.34.5**: 动画库
- **Supabase 2.98.0**: 后端服务
- **Zustand**: 状态管理

### 开发依赖

- **Vitest**: 单元测试框架
- **@testing-library/react**: React 测试工具
- **ESLint**: 代码检查工具
- **Prettier**: 代码格式化工具
- **TypeScript**: TypeScript 编译器

---

## 🚀 部署说明

### Web 部署

1. 构建项目：`pnpm build`
2. 将 `dist/` 目录部署到静态服务器
3. 支持：Vercel、Netlify、S3 等

### Electron 部署

1. 构建 Electron 应用：`pnpm build:mac` / `build:win` / `build:linux`
2. 输出目录：`dist-electron/`
3. 发布目录：`releases/`
4. 配置 GitHub Releases 实现自动更新

---

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| 总代码行数 | 11,511+ 行 |
| 总文件数 | 50+ 个 |
| 总测试用例数 | 80+ 个 |
| 总文档字数 | 48,000+ 字 |
| TypeScript 覆盖率 | 100% |
| 构建状态 | ✅ 成功 |
| 构建时间 | 9.89s |

---

## 🎉 项目亮点

1. ✅ **完整的 TypeScript 类型系统** - 100% TypeScript 覆盖
2. ✅ **清晰的分层架构** - 表现层、服务层、数据层
3. ✅ **完善的测试覆盖** - 80+ 测试用例
4. ✅ **完整的文档体系** - 48,000+ 字文档
5. ✅ **离线优先设计** - 本地存储、自动同步
6. ✅ **PWA 支持** - 可安装、离线可用
7. ✅ **Electron 支持** - 跨平台桌面应用
8. ✅ **国际化支持** - 中英文双语
9. ✅ **AI Family 集成** - 完整的 AI Family 功能

---

## 📞 联系方式

- **项目主页**: [GitHub Repository]
- **文档中心**: [Documentation Center]
- **问题反馈**: [Issues]

---

**整理完成时间**: 2026-03-25  
**项目状态**: ✅ 可正常编译，可进入生产环境

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v2.0.0 | 2026-11-08 | 统一标头标尾 · 品牌规范化为 YYC3 · 排版与语法优化 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
