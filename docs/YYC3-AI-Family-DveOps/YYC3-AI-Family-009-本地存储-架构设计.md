---
file: YYC3-AI-Family-009-本地存储-架构设计.md
title: YYC3 Local Storage & Data Persistence Architecture
description: The YYC3 Hacker Chatbot uses a Local-First strateg
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

# YYC3 Local Storage & Data Persistence Architecture

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 1. Overview
The YYC3 Hacker Chatbot uses a **Local-First** strategy. Data is primarily stored in the user's browser (`localStorage`) for immediate access and zero-latency interactions. Optional synchronization with Supabase (running on NAS or Cloud) provides cross-device capabilities.

## 2. Data Stores
We use specific keys in `localStorage` to manage different data types.

### 2.1 Chat History (`yyc3_chat_history`)
- **Format**: JSON Array of `Chat` objects.
- **Key**: `yyc3_chat_history`
- **Structure**:
  ```typescript
  interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    isStarred: boolean;
  }
  ```
- **Management**: Managed via `useChatPersistence` hook.
- **Limit**: Recommend pruning messages older than 30 days or archiving them to filesystem (via MCP) if size exceeds 5MB.

### 2.2 System Configuration (`yyc3_ai_config`)
- **Key**: `yyc3_ai_config`
- **Purpose**: Stores AI model preferences, endpoint URLs, and API keys.
- **Structure**:
  ```typescript
  interface AIConfig {
    provider: 'openai' | 'ollama' | 'anthropic';
    apiKey: string;
    baseUrl: string; // Crucial for Local M4 Max connection
    model: string;
    temperature: number;
  }
  ```
- **Security Note**: API keys are stored in plaintext in localStorage. This is acceptable for local-only tools but users should be warned if deploying publicly.

### 2.3 UI/UX Preferences (`yyc3_ui_settings`)
- **Key**: `yyc3_ui_settings`
- **Purpose**: Persist visual customization (theme, font size, CRT effects).
- **Structure**:
  ```typescript
  interface UISettings {
    theme: string;
    scanlines: number;
    curvature: boolean;
    fontSize: 'small' | 'medium' | 'large';
    animations: boolean;
  }
  ```

## 3. Synchronization Loop (The "Closed Loop")

### Load Cycle (App Startup)
1. `App.tsx` / `SettingsModal.tsx` mounts.
2. `useEffect` checks `localStorage.getItem('KEY')`.
3. If data exists, hydrate React State.
4. If no data, fall back to default constants.

### Save Cycle (User Action)
1. User modifies setting or sends message.
2. React State updates immediately (Optimistic UI).
3. `useEffect` or specific handler (e.g., `handleSave`) triggers `localStorage.setItem('KEY', JSON.stringify(newState))`.
4. (Optional) Background sync to Supabase/NAS.

## 4. Best Practices for Developers
- **Hooks**: Always use the provided hooks (`useChatPersistence`, `useAI`) rather than raw `localStorage` calls to ensure state consistency.
- **Validation**: Always try/catch `JSON.parse` operations to handle corrupted data gracefully.
- **Versioning**: If data structure changes, increment a `version` field in the object and implement a migration utility in the hydration logic.

## 5. Future Expansion: NAS Sync
To enable the "Data Center" role of the NAS:
1. Implement `useSupabaseSync` hook.
2. On `localStorage` write, push a copy to Supabase `chats` table.
3. Use Supabase Realtime to listen for changes from other devices (e.g., iMac, Huawei) and update local state.

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
