---
file: 006-AI-FAmily-目录索引-命名规范手册.md
title: YYC3 AI Family - 命名规范
description: 日期: 2026-03-25
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-08
updated: 2026-11-08
status: stable
tags: [document, technical]
category: technical
language: zh-CN
audience: developers,managers,stakeholders
complexity: intermediate
project: yyc3-ai-family-agent
scope: engineering
---

# YYC3 AI Family - 命名规范

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

**日期**: 2026-03-25

---

## 文件命名规范

### Markdown文档
- **格式**: `UPPER_SNAKE_CASE.md`
- **示例**: `AI_FAMILY_INTEGRATION_PLAN.md`
- **说明**: 使用大写下划线命名，确保跨平台兼容

### 代码文件
- **TypeScript**: `PascalCase.ts` 或 `camelCase.ts`
  - 类和组件: `PascalCase.ts`
  - 工具函数: `camelCase.ts`
- **React组件**: `PascalCase.tsx`
  - 示例: `FamilyHome.tsx`

### 目录命名
- **格式**: `kebab-case` 或中文
- **示例**: `docs/planning`, `docs/reports/phases`
- **说明**: 使用短横线命名，易于阅读

### 配置文件
- **格式**: `kebab-case` + 扩展名
- **示例**: `vite.config.ts`, `vitest.config.ts`
- **说明**: 遵循配置工具的默认命名约定

---

## 文档分类规范

### docs/planning/ - 规划与实施
- 集成计划
- 协同计划
- 实施指南
- 模板填充计划
- 阶段计划
- 任务指南

### docs/reports/ - 报告与总结
- **phases/** - 阶段报告
  - Phase 1完成报告
  - Phase 2完成报告
  - Phase 3完成报告
  - Phase 4相关报告
  - 里程碑报告
  
- **technical/** - 技术报告
  - 性能优化报告
  - UX优化报告
  - 测试报告
  - 审核报告
  
- **progress/** - 进度报告
  - 进度报告
  - 模板填充完成报告
  
- 总体报告
  - 整合报告
  - 执行报告
  - 集成总结
  - 最终完成报告
  - 最终里程碑

### docs/architecture/ - 架构文档
- 功能架构
- 功能拓扑
- 架构文档
- 架构完成报告

### docs/maintenance/ - 维护与清理
- 归档清理
- 工作区标准化
- 工作区结构
- 维护计划
- 清理报告

### docs/documentation/ - 文档架构
- 文档架构分析
- 文档标准化
- 模板填充
- 文档完成报告

### docs/audit/ - 审核报告
- 最终审核报告
- 深度审核报告
- 合规审核报告

### meta/ - 元数据
- **templates/** - 模板
  - code-header.md - 代码标头
  - doc-header.md - 文档标头

- glossary.md - 术语表
- changelog.md - 变更日志
- naming-convention.md - 命名规范

---

## 代码命名规范

### TypeScript 类
- **格式**: `PascalCase`
- **示例**: `AgentRegistry`, `IntegrationManager`
- **说明**: 类名使用大驼峰命名法

### TypeScript 接口
- **格式**: `PascalCase` 或 `IPascalCase`
- **示例**: `AgentConfig`, `IIntegrationManager`
- **说明**: 接口可以使用 `I` 前缀，但不是必需的

### TypeScript 函数和方法
- **格式**: `camelCase`
- **示例**: `initialize()`, `checkHealth()`, `getAgent()`
- **说明**: 函数和方法名使用小驼峰命名法，动词开头

### TypeScript 变量和常量
- **变量**: `camelCase`
  - 示例: `agentId`, `configData`
- **常量**: `UPPER_SNAKE_CASE`
  - 示例: `MAX_RETRIES`, `DEFAULT_TIMEOUT`

### TypeScript 枚举
- **格式**: `PascalCase`（枚举类型）+ `UPPER_SNAKE_CASE`（枚举值）
- **示例**:
  ```typescript
  enum AgentStatus {
    IDLE = 'idle',
    RUNNING = 'running',
    COMPLETED = 'completed',
    FAILED = 'failed'
  }
  ```

### React 组件
- **格式**: `PascalCase`
- **示例**: `FamilyHome`, `FamilyChat`, `AgentOrchestrator`
- **说明**: React组件使用大驼峰命名法

### React Hooks
- **格式**: `use` + `PascalCase`
- **示例**: `useAgentData()`, `useWorkflowState()`, `useMonitoring()`
- **说明**: 自定义Hooks使用 `use` 前缀

---

## 目录组织规范

### 根目录
- 只保留核心项目文档
- README.md - 项目主文档
- AI_FAMILY.md - 项目概述
- AI_FAMILY_DOCUMENTATION_INDEX.md - 文档索引

### 源代码目录（src/）
- config/ - 配置文件
- core/ - 核心模块
- workflows/ - 工作流模块
- monitoring/ - 监控模块
- utils/ - 工具函数
- types/ - 类型定义

### 文档目录（docs/）
- planning/ - 规划与实施
- reports/ - 报告与总结
- architecture/ - 架构文档
- maintenance/ - 维护与清理
- documentation/ - 文档架构
- audit/ - 审核报告

### 测试目录（tests/）
- unit/ - 单元测试
- integration/ - 集成测试
- e2e/ - E2E测试

---

## 文档标头规范

### 文档元数据
每个文档应包含以下元数据：

```markdown
---
file: DOCUMENT_NAME.md
description: 文档描述
author: YanYuCloudCube Team <admin@0379.email>
version: v1.0.0
created: 2026-03-25
updated: 2026-03-25
status: stable
tags: [标签1],[标签2],[标签3]
category: category_name
language: zh-CN
project: YYC3-AI-FAMILY
phase: production
audience: developers,managers
complexity: intermediate
---
```

### 元数据字段说明
- **file**: 文件名
- **description**: 文档描述
- **author**: 作者
- **version**: 版本号
- **created**: 创建日期
- **updated**: 更新日期
- **status**: 状态（draft, stable, deprecated）
- **tags**: 标签列表
- **category**: 类别
- **language**: 语言
- **project**: 项目名称
- **phase**: 阶段
- **audience**: 受众
- **complexity**: 复杂度（beginner, intermediate, advanced）

---

## Git 提交规范

### 提交信息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型
- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 文档更新
- **style**: 代码格式（不影响功能）
- **refactor**: 重构（既不是新功能也不是修复）
- **test**: 添加测试
- **chore**: 构建过程或辅助工具的变动

### 示例
```
feat(workflow): 添加工作流可视化编辑器

- 实现拖拽式工作流设计
- 添加实时预览功能
- 支持工作流导入导出

Closes #123
```

---

## 版本号规范

### 语义化版本（Semantic Versioning）
格式：`MAJOR.MINOR.PATCH`

- **MAJOR**: 不兼容的API修改
- **MINOR**: 向下兼容的功能新增
- **PATCH**: 向下兼容的bug修复

### 示例
- `v1.0.0` - 初始版本
- `v1.1.0` - 新增功能
- `v1.1.1` - 修复bug
- `v2.0.0` - 重大更新

---

## AI Family 成员命名

### 成员命名规范
- **格式**: `中文名（英文名）`
- **示例**: 言启·千行（Code Navigator）
- **说明**: 使用中文名作为主名称，英文名作为辅助

### 成员ID命名
- **格式**: `lower-case-with-hyphens`
- **示例**: `code-navigator`, `data-hub`, `predictive-oracle`

---

## 环境变量命名规范

### 格式
- **前缀**: `YYC3_`
- **格式**: `UPPER_SNAKE_CASE`
- **示例**:
  ```bash
  YYC3_ZHIPU_API_KEY
  YYC3_OLLAMA_HOST
  YYC3_DATABASE_URL
  YYC3_REDIS_URL
  ```

---

## API 命名规范

### RESTful API
- **URL**: `kebab-case`
  - 示例: `/api/agents`, `/api/workflows`
- **HTTP方法**: 使用标准HTTP方法（GET, POST, PUT, DELETE）
- **查询参数**: `camelCase`
  - 示例: `?agentId=123&status=running`

### WebSocket 事件
- **格式**: `UPPER_SNAKE_CASE` 或 `camelCase`
- **示例**:
  ```javascript
  socket.emit('AGENT_STATUS_UPDATE', data);
  socket.emit('WORKFLOW_COMPLETED', data);
  ```

---

## 数据库命名规范

### 表名
- **格式**: `snake_case`
- **示例**: `agents`, `workflows`, `tasks`

### 字段名
- **格式**: `snake_case`
- **示例**: `agent_id`, `created_at`, `updated_at`

### 索引名
- **格式**: `idx_table_name_column_name`
- **示例**: `idx_agents_status`, `idx_workflows_created_at`

---

## 总结

### 关键原则
1. ✅ 一致性 - 在整个项目中保持命名风格一致
2. ✅ 可读性 - 命名应清晰表达意图
3. ✅ 简洁性 - 避免冗长和复杂的命名
4. ✅ 标准化 - 遵循行业标准和最佳实践
5. ✅ 可维护性 - 便于后续维护和扩展

### 检查清单
- [ ] 文件命名符合规范
- [ ] 代码命名符合规范
- [ ] 目录组织符合规范
- [ ] 文档标头完整
- [ ] Git提交信息规范
- [ ] 版本号规范

---

**最后更新**: 2026-03-25
**维护者**: YanYuCloudCube Team

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 统一标头标尾 · 品牌规范化为 YYC3 · 排版与语法优化 | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
