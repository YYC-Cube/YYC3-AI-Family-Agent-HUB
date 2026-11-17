/**
 * @file: DomainChatPanel.tsx
 * @description: 业务空间·域内对话（B13 迁移 Phase 1）——选定域包角色后，
 *               以该角色人格 Prompt 作 system，经 HUB 统一模型请求层
 *               （callConfiguredModel，自动适配 DeepSeek/智谱/Ollama/YYC 多节点）
 *               进行多轮对话；无激活模型时引导至模型设置。
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-18
 * @updated: 2026-11-18
 * @status: active
 * @tags: [module],[domain-pack],[chat],[phase-1]
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GlassCard } from "./GlassCard";
import { Send, Loader2, Trash2, AlertTriangle, Cpu } from "lucide-react";
import { useNavigate } from "react-router";
import { useModelProvider } from "../../hooks/useModelProvider";
import { callConfiguredModel } from "../../lib/model-request";
import type { ConfiguredModel } from "../../types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DomainChatPanelProps {
  /** 域名（展示用） */
  domainName: string;
  /** 域链路（展示用） */
  chain: string;
  /** 8 角色 */
  roles: Array<{ runtime: string; member: string; duty: string; perm: string; prompt: string }>;
}

export function DomainChatPanel({ domainName, chain, roles }: DomainChatPanelProps) {
  const nav = useNavigate();
  const { configuredModels, activeModelId } = useModelProvider();
  const [roleKey, setRoleKey] = useState(roles[0]?.runtime ?? "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const activeModel: ConfiguredModel | null = useMemo(
    () => configuredModels.find((m) => m.id === activeModelId) ?? null,
    [configuredModels, activeModelId],
  );
  const role = useMemo(() => roles.find((r) => r.runtime === roleKey) ?? roles[0], [roles, roleKey]);

  // 切换角色即开新会话（人格不串味）
  useEffect(() => {
    setMessages([]);
    setError(null);
  }, [roleKey]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) { return; }
    if (typeof el.scrollTo === "function") {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else {
      el.scrollTop = el.scrollHeight; // jsdom 等无 scrollTo 的环境降级
    }
  }, [messages, busy]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy || !role) { return; }
    if (!activeModel) {
      setError("未检测到激活模型，请先到「模型设置」激活一个模型（DeepSeek / 智谱 / Ollama / YYC 节点均可）。");
      return;
    }
    setError(null);
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const history = next.map((m) => ({ role: m.role, content: m.content }));
      const res = await callConfiguredModel(role.prompt, history, activeModel, {
        temperature: 0.6,
        maxTokens: activeModel.maxOutput ?? 2048,
      });
      if (res.success) {
        setMessages([...next, { role: "assistant", content: res.text }]);
      } else {
        setError(res.error || "模型调用失败");
        setMessages(next);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setMessages(next);
    } finally {
      setBusy(false);
    }
  }, [input, busy, role, activeModel, messages]);

  return (
    <div className="space-y-3" data-testid="domain-chat-panel">
      {/* 角色选择 + 模型状态 */}
      <GlassCard className="p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[rgba(0,212,255,0.5)]" style={{ fontSize: "0.68rem" }}>对话角色</span>
          <select
            value={roleKey}
            onChange={(e) => setRoleKey(e.target.value)}
            aria-label="对话角色"
            className="px-2 py-1 rounded-lg bg-[rgba(0,20,40,0.6)] border border-[rgba(0,180,255,0.2)] text-[#e0f0ff] outline-none"
            style={{ fontSize: "0.75rem" }}
          >
            {roles.map((r) => (
              <option key={r.runtime} value={r.runtime}>
                {r.member} · {r.perm}
              </option>
            ))}
          </select>
          <span className="text-[rgba(224,240,255,0.4)] truncate max-w-[18rem]" style={{ fontSize: "0.64rem" }}>
            {role?.duty}
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[rgba(0,212,255,0.5)]" />
            {activeModel ? (
              <span className="text-[rgba(0,255,170,0.75)]" style={{ fontSize: "0.66rem" }}>
                {activeModel.model} · {activeModel.providerLabel}
              </span>
            ) : (
              <button
                onClick={() => nav("/models")}
                className="text-[rgba(255,221,0,0.8)] underline-offset-2 hover:underline"
                style={{ fontSize: "0.66rem" }}
              >
                未激活模型 · 去设置
              </button>
            )}
          </span>
          {messages.length > 0 && (
            <button
              onClick={() => { setMessages([]); setError(null); }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[rgba(255,80,120,0.25)] text-[rgba(255,120,150,0.75)] hover:text-[rgba(255,140,170,1)]"
              style={{ fontSize: "0.62rem" }}
            >
              <Trash2 className="w-3 h-3" /> 清空
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[rgba(0,212,255,0.3)]" style={{ fontSize: "0.6rem" }}>
          {domainName} · {chain}｜人格载荷已注入 system（{role?.member}），切换角色即开新会话
        </p>
      </GlassCard>

      {/* 消息区 */}
      <GlassCard className="p-3">
        <div ref={listRef} className="space-y-2.5 h-[22rem] overflow-y-auto pr-1" data-testid="chat-messages">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-1.5 text-center">
              <p className="text-[rgba(224,240,255,0.45)]" style={{ fontSize: "0.78rem" }}>
                以「{role?.member}」的身份开始{domainName}域对话
              </p>
              <p className="text-[rgba(0,212,255,0.3)] max-w-md" style={{ fontSize: "0.64rem" }}>
                该角色的人格与域红线已作为 system 注入；域内纪律（如拒绝越权、诚实缺数、红线拦截）将按域包定义生效。
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] text-[#e0f0ff]"
                    : "bg-[rgba(0,20,40,0.5)] border border-[rgba(0,180,255,0.12)] text-[rgba(224,240,255,0.8)]"
                }`}
                style={{ fontSize: "0.74rem", lineHeight: 1.65 }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-[rgba(0,212,255,0.5)]" style={{ fontSize: "0.7rem" }}>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> {role?.member} 思考中…
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-[rgba(255,80,120,0.25)] bg-[rgba(255,80,120,0.06)] px-2.5 py-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[rgba(255,120,150,0.85)] shrink-0 mt-0.5" />
            <p className="text-[rgba(255,150,175,0.9)]" style={{ fontSize: "0.68rem" }}>{error}</p>
          </div>
        )}

        {/* 输入区 */}
        <div className="mt-2 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); }
            }}
            placeholder={`以「${role?.member}」身份提问（Enter 发送 / Shift+Enter 换行）`}
            aria-label="对话输入"
            rows={2}
            className="flex-1 resize-none rounded-lg bg-[rgba(0,20,40,0.5)] border border-[rgba(0,180,255,0.18)] text-[#e0f0ff] px-3 py-2 outline-none focus:border-[rgba(0,212,255,0.4)]"
            style={{ fontSize: "0.75rem" }}
          />
          <button
            onClick={() => void send()}
            disabled={busy || !input.trim()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.2)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{ fontSize: "0.72rem" }}
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            发送
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
