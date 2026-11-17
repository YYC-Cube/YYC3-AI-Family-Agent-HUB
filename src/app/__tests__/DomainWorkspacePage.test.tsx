/**
 * @file: DomainWorkspacePage.test.tsx
 * @description: 域包工作区页面测试（B13 迁移 Phase 0）——数据驱动渲染、
 *               8 角色路由表、人格载荷展开、未知域降级提示。
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-18
 * @updated: 2026-11-18
 * @status: active
 * @tags: [test],[domain-pack],[business-space]
 */

// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { DomainWorkspacePage } from "../modules/shared/DomainWorkspacePage";
import domainPacks from "../data/domain-packs.json";

vi.mock("../hooks/useI18n", () => ({
  useI18n: () => ({ t: (key: string) => key, locale: "zh-CN", setLocale: vi.fn() }),
}));

const packs = (domainPacks as { packs: Record<string, { name_cn: string; chain: string; roles: { member: string; duty: string; prompt: string }[] }> }).packs;

function renderPage(domainId: string) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <DomainWorkspacePage domainId={domainId} />
    </MemoryRouter>,
  );
}

describe("DomainWorkspacePage · 域包工作区(Phase 0)", () => {
  it("1. 八域数据齐备：每域恰 8 角色且人格载荷非空", () => {
    const ids = Object.keys(packs);
    expect(ids).toHaveLength(8);
    for (const id of ids) {
      const p = packs[id];
      expect(p.roles, `${id} 角色数`).toHaveLength(8);
      for (const r of p.roles) {
        expect(r.member.length, `${id}/${r.member} 成员名`).toBeGreaterThan(1);
        expect(r.prompt.length, `${id}/${r.member} 人格载荷`).toBeGreaterThan(200);
      }
    }
  });

  it("2. 餐饮域渲染：标题/链路/就绪徽标/8 位成员全在", () => {
    renderPage("restaurant-ops");
    expect(screen.getByTestId("domain-workspace-page")).toBeInTheDocument();
    expect(screen.getAllByText(/餐饮门店/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/七环运营闭环/).length).toBeGreaterThan(0);
    expect(screen.getByText(/域包就绪 · 8 角色/)).toBeInTheDocument();
    for (const r of packs["restaurant-ops"].roles) {
      expect(screen.getByText(r.member)).toBeInTheDocument();
    }
  });

  it("3. 人格载荷展开：点击角色后展示可加载 Prompt 文本", () => {
    renderPage("education-content");
    expect(screen.queryByText(/人格载荷（可作 system prompt 直接加载）/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("智云·守护"));
    expect(screen.getByText(/人格载荷（可作 system prompt 直接加载）/)).toBeInTheDocument();
    expect(screen.getAllByText(/学术诚信|适龄|版权/).length).toBeGreaterThan(0);
  });

  it("4. 未知域降级：给出导出命令提示而非崩溃", () => {
    renderPage("not-exist-domain");
    expect(screen.getByTestId("domain-workspace-missing")).toBeInTheDocument();
    expect(screen.getByText(/export-domain-json/)).toBeInTheDocument();
  });

  it("5. 组件形态域(视频短剧)正常渲染", () => {
    renderPage("video-drama");
    expect(screen.getAllByText(/组件形态/).length).toBeGreaterThan(0);
    expect(screen.getByText(/域包就绪 · 8 角色/)).toBeInTheDocument();
  });
});
