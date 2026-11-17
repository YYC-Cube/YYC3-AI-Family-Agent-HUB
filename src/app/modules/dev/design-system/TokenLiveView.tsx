/**
 * @file: TokenLiveView.tsx
 * @description: 设计令牌实时可视化 — 直接枚举 :root CSS 变量分组渲染，与 theme.css 单一真源联动
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-18
 * @updated: 2026-11-18
 * @status: active
 * @tags: [component],[design-system],[tokens]
 */

import { useMemo } from "react";

/**
 * 数据源：src/styles/theme.css（142+ 变量的唯一真源）。
 * 值全部经 getComputedStyle 实时取自 :root——主题定制页修改变量后本页立即反映。
 */

interface TokenGroup {
  id: string;
  title: string;
  desc: string;
  vars: string[];
}

const COLOR_GROUPS: TokenGroup[] = [
  {
    id: "brand",
    title: "品牌 · 双语义单源",
    desc: "2026-11-18 全域审计裁定：操作青 / 辉光青 / 渐变紫三语义各自单源，禁止硬编码",
    vars: ["--primary", "--color-brand-glow", "--color-brand-purple", "--glow-rgb", "--color-weekend", "--weekend-rgb"],
  },
  {
    id: "base",
    title: "基础色",
    desc: "背景 / 前景 / 卡片 / 主色 / 边框 / 焦点环",
    vars: ["--background", "--foreground", "--card", "--primary-foreground", "--border", "--ring"],
  },
  {
    id: "status",
    title: "状态色",
    desc: "成功 / 警告 / 错误——语义组件禁止自定义近似色",
    vars: ["--success", "--warning", "--error", "--destructive"],
  },
  {
    id: "family",
    title: "AI Family 成员主题色",
    desc: "八位家族成员徽章 / 连线 / 卡片着色（--family-* 仅成员语义）",
    vars: [
      "--family-navigator", "--family-thinker", "--family-prophet", "--family-bolero",
      "--family-sentinel", "--family-master", "--family-oracle", "--family-creator",
    ],
  },
  {
    id: "chart",
    title: "图表色",
    desc: "Recharts 系列色板",
    vars: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
  },
];

const HEX_COLOR_RE = /#|rgb|hsl|oklch/;

const FONT_SIZE_VARS = [
  "--font-size-micro", "--font-size-caption", "--font-size-body", "--font-size-subtitle",
  "--font-size-h3", "--font-size-h2", "--font-size-h1", "--font-size-display", "--font-size-hero",
];
const FONT_WEIGHT_VARS = ["--font-weight-normal", "--font-weight-medium", "--font-weight-semibold", "--font-weight-bold"];
const FONT_FAMILY_VARS = ["--font-family-display", "--font-family-body", "--font-family-mono"];
const RADIUS_VARS = ["--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-2xl", "--radius-full"];
const SHADOW_VARS = [
  "--shadow-glow-sm", "--shadow-glow-md", "--shadow-glow-lg", "--shadow-glow-xl",
  "--shadow-glow-primary", "--shadow-glow-success", "--shadow-glow-danger",
  "--shadow-drop-sm", "--shadow-drop-lg",
];
const SPACING_VARS = [
  "--spacing-4xs", "--spacing-3xs", "--spacing-2xs", "--spacing-xs",
  "--spacing-sm", "--spacing-md", "--spacing-lg", "--spacing-xl", "--spacing-2xl",
];
const ANIMATION_VARS = ["--animation-micro", "--animation-fast", "--animation-normal", "--animation-smooth", "--animation-slow"];
const Z_INDEX_VARS = ["--z-base", "--z-dropdown", "--z-sticky", "--z-fixed", "--z-modal", "--z-popover", "--z-tooltip", "--z-toast", "--z-max"];
const TRACKING_VARS = ["--tracking-time", "--tracking-brand"];

function readVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** 色板组：色卡 + 实时取值 */
function ColorPaletteGroup({ group }: { group: TokenGroup }) {
  return (
    <div key={group.id} className="mb-6" data-testid={`token-group-${group.id}`}>
      <h4 className="text-[#e0f0ff] text-sm font-semibold mb-1">{group.title}</h4>
      <p className="text-[rgba(0,212,255,0.35)] text-xs mb-3">{group.desc}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {group.vars.map((name) => {
          const value = readVar(name);
          const isColor = HEX_COLOR_RE.test(value);
          const isRgbTriplet = /^\d+,\s*\d+,\s*\d+$/.test(value);
          return (
            <div key={name} className="rounded-lg border border-[rgba(0,180,255,0.15)] overflow-hidden bg-[rgba(4,10,22,0.6)]">
              <div
                className="h-10"
                style={
                  isColor
                    ? { background: value }
                    : isRgbTriplet
                      ? { background: `rgba(${value},0.8)` }
                      : { background: "rgba(0,40,80,0.3)" }
                }
              />
              <div className="p-2">
                <p className="text-[rgba(0,212,255,0.55)] font-mono truncate" style={{ fontSize: "0.62rem" }}>{name}</p>
                <p className="text-[#c0dcf0] font-mono truncate" style={{ fontSize: "0.66rem" }}>{value || "—"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** 通用列表组：令牌名 + 值 + 可选演示 */
function TokenRows({
  title,
  desc,
  vars,
  renderDemo,
}: {
  title: string;
  desc: string;
  vars: string[];
  renderDemo?: (value: string, name: string) => React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-[#e0f0ff] text-sm font-semibold mb-1">{title}</h4>
      <p className="text-[rgba(0,212,255,0.35)] text-xs mb-3">{desc}</p>
      <div className="space-y-2">
        {vars.map((name) => {
          const value = readVar(name);
          return (
            <div
              key={name}
              className="flex items-center gap-4 rounded-lg border border-[rgba(0,180,255,0.15)] bg-[rgba(4,10,22,0.6)] px-3 py-2"
            >
              <div className="w-52 shrink-0">
                <p className="text-[rgba(0,212,255,0.55)] font-mono truncate" style={{ fontSize: "0.62rem" }}>{name}</p>
                <p className="text-[#c0dcf0] font-mono truncate" style={{ fontSize: "0.66rem" }}>{value || "—"}</p>
              </div>
              <div className="flex-1 min-w-0">{renderDemo?.(value, name)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TokenLiveView() {
  // readVar 依赖 DOM computed style；首帧后强制刷新一次取到真实值
  const tokenSnapshot = useMemo(() => {
    return {
      colorGroups: COLOR_GROUPS,
      fontSize: FONT_SIZE_VARS.map((v) => ({ name: v, value: readVar(v) })),
      fontWeight: FONT_WEIGHT_VARS.map((v) => ({ name: v, value: readVar(v) })),
      fontFamily: FONT_FAMILY_VARS.map((v) => ({ name: v, value: readVar(v) })),
      radius: RADIUS_VARS.map((v) => ({ name: v, value: readVar(v) })),
      shadow: SHADOW_VARS.map((v) => ({ name: v, value: readVar(v) })),
      spacing: SPACING_VARS.map((v) => ({ name: v, value: readVar(v) })),
      animation: ANIMATION_VARS.map((v) => ({ name: v, value: readVar(v) })),
      zIndex: Z_INDEX_VARS.map((v) => ({ name: v, value: readVar(v) })),
      tracking: TRACKING_VARS.map((v) => ({ name: v, value: readVar(v) })),
    };
  }, []);

  return (
    <div data-testid="token-live-view">
      <p className="text-[rgba(0,212,255,0.35)] text-xs mb-4">
        数据源：src/styles/theme.css（单一真源 · 实时 computed 取值）· 与主题定制页修改联动
      </p>

      {tokenSnapshot.colorGroups.map((group) => (
        <ColorPaletteGroup key={group.id} group={group} />
      ))}

      {/* 字族 */}
      <TokenRows
        title="字族"
        desc="display 展示 / body 正文 / mono 等宽——品牌展示文案必须走 display"
        vars={tokenSnapshot.fontFamily.map((v) => v.name)}
        renderDemo={(value) => (
          <span className="text-[#e0f0ff] text-base truncate" style={{ fontFamily: value }}>
            言语云枢 · YYC³ AI Family 123
          </span>
        )}
      />

      {/* 字阶 */}
      <TokenRows
        title="字号阶梯"
        desc="micro 0.625rem 为下限——任何字号不得低于该档（审计 F2/F3）"
        vars={tokenSnapshot.fontSize.map((v) => v.name)}
        renderDemo={(value) => (
          <span className="text-[#e0f0ff]" style={{ fontSize: value }}>
            八魂归一，云枢乃成
          </span>
        )}
      />

      {/* 字重 */}
      <TokenRows
        title="字重"
        desc="400 / 500 / 600 / 700 四档"
        vars={tokenSnapshot.fontWeight.map((v) => v.name)}
        renderDemo={(value) => (
          <span className="text-[#e0f0ff] text-sm" style={{ fontWeight: Number(value) || 400 }}>
            拟人为本 · AI为核 · 纯粹为心
          </span>
        )}
      />

      {/* 字距 */}
      <TokenRows
        title="字距"
        desc="时钟盘时间 2px / 品牌行 1px"
        vars={tokenSnapshot.tracking.map((v) => v.name)}
        renderDemo={(value) => (
          <span className="text-[var(--color-brand-glow)] text-sm" style={{ letterSpacing: value }}>
            23:28:47 · YYC³
          </span>
        )}
      />

      {/* 圆角 */}
      <TokenRows
        title="圆角"
        desc="sm 4px 至 full 9999px——rounded-2xl 实测 24px 与令牌一致"
        vars={tokenSnapshot.radius.map((v) => v.name)}
        renderDemo={(value) => (
          <div className="w-14 h-8 bg-[rgba(0,212,255,0.15)] border border-[rgba(0,212,255,0.4)]" style={{ borderRadius: value }} />
        )}
      />

      {/* 阴影 */}
      <TokenRows
        title="阴影 · 辉光档位"
        desc="glow-sm 至 xl 辉光 + primary/success/danger 语义 + drop 投影——页面一律引用令牌禁止 inline 硬编码"
        vars={tokenSnapshot.shadow.map((v) => v.name)}
        renderDemo={(value) => (
          <div className="w-16 h-8 rounded-lg bg-[rgba(0,40,80,0.6)]" style={{ boxShadow: value }} />
        )}
      />

      {/* 间距 */}
      <TokenRows
        title="间距"
        desc="4px 基准网格 4xs 至 2xl"
        vars={tokenSnapshot.spacing.map((v) => v.name)}
        renderDemo={(value) => (
          <div className="h-4 rounded-sm bg-[rgba(0,255,136,0.3)] border border-[rgba(0,255,136,0.5)]" style={{ width: `calc(${value} * 8)` }} />
        )}
      />

      {/* 动效 */}
      <TokenRows
        title="动效时长"
        desc="micro 100ms 至 slow 800ms——过渡与动画一律引用档位"
        vars={tokenSnapshot.animation.map((v) => v.name)}
        renderDemo={(value) => (
          <div
            className="w-10 h-4 rounded-full bg-[var(--color-brand-glow)]/40 transition-all"
            style={{ transitionDuration: value }}
          />
        )}
      />

      {/* Z-Index */}
      <TokenRows
        title="Z-Index 层级"
        desc="base 0 至 max 9999——浮窗/弹窗/提示分层依据"
        vars={tokenSnapshot.zIndex.map((v) => v.name)}
        renderDemo={(value) => (
          <span className="text-[rgba(0,212,255,0.5)] font-mono text-xs">{value}</span>
        )}
      />
    </div>
  );
}
