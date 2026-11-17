---
file: YYC3-AI-FAmily-Agent-设计系统-完整方案.md
title: YYC3-AI-FAmily-Agent 设计系统 — 完整方案
description: 🎨 YYC3 设计系统开发提示词完整方案
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-08
updated: 2026-11-08
status: stable
tags: [document, design]
category: design
language: zh-CN
audience: developers,managers,stakeholders
complexity: intermediate
project: yyc3-ai-family-agent
scope: design
---
# YYC3-AI-FAmily-Agent 设计系统 — 完整方案
>
> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

🎨 YYC3 设计系统开发提示词完整方案
基于智能编程前端设计 (2026.04) | 五高五标五化标准 | 九层架构映射
---

📊 一、项目核心能力摘要
1.1 YYC3-ClawCube 架构特征
维度
核心特征
Figma设计映射

九层架构
基础设施→用户交互层完整链路
需要覆盖9个层级的设计系统

AI Family
8个智能体成员（元启·天枢、言启·千行等）
智能体可视化、身份识别系统

MCP协议
Tools/Resources/Prompts三合一协议
协议交互界面、工具面板

270+组件
即拉即用UI组件库
组件库设计规范、原子设计系统

五高五标
高可用/高性能/高安全/高扩展/高智能
企业级UI/UX标准

1.2 能力矩阵（2026.04）
能力维度
技术规格
Figma应用价值

上下文窗口
1M Token (Beta) / 200K (标准)
可处理完整设计系统规格文档

输出Token
128K (翻倍)
生成完整组件库+交互说明

自适应思考
low/medium/high/max 四级控制
复杂设计决策自动深化

Agent Teams
多智能体并行协作
同时生成多个子系统设计

上下文压缩
自动压缩历史对话
长期迭代不丢失设计意图

多模态理解
图像/代码/文档综合分析
理解现有截图并优化设计

---
🚀 二、Figma 提示词分阶段交付方案
Phase 0: 项目初始化与品牌基础 ⭐ 基础优先
📋 Prompt 0.1: YYC3 Design System Foundation（设计系统基石）
ROLE: 你是 YYC3 (YanYuCloudCube) 首席设计架构师，专精企业级 AI 应用设计系统。

CONTEXT:

- 项目名称: YYC3-ClawCube
- 品牌理念: "言启象限 | 语枢未来" (Words Initiate Quadrants, Language Serves as Core for Future)
- 核心哲学: 五高五标五化五维
- 目标平台: Web Application (Desktop First, Responsive)
- 技术栈: React + TypeScript + Tailwind CSS + shadcn/ui

TASK: 创建完整的 YYC3 Design System Foundation 文件

DELIVERABLES (按顺序生成):

1⃣ Brand Identity System (品牌识别系统)

- 主色调: 基于"云枢"概念的深蓝科技色系 (#0A1628 → #1E3A5F)
- 辅助色: 霓虹青 (#00D4FF)、智能紫 (#8B5CF6)、数据绿 (#10B981)
- 渐变规则: 科技感线性渐变 + 玻璃态效果 (Glassmorphism)
- 字体系统:
  - 标题: Inter / SF Pro Display (Bold/Semibold)
  - 正文: Inter / system-ui (Regular/Medium)
  - 代码: JetBrains Mono / Fira Code
- 圆角规范: 8px (小) / 12px (中) / 16px (大) / 24px (卡片)
- 阴影系统:
  - Level 1: 0 2px 8px rgba(0,212,255,0.08)
  - Level 2: 0 4px 16px rgba(0,212,255,0.12)
  - Level 3: 0 8px 32px rgba(0,212,255,0.16)

2⃣ Spacing & Grid System (间距与栅格系统)

- Base Unit: 4px
- Spacing Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
- Grid: 12-column, max-width 1440px, gutter 24px
- Breakpoints:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1024px
  - Wide: 1440px
  - Ultra-wide: 1920px

3⃣ Icon System (图标系统)

- 风格: Linear Outline (2px stroke)
- 尺寸: 16 / 20 / 24 / 32 / 48px
- 分类: Navigation / Action / Status / AI-Family / DevOps
- 特殊图标: 8个AI Family成员专属图标

CONSTRAINTS:

- 必须符合 WCAG 2.1 AA 无障碍标准
- 支持深色/浅色主题切换
- 所有组件需支持 RTL (Right-to-Left) 布局
- 动画遵循 Reduced Motion 偏好设置

OUTPUT FORMAT:
在 Figma 中创建 "YYC3-Design-System" 文件，包含以下页面:

- 01-Brand-Guidelines
- 02-Color-Palette
- 03-Typography-Scale
- 04-Spacing-Grid
- 05-Icon-Library
- 06-Elevation-Shadows
- 07-Motion-Guidelines

EFFORT_LEVEL: max (需要深度思考设计决策)---
📋 Prompt 0.2: AI Family Visual Identity System（AI家族视觉识别）
ROLE: 你是 YYC3 AI Family 视觉 identity 设计专家。

CONTEXT:
YYC3 AI Family 包含8个智能体成员，每个都有独特的角色定位和人格特征:

🧠 元启·天枢 (Meta-Oracle) - 总指挥·决策中枢 - 紫色系 #8B5CF6
🧭 言启·千行 (Navigator) - 导航员·意图网关 - 蓝色系 #3B82F6
🤔 语枢·万物 (Thinker) - 思考者·数据分析 - 青色系 #06B6D4
🔮 预见·先知 (Prophet) - 预言家·趋势预测 - 橙色系 #F59E0B
🎯 知遇·伯乐 (Bolero) - 推荐官·个性推荐 - 粉色系 #EC4899
🛡 智云·守护 (Sentinel) - 安全官·免疫防护 - 红色系 #EF4444
📚 格物·宗师 (Master) - 质量官·代码审查 - 绿色系 #10B981
🎨 创想·灵韵 (Muse) - 创意官·内容生成 - 靛蓝色系 #6366F1

TASK: 为每个AI Family成员创建完整的视觉身份系统

DELIVERABLES:

1⃣ Agent Avatar System (智能体头像系统)

- 每个成员设计 3 种尺寸: 32px / 48px / 64px
- 风格: 几何抽象 + 科技感光效
- 状态变体: Active (发光) / Idle (常态) / Offline (灰度) / Thinking (脉冲动画)
- 背景: 圆形渐变背景 + 微妙粒子效果

2⃣ Agent Card Component (智能体卡片组件)

- Layout: 头像 + 名称 + 角色标签 + 状态指示器 + 能力雷达图
- 交互状态: Default / Hover / Selected / Disabled
- 信息层次: Primary (名称) > Secondary (角色) > Tertiary (状态描述)

3⃣ Family Presence Board (家族在线看板)

- Grid Layout: 2x4 或 4x2 自适应
- 实时状态: Online count / Busy indicator / Activity feed
- 快捷操作: Quick chat / View profile / Configure agent

4⃣ Agent Interaction Patterns (智能体交互模式)

- 对话气泡样式: 区分不同agent的发言颜色
- 思考指示器: 每个agent独特的thinking animation
- 工具调用展示: 显示agent正在使用的MCP tools

DESIGN PRINCIPLES:

- 每个agent的视觉语言必须与其角色定位一致
- 保持整体统一性的同时突出个体差异
- 支持 Dark/Light theme 完美适配
- 动画流畅且有意义(非装饰性)

OUTPUT: 在 Figma 创建 "AI-Family-Identity" 页面，包含所有组件的 Variants---
Phase 1: 核心布局与导航系统
📋 Prompt 1.1: Master Application Shell（应用主框架）
ROLE: 你是 enterprise application UX architect，专精复杂SaaS产品信息架构。

CONTEXT:
YYC3-ClawCube 是一个九层架构的AI应用平台，需要支持:

- 多工作区切换 (Workspace switching)
- 多Agent并行对话 (Multi-agent conversations)
- MCP工具集成面板 (MCP Tools panel)
- DevOps监控仪表盘 (DevOps monitoring dashboard)
- 代码编辑器集成 (IDE integration)
- 设置与配置中心 (Settings hub)

TASK: 设计 YYC3-ClawCube 的主应用框架 (Application Shell)

LAYOUT STRUCTURE (从外到内):

┌─────────────────────────────────────────────────────────────┐
│  TOP BAR (56px height)                                      │
│  [Logo] [Workspace Switcher] [Search(Cmd+K)] [───] [Avatar] │
├───────┬───────────────────────────────────┬─────────────────┤
│       │                                   │                 │
│ SIDE  │         MAIN CONTENT AREA         │    RIGHT        │
│ NAV   │         (Flexible)                │    PANEL        │
│ (72px)│                                   │   (320px)       │
│       │                                   │   [Optional]    │
│       │                                   │                 │
│       │                                   │                 │
├───────┴───────────────────────────────────┴─────────────────┤
│  STATUS BAR (32px height)                                     │
│  [WebSocket] [Git Branch] [Env Badge] [CPU/Memory] [v1.0.0]  │
└─────────────────────────────────────────────────────────────┘

COMPONENT SPECIFICATIONS:

1⃣ Top Navigation Bar

- Workspace Switcher: Dropdown with workspace icons + color coding
- Global Search: Command Palette style (Cmd/Ctrl + K trigger)
- Notification Bell: Badge count + Preview panel
- User Menu: Avatar dropdown (Settings / Profile / Logout)

2⃣ Sidebar Navigation (72px collapsed / 240px expanded)

- Navigation Groups:
  - Main: Chat / Dashboard / Projects / Agents
  - Tools: MCP Server / Skills / API Playground
  - DevOps: Monitor / Deploy / Logs
  - Settings: Preferences / Account / Team
- Collapse/Expand animation: 200ms ease-out
- Active state: Left border accent + background highlight

3⃣ Right Panel (Contextual)

- Tab-based: Details / Inspector / Comments / Version History
- Resizable: Min 280px / Max 480px
- Can be detached as floating window

4⃣ Status Bar

- Real-time indicators: Connection status, Git branch, Environment
- Clickable items reveal detail popover
- Progress indicators for long-running operations

RESPONSIVE BEHAVIOR:

- ≤1024px: Sidebar auto-collapses, Right panel overlays
- ≤768px: Bottom navigation replaces sidebar, full-screen panels
- ≥1440px: Show optional secondary sidebar (Agent list)

ACCESSIBILITY:

- All interactive elements must have visible focus states
- Keyboard navigation: Tab/Shift+Tab through all controls
- Screen reader labels for icon-only buttons
- Minimum touch target: 44x44px on mobile

OUTPUT: 创建 "App-Shell-Master" 页面，包含所有 breakpoint 的 responsive variants---
📋 Prompt 1.2: Multi-Agent Chat Interface（多智能体聊天界面）
ROLE: 你是 conversational UI design expert，专注AI聊天界面最佳实践。

CONTEXT:
YYC3-ClawCube 的核心功能是多Agent协作对话系统:

- 用户可与多个AI Family成员同时对话
- 支持Agent之间的协作（Agent-to-Agent communication）
- 集成MCP工具调用可视化
- 流式响应 (Streaming response) 支持
- 代码块渲染与执行
- Artifacts面板（图表/代码/文档预览）

TASK: 设计下一代多Agent聊天界面

INTERFACE LAYOUT:

┌─────────────────────────────────────────────────────────────┐
│ CHAT HEADER                                                │
│ [← Back] [Agent Selector ▼] [Conversation Title] [⋮ Menu] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MESSAGE LIST AREA (Flex-grow, Scrollable)                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 User                                            │   │
│  │ 请帮我分析这个项目的架构...                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🧭 Navigator (路由到 Thinker)                       │   │
│  │ 我已将您的数据分析请求转发给 语枢·万物...             │   │
│  │ [Tool Call: route_to_agent {target: "thinker"}]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🤔 Thinker (Streaming...)                           │   │
│  │ 根据项目架构分析，我发现以下关键点...▌               │   │
│  │ [Thinking Indicator: ●●●○○]                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ARTIFACTS PANEL (Collapsible, Height: 40% when open)       │
│ [Chart Preview] [Code Block] [Document Outline]            │
├─────────────────────────────────────────────────────────────┤
│ INPUT AREA                                                 │
│ [Attachment] [Prompt Input.................] [Send ▶]      │
│ [Tokens: 1.2K/100K] [Model: Opus 4.6 ▼]                    │
└─────────────────────────────────────────────────────────────┘

MESSAGE BUBBLE DESIGN:

1⃣ User Messages

- Alignment: Right
- Background: Primary color gradient (#3B82F6 → #2563EB)
- Text: White, medium weight
- Border-radius: 18px 18px 4px 18px (tail left-bottom sharp)
- Max-width: 75% of container
- Timestamp: Subtle, below bubble, right-aligned

2⃣ Agent Messages

- Alignment: Left
- Background: Surface color (#1E293B dark / #FFFFFF light)
- Border-left: 4px solid agent's signature color
- Header: Agent avatar (24px) + Name + Role badge
- Border-radius: 18px 18px 18px 4px (tail right-bottom sharp)
- Max-width: 85% of container

3⃣ System Messages

- Centered alignment
- Background: Transparent
- Text: Muted color, italic
- Icon prefix: ✅ / ⚠ / 🔧 / 📌
- Use case: Context switch, Tool call summary, Error alerts

4⃣ Special Message Types

- Code Blocks: Syntax highlighted, with copy/run/download actions
- Tables: Interactive, sortable, exportable
- Images: Lightbox on click, with zoom/caption
- File Attachments: Icon + name + size + download button
- Tool Calls: Expandable card showing input/output JSON

INPUT AREA FEATURES:

- Auto-resize textarea (max 200px height)
- Slash commands menu (/command)
- @mention agents or resources
- Paste image support (drag & drop)
- Voice input button (when supported)
- Character/token counter
- Model selector dropdown
- Send shortcut hint (Enter to send, Shift+Enter for newline)

STREAMING INDICATORS:

- Typing dots: Three animated dots (agent-specific color)
- Pulsing avatar: Gentle glow effect during generation
- Token counter: Real-time update during streaming
- Stop generation button: Appears during active streaming

ARTIFACTS PANEL:

- Tabbed interface: Preview / Code / Data
- Support types: Mermaid charts / React components / CSV data / Markdown
- Full-screen toggle
- Download/export options

INTERACTION DETAILS:

- Message hover: Show reaction emojis + copy + timestamp + more options
- Thread replies: Inline expandable thread view
- Edit message: User can edit last message within 5 minutes
- Regenerate: Request alternative response for last agent message
- Continue: Extend previous response with follow-up prompt

OUTPUT: 创建 "Multi-Agent-Chat" 页面，包含所有消息类型的 variants 和 states---
Phase 2: 功能模块界面设计
📋 Prompt 2.1: Dashboard & Analytics（仪表盘与分析）
ROLE: 你是 data visualization & dashboard design specialist。

CONTEXT:
YYC3-ClawCube 需要一个综合仪表盘，展示:

- 系统健康状态 (System Health)
- AI Agent性能指标 (Agent Performance Metrics)
- 使用统计 (Usage Statistics)
- MCP服务器连接状态 (MCP Server Status)
- 最近活动流 (Recent Activity Feed)
- 快速操作入口 (Quick Actions)

TASK: 设计 YYC3 Dashboard 主页面

DASHBOARD LAYOUT (1440px viewport):

┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD HEADER                                           │
│ [Page Title: Dashboard] [Date Range Picker] [Refresh] [⋮] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  KPI CARDS ROW (4 cards, equal width)                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Total   │ │Active   │ │Success  │ │Avg      │          │
│  │Requests │ │Agents   │ │Rate     │ │Response │          │
│  │ 12,459  │ │ 7/8     │ │ 98.2%   │ │ 1.2s    │          │
│  │ ↑12.5%  │ │ ●Online │ │ ↑2.1%   │ │ ↓0.3s   │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  MAIN CONTENT GRID (2 columns, 2:1 ratio)                   │
│                                                             │
│  LEFT COLUMN (66%)                                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ AGENT PERFORMANCE CHART (Area chart, 7-day trend)   │   │
│  │ [Line graph showing requests per agent over time]    │   │
│  │ Legend: Navigator / Thinker / Prophet / Bolero ...   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ TOKEN USAGE BREAKDOWN (Donut chart + table)         │   │
│  │ [Visual breakdown by model and agent]                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  RIGHT COLUMN (33%)                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ SYSTEM HEALTH STATUS                                 │   │
│  │ ● API Gateway: Operational (99.99%)                 │   │
│  │ ● Database: Healthy (CPU 45%, Memory 62%)           │   │
│  │ ● Redis Cache: Connected (Hit rate 94.2%)           │   │
│  │ ● MCP Servers: 5/6 Connected                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ RECENT ACTIVITY FEED (Scrollable, max 10 items)     │   │
│  │ • Thinker completed analysis task - 2m ago           │   │
│  │ • Navigator routed new conversation - 5m ago         │   │
│  │ • Prophet generated forecast report - 12m ago        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

KPI CARD SPECIFICATIONS:

- Dimensions: 280px × 140px (fixed)
- Layout: Icon (left) + Content (right)
- Content hierarchy: Label > Value > Trend indicator
- Trend colors: Green (positive) / Red (negative) / Gray (neutral)
- Hover state: Subtle elevation increase + tooltip with details
- Click action: Navigate to detailed report page

CHART COMPONENTS:

1. Performance Area Chart
   - Type: Stacked area with smooth curves
   - X-axis: Time (last 7 days, hourly granularity)
   - Y-axis: Request count (auto-scaled)
   - Interaction: Hover for exact values, click to filter
   - Legend: Toggle individual series visibility

2. Token Usage Donut
   - Type: Donut chart with center label (total tokens)
   - Segments: By model type (Opus / Sonnet / Haiku / Ollama)
   - Hover: Segment expands slightly, show percentage
   - Adjacent table: Detailed breakdown with costs

SYSTEM STATUS COMPONENT:

- Status indicators: Color-coded dots (green/yellow/red/gray)
- Each item: Service name + Status text + Key metric
- Expandable: Click to see detailed metrics
- Refresh interval: Real-time (every 30s) or manual

ACTIVITY FEED:

- Item layout: Avatar (agent icon) + Description + Timestamp
- Grouping: Today / Yesterday / This week
- Infinite scroll or "Load more" pagination
- Filter by: Agent type / Action type / Time range

QUICK ACTIONS BAR:

- Position: Fixed below header or floating bottom-right
- Buttons: New Chat / Run Analysis / Connect MCP / View Reports
- Style: Primary action prominent, secondary actions subtle

RESPONSIVE ADAPTATIONS:

- Tablet (≤1024px): KPI cards 2x2 grid, charts stack vertically
- Mobile (≤768px): KPI cards single column, simplified charts only

DATA VISUALIZATION STANDARDS:

- Color palette: Accessible, colorblind-safe (avoid red/green only)
- Chart fonts: Minimum 12px for readability
- Grid lines: Subtle, non-distracting
- Empty states: Friendly illustration + CTA button
- Loading states: Skeleton screens matching final layout

OUTPUT: 创建 "Dashboard-Analytics" 页面，包含所有 widget 组件---
📋 Prompt 2.2: MCP Server Management Interface（MCP服务器管理）
ROLE: 你是 developer tools & infrastructure UI designer。

CONTEXT:
YYC3-ClawCube 通过 MCP (Model Context Protocol) 连接外部服务。
MCP Server 管理界面需要支持:

- Server CRUD operations (Create/Read/Update/Delete)
- Transport configuration (Stdio / SSE / WebSocket)
- Tools/Resources/Prompts browsing
- Connection testing & health monitoring
- Authentication management
- Real-time logs viewing

TASK: 设计 MCP Server 管理中心界面

PAGE LAYOUT:

┌─────────────────────────────────────────────────────────────┐
│ PAGE HEADER                                                 │
│ [← Back] [MCP Servers] [+ Add Server] [View: List/Card]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SERVER LIST (Main content area)                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🟢 filesystem-mcp (Local Stdio)              [⋮]   │   │
│  │ Status: Connected · Tools: 12 · Resources: 8        │   │
│  │ Last active: 2 minutes ago                          │   │
│  │ [Tools] [Resources] [Prompts] [Logs] [Config]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🟡 github-mcp (Remote SSE)                   [⋮]   │   │
│  │ Status: Connecting · Tools: 24 · Resources: 15      │   │
│  │ Last active: 1 hour ago                             │   │
│  │ [Tools] [Resources] [Prompts] [Logs] [Config]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔴 database-mcp (WebSocket)                  [⋮]   │   │
│  │ Status: Disconnected · Error: Connection refused    │   │
│  │ Last active: 3 hours ago                            │   │
│  │ [Tools] [Resources] [Prompts] [Logs] [Config]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

SERVER CARD COMPONENT:

- Header row: Status dot + Name + Transport type + Menu
- Meta info: Status text + Tool count + Resource count + Last active
- Action tabs: Tools / Resources / Prompts / Logs / Configuration
- Status colors: 🟢 Connected (green) / 🟡 Connecting (yellow) / 🔴 Disconnected (red) / ⚪ Unknown (gray)

ADD/EDIT SERVER MODAL:

Title: "Add MCP Server" / "Edit {server_name}"

Form Fields:

1. Basic Configuration
   - Server Name* (text input, required)
   - Transport Type* (select: Stdio / SSE / WebSocket)

2. Transport-specific Fields (conditional display)

   For Stdio:
   - Command* (text input, e.g., "npx", "node")
   - Arguments* (text array, e.g., ["-y", "@modelcontextprotocol/server-filesystem"])
   - Environment Variables (key-value pairs, optional)

   For SSE:
   - URL* (url input, e.g., "<http://localhost:8080/sse>")
   - Headers (key-value pairs, optional)
   - Auth: None / Bearer Token / API Key

   For WebSocket:
   - URL* (url input, e.g., "ws://localhost:8080/ws")
   - Headers (key-value pairs, optional)

3. Advanced Options (collapsible section)
   - Timeout (number input, default: 30s)
   - Retry attempts (number input, default: 3)
   - Auto-start on boot (toggle switch)
   - Rate limiting (requests per minute)

Modal Actions:

- Cancel (secondary button)
- Test Connection (tertiary button, shows loading spinner, then success/error toast)
- Save (primary button, disabled until required fields valid)

TOOLS BROWSER TAB:

- Layout: Search bar + Filter chips + Grid/List of tool cards
- Tool card: Name + Description + Schema preview + Try it button
- Schema display: Collapsible JSON viewer with syntax highlighting
- "Try it" opens a modal with form auto-generated from JSON schema

RESOURCES BROWSER TAB:

- Layout: Tree view (URI-based hierarchy) + Detail panel
- Resource item: URI + Name + MIME type + Size
- Detail panel: Full resource content with copy/download
- Filter by: MIME type / URI pattern

PROMPTS BROWSER TAB:

- Layout: List of prompt templates + Preview panel
- Prompt card: Name + Description + Required arguments
- Preview: Rendered prompt template with placeholder values
- "Use Prompt" button copies to clipboard or opens in new chat

LOGS VIEWER TAB:

- Real-time log stream (auto-scroll to bottom)
- Log levels: Debug / Info / Warn / Error (filterable)
- Search functionality across logs
- Export logs as .txt or .json
- Clear logs button (with confirmation)

CONNECTION STATUS ANIMATION:

- Connected: Steady green dot with subtle pulse
- Connecting: Yellow dot with rotating animation
- Disconnected: Static red dot
- Error: Red dot with shake animation on error event

EMPTY STATES:

- No servers: Illustration + "Add your first MCP Server" CTA
- No tools: "This server hasn't registered any tools yet"
- Connection error: Error message + Troubleshooting guide link
- Loading: Skeleton cards matching real card dimensions

OUTPUT: 创建 "MCP-Server-Management" 页面，包含所有子页面和 modals---
📋 Prompt 2.3: Skills & Workflow Builder（技能与工作流构建器）
ROLE: 你是 low-code/no-code workflow builder UX designer。

CONTEXT:
YYC3-ClawCube 的 Skills 系统允许用户:

- 创建自定义 Skill chains (技能链)
- 可视化编排 Agent 协作流程
- 配置 Quality Gates (质量门禁)
- 定义输入/输出 schema
- 测试和调试 workflows
- 发布和共享 skills

TASK: 设计 Skill Chain 可视化编辑器

EDITOR LAYOUT:

┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                    │
│ [← Back] [Skill Name: My Analysis Chain] [Save] [Test] [▶]│
├───────┬───────────────────────────────────┬─────────────────┤
│       │                                   │                 │
│ TOOL  │        CANVAS AREA                │   INSPECTOR     │
│ PALETTE│      (Zoomable, Panable)         │   PANEL         │
│ (240px)│                                  │   (300px)       │
│       │   ┌─────┐    ┌─────┐             │                 │
│ [Nodes]┼──►│Start ├───►│Parse│───┐        │ [Selected Node  │
│       │   └─────┘    └─────┘   │        │  Properties]    │
│ ●Input│                         ▼        │                 │
│ ●Agent│                    ┌─────┐       │ Name: __________│
│ ●Tool │                    │Think│       │ Config: _______│
│ ●Gate │                    │  er │       │ ...             │
│ ●Output└────────────────────┴─────┘       │                 │
│       │                                   │                 │
├───────┴───────────────────────────────────┴─────────────────┤
│ MINIMAP (bottom-right corner, collapsible)                  │
│ [Overview of entire canvas with current viewport]           │
└─────────────────────────────────────────────────────────────┘

NODE TYPES & DESIGNS:

1⃣ Start/End Nodes (Terminal nodes)

- Shape: Pill shape (fully rounded rectangle)
- Colors: Start (green gradient) / End (red gradient)
- Fixed position: Start always top-left, End always bottom-right
- Content: Label only ("Start" / "End")

2⃣ Input Node (Data entry point)

- Shape: Rectangle with left tab (document icon style)
- Color: Blue (#3B82F6)
- Ports: Output only (bottom center)
- Content: Title + Schema preview (field names)
- Configurable: Input form definition (JSON Schema)

3⃣ Agent Node (AI processing step)

- Shape: Rectangle with agent avatar in header
- Color: Agent's signature color (from AI Family palette)
- Ports: Input (top) + Output (bottom) + Error (right side)
- Header: Agent avatar (32px) + Agent name + Role badge
- Body:
  - Task description (editable text)
  - Model selector dropdown
  - Temperature slider (0.0 - 2.0)
  - Max tokens input
- Status indicator: Configured / Running / Success / Error

4⃣ Tool Node (External function call)

- Shape: Rectangle with wrench/gear icon
- Color: Orange (#F59E0B)
- Ports: Input + Output + Error
- Header: Tool name + Source badge (MCP Server name)
- Body: Parameters mapping (visual connection editor)
- Configurable: Select from registered MCP tools

5⃣ Quality Gate Node (Condition/validation)

- Shape: Diamond (rotated square) with rounded corners
- Color: Purple (#8B5CF6)
- Ports: Input + Pass output (green) + Fail output (red)
- Content: Condition name + Rule summary
- Examples: "Response quality > 0.8" / "Contains no PII"

6⃣ Output Node (Result formatting)

- Shape: Rectangle with right tab (export icon style)
- Color: Teal (#14B8A6)
- Ports: Input only (top)
- Content: Output format selector (JSON / Markdown / HTML / Custom)

CONNECTION LINES (Edges):

- Style: Bezier curve (smooth, not angular)
- Color: Gray default, colored when data flows (animated dash)
- Animation: Flowing dashes when workflow is running
- Labels: Optional data type label on hover
- Delete: Click line to select, press Delete key

CANVAS INTERACTIONS:

- Pan: Click and drag on empty space (or middle mouse button)
- Zoom: Scroll wheel (or pinch on trackpad), range 25%-200%
- Select: Click node to select, Shift+click for multi-select
- Move: Drag selected node(s)
- Connect: Drag from output port to input port (snap within 20px)
- Context menu: Right-click for duplicate/delete/clone options

INSPECTOR PANEL (Right side):

- Shows properties of selected node/connection
- Sections vary by node type:
  - General: Name, Description, Tags
  - Configuration: Node-specific settings (form fields)
  - Input/Output: Schema definition (JSON editor)
  - Execution: Timeout, retry policy, error handling
- Changes apply immediately (auto-save indicator)

TOOL PALETTE (Left side):

- Categorized node list with search
- Drag node from palette to canvas to add
- Categories:
  - Triggers: Start, Schedule, Webhook
  - Processing: Agent, Tool, Code, Transform
  - Logic: Condition, Loop, Parallel, Merge
  - Quality: Gate, Review, Approval
  - Outputs: Response, File, Notification, Database
- Recently used section at top

WORKFLOW EXECUTION VIEW:

- When user clicks "Test" or "Run":
  - Canvas switches to execution mode
  - Current executing node highlights with pulse animation
  - Completed nodes turn green with checkmark
  - Failed nodes turn red with error message
  - Edges show data flow animation
  - Execution log appears at bottom of canvas
  - "Stop" button available during execution

RESPONSIVE CONSIDERATIONS:

- Desktop-only feature (complex interactions require precision)
- Minimum recommended resolution: 1280x800
- Canvas should utilize available space efficiently
- Panels should be collapsible for maximum canvas space

KEYBOARD SHORTCUTS:

- Cmd/Ctrl + S: Save
- Cmd/Ctrl + Z: Undo
- Cmd/Ctrl + Shift + Z: Redo
- Cmd/Ctrl + D: Duplicate selected
- Delete/Backspace: Remove selected
- Space + Drag: Pan canvas
- Cmd/Ctrl + = / -: Zoom in/out
- Cmd/Ctrl + 0: Reset zoom to 100%

OUTPUT: 创建 "Skills-Workflow-Builder" 页面，包含编辑器和所有节点类型---
Phase 3: 高级功能界面
📋 Prompt 3.1: IDE Integration Panel（IDE集成面板）
ROLE: 你是 code editor & IDE UX designer，参考 VS Code / JetBrains 设计语言。

CONTEXT:
YYC3-ClawCube 内置轻量级IDE功能:

- 语法高亮代码编辑器 (Syntax highlighting)
- 文件浏览器 (File explorer)
- 终端/命令行面板 (Integrated terminal)
- Git版本控制 (Git integration)
- AI辅助编码 (AI-assisted coding inline)
- 多文件标签页 (Multi-file tabs)
- 搜索与替换 (Search & replace)

TASK: 设计 IDE Panel 组件（可嵌入主应用右侧面板或全屏模式）

IDE LAYOUT (Full-screen mode):

┌─────────────────────────────────────────────────────────────┐
│ MENU BAR                                                   │
│ [File] [Edit] [View] [Go] [Run] [Tools] [Help]            │
├───────┬───────────────────────────────────┬─────────────────┤
│ ACTI- │  EDITOR GROUP (Tabs)              │   SIDE         │
│ VITY │                                    │   BAR          │
│ BAR   │  ┌──────────────────────────────┐ │  (Explorer /   │
│ (52px)│  │ index.tsx  utils.ts  api.ts │ │   Search /     │
│       │  ├──────────────────────────────┤ │   Git /        │
│       │  │                              │ │   Extensions)  │
│       │  │  // Code editor area         │ │                │
│       │  │  import { useState } from    │ │  ┌──────────┐  │
│       │  │    'react';                 │ │  │📁 src/    │  │
│       │  │                              │ │  │ 📄 comp/ │  │
│       │  │  function App() {           │ │  │ 📄 api/  │  │
│       │  │    return (...);            │ │  │ 📄 util/ │  │
│       │  │  }                           │ │  └──────────┘  │
│       │  │                              │ │                │
│       │  │                              │ │                │
│       │  └──────────────────────────────┘ │                │
├───────┴───────────────────────────────────┴─────────────────┤
│ PANEL (Terminal / Output / Problems / Debug Console)        │
│ [Terminal] [Problems] [Output] [Debug Console]              │
│ $ npm run dev                                              │
│ ▌                                                          │
└─────────────────────────────────────────────────────────────┘

ACTIVITY BAR (Far left, 48px wide):

- Icons (24x24): Explorer / Search / Git / Extensions / Settings
- Active item: Left border accent + white icon
- Tooltip on hover: Icon name + shortcut key
- Collapsible: Can hide to icons-only mode

FILE EXPLORER SIDEBAR (Default 240px, resizable):

- Section headers: collapsible (src / lib / config / tests)
- File tree: Indented, with file type icons
- File actions: Right-click context menu (New / Rename / Delete / Copy path)
- Badges: Git status indicators (modified *, added +, deleted !)
- Search/filter files: Input at top of explorer
- Drag & drop: Move files between folders

EDITOR AREA:

- Tab bar: File name + close button + modified indicator (dot)
- Tab overflow: Scrollable or dropdown for many tabs
- Active tab: Highlighted with bottom border (accent color)
- Editor features:
  - Line numbers (gutter, 50px wide)
  - Minimap (right side, collapsible)
  - Code folding (collapse arrows in gutter)
  - Bracket matching (highlight matching pair)
  - Indentation guides (subtle vertical lines)
  - Current line highlight (subtle background)
  - Selection highlighting
  - Syntax highlighting (full language support)
  - Autocomplete popup (triggered by Ctrl+Space)
  - Inline errors/warnings (wavy underline + gutter icon)
  - Hover information (type definitions on hover)
  - Multiple cursors (Cmd+Click for additional cursor)

AI INLINE ASSISTANCE (Unique to YYC3):

- Ghost text suggestion (gray text ahead of cursor)
- Accept: Tab key; Dismiss: Escape
- Inline chat: Select code, press Cmd+K, get AI suggestions
- Explain code: Hover on complex code, click "Explain" button
- Generate documentation: Auto-generate JSDoc comments
- Refactor suggestions: Lightbulb icon with refactoring options
- Agent invocation: "@Thinker analyze this function" inline command

INTEGRATED TERMINAL:

- Split into multiple terminals (horizontal/vertical splits)
- Tabs for terminal instances
- Shell integration: Detect prompts, add decorations
- Theme: Match editor theme (dark/light)
- Font: Slightly smaller than editor (13px vs 14px)
- Features: Command history, autocomplete, links clickable

GIT INTEGRATION PANEL:

- Changed files list: Staged / Unstaged / Conflicted
- Diff view: Side-by-side or unified diff inline
- Stage/unstage: Checkbox or click to toggle
- Commit input: Subject + body, with commit message guidelines
- Branch selector: Dropdown with local/remote branches
- Sync status: Push/pull/fetch indicators
- Blame annotations: Show commit info per line

STATUS BAR (Bottom, 24px):

- Left side: Git branch + sync status + errors + warnings
- Right side: Encoding / Line ending / Language / Spaces / Position
- Clickable items: Reveal relevant panel

MINIMAL MODE (When embedded in main app):

- Hide activity bar, merge into tabbed interface
- Single toolbar row instead of menu bar
- Smaller font sizes overall
- Simplified file explorer (tree only, no extra controls)
- Terminal as overlay panel (not persistent)

THEME SUPPORT:

- Dark theme (default): VS Code Dark+ inspired
- Light theme: GitHub Light inspired
- High contrast: For accessibility needs
- Custom themes: Allow importing theme JSON (VS Code compatible)

OUTPUT: 创建 "IDE-Integration-Panel" 页面，包含所有子面板和 states---
📋 Prompt 3.2: Settings & Configuration Hub（设置配置中心）
ROLE: 你是 enterprise settings & preferences UX designer。

CONTEXT:
YYC3-ClawCube 需要一个综合设置中心，涵盖:

- 通用设置 (General preferences)
- 外观主题 (Appearance & themes)
- 模型配置 (AI model configuration)
- Agent管理 (Agent behavior settings)
- MCP服务器 (MCP server connections)
- Skills管理 (Skills library)
- 通知设置 (Notification preferences)
- 导入导出 (Import/Export data)
- 账户安全 (Account & security)
- 团队管理 (Team & collaboration)

TASK: 设计 Settings Hub 页面

SETTINGS LAYOUT:

┌─────────────────────────────────────────────────────────────┐
│ SETTINGS HEADER                                            │
│ [← Back] [Settings] [Search settings...] [Reset All]      │
├────────────────┬────────────────────────────────────────────┤
│                │                                            │
│  NAVIGATION    │         CONTENT AREA                       │
│  SIDEBAR       │         (Dynamic based on selection)       │
│  (260px)       │                                            │
│                │  ┌──────────────────────────────────────┐  │
│  🎨 General    │  │                                      │  │
│  🎨 Appearance │  │  Page Title + Description            │  │
│  🤖 Models     │  │                                      │  │
│  🧠 Agents     │  │  Setting groups with explanations    │  │
│  🔗 MCP        │  │                                      │  │
│  ⚡ Skills     │  │  [Form controls]                     │  │
│  🔔 Notifications│ │                                      │  │
│  💾 Import/Export│ │                                      │  │
│  👤 Account    │  │  Save / Apply / Reset buttons        │  │
│  👥 Team       │  │                                      │  │
│  ℹ About      │  └──────────────────────────────────────┘  │
│                │                                            │
└────────────────┴────────────────────────────────────────────┘

NAVIGATION SIDEBAR:

- Section grouping with visual separators
- Active item: Background highlight + left border accent
- Icons: Consistent 20x20, outlined style
- Search: Filters settings categories in real-time
- Unsaved indicator: Dot next to changed sections
- Keyboard navigation: Arrow keys to move, Enter to select

INDIVIDUAL SETTINGS PAGES:

1⃣ General Settings

- Language: Dropdown (English / 中文 / 日本語 ...)
- Editor: Default font size, Tab size (spaces), Word wrap
- Behavior: Auto-save interval, Confirm before closing
- Updates: Auto-update check frequency
- Shortcuts: Link to keyboard shortcuts page

2⃣ Appearance Settings

- Theme: Visual theme picker (Dark / Light / System / High Contrast)
- Accent color: Color swatches (6 preset + custom hex input)
- Font size: Slider (Small / Medium / Large / Extra Large)
- Density: Compact / Comfortable / Spacious
- Animation: Reduce motion toggle (accessibility)
- Preview: Live preview panel showing changes

3⃣ Model Settings (CRITICAL for AI platform)

- Default model: Radio card selection (Opus 4.6 / Sonnet 4.5 / Haiku 4.5 / Ollama local)
- Per-agent overrides: Table showing each agent's assigned model
- API keys: Secure input fields (masked, show/hide toggle)
  - Anthropic API Key
  - OpenAI API Key (if using GPT models)
  - Custom endpoints
- Advanced:
  - Temperature default (slider 0-2)
  - Max tokens default (number input)
  - Top-p value (slider 0-1)
  - Streaming preference (toggle)
  - Thinking budget (low/medium/high/max dropdown)

4⃣ Agent Settings

- Agent list: Cards with toggles to enable/disable
- Per-agent config: Click agent card to expand
  - Personality customization (sliders for traits)
  - Response length preference
  - Auto-routing rules (when this agent should be invoked)
  - Permission level (what actions it can take)
- Collaboration mode: Sequential / Parallel / Consensus

5⃣ MCP Settings

- Quick link: "Go to MCP Server Management" (opens dedicated page)
- Global defaults: Timeout, retry policy, logging level
- Security: Allowed/blocked servers list
- Rate limits: Global rate limit configuration

6⃣ Notification Settings

- Channels: In-app / Email / Webhook / Slack (toggles)
- Types:
  - Task completed (success notifications)
  - Error occurred (error alerts)
  - Agent status changes
  - System updates
  - Usage threshold warnings (token/cost limits)
- Quiet hours: Do-not-disturb time range
- Sound: Enable/disable notification sounds

7⃣ Import/Export Settings

- Export:
  - All settings (JSON file)
  - Conversations history
  - Agent configurations
  - MCP server configs
  - Skills/workflows
- Import: Drag & drop zone or file picker
- Conflict resolution: Merge / Replace / Cancel options
- Cloud sync: Option to sync settings across devices

FORM DESIGN PATTERNS:

- Setting group: Collapsible card with title + description
- Controls match data type:
  - Boolean: Toggle switch (with labels On/Off)
  - Selection: Radio group (2-4 options) or Dropdown (5+ options)
  - Number: Spinner or slider (for ranges)
  - Text: Text input with character limit
  - Secret: Password field with reveal button
  - JSON/Code: Monospace font editor with validation
- Validation: Inline error messages, save button disabled until valid
- Unsaved changes: "You have unsaved changes" banner at bottom
- Reset option: Per-group reset link or global "Reset to defaults"

SEARCH FUNCTIONALITY:

- Searches setting names, descriptions, and values
- Shows results in dropdown with category breadcrumbs
- Highlights matching text
- Keyboard shortcut: "/" focuses search from anywhere in settings
- Recent searches: Show last 5 searches

RESPONSIVE:

- ≤1024px: Sidebar collapses to horizontal tab bar
- ≤768px: Full-screen pages with back navigation

OUTPUT: 创建 "Settings-Hub" 页面，包含所有设置分类的 sub-pages---
Phase 4: 组件库与设计令牌
📋 Prompt 4.1: Complete Component Library Documentation（完整组件库文档）
ROLE: 你是 design system librarian & component documentation specialist。

CONTEXT:
YYC3-ClawCube 有 270+ 即拉即用UI组件，需要在 Figma 中建立:

- 完整的组件规范文档
- 变体 (Variants) 系统
- 交互状态文档
- 使用指南与最佳实践
- 无障碍 (Accessibility) 检查清单

TASK: 创建 YYC3 Component Library 完整文档结构

LIBRARY STRUCTURE (Figma Team Library):

📦 YYC3-Component-Library/
├── 🎨 Atoms (原子组件)
│   ├── Button (按钮系统)
│   │   ├── Variants: Primary / Secondary / Ghost / Danger
│   │   ├── Sizes: sm (32px) / md (40px) / lg (48px)
│   │   ├── States: Default / Hover / Active / Disabled / Loading
│   │   ├── With icons: Icon left / Icon right / Icon only
│   │   └── Special: Full-width / Floating action
│   ├── Input (输入框)
│   │   ├── Types: Text / Password / Number / Email / URL / Search
│   │   ├── Sizes: sm / md / lg
│   │   ├── States: Default / Focus / Error / Disabled / Read-only
│   │   ├── With elements: Prefix / Suffix / Helper text
│   │   └── Textarea variant (auto-resize)
│   ├── Checkbox / Radio / Switch (选择控件)
│   ├── Badge (徽章)
│   ├── Avatar (头像)
│   ├── Icon (图标)
│   └── Tooltip (工具提示)
│
├── 🧱 Molecules (分子组件)
│   ├── Form Field (表单域: Label + Input + Error + Help)
│   ├── Card (卡片容器)
│   ├── Modal/Dialog (对话框)
│   ├── Toast/Notification (通知)
│   ├── Dropdown Menu (下拉菜单)
│   ├── Tabs (标签页)
│   ├── Breadcrumb (面包屑)
│   ├── Pagination (分页)
│   ├── Search Input (搜索框)
│   └── Command Palette (命令面板)
│
├── 🧬 Organisms (有机体组件)
│   ├── Chat Message Bubble (聊天消息气泡)
│   ├── Agent Card (智能体卡片)
│   ├── KPI Dashboard Card (KPI仪表盘卡片)
│   ├── Server Status Card (服务器状态卡)
│   ├── File Explorer (文件浏览器)
│   ├── Code Editor Panel (代码编辑器面板)
│   ├── Settings Form Group (设置表单组)
│   ├── Navigation Sidebar (导航侧边栏)
│   ├── Top Bar (顶部导航栏)
│   └── Status Bar (状态栏)
│
├── 📄 Templates (模板)
│   ├── Dashboard Page Template
│   ├── Chat Interface Template
│   ├── Settings Page Template
│   ├── Empty State Template
│   ├── Error Page Template
│   └── Onboarding Template
│
└── 🎭 Specialized (专用组件)
    ├── AI Family Components (Agent avatars, presence board)
    ├── DevOps Components (Monitor, Git panel, Terminal)
    ├── Cyber/Glass Effects (NeonCard, GlassCard, Glow effects)
    └── Animation Components (Loading, Transitions, Micro-interactions)

COMPONENT DOCUMENTATION TEMPLATE (Each component):

For every component, document:

1⃣ Overview

- Component name & description
- When to use / When not to use
- Related components

2⃣ Anatomy (结构分解)

- Visual diagram labeling each part
- Part names (e.g., "Container", "Icon", "Label")
- Optional vs required parts

3⃣ Variants (变体)

- Property: Variant name
- Values: List of options
- Default value
- Visual example of each

4⃣ States (状态)

- Interactive states: Default / Hover / Focus / Active / Disabled
- Data states: Empty / Loading / Error / Success
- Visual examples

5⃣ Usage (使用示例)

- Do's (best practices)
- Don'ts (anti-patterns)
- Code snippet (React/Tailwind example)
- Composition examples (with other components)

6⃣ Specs (规格参数)

- Dimensions (width/height, min/max)
- Spacing (padding, margins, gaps)
- Typography (font family, size, weight, line-height)
- Colors (background, text, borders, accents)
- Border radius
- Shadows/elevation
- Animations (type, duration, easing)

7⃣ Accessibility (无障碍)

- ARIA roles and attributes
- Keyboard navigation support
- Screen reader announcements
- Color contrast ratios (must meet WCAG AA)
- Focus management
- Reduced motion support

8⃣ Responsive Behavior

- How component adapts at breakpoints
- Mobile considerations
- Touch target sizes

DESIGN TOKENS INTEGRATION:
Ensure all components reference centralized design tokens:

- Colors: --yyc3-color-primary-500 (not hardcoded #3B82F6)
- Spacing: --yyc3-space-4 (not hardcoded 16px)
- Typography: --yyc3-text-heading-lg (not hardcoded 24px)
- Radii: --yyc3-radius-md (not hardcoded 8px)
- Shadows: --yyc3-shadow-md (not hardcoded box-shadow string)

VERSIONING STRATEGY:

- Semantic versioning for components: Major.Minor.Patch
- Major: Breaking changes (API change, removal)
- Minor: New features, new variants (backward compatible)
- Patch: Bug fixes, documentation updates
- Changelog maintained per component

OUTPUT: 在 Figma 中创建 "Component-Library" project，包含上述完整结构---
📋 Prompt 4.2: Design Tokens & Theme System（设计令牌与主题系统）
ROLE: 你是 design token system architect，专精企业级设计系统基础设施。

CONTEXT:
YYC3-ClawCube 需要:

- 完整的设计令牌 (Design Tokens) 系统
- 支持多主题 (Multi-theme) 切换
- 深色/浅色模式 (Dark/Light mode)
- CSS变量导出 (CSS custom properties)
- Tailwind CSS 集成
- Figma Tokens plugin 同步

TASK: 创建 YYC3 Design Token System

TOKEN TAXONOMY (W3C Design Tokens Community Group standard):

📂 yyc3-tokens/
├── 🎨 color/ (颜色令牌)
│   ├── global/
│   │   ├── brand-primary.yml (品牌主色)
│   │   ├── brand-secondary.yml (品牌辅色)
│   │   ├── neutral.yml (中性色阶)
│   │   └── semantic.yml (语义色: success/warning/error/info)
│   ├── dark/ (深色主题覆盖)
│   │   ├── background.yml
│   │   ├── foreground.yml
│   │   ├── border.yml
│   │   └── interactive.yml
│   └── light/ (浅色主题覆盖)
│       ├── background.yml
│       ├── foreground.yml
│       ├── border.yml
│       └── interactive.yml
│
├── 📏 spacing/ (间距令牌)
│   ├── base.yml (基础单位: 4px)
│   └── scale.yml (间距阶梯: 0-128)
│
├── 🔤 typography/ (排版令牌)
│   ├── font-families.yml (字体族)
│   ├── font-sizes.yml (字号阶梯)
│   ├── font-weights.yml (字重)
│   ├── line-heights.yml (行高)
│   └── letter-spaces.yml (字间距)
│
├── 📐 sizing/ (尺寸令牌)
│   ├── components.yml (组件预设尺寸)
│   ├── icons.yml (图标尺寸)
│   └── containers.yml (容器尺寸)
│
├── 🔄 radii/ (圆角令牌)
│   └── scale.yml (圆角阶梯)
│
├── 🌫 shadows/ (阴影令牌)
│   └── elevation.yml (层级阴影)
│
│
├── ⏱ motion/ (动效令牌)
│   ├── durations.yml (持续时间)
│   ├── easings.yml (缓动函数)
│   └── delays.yml (延迟时间)
│
└── 🧩 z-index/ (层级令牌)
    └── scale.yml (z-index阶梯)

COLOR SYSTEM DETAIL:

Brand Colors (品牌色):

```yaml
brand:
  primary:
    50: '#eff6ff'
    100: '#dbeafe'
    200: '#bfdbfe'
    300: '#93c5fd'
    400: '#60a5fa'
    500: '#3b82f6'  # ← Primary brand color
    600: '#2563eb'
    700: '#1d4ed8'
    800: '#1e40af'
    900: '#1e3a8a'
    950: '#172554'
  accent-cyan:
    value: '#00d4ff'  # ← YYC3 signature cyan
    glow: 'rgba(0, 212, 255, 0.3)'
  accent-purple:
    value: '#8b5cf6'
  accent-green:
    value: '#10b981'Semantic Colors (语义色):
semantic:
  success:
    bg: 'var(--color-success-bg)'
    text: 'var(--color-success-text)'
    border: 'var(--color-success-border)'
  warning: ...
  error: ...
  info: ...Theme-Aware Colors (主题感知):
# Light theme


---

light:
  background:
    primary: '#ffffff'
    secondary: '#f8fafc'
    tertiary: '#f1f5f9'
    elevated: '#ffffff'
  foreground:
    primary: '#0f172a'
    secondary: '#475569'
    tertiary: '#94a3b8'
    muted: '#cbd5e1'

# Dark theme
dark:
  background:
    primary: '#0f172a'
    secondary: '#1e293b'
    tertiary: '#334155'
    elevated: '#1e293b'
  foreground:
    primary: '#f8fafc'
    secondary: '#cbd5e1'
    tertiary: '#94a3b8'
    muted: '#475569'TYPOGRAPHY SCALE:
font-family:
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
  mono: ['JetBrains Mono', 'Fira Code', 'monospace']

font-size:
  xs: '0.75rem'    # 12px
  sm: '0.875rem'   # 14px
  base: '1rem'     # 16px
  lg: '1.125rem'   # 18px
  xl: '1.25rem'    # 20px
  '2xl': '1.5rem'  # 24px
  '3xl': '1.875rem'# 30px
  '4xl': '2.25rem' # 36px

line-height:
  tight: 1.25
  normal: 1.5
  relaxed: 1.75SPACING SCALE (4px base):
spacing:
  0: '0'
  0.5: '0.125rem'  # 2px
  1: '0.25rem'     # 4px
  2: '0.5rem'      # 8px
  3: '0.75rem'     # 12px
  4: '1rem'        # 16px
  5: '1.25rem'     # 20px
  6: '1.5rem'      # 24px
  8: '2rem'        # 32px
  10: '2.5rem'     # 40px
  12: '3rem'       # 48px
  16: '4rem'       # 64px
  20: '5rem'       # 80px
  24: '6rem'       # 96px
  32: '8rem'       # 128pxMOTION/ANIMATION TOKENS:
duration:
  instant: '100ms'
  fast: '200ms'
  normal: '300ms'
  slow: '500ms'
  deliberate: '700ms'

easing:
  ease-in: 'cubic-bezier(0.4, 0, 1, 1)'
  ease-out: 'cubic-bezier(0, 0, 0.2, 1)'
  ease-in-out: 'cubic-bezier(0.4, 0, 0.2, 1)'
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'

# Respect reduced motion preference
reduced-motion:
  duration: '0ms'  # Instant for users who prefer reduced motionEXPORT TARGETS:
1. CSS Custom Properties (for web):
:root {
  --yyc3-color-primary-500: #3b82f6;
  --yyc3-space-4: 1rem;
  /* ... */
}

[data-theme="dark"] {
  --yyc3-bg-primary: #0f172a;
  /* ... */
}2. Tailwind CSS Configuration (tailwind.config.ts):
module.exports = {
  theme: {
    extend: {
      colors: {
        yyc3: {
          // Map tokens to Tailwind utilities
        }
      },
      spacing: {
        // Custom spacing scale
      }
    }
  }
}3. JSON (for Figma Tokens plugin / Style Dictionary):
{
  "yyc3": {
    "color": {
      "primary": {
        "500": {"value": "#3b82f6"}
      }
    }
  }
}4. TypeScript (for type-safe usage in React):
export const tokens = {
  color: {
    primary: {
      500: '#3b82f6',
      // ...
    }
  },
  // ...
} as const;

export type TokenPath = keyof typeof tokens;FIGMA IMPLEMENTATION:
• Use "Figma Tokens" plugin (by Jan Sixt)
• Create token sets: Global / Light / Dark
• Apply tokens to all component styles
• Enable "Sync" mode for live updates
• Publish as Team Library for shared access
OUTPUT: 创建 "Design-Token-System" 文件，包含所有 token groups 和 theme variants
---
📋 三、交付顺序与验收标准
---

### **标准化提交流程**

| 序号 | Phase | 提示词ID | 优先级 | 依赖关系 | 预估复杂度 |
|------|-------|---------|--------|----------|-----------|
| **0** | 基础设施 | Prompt 0.1 | 🔴 P0 | 无 | ⭐⭐⭐⭐ |
| **0** | 基础设施 | Prompt 0.2 | 🔴 P0 | 0.1 | ⭐⭐⭐⭐⭐ |
| **1** | 核心布局 | Prompt 1.1 | 🔴 P0 | 0.1, 0.2 | ⭐⭐⭐⭐⭐ |
| **1** | 核心布局 | Prompt 1.2 | 🔴 P0 | 1.1 | ⭐⭐⭐⭐⭐ |
| **2** | 功能模块 | Prompt 2.1 | 🟡 P1 | 1.1 | ⭐⭐⭐⭐ |
| **2** | 功能模块 | Prompt 2.2 | 🟡 P1 | 1.1 | ⭐⭐⭐⭐ |
| **2** | 功能模块 | Prompt 2.3 | 🟡 P1 | 1.1, 1.2 | ⭐⭐⭐⭐⭐ |
| **3** | 高级功能 | Prompt 3.1 | 🟡 P2 | 1.1 | ⭐⭐⭐⭐ |
| **3** | 高级功能 | Prompt 3.2 | 🟡 P2 | 1.1 | ⭐⭐⭐ |
| **4** | 组件库 | Prompt 4.1 | 🟡 P2 | 0-3全部 | ⭐⭐⭐⭐⭐ |
| **4** | 组件库 | Prompt 4.2 | 🟡 P2 | 0.1 | ⭐⭐⭐⭐ |

### **验收清单 (Acceptance Criteria)**

每个 Prompt 交付后必须通过以下检查:

#### ✅ 设计质量检查
- [ ] 所有组件符合 YYC3 Design System (Prompt 0.1 定义的规范)
- [ ] 颜色、间距、字体均使用 Design Tokens，无硬编码值
- [ ] 支持 Dark/Light 两种主题，且有明确的主题切换演示
- [ ] 符合 WCAG 2.1 AA 无障碍标准 (对比度 ≥ 4.5:1)
- [ ] 响应式设计覆盖 4 个断点 (Mobile/Tablet/Desktop/Wide)

#### ✅ Figma 文件规范
- [ ] 使用 Auto Layout (自动布局) 构建所有组件
- [ ] 正确使用 Variants (变体) 属性组织组件状态
- [ ] 组件命名遵循 `Type--Variant--State` 命名规范
- [ ] 图层结构清晰，合理分组和命名
- [ ] 使用 Constraints (约束) 处理响应式布局
- [ ] Prototype (原型) 交互已定义关键用户流程

#### ✅ 文档完整性
- [ ] 每个组件有清晰的描述 (Description)
- [ ] 包含使用示例 (Usage examples)
- [ ] 标注了 Do's and Don'ts
- [ ] 记录了无障碍属性 (Accessibility notes)
- [ ] 提供了开发者对接所需的规格参数 (Specs)

#### ✅ YYC3 特色要求
- [ ] AI Family 成员视觉身份清晰可辨
- [ ] MCP 协议相关界面元素完整
- [ ] 九层架构概念在信息架构中得到体现
- [ ] 五高五标五化理念融入设计细节
- [ ] 科技感与专业感的平衡恰当

---🎯 四、执行建议
---

### **Effort Level 配置策略**

| 任务类型 | 推荐 Effort Level | 原因 |
|----------|-------------------|------|
| 品牌基础/Design Tokens | **max** | 需要深度思考设计决策，影响全局 |
| 复杂布局 (App Shell, Chat) | **max** | 多组件协调，信息架构复杂 |
| 表单类界面 (Settings, MCP Config) | **high** | 结构化任务，但需注意细节 |
| 数据可视化 (Dashboard) | **high** | 需要选择合适的图表类型 |
| 组件库文档 | **medium** | 模板化工作，规律性强 |
| 迭代修改 | **low-medium** | 小幅调整，不需要深度思考 |

### **上下文管理策略**

由于涉及大量设计规格，建议采用**分阶段提交**方式:

1. **每次只提交一个 Prompt** (避免超出上下文窗口)
2. **每个 Prompt 开始时引用之前的设计决策** (保持一致性)
3. **使用 Context Compaction** (让模型自动压缩早期对话)
4. **关键设计决策记录在外部文档** (减少重复解释)

### **质量保证技巧**

1. **明确指定 OUTPUT FORMAT**: 要求具体的 Figma 页面结构和命名
2. **提供 CONSTRAINTS**: 明确不能做什么 (如"不要硬编码颜色值")
3. **要求 EXAMPLES**: 让模型给出具体例子而非抽象描述
4. **分步验证**: 每完成一个 Phase 后审查再继续
5. **利用 Agent Teams**: 对于大型任务，可并行分配给多个 Agent

---📦 五、最终交付物清单
完成所有 Phases 后，您将拥有:

### **Figma Files (文件)**

📁 YYC3-ClawCube-Design-System/
├── 📄 00-Design-System-Foundation (品牌/色彩/字体/间距)
├── 📄 01-AI-Family-Identity (8个智能体视觉系统)
├── 📄 02-Application-Shell (主框架布局)
├── 📄 03-Multi-Agent-Chat (聊天界面)
├── 📄 04-Dashboard-Analytics (仪表盘)
├── 📄 05-MCP-Server-Management (MCP管理)
├── 📄 06-Skills-Workflow-Builder (工作流编辑器)
├── 📄 07-IDE-Integration-Panel (IDE面板)
├── 📄 08-Settings-Hub (设置中心)
├── 📄 09-Component-Library (270+组件库)
└── 📄 10-Design-Token-System (设计令牌)

### **Exportable Assets (可导出资源)**

| 资源类型 | 格式 | 用途 | 导出方式 |
|----------|------|------|----------|
| **Design Tokens** | JSON / CSS / SCSS / Tailwind Config | 前端开发直接使用 | Figma Tokens Plugin |
| **Icons** | SVG / PNG @1x/@2x/@3x | 多平台图标资源 | Batch Export |
| **Illustrations** | SVG / PNG | 品牌插画素材 | Export as SVG |
| **Component Specs** | HTML + CSS (Anima/Zeplin) | 开发参考文档 | Dev Mode Export |
| **Color Palette** | ASE / CLR / JSON | 设计工具同步 | Swatch Export |
| **Typography** | OTF/TTF 字体包 + CSS | 字体系统落地 | Font Export |
| **Prototype** | 交互式原型链接 | 需求评审/用户测试 | Figma Prototype Share |
| **Style Guide** | PDF / Web Page | 团队规范文档 | 导出为PDF |

---

### **Design Token 输出规格 (前端对接标准)**

```json
{
  "yyc3": {
    "colors": {
      "brand": {
        "primary": "#0A1628",
        "secondary": "#1E3A5F",
        "accent": {
          "cyan": "#00D4FF",
          "purple": "#8B5CF6",
          "green": "#10B981",
          "orange": "#F59E0B",
          "pink": "#EC4899",
          "red": "#EF4444",
          "indigo": "#6366F1"
        }
      },
      "semantic": {
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
        "info": "#3B82F6"
      },
      "surface": {
        "base": "#0F172A",
        "elevated": "#1E293B",
        "overlay": "#334155"
      }
    },
    "typography": {
      "fontFamily": {
        "sans": "Inter, system-ui, -apple-system, sans-serif",
        "mono": "JetBrains Mono, Fira Code, monospace"
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      }
    },
    "spacing": {
      "unit": "4px",
      "scale": ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px", "96px", "128px"]
    },
    "radii": {
      "sm": "8px",
      "md": "12px",
      "lg": "16px",
      "xl": "24px",
      "full": "9999px"
    },
    "shadows": {
      "sm": "0 2px 8px rgba(0,212,255,0.08)",
      "md": "0 4px 16px rgba(0,212,255,0.12)",
      "lg": "0 8px 32px rgba(0,212,255,0.16)",
      "glow": "0 0 20px rgba(0,212,255,0.3)"
    },
    "motion": {
      "duration": { "fast": "150ms", "normal": "250ms", "slow": "400ms" },
      "easing": { "easeOut": "cubic-bezier(0.16, 1, 0.3, 1)", "easeIn": "cubic-bezier(0.7, 0, 0.84, 0)" }
    }
  },
  "agents": {
    "meta-oracle":   { "color": "#8B5CF6", "icon": "meta-oracle.svg" },
    "navigator":     { "color": "#3B82F6", "icon": "navigator.svg" },
    "thinker":       { "color": "#06B6D4", "icon": "thinker.svg" },
    "prophet":       { "color": "#F59E0B", "icon": "prophet.svg" },
    "bolero":        { "color": "#EC4899", "icon": "bolero.svg" },
    "sentinel":      { "color": "#EF4444", "icon": "sentinel.svg" },
    "master":        { "color": "#10B981", "icon": "master.svg" },
    "muse":          { "color": "#6366F1", "icon": "muse.svg" }
  }
}---
🔄 六、迭代优化流程
Phase 完成后的 Review Checklist
每个 Phase 完成后，按以下清单审查:
□ 视觉一致性: 新设计与已完成的 Design System Foundation 是否一致
□ 组件复用: 是否最大化使用了已有组件而非创建新组件
□ 响应式验证: 所有 breakpoint 下的布局是否合理
□ 无障碍检查: 对比度、焦点状态、屏幕阅读器支持
□ 交互完整性: Hover/Focus/Active/Disabled/Loading 状态是否齐全
□ 命名规范: Layer命名、Component命名、Variant命名是否符合 YYC3 标准
□ 注释充分: 关键设计决策是否有注释说明原因
□ 可开发性: 开发者能否仅凭 Figma 文件还原设计（无需额外沟通）常见问题与解决方案
问题
解决方案

模型输出被截断
使用 Effort Level: max + 分段请求 ("请先输出前半部分")

设计风格漂移
每个 Prompt 开头强制引用 Brand Guidelines 页面链接

组件命名不一致
维护一份全局 Component Naming Convention 文档

响应式遗漏
在 CONSTRAINTS 中明确列出所有必须覆盖的 breakpoint

动画过度设计
明确规定动画时长上限 (400ms) 和 Reduced Motion 回退方案

颜色硬编码
强制要求所有颜色值引用 Design Token / Style

---
📐 七、Prompt 执行顺序总览
┌─────────────────────────────────────────────────────────────┐
│           YYC3-ClawCube Figma 提示词执行流水线                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase 0: 基础奠基 (预计工作量: 25%)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ #0.1 Design System Foundation → 通过验收             │   │
│  │     ↓                                                │   │
│  │ #0.2 AI Family Visual Identity → 通过验收            │   │
│  └─────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  Phase 1: 核心骨架 (预计工作量: 30%)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ #1.1 Master Application Shell → 通过验收              │   │
│  │     ↓                                                │   │
│  │ #1.2 Multi-Agent Chat Interface → 通过验收           │   │
│  └─────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  Phase 2: 功能模块 (预计工作量: 20%)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ #2.1 Dashboard & Analytics → 通过验收                │   │
│  │     ↓                                                │   │
│  │ #2.2 MCP Server Management → 通过验收               │   │
│  │     ↓                                                │   │
│  │ #2.3 Skills Workflow Builder → 通过验收             │   │
│  │     ↓                                                │   │
│  │ #2.4 IDE Integration Panel → 通过验收               │   │
│  └─────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  Phase 3: 配置中心 (预计工作量: 15%)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ #3.1 Settings Hub & Navigation → 通过验收            │   │
│  │     ↓                                                │   │
│  │ #3.2 Agent Configuration Panels → 通过验收           │   │
│  │     ↓                                                │   │
│  │ #3.3 MCP & Skills Configuration → 通过验收           │   │
│  └─────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  Phase 4: 收尾打磨 (预计工作量: 10%)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ #4.1 Responsive Adaptation & Motion                 │   │
│  │     ↓                                                │   │
│  │ #4.2 Component Library Documentation                │   │
│  │     ↓                                                │   │
│  │ #4.3 Design Token Export & Handoff                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│                   ✅ 全部交付                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

总计: 14 个 Prompt | 5 个 Phase | 覆盖完整设计系统---
🎯 八、关键成功指标 (KPIs)
指标类别
度量项
目标值
验证方法

覆盖率
核心页面设计完成率
100%
对照交付物清单逐项核对

一致性
Design Token 引用率
≥95%
Figma Inspector 检查颜色/字体来源

组件化
复用组件占比
≥80%
统计 Instance vs Detach 数量

响应式
Breakpoint 覆盖率
100% (5个断点)
逐一检查每个 breakpoint 变体

无障碍
WCAG 2.1 AA 合规率
100%
Stark/Axe 插件自动扫描

可开发性
开发者理解偏差
≤5%
设计师→开发者交接访谈

文档完整度
组件注释/说明覆盖率
100%
抽样检查组件描述字段

---
📝 九、附录：快速参考卡
Prompt 模板速查
┌──────────────────────────────────────────────────────────────┐
│                    PROMPT 结构模板                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ROLE: [角色定义 + 专业领域]                                  │
│                                                              │
│  CONTEXT:                                                    │
│  - 项目背景                                                  │
│  - 相关架构层级                                              │
│  - 已有设计资产引用                                          │
│                                                              │
│  TASK: [明确的任务描述]                                      │
│                                                              │
│  DELIVERABLES:                                               │
│  1⃣ [具体交付物1]                                          │
│  2⃣ [具体交付物2]                                          │
│  ...                                                         │
│                                                              │
│  CONSTRAINTS:                                                │
│  - 技术限制                                                  │
│  - 品牌规范                                                  │
│  - 无障碍要求                                                │
│                                                              │
│  OUTPUT FORMAT:                                              │
│  [具体的 Figma 输出结构]                                     │
│                                                              │
│  EFFORT_LEVEL: [low/medium/high/max]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘YYC3 色彩速查表
🔵 主色系:    #0A1628 (Deep) → #1E3A5F (Primary) → #2563EB (Action)
🩵 强调色:    #00D4FF (Cyan) · #8B5CF6 (Purple) · #10B981 (Green)
🧠 元启·天枢:  #8B5CF6 (紫)
🧭 言启·千行:  #3B82F6 (蓝)
🤔 语枢·万物:  #06B6D4 (青)
🔮 预见·先知:  #F59E0B (橙)
🎯 知遇·伯乐:  #EC4899 (粉)
🛡 智云·守护:  #EF4444 (红)
📚 格物·宗师:  #10B981 (绿)
🎨 创想·灵韵:  #6366F1 (靛蓝)常用尺寸速查
间距: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 (单位: px)
圆角: 8(sm) / 12(md) / 16(lg) / 24(xl) / full
字号: xs(12) / sm(14) / base(16) / lg(18) / xl(20) / 2xl(24) / 3xl(30) / 4xl(36)
图标: 16 / 20 / 24 / 32 / 48
栅格: 12列 / max-width 1440px / gutter 24px
Breakpoints: 375 / 768 / 1024 / 1440 / 1920---
文档版本: v1.0.0 Final
Effort Level: max (全程深度思考模式)
适用项目: YYC3-ClawCube 全栈设计系统
核心理念: 五高五标五化 · 九层架构 · AI Family 协作
---
「亦师亦友亦伯乐；一言一语一华章」— YYC3 AI Family

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
