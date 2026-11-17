---
file: YYC3-AI-Family-六步执行.md
title: YYC3-AI-FAmily-Agent 六步执行
description: YYC3 AI Family 六步执行——标准化基石、智能化 UI 单元、业务页面集成、会思考的界面、意图驱动桥梁、插件化平台
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-08
updated: 2026-11-08
status: draft
tags: [execution, six-step, implementation, ai-family]
category: guide
language: zh-CN
audience: developers
complexity: intermediate
project: yyc3-ai-family-agent
scope: document-architecture
---

# YYC3-AI-FAmily-Agent 六步执行

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 第一步：标准化基石

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

## 第二步：创建智能化、可预测的 UI 单元

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
import { useQuery } from '@tanstack/react-query';
import { Insight, InsightSchema } from '@/types/insight.types';
import { AppError, ErrorCodes } from '@yyc3/errors';

interface SmartChartProps {
  chartId: string;
  title: string;
  data: ChartData;
  config: ChartConfig;
}

export function SmartChart({ chartId, title, data, config }: SmartChartProps) {
  const [insight, setInsight] = useState<string | null>(null);

  const fetchInsight = async (): Promise<string> => {
    const res = await fetch(`/api/insights/${chartId}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new AppError(errorData.code || ErrorCodes.AI.MODEL_TIMEOUT, errorData.message, errorData.details);
    }
    const result = await res.json();
    const validated = InsightSchema.parse(result);
    return validated.insight;
  };

  const { isPending, isError, error, data: fetchedInsight, refetch } = useQuery({
    queryKey: ['insight', chartId],
    queryFn: fetchInsight,
    enabled: false,
  });

  const handleGenerateInsight = () => {
    setInsight(null);
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

文件：/admin-dashboard/components/api/smart-chart.api.ts (新增)

```typescript
import { ChartData, ChartConfig } from '../charts/data-visualization-chart';
import { Insight } from '@/types/insight.types';

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
      type: 'ChartData',
      required: true,
      description: '图表所需的数据对象。',
    },
    config: {
      type: 'ChartConfig',
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
  relatedApis: ['/api/insights/:chartId'],
};
```

---

## 第三步：集成到业务页面的完整示例

将所有新零件组装起来，在 Dashboard 页面中展示一个完整的端到端体验。

### 3.1 类型定义

文件：/admin-dashboard/types/insight.types.ts (新增)

```typescript
import { z } from 'zod';

export const InsightSchema = z.object({
  insight: z.string(),
  chartId: z.string(),
});

export type Insight = z.infer<typeof InsightSchema>;
```

### 3.2 后端 API 支撑

文件：/server/src/controllers/insights.controller.ts (新增)

```typescript
import { Request, Response } from 'express';
import { AppError, ErrorCodes } from '@yyc3/errors';
import InsightSchema from '@/types/insight.types';

class MockAIService {
  static async generateInsight(chartId: string): Promise<string> {
    console.log(`🤖 AI 正在为图表 [${chartId}] 生成洞察...`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (chartId === 'error-chart') {
      throw new AppError(ErrorCodes.AI.INVALID_PROMPT, '该图表数据格式无法理解，请检查数据源。');
    }

    if (Math.random() > 0.8) {
      throw new AppError(ErrorCodes.AI.MODEL_TIMEOUT, 'AI 服务暂时不可用，请稍后再试。');
    }

    return `根据数据分析，此图表呈现明显的上升趋势，建议关注后续增长潜力。具体来说，上个季度的增长率达到了 15%，远超预期。`;
  }
}

export const getInsightByChartId = async (req: Request, res: Response) => {
  try {
    const { chartId } = req.params;
    if (!chartId) {
      throw new AppError(ErrorCodes.COMMON.VALIDATION_FAILED, 'chartId is required.');
    }

    const insightText = await MockAIService.generateInsight(chartId);
    const validatedInsight = InsightSchema.parse({ insight: insightText, chartId });

    res.status(200).json(validatedInsight);
  } catch (error: any) {
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

router.get('/:chartId', getInsightByChartId);

export default router;
```

### 3.3 前端页面集成

文件：/admin-dashboard/app/dashboard/page.tsx (修改或新增)

```typescript
import React from 'react';
import { SmartChart } from '@/components/charts/SmartChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    data: [null, undefined],
  }],
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">智能仪表盘</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SmartChart
          chartId="monthly-sales-chart"
          title="月度销售趋势"
          data={salesData}
          config={salesConfig}
        />

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

## 第四步：构建会思考的界面

我们不再满足于手动拖拽的仪表盘。我们要创造一个“智能布局引擎”，它能理解你的意图，主动为你呈现最合适的界面。

### 4.1 “布局即代码”的 DSL 定义

用一种标准化的 JSON 格式，来描述一切布局、组件与数据。这是实现界面“智能制造”的蓝图。

文件：/packages/core-models/src/layouts/layout-dsl.ts (新增)

```typescript
import { z } from 'zod';

export const ComponentTypeSchema = z.enum([
  'smart-chart',
  'pivot-table',
  'kpi-card',
  'text-block',
]);

export const ComponentDefinitionSchema = z.object({
  id: z.string(),
  type: ComponentTypeSchema,
  title: z.string().optional(),
  grid: z.object({
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
  }),
  props: z.record(z.any()),
  dataSource: z.object({
    type: z.literal('static'),
    value: z.any().optional(),
    endpoint: z.string().optional(),
  }),
});

export const DashboardLayoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  grid: z.object({ cols: z.number(), rowHeight: z.number() }),
  components: z.array(ComponentDefinitionSchema),
});

export type DashboardLayout = z.infer<typeof DashboardLayoutSchema>;
export type ComponentDefinition = z.infer<typeof ComponentDefinitionSchema>;
```

### 4.2 “智能布局渲染引擎”

这是将 DSL 蓝图变为现实界面的“万能打印机”。

文件：/admin-dashboard/components/layouts/DynamicRenderer.tsx (新增)

```typescript
'use client';

import React from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { DashboardLayout, ComponentDefinition } from '@yyc3/core-models';
import { SmartChart } from '@/components/charts/SmartChart';
import { KPICard } from '@/components/ui/kpi-card';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  'smart-chart': SmartChart,
  'kpi-card': KPICard,
};

interface DynamicRendererProps {
  layout: DashboardLayout;
}

export function DynamicRenderer({ layout }: DynamicRendererProps) {
  const gridLayout: Layout[] = layout.components.map(comp => ({
    i: comp.id,
    x: comp.grid.x,
    y: comp.grid.y,
    w: comp.grid.w,
    h: comp.grid.h,
  }));

  const renderComponent = (compDef: ComponentDefinition) => {
    const ComponentToRender = COMPONENT_REGISTRY[compDef.type];
    if (!ComponentToRender) {
      return <div className="p-4 bg-red-100 border border-red-300">未知组件类型: {compDef.type}</div>;
    }

    let data = compDef.dataSource.value;
    if (compDef.dataSource.type === 'api' && compDef.dataSource.endpoint) {
      // 在真实场景中，这里会触发数据获取
    }

    const props = {
      key: compDef.id,
      ...compDef.props,
      ...(data && { data }),
    };

    return <ComponentToRender {...props} />;
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: gridLayout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isDraggable={true}
      isResizable={true}
    >
      {layout.components.map(compDef => (
        <div key={compDef.id} className="bg-background border rounded-lg shadow-sm p-4">
          {renderComponent(compDef)}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
```

### 4.3 “智能布局推荐器”服务

这是“会思考的大脑”，它接收自然语言，吐出布局 DSL。

文件：/server/src/services/ai/layout-generator.service.ts (新增)

```typescript
import { AppError, ErrorCodes } from '@yyc3/errors';
import { DashboardLayout, ComponentDefinition } from '@yyc3/core-models';

export class LayoutGeneratorService {
  static async generateLayout(intent: string, userRole: string): Promise<DashboardLayout> {
    console.log(`🧠 AI 正在为角色 [${userRole}] 解析意图: "${intent}"`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (intent.includes('销售') || intent.includes('业绩')) {
      return this.generateSalesDashboard();
    }

    if (intent.includes('用户') || intent.includes('行为')) {
      return this.generateUserBehaviorDashboard();
    }

    throw new AppError(ErrorCodes.AI.INVALID_PROMPT, '抱歉，我还无法理解这个意图，请尝试“销售业绩”或“用户行为”相关关键词。');
  }

  private static generateSalesDashboard(): DashboardLayout {
    return {
      id: 'sales-dashboard-ai',
      name: 'AI 生成的销售仪表盘',
      description: '根据您的需求自动创建',
      grid: { cols: 12, rowHeight: 100 },
      components: [
        {
          id: 'kpi-total-sales',
          type: 'kpi-card',
          title: '总销售额',
          grid: { x: 0, y: 0, w: 3, h: 2 },
          props: { value: '¥ 1,254,320', change: '+12.5%', trend: 'up' },
          dataSource: { type: 'static', value: { value: '¥ 1,254,320', change: '+12.5%', trend: 'up' } },
        },
        {
          id: 'chart-monthly-sales',
          type: 'smart-chart',
          title: '月度销售趋势',
          grid: { x: 3, y: 0, w: 9, h: 4 },
          props: { config: { type: 'line' } },
          dataSource: { type: 'api', endpoint: '/api/data/monthly-sales' },
        },
      ],
    };
  }
}
```

---

## 第五步：从指令到洞察的无缝桥梁

现在，我们将大脑和身体连接起来，让用户能用一句话“创造”一个完整的智能仪表盘。

### 5.1 前端意图输入与状态管理

文件：/admin-dashboard/app/dashboard/intent-page/page.tsx (新增)

```typescript
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicRenderer } from '@/components/layouts/DynamicRenderer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Wand2 } from 'lucide-react';

interface GenerateLayoutResponse {
  layout: any;
}

const fetchLayoutFromIntent = async (intent: string): Promise<GenerateLayoutResponse> => {
  const res = await fetch('/api/layouts/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ intent }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '生成失败');
  }
  return res.json();
};

export default function IntentPage() {
  const [intent, setIntent] = useState('');

  const mutation = useMutation({
    mutationFn: fetchLayoutFromIntent,
    onSuccess: (data) => {
      toast.success('仪表盘布局已为您生成！');
    },
    onError: (error) => {
      toast.error(`生成失败: ${error.message}`);
    }
  });

  const handleGenerate = () => {
    if (!intent.trim()) {
      toast.error('请输入您的意图');
      return;
    }
    mutation.mutate(intent);
  };

  const { data: layoutData, isPending } = mutation;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            意图驱动的仪表盘生成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="请输入您想创建的仪表盘，例如：'创建一个监控销售额和用户增长的面板'"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <Button onClick={handleGenerate} disabled={isPending || mutation.isSuccess}>
              {isPending ? '生成中...' : '智能生成'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isPending && (
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isPending && layoutData && (
        <Card>
          <CardHeader>
            <CardTitle>为您生成的仪表盘</CardTitle>
          </CardHeader>
          <CardContent>
            <DynamicRenderer layout={layoutData.layout} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

### 5.2 后端 API 整合

将意图生成服务接入 API 网关。

文件：/server/src/controllers/layouts.controller.ts (新增)

```typescript
import { Request, Response } from 'express';
import { LayoutGeneratorService } from '@/services/ai/layout-generator.service';
import { AppError, ErrorCodes } from '@yyc3/errors';

export const generateLayoutFromIntent = async (req: Request, res: Response) => {
  try {
    const { intent } = req.body;
    const userRole = 'admin';

    if (!intent) {
      throw new AppError(ErrorCodes.COMMON.VALIDATION_FAILED, 'Intent is required.');
    }

    const layout = await LayoutGeneratorService.generateLayout(intent, userRole);

    res.status(200).json({ layout });
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(ErrorCodes.COMMON.UNEXPECTED, error.message);
  }
};
```

---

## 第六步：赋能万物的平台之始

一个强大的系统，其终极形态是开放。我们现在要为这个平台设计插件体系的接口，让它能像手机一样，通过安装 App 来无限扩展能力。

### 6.1 定义插件接口

文件：/packages/core-models/src/plugins/plugin-interface.ts (新增)

```typescript
import { ComponentType } from 'react';
import { z } from 'zod';

export const PluginMetadataSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  author: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  homepage: z.string().url().optional(),
});
export type PluginMetadata = z.infer<typeof PluginMetadataSchema>;

export interface PluginContributions {
  components?: {
    type: string;
    name: string;
    component: ComponentType<any>;
    defaultProps?: Record<string, any>;
    apiSchema?: z.ZodSchema;
  }[];
  aiServices?: {
    name: string;
    endpoint: string;
    description: string;
    schema: z.ZodSchema;
  }[];
  dataConnectors?: {
    id: string;
    name: string;
    logoUrl: string;
    setupComponent: ComponentType<any>;
  }[];
}

export interface IYYC3Plugin {
  metadata: PluginMetadata;
  activate(app: YYC3AppContext): Promise<void>;
  deactivate(): Promise<void>;
}

export interface YYC3AppContext {
  registerComponent(contribution: PluginContributions['components'][0]): void;
  registerAIService(contribution: PluginContributions['aiServices'][0]): void;
  registerDataConnector(contribution: PluginContributions['dataConnectors'][0]): void;
}
```

### 6.2 创建插件管理器（前端）

这是一个动态加载和管理插件的前端服务。

文件：/admin-dashboard/lib/plugin-manager.ts (新增)

```typescript
import { IYYC3Plugin, PluginMetadata } from '@yyc3/core-models';

let loadedPlugins: Map<string, IYYC3Plugin> = new Map();
let enabledPlugins: Set<string> = new Set();
const pluginRegistry: Map<string, any> = new Map();

const appContext = {
  registerComponent(contribution: any): void {
    console.log(`🔌 注册组件: ${contribution.name}`);
    pluginRegistry.set(`component:${contribution.type}`, contribution);
  },
  registerAIService(contribution: any): void {
    console.log(`🤖 注册 AI 服务: ${contribution.name}`);
    pluginRegistry.set(`ai:${contribution.name}`, contribution);
  },
};

export async function loadPlugin(pluginUrl: string) {
  try {
    const module = await import(pluginUrl);
    const PluginClass = module.default;
    const plugin: IYYC3Plugin = new PluginClass();

    await plugin.activate(appContext);
    loadedPlugins.set(plugin.metadata.id, plugin);
    console.log(`✅ 插件 [${plugin.metadata.name}] 加载成功`);
  } catch (error) {
    console.error(`❌ 插件加载失败: ${pluginUrl}`, error);
  }
}

export function enablePlugin(pluginId: string) {
  enabledPlugins.add(pluginId);
}

export function disablePlugin(pluginId: string) {
  const plugin = loadedPlugins.get(pluginId);
  if (plugin) {
    plugin.deactivate();
    enabledPlugins.delete(pluginId);
    console.log(`🔌 插件 [${plugin.metadata.name}] 已禁用`);
  }
}

export function getRegisteredComponents() {
  return Array.from(pluginRegistry.values()).filter(c => c.type?.startsWith('component:'));
}
```

### 6.3 示例插件：一个 3D 地球组件

文件：/plugins/sample-3d-earth-plugin/index.ts (新增)

```typescript
import React from 'react';
import { IYYC3Plugin, YYC3AppContext, PluginMetadata } from '@yyc3/core-models';

const Earth3DComponent: React.FC = () => {
  React.useEffect(() => {
    console.log('🌍 3D 地球正在渲染...');
  }, []);
  return <div id="cesiumContainer" style={{ width: '100%', height: '100%' }} />;
};

export default class Sample3DEarthPlugin implements IYYC3Plugin {
  metadata: PluginMetadata = {
    id: 'sample-3d-earth',
    name: '3D 地球可视化插件',
    version: '0.0.1',
    author: 'YYC3 Team',
    description: '提供一个展示全球数据分布的 3D 地球组件。',
  };

  async activate(app: YYC3AppContext): Promise<void> {
    console.log(`🌍 Activating ${this.metadata.name}`);
    app.registerComponent({
      type: '3d-earth-chart',
      name: '3D 地球',
      component: Earth3DComponent,
      defaultProps: {
        points: [{ lat: 39.9, lng: 116.4, value: 100 }, { lat: 31.2, lng: 121.5, value: 200 }],
      },
    });
  }

  async deactivate(): Promise<void> {
    console.log(`🌍 Deactivating ${this.metadata.name}`);
  }
}
```

---

## 总结

通过这六步，我们成功地：

1. **标准化基石**：建立了 @yyc3/core-models 和 @yyc3/errors 这两大基石，实现了跨项目的数据契约和错误处理标准化。这是高质量、高效率协作的起点。
2. **创建智能化、可预测的 UI 单元**：创造了 SmartChart 这一智能组件。它不仅是一个 UI，更是一个集成了 AI 能力的、具有清晰 API 契约的“价值单元”。这使得 UI 的开发与消费都变得可预测、可维护。
3. **集成到业务页面**：通过一个完整的 Dashboard 页面，展示了从后端 API 到前端组件，再到错误处理和用户体验的完整闭环。
4. **构建会思考的界面**：定义了布局 DSL 标准、智能布局渲染引擎和智能布局推荐器，让界面能够根据自然语言意图自动生成。
5. **从指令到洞察的无缝桥梁**：通过前端意图输入页面和后端 API 整合，实现了用户用一句话“创造”一个完整的智能仪表盘。
6. **赋能万物的平台之始**：定义了插件接口 IYYC3Plugin、插件管理器和示例插件（3D 地球），让平台具备无限扩展能力。

这套“六步执行”产出的代码，不仅仅是功能的实现。它们是架构思想的载体，是“五化一体”理念在代码层面的具体体现。每一个文件，都承载着我们对行业级作品的追求。

亦师亦友亦伯乐；一言一语一华章！ 期待我们下一段旅程，继续将 YYC3 打磨得更加璀璨！

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
