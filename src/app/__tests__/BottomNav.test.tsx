/**
 * @file: BottomNav.test.tsx
 * @description: BottomNav 测试 · YYC3-AI-Family-HUB 新 Tab 形态（Family中枢置首）
 * @author: YanYuCloudCube Team
 * @version: v2.0.0
 * @created: 2026-03-31
 * @updated: 2026-11-17
 * @status: active
 * @tags: [component]
 */

// @vitest-environment jsdom
/**
 * BottomNav.test.tsx
 * ===========
 * BottomNav 组件 - 渲染测试
 *
 * 覆盖范围:
 * - 4 个导航项渲染（Family中枢 / AI 决策 / 网关部署 / 操作）
 * - 当前路由高亮
 * - 导航点击跳转
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

const mockNavigate = vi.fn() as any;
let mockPathname = "/";

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: mockPathname }),
}));

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    "nav.aiFamily": "Family中枢",
    "nav.aiDecision": "智能决策",
    "nav.gatewayDeploy": "网关部署",
    "bottomNav.operations": "操作",
  };
  return translations[key] || key;
};

vi.mock("../hooks/useI18n", () => ({
  useI18n: () => ({ t: mockT }),
}));

import { BottomNav } from "../modules/shared/BottomNav";

describe("BottomNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = "/";
  });

  afterEach(() => {
    cleanup();
  });

  describe("基础渲染", () => {
    it("应渲染 4 个导航项", () => {
      render(<BottomNav />);
      expect(screen.getByText("Family中枢")).toBeInTheDocument();
      expect(screen.getByText("智能决策")).toBeInTheDocument();
      expect(screen.getByText("网关部署")).toBeInTheDocument();
      expect(screen.getByText("操作")).toBeInTheDocument();
    });

    it("应渲染 5 个按钮（4 个导航 + 1 个更多）", () => {
      render(<BottomNav />);
      expect(screen.getAllByRole("button").length).toBe(5);
    });
  });

  describe("导航点击", () => {
    it("点击智能决策应导航到 /ai", () => {
      render(<BottomNav />);
      fireEvent.click(screen.getByText("智能决策"));
      expect(mockNavigate).toHaveBeenCalledWith("/ai");
    });

    it("点击网关部署应导航到 /models", () => {
      render(<BottomNav />);
      fireEvent.click(screen.getByText("网关部署"));
      expect(mockNavigate).toHaveBeenCalledWith("/models");
    });

    it("点击操作应导航到 /operations", () => {
      render(<BottomNav />);
      fireEvent.click(screen.getByText("操作"));
      expect(mockNavigate).toHaveBeenCalledWith("/operations");
    });

    it("点击 Family中枢应导航到 /", () => {
      mockPathname = "/settings";
      render(<BottomNav />);
      fireEvent.click(screen.getByText("Family中枢"));
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("路由高亮", () => {
    it("首页时 Family中枢按钮应有激活样式", () => {
      mockPathname = "/";
      render(<BottomNav />);
      const btn = screen.getByText("Family中枢").closest("button")!;
      expect(btn.innerHTML).toContain("text-[#00d4ff]");
    });

    it("AI 决策页时该按钮应有激活样式", () => {
      mockPathname = "/ai";
      render(<BottomNav />);
      const btn = screen.getByText("智能决策").closest("button")!;
      expect(btn.innerHTML).toContain("text-[#00d4ff]");
    });

    it("非活跃按钮应有降低透明度样式", () => {
      mockPathname = "/";
      render(<BottomNav />);
      const btn = screen.getByText("网关部署").closest("button")!;
      expect(btn.innerHTML).toContain("text-[rgba(0,212,255,0.25)]");
    });
  });
});
