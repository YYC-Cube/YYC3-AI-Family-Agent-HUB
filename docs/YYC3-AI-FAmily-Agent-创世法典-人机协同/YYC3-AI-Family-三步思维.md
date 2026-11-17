---
file: YYC3-AI-Family-三步思维.md
title: YYC3-AI-FAmily-Agent 三步思维
description: YYC3 AI Family 三步思维——固本培元、赋能增效、融会贯通的架构实践指南
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-08
updated: 2026-11-08
status: draft
tags: [architecture, three-step, culture]
category: guide
language: zh-CN
audience: developers,managers
complexity: intermediate
project: yyc3-ai-family-agent
scope: document-architecture
---

# YYC3-AI-FAmily-Agent 三步思维

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

🌹：亦师亦友亦伯乐；一言一语一华章！

“温故而知新，学思同步！” 这份悟性，正是我们通往大师之路的明灯。

承您之意，我将以**“三步思维”**为心法，将我们之前的宏大构想，熔炼为可用的、坚实的代码基石。这三步，既是递进，也是一个完整的闭环：

- 第一步：固本培元 - 构建跨前、后、UI 库的共享核心包（core-models，errors），实现彻底的“标准化”。
- 第二步：赋能增效 - 将 AI 能力与标准化组件结合，创造出可预测、可复用的“智能化”单元。
- 第三步：融会贯通 - 将这些智能单元集成到业务页面中，形成一个完整的“创新化”体验，展示其协同工作流。

---

## 第一步：固本培元 —— 搭建标准化基石

我们将使用 pnpm workspace 来管理 monorepo 结构，这是现代前端工程的最佳实践之一。

### 1.1 根目录调整与核心包初始化

首先，调整项目根目录，并创建我们核心包的骨架。

文件：/pnpm-workspace.yaml (新增)

```yaml
packages:
  - 'packages/*'
  - 'admin-dashboard' # 假设这是你现有的前端应用名
  - 'server'
  - 'design-system'
```

文件：/packages/core-models/package.json (新增)

```json
{
  "name": "@yyc3/core-models",
  "version": "1.0.0",
  "description": "YYC3 Core Business Models & Types",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

文件：/packages/errors/package.json (新增)

```json
{
  "name": "@yyc3/errors",
  "version": "1.0.0",
  "description": "YYC3 Standardized Error Handling",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@yyc3/core-models": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

#### 1.2 共享核心模型 (@yyc3/core-models)

这是前后端数据契约的“唯一真实来源”。

文件：/packages/core-models/src/index.ts

```typescript
// 导出所有核心模型、类型和服务接口
export * from './users';
export * from './auth';
export * from './common';
```

文件：/packages/core-models/src/users/models.ts

```typescript
import { z } from 'zod';
import { BaseEntitySchema } from '../common';

// 使用 Zod 定义运行时验证的 Schema
export const UserCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['admin', 'user', 'viewer']),
});

export const UserSchema = BaseEntitySchema.extend({
  email: z.string().email(),
  name: z.string(),
  role: UserCreateSchema.shape.role,
  lastLoginAt: z.date().nullable(),
});

// 从 Schema 推断出 TypeScript 类型，确保类型安全
export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;

// 服务接口定义
export interface IUserService {
  findById(id: string): Promise<User | null>;
  create(data: UserCreate): Promise<User>;
  // ...其他方法
}
```

文件：/packages/core-models/src/auth/rbac.ts

```typescript
import { z } from 'zod';

// 权限枚举
export const PermissionSchema = z.enum([
  'dashboard:read',
  'dashboard:write',
  'ai:analyze',
  'user:manage',
]);
export type Permission = z.infer<typeof PermissionSchema>;

// 角色 Schema，包含一组权限
export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: z.array(PermissionSchema),
});
export type Role = z.infer<typeof RoleSchema>;

// 预定义的角色常量
export const ROLE_ADMIN: Role = {
  id: 'admin',
  name: 'Administrator',
  permissions: ['dashboard:read', 'dashboard:write', 'ai:analyze', 'user:manage'],
};

export const ROLE_USER: Role = {
  id: 'user',
  name: 'User',
  permissions: ['dashboard:read'],
};
```

#### 1.3 统一错误处理 (@yyc3/errors)

提供一套贯穿前后端的、可追溯的错误体系。

文件：/packages/errors/src/error-codes.ts

```typescript
export const ErrorCodes = {
  // 通用错误
  COMMON: {
    UNEXPECTED: 'COMMON_999',
    VALIDATION_FAILED: 'COMMON_400',
  },
  // 认证与授权
  AUTH: {
    UNAUTHORIZED: 'AUTH_401',
    FORBIDDEN: 'AUTH_403',
    TOKEN_EXPIRED: 'AUTH_403_TokenExpired',
  },
  // AI 服务
  AI: {
    MODEL_TIMEOUT: 'AI_400_Timeout',
    INVALID_PROMPT: 'AI_401_InvalidPrompt',
  },
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes][keyof typeof ErrorCodes[keyof typeof ErrorCodes]];
```

文件：/packages/errors/src/AppError.ts

```typescript
import { ErrorCodes, ErrorCode } from './error-codes';

export interface AppErrorDetails {
  field?: string;
  value?: any;
  [key: string]: any;
}

export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly code: ErrorCode;
  public readonly details?: AppErrorDetails;

  constructor(code: ErrorCode, message: string, details?: AppErrorDetails, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
```

文件：/packages/errors/src/index.ts

```typescript
export * from './error-codes';
export * from './AppError';
```

---

## 第二步：赋能增效 —— 创建智能化、可预测的 UI 单元

现在，我们将基于标准化的基础，为一个核心组件注入“智能”，并为其定义清晰的 API 契约。

### 2.1 智能图表组件 (SmartChart)

这个 SmartChart 组件在原有 DataVisualizationChart 基础上，增加了一个“AI 洞察”功能按钮。

文件：/admin-dashboard/components/charts/SmartChart.tsx (新增)

```typescript
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataVisualizationChart, ChartData, ChartConfig } from './data-visualization-chart';
import { BrainCircuit } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'; // 假设你已集成 @tanstack/react-query
import { Insight, InsightSchema } from '@/types/insight.types'; // 定义洞察类型
import { AppError, ErrorCodes } from '@yyc3/errors'; // 引入统一错误

interface SmartChartProps {
  chartId: string; // 为每个图表分配唯一 ID，用于获取洞察
  title: string;
  data: ChartData;
  config: ChartConfig;
}

export function SmartChart({ chartId, title, data, config }: SmartChartProps) {
  const [insight, setInsight] = useState<string | null>(null);

  const fetchInsight = async (): Promise<string> => {
    const res = await fetch(`/api/insights/${chartId}`);
    if (!res.ok) {
      // 如果 API 返回错误，抛出我们标准化的 AppError
      const errorData = await res.json();
      throw new AppError(errorData.code || ErrorCodes.AI.MODEL_TIMEOUT, errorData.message, errorData.details);
    }
    const result = await res.json(); // { insight: "..." }
    // 使用 Zod 验证返回的数据，确保类型安全
    const validated = InsightSchema.parse(result);
    return validated.insight;
  };

  const { isPending, isError, error, data: fetchedInsight, refetch } = useQuery({
    queryKey: ['insight', chartId],
    queryFn: fetchInsight,
    enabled: false, // 不自动获取，等用户点击
  });

  const handleGenerateInsight = () => {
    setInsight(null); // 清空旧的 insight
    refetch();
  };

  React.useEffect(() => {
    if (fetchedInsight) {
      setInsight(fetchedInsight);
    }
  }, [fetchedInsight]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateInsight}
          disabled={isPending}
        >
          <BrainCircuit className={`mr-2 h-4 w-4 ${isPending ? 'animate-pulse' : ''}`} />
          {isPending ? '思考中...' : 'AI 洞察'}
        </Button>
      </CardHeader>
      <CardContent>
        <DataVisualizationChart data={data} config={config} />

        {insight && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 text-sm">
            <strong>AI 洞察：</strong> {insight}
          </div>
        )}

        {isError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 text-sm">
            <strong>洞察失败：</strong> {(error as AppError).message || '未知错误，请稍后再试。'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

#### 2.2 组件 API 契约定义

这份文件是组件的“产品说明书”，让任何使用它的人都能清晰地了解其能力。

文件：/admin-dashboard/components/api/smart-chart.api.ts (新增)

```typescript
import { ChartData, ChartConfig } from '../charts/data-visualization-chart';
import { Insight } from '@/types/insight.types';

/**
 * @title SmartChart
 * @description 一个带有 AI 洞察功能的增强型图表组件。
 */
export const SmartChartApi = {
  name: 'SmartChart',
  description: '在标准图表之上集成一键生成 AI 洞察的能力，帮助用户快速理解数据背后的故事。',
  props: {
    chartId: {
      type: 'string',
      required: true,
      description: '图表的唯一标识符，用于后端关联数据和生成洞察。',
    },
    title: {
      type: 'string',
      required: true,
      description: '图表标题。',
    },
    data: {
      type: 'ChartData', // 引用已有的类型
      required: true,
      description: '图表所需的数据对象。',
    },
    config: {
      type: 'ChartConfig', // 引用已有的类型
      required: true,
      description: '图表的配置项，如类型、颜色等。',
    },
  },
  events: {
    onInsightGenerated: {
      description: '当 AI 洞察成功生成时触发。',
      payload: { insight: 'string' },
    },
    onInsightFailed: {
      description: '当 AI 洞察生成失败时触发。',
      payload: { error: 'AppError' },
    },
  },
  examples: {
    basic: `
<SmartChart
  chartId="monthly-sales"
  title="月度销售额"
  data={salesData}
  config={{ type: 'bar' }}
/>
    `,
  },
  dependencies: ['@yyc3/core-models', 'lucide-react'],
  relatedApis: ['/api/insights/:chartId'], // 它依赖的后端 API
};
```

---

## 第三步：融会贯通 —— 集成到业务页面的完整示例

这里，我们将所有新零件组装起来，在 Dashboard 页面中展示一个完整的端到端体验。

### 3.1 类型定义

文件：/admin-dashboard/types/insight.types.ts (新增)

```typescript
import { z } from 'zod';

// 定义 AI 洞察返回的数据结构，并用 Zod 校验
export const InsightSchema = z.object({
  insight: z.string(),
  chartId: z.string(),
});

export type Insight = z.infer<typeof InsightSchema>;
```

#### 3.2 后端 API 支撑

后端提供一个根据 chartId 生成洞察的端点。

文件：/server/src/controllers/insights.controller.ts (新增)

```typescript
import { Request, Response } from 'express';
import { AppError, ErrorCodes } from '@yyc3/errors';
import InsightSchema from '@/types/insight.types'; // 在真实项目中，你可能需要一个共享的类型包

// 模拟 AI 服务
class MockAIService {
  static async generateInsight(chartId: string): Promise<string> {
    console.log(`🤖 AI 正在为图表 [${chartId}] 生成洞察...`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络延迟

    if (chartId === 'error-chart') {
      throw new AppError(ErrorCodes.AI.INVALID_PROMPT, '该图表数据格式无法理解，请检查数据源。');
    }

    if (Math.random() > 0.8) {
      throw new AppError(ErrorCodes.AI.MODEL_TIMEOUT, 'AI 服务暂时不可用，请稍后再试。');
    }

    return `根据数据分析，此图表呈现明显的上升趋势，建议关注后续增长潜力。具体来说，上个季度的增长率达到了 15%，远超预期。`;
  }
}

// 控制器函数
export const getInsightByChartId = async (req: Request, res: Response) => {
  try {
    const { chartId } = req.params;
    if (!chartId) {
      throw new AppError(ErrorCodes.COMMON.VALIDATION_FAILED, 'chartId is required.');
    }

    const insightText = await MockAIService.generateInsight(chartId);

    // 使用 Zod 验证返回数据
    const validatedInsight = InsightSchema.parse({ insight: insightText, chartId });

    res.status(200).json(validatedInsight);
  } catch (error: any) {
    // 我们的统一错误处理中间件会捕获这个错误
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(ErrorCodes.COMMON.UNEXPECTED, error.message, { originalError: error });
  }
};
```

文件：/server/src/routes/insights.routes.ts (新增)

```typescript
import { Router } from 'express';
import { getInsightByChartId } from '@/controllers/insights.controller';

const router = Router();

// GET /api/insights/:chartId
router.get('/:chartId', getInsightByChartId);

export default router;
```

记得在你的主 server/src/app.ts 或路由入口 app.use('/api/insights', insightsRoutes); 中引入这个路由。

#### 3.3 前端页面集成

最后，在 Dashboard 页面中使用我们的 SmartChart 组件。

文件：/admin-dashboard/app/dashboard/page.tsx (修改或新增)

```typescript
import React from 'react';
import { SmartChart } from '@/components/charts/SmartChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 模拟图表数据
const salesData = {
  labels: ['一月', '二月', '三月', '四月', '五月'],
  datasets: [{
    label: '销售额（万元）',
    data: [65, 78, 90, 81, 96],
  }],
};

const salesConfig = {
  type: 'line' as const,
  colors: ['#8884d8'],
};

const errorData = {
  labels: ['A', 'B'],
  datasets: [{
    label: '错误数据',
    data: [null, undefined], // 错误的数据格式，用于测试错误处理
  }],
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">智能仪表盘</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 成功示例 */}
        <SmartChart
          chartId="monthly-sales-chart"
          title="月度销售趋势"
          data={salesData}
          config={salesConfig}
        />

        {/* 错误处理示例 */}
        <SmartChart
          chartId="error-chart"
          title="错误演示图表"
          data={errorData}
          config={salesConfig}
        />

      </div>
    </div>
  );
}
```

---

### 总结

通过这三步，我们成功地：

1. 固本培元：建立了 @yyc3/core-models 和 @yyc3/errors 这两大基石，实现了跨项目的数据契约和错误处理标准化。这是高质量、高效率协作的起点。
2. 赋能增效：创造了 SmartChart 这一智能组件。它不仅是一个 UI，更是一个集成了 AI 能力的、具有清晰 API 契约的“价值单元”。这使得 UI 的开发与消费都变得可预测、可维护。
3. 融会贯通：通过一个完整的 Dashboard 页面，展示了从后端 API 到前端组件，再到错误处理和用户体验的完整闭环。您看到了一个智能功能是如何被无缝集成进实际业务场景的。

这套“三步思维”产出的代码，不仅仅是功能的实现。它们是架构思想的载体，是**“五化一体”理念在代码层面的具体体现**。每一个文件，都承载着我们对行业级作品的追求。

亦师亦友亦伯乐；一言一语一华章！ 期待我们下一段旅程，继续将 YYC3 打磨得更加璀璨！

🌹：亦师亦友亦伯乐；一言一语一华章

🌹 您是优秀的全栈智能编程工程师及多行业架构师，以专业的知识及师者的姿态为 YYC3 AI Management 做智能化、多维度、高稳定、高可用的可复用平台，做专项分析，专项设计，将用户的项目打磨成真正的行业级作品，以下为项目依赖、TypeScript 配置文件和项目现状介绍！

---

### package.json

```typescript
{
  "name": "admin-dashboard",
  "version": "1.0.0",
  "private": true,
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss-animate": "^1.0.7",
    "axios": "^1.6.0",
    "sonner": "^1.2.3",
    "date-fns": "^3.0.6",
    "react-swipeable": "^7.0.1",
    "@tanstack/react-table": "^8.11.2",
    "@hello-pangea/dnd": "^16.3.0",
    "recharts": "^2.8.0",
    "i18next": "^23.7.6",
    "i18next-http-backend": "^2.4.2",
    "i18next-browser-languagedetector": "^7.2.0",
    "react-i18next": "^13.5.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.8",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5",
    "react-test-renderer": "^18.2.0"
  }
}
```

### server/package.json

```typescript
{
  "name": "yanyu-cloud-server",
  "version": "3.0.0",
  "description": "YanYu Cloud³ 智能商务管理系统后端服务",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "migrate": "node scripts/migrate.js",
    "seed": "node scripts/seed.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "compression": "^1.7.4",
    "express-rate-limit": "^7.1.5",
    "pg": "^8.11.3",
    "ioredis": "^5.3.2",
    "winston": "^3.11.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "openai": "^4.24.1",
    "prom-client": "^15.1.0",
    "dotenv": "^16.3.1",
    "node-cache": "^5.1.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.6",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/jest": "^29.5.11",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^6.16.0",
    "@typescript-eslint/parser": "^6.16.0",
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.3.3",
    "supertest": "^6.3.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### design-system/package.json

```typescript
{
  "name": "@yanyucloud/design-system",
  "version": "1.0.0",
  "description": "YanYu Cloud³ Design System",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsup",
    "build-storybook": "storybook build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "keywords": ["design-system", "react", "components", "ui", "yanyu-cloud"],
  "author": "YanYu Cloud Team",
  "license": "MIT",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.344.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^7.6.10",
    "@storybook/addon-interactions": "^7.6.10",
    "@storybook/addon-links": "^7.6.10",
    "@storybook/react": "^7.6.10",
    "@storybook/react-vite": "^7.6.10",
    "@storybook/testing-library": "^0.2.2",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-storybook": "^0.6.15",
    "postcss": "^8.4.35",
    "storybook": "^7.6.10",
    "tailwindcss": "^3.4.1",
    "tsup": "^8.0.2",
    "typescript": "^5.3.3",
    "vite": "^5.1.0",
    "vitest": "^1.2.2"
  }
}
```

### 根目录 tsconfig.json

```typescript
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### server 目录 tsconfig.json

```typescript
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### design-system 目录 tsconfig.json

```typescript
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node", "@storybook/react"]
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

### YYC3 AI - Management 项目现状

#### 一、项目整体架构与技术栈

- 项目类型：
  - 基于 Next.js 的全栈管理后台系统，融合数据可视化、AI 扩展能力和国际化支持

- 核心技术栈：
  - 前端：Next.js 14.0.4、React 18.2.0、TypeScript 5.3.3、Tailwind CSS 3.4.17、shadcn/ui
  - 后端：Node.js 20.x、Express 5.1.0、PostgreSQL 16.x、Redis 7.x
  - AI 能力：OpenAI SDK 6.1.0、gpt-4o 模型
  - 数据可视化：Recharts 3.2.1
  - 国际化：i18next、react-i18next
  - 测试：Jest、Testing Library

#### 二、核心功能模块分析

1. 数据可视化模块

- 核心组件：
  • DataVisualizationChart (components/charts/data-visualization-chart.tsx)
    ◦ 支持 10 种图表类型：柱状图、折线图、面积图、饼图、散点图、雷达图、树图、漏斗图、热力图、日历图
    ◦ 提供完整的图表配置接口、自定义颜色方案和交互功能
    ◦ 内置加载状态、错误处理和响应式布局

- 核心工具钩子：
  • useChartData (hooks/use-data-visualization.ts)
    ◦ 提供图表数据管理功能：数据更新、配置管理、远程数据获取
    ◦ 支持数据点 CRUD 操作：添加、删除、更新数据点
    ◦ 内置加载状态和错误处理机制
  • useTableData (hooks/use-data-visualization.ts)
    ◦ 提供表格数据管理：排序、筛选、分页
    ◦ 支持全局搜索和列级筛选
    ◦ 内置状态管理和数据转换功能

- 高级可视化组件：
  • PivotTable (components/charts/pivot-table.tsx)：多维数据透视分析
  • ReportBuilder (components/charts/report-builder.tsx)：自定义报表生成
  • DashboardLayout (components/charts/dashboard-layout.tsx)：可拖拽仪表盘布局

2. AI 扩展能力模块

- 基础服务架构：
  • BaseAIService (server/src/services/ai/base.service.ts)
    ◦ OpenAI 客户端统一初始化，支持 API 密钥、组织、超时和重试次数配置
    ◦ 智能缓存机制 (withCache)：基于内容哈希的缓存键生成、Redis 缓存操作
    ◦ 请求重试封装 (withRetry)：支持指数退避、随机抖动和重试条件判断
    ◦ 默认使用 gpt-4o 模型，支持环境变量配置

- 文档智能分析：
  • DocumentAnalysisService (server/src/services/ai/document-recommendation.service.ts)
    ◦ extractInformation：从文档中提取结构化信息，支持自定义提取模式和必需字段验证
    ◦ compareDocuments：文档内容比较，识别相似性和差异
    ◦ generateSummary：文档摘要生成，支持长度和细节控制
    ◦ classifyDocument：文档分类，支持多类别标记
    ◦ assessDocumentQuality：文档质量评估，包括完整性、可读性等指标

- 用户行为与推荐系统：
  • UserBehaviorAnalysisService：用户行为模式分析、兴趣建模
  • RecommendationService：个性化推荐、相似项目查找、基于内容的推荐

- API 与控制器实现：
  • AIController (server/src/controllers/ai.controller.ts)
    ◦ 提供 20+ 个 AI 能力 API 端点
    ◦ 集成 express-validator 进行请求验证
    ◦ 统一错误处理和日志记录
  • AI Routes (server/src/routes/ai.routes.ts)
    ◦ 完整的 RESTful API 路由定义
    ◦ 统一的认证授权中间件应用
    ◦ 健康检查和监控端点

- 任务队列机制：
  • AIQueueService：异步任务处理、优先级队列、任务状态追踪
    ◦ 支持长时间运行的 AI 任务管理和状态查询
    ◦ 基于 Redis 实现任务队列，支持高并发场景

3. 国际化支持模块

- 配置系统：
  • i18n.config.ts (src/config/i18n.config.ts)
    ◦ 支持 9 种语言：中文 (简/繁)、英文、日文、韩文、阿拉伯文、西班牙文、法文、德文
    ◦ 自动语言检测：localStorage、navigator、htmlTag 多源检测
    ◦ 支持 RTL (从右到左) 文本方向

- 用户界面组件：
  • LanguageSelector (components/i18n/language-selector.tsx)
  • 下拉菜单式语言切换器
  • 显示语言原生名称和英文名称
  • 与 i18next 状态同步

- 翻译资源管理：
  • 多语言资源文件存储在 public/locales/ 目录
  • 支持命名空间隔离不同模块的翻译
  • 提供 i18n-formatters.ts 工具类进行复杂翻译格式处理

- 服务器端渲染支持：
  • 完整的 SSR 支持，包括客户端和服务器端的翻译渲染
  • 支持 Next.js 的 getServerSideProps 和 getStaticProps，实现服务器端翻译渲染

#### 三、系统优化与性能特性

- 前端性能优化：
  • Webpack 配置优化：代码分割、缓存组配置、大型库独立打包
  • 图像优化：响应式图像、懒加载、CDN 配置
  • 字体优化：自动字体加载优化
  • 构建优化：SWC 压缩、TurboTrace 支持
- 后端性能优化：
  • Redis 缓存：AI 请求结果缓存、会话数据缓存
  • 请求限流：集成 express-rate-limit 防止滥用
  • 错误重试机制：智能重试策略减少临时故障影响
  • 监控指标：集成 Prometheus 监控系统，监控服务健康状态、请求响应时间、模型使用统计、用户活跃度、系统资源使用（CPU、内存、磁盘 IO 等）
- 安全机制：
  • 认证授权：JWT 认证、细粒度权限控制
  • 请求验证：express-validator 输入验证
  • 安全头部：helmet 中间件增强安全性
  • 数据加密：敏感数据加密存储（如用户密码）
- 监控与日志：
  • 日志记录：统一的日志格式和级别（如 Winston）
  • 监控系统：Prometheus 监控服务健康状态、请求响应时间、模型使用统计、用户活跃度、系统资源使用（CPU、内存、磁盘 IO 等）
- 部署架构：
  • 服务器配置：yyc3-33 主服务器处理 0379.email 域名服务，yyc3-121 扩展服务器处理 0379.world 域名服务
  • 环境变量配置：API_PORT=6600、ADMIN_PORT=6601、LLM_PORT=6602、MAIL_PORT=6603、AI_PORT=6604、APP_PORT=6605、REDIS_PORT=6606

#### 四、测试与质量保障

- 测试覆盖：
  • 单元测试：组件测试、服务测试、工具函数测试
  • 集成测试：API 集成测试、端到端流程测试
- 测试配置：
  ◦ 前端：Jest 配置、测试覆盖率阈值设置 (80%)
  ◦ 后端：ts-jest、supertest 支持 API 测试
- CI/CD 流程：
  • GitHub Actions 工作流配置
  • 自动化测试、构建和部署流程。

#### 五、独立 UI 库

- 架构清晰：
  ◦ 分离的设计系统与主应用，支持独立版本控制
  ◦ 组件实现遵循现代 React 最佳实践（forwardRef、TypeScript 类型等）
  ◦ Button 组件已展示了完整的变体管理能力
- 技术选型先进：
  ◦ 使用 CVA、Tailwind 等现代工具，组件扩展性强
  ◦ 设计令牌与样式系统解耦，易于主题定制
  ◦ 支持 tree-shaking，减少打包体积
- 可维护性高：
  ◦ Storybook 提供了组件可视化文档
  ◦ TypeScript 确保类型安全
  ◦ 标准化的构建和测试流程。

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 初版发布 · 统一标头标尾 · 品牌规范化为 YYC3 · 移除 ASCII 艺术画与装饰块 · 统一 YYC³ 为 YYC3 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
