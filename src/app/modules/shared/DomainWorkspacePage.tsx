/**
 * @file: DomainWorkspacePage.tsx
 * @description: 业务空间·域包工作区（B13 迁移 Phase 0）——读取主仓导出的
 *               domain-packs.json（8 域 × 8 角色 × 人格载荷），展示域链路、
 *               角色路由表与人格 Prompt；全部内容为真实域包数据，零模拟。
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-18
 * @updated: 2026-11-18
 * @status: active
 * @tags: [module],[domain-pack],[business-space]
 */

import { useMemo, useState } from "react";
import { GlassCard } from "./GlassCard";
import { ArrowLeft, ChevronDown, ChevronRight, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router";
import domainPacks from "../../data/domain-packs.json";

interface RoleEntry {
  runtime: string;
  member: string;
  duty: string;
  perm: string;
  profile_card: string;
  prompt: string;
}
interface PackEntry {
  domain_id: string;
  name_cn: string;
  pack_name: string;
  chain: string;
  form: string;
  roles: RoleEntry[];
}

export interface DomainWorkspacePageProps {
  /** 域包 id，如 restaurant-ops（对应 data/domain-packs.json 的键） */
  domainId: string;
}

const PERM_STYLE: Record<string, string> = {
  L3: "rgba(255,221,0,0.8)",
  "L2": "rgba(0,255,170,0.8)",
  "L0+否决": "rgba(255,80,120,0.85)",
};

export function DomainWorkspacePage({ domainId }: DomainWorkspacePageProps) {
  const nav = useNavigate();
  const pack = useMemo<PackEntry | undefined>(
    () => (domainPacks as { packs: Record<string, PackEntry> }).packs[domainId],
    [domainId],
  );
  const [openRole, setOpenRole] = useState<string | null>(null);

  if (!pack) {
    return (
      <div className="p-6 max-w-4xl mx-auto" data-testid="domain-workspace-missing">
        <GlassCard className="p-5">
          <p className="text-[#e0f0ff]" style={{ fontSize: "0.85rem" }}>
            未找到域包 <code className="text-[#00d4ff]">{domainId}</code>；
            请在主仓运行 <code className="text-[#00d4ff]">tools/export-domain-json.py</code> 后同步 data/domain-packs.json。
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4" data-testid="domain-workspace-page">
      {/* 头部：返回 / 域名 / 链路 / 规模 */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => nav("/")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[rgba(0,180,255,0.15)] text-[rgba(0,212,255,0.55)] hover:text-[#00d4ff] transition-all"
          style={{ fontSize: "0.72rem" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 返回
        </button>
        <h1 className="text-[#e0f0ff]" style={{ fontSize: "1.15rem", fontFamily: "'Orbitron', sans-serif" }}>
          {pack.name_cn}
        </h1>
        <span
          className="px-2 py-0.5 rounded-md bg-[rgba(0,255,170,0.1)] border border-[rgba(0,255,170,0.25)] text-[rgba(0,255,170,0.85)]"
          style={{ fontSize: "0.62rem" }}
        >
          域包就绪 · {pack.roles.length} 角色
        </span>
        <span className="text-[rgba(0,212,255,0.45)]" style={{ fontSize: "0.7rem" }}>
          {pack.chain}
        </span>
      </div>

      {/* 域定位 */}
      <GlassCard className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[rgba(0,212,255,0.7)]" />
          </div>
          <div className="min-w-0">
            <p className="text-[#e0f0ff]" style={{ fontSize: "0.85rem" }}>
              {pack.pack_name} · {pack.chain}
            </p>
            <p className="text-[rgba(0,212,255,0.35)] mt-1.5" style={{ fontSize: "0.7rem" }}>
              域定义源：主仓 <code>{pack.form === "component" ? "组件形态" : "文档三件套"}</code>
              （PACK + USAGE + 8 角色三件套）；本页数据由 tools/export-domain-json.py 从真实域包导出，零模拟。
            </p>
          </div>
        </div>
      </GlassCard>

      {/* 角色路由表 */}
      <GlassCard className="p-5">
        <h2 className="text-[#e0f0ff] mb-3 flex items-center gap-2" style={{ fontSize: "0.85rem" }}>
          <ShieldCheck className="w-4 h-4 text-[rgba(0,212,255,0.7)]" /> 角色路由表（8 位家族成员 × 域内职能）
        </h2>
        <div className="space-y-2">
          {pack.roles.map((r) => {
            const open = openRole === r.runtime;
            const permColor = PERM_STYLE[r.perm] ?? "rgba(0,212,255,0.6)";
            return (
              <div key={r.runtime} className="rounded-lg border border-[rgba(0,180,255,0.12)] overflow-hidden">
                <button
                  onClick={() => setOpenRole(open ? null : r.runtime)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[rgba(0,212,255,0.04)] transition-all"
                >
                  {open ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[rgba(0,212,255,0.6)] shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[rgba(0,212,255,0.35)] shrink-0" />
                  )}
                  <span className="text-[#e0f0ff] shrink-0" style={{ fontSize: "0.8rem" }}>{r.member}</span>
                  <span className="px-1.5 py-0.5 rounded shrink-0" style={{ fontSize: "0.58rem", color: permColor, border: `1px solid ${permColor}33` }}>
                    {r.perm}
                  </span>
                  <span className="text-[rgba(224,240,255,0.55)] truncate" style={{ fontSize: "0.72rem" }}>{r.duty}</span>
                  {r.profile_card && (
                    <span className="ml-auto shrink-0 text-[rgba(0,212,255,0.4)]" style={{ fontSize: "0.6rem" }}>
                      {r.profile_card}
                    </span>
                  )}
                </button>
                {open && (
                  <div className="px-3 pb-3 pt-1 border-t border-[rgba(0,180,255,0.1)]">
                    <p className="text-[rgba(0,212,255,0.4)] mb-2" style={{ fontSize: "0.62rem" }}>
                      人格载荷（可作 system prompt 直接加载） · {r.runtime}
                    </p>
                    <pre className="text-[rgba(224,240,255,0.65)] whitespace-pre-wrap max-h-72 overflow-auto rounded p-3 bg-[rgba(0,20,40,0.4)]"
                      style={{ fontSize: "0.66rem", lineHeight: 1.6 }}>
                      {r.prompt || "（人格载荷缺失）"}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>

      <p className="text-center text-[rgba(0,212,255,0.3)]" style={{ fontSize: "0.62rem" }}>
        Phase 0 · 域包可视化接入（只读）｜对话式调用将在 Phase 1 接入模型网关
      </p>
    </div>
  );
}
