/**
 * @file: DomainChatPanel.test.tsx
 * @description: 域内对话面板测试（B13 Phase 1）——角色人格注入 system、
 *               无激活模型引导、多轮追加、切角色清会话。
 * @author: YanYuCloudCube Team
 * @version: v1.0.0
 * @created: 2026-11-18
 * @updated: 2026-11-18
 * @status: active
 * @tags: [test],[domain-pack],[chat]
 */

// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import * as React from "react";
import { MemoryRouter } from "react-router";

const callMock = vi.fn();
let activeModelId: string | null = "m1";

vi.mock("../hooks/useI18n", () => ({
  useI18n: () => ({ t: (k: string) => k, locale: "zh-CN", setLocale: vi.fn() }),
}));

vi.mock("../hooks/useModelProvider", () => ({
  useModelProvider: () => ({
    configuredModels: [
      { id: "m1", providerId: "deepseek", providerLabel: "DeepSeek 官方", model: "deepseek-chat", apiKey: "", baseUrl: "https://api.deepseek.com", maxOutput: 2048 },
    ],
    activeModelId,
  }),
}));

vi.mock("../lib/model-request", () => ({
  callConfiguredModel: (...args: unknown[]) => callMock(...args),
}));

import { DomainChatPanel } from "../modules/shared/DomainChatPanel";

const ROLES = [
  { runtime: "yyc3-sentinel", member: "智云·守护", duty: "食安红线与折扣审批", perm: "L0+否决", prompt: "你是智云·守护……（食安红线逐字话术）" },
  { runtime: "yyc3-creative", member: "创想·灵韵", duty: "菜单文案与节气海报", perm: "L1", prompt: "你是创想·灵韵……（奢侈极简审美）" },
];

function renderPanel() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <DomainChatPanel domainName="餐饮门店" chain="七环运营闭环" roles={ROLES} />
    </MemoryRouter>,
  );
}

describe("DomainChatPanel · 域内对话(Phase 1)", () => {
  beforeEach(() => {
    callMock.mockReset();
    activeModelId = "m1";
  });

  it("1. 渲染：默认首位角色、域链路与模型状态可见", () => {
    renderPanel();
    expect(screen.getByTestId("domain-chat-panel")).toBeInTheDocument();
    expect(screen.getByText(/餐饮门店 · 七环运营闭环/)).toBeInTheDocument();
    expect(screen.getByText(/deepseek-chat · DeepSeek 官方/)).toBeInTheDocument();
    expect(screen.getByText(/以「智云·守护」的身份开始餐饮门店域对话/)).toBeInTheDocument();
  });

  it("2. 人格注入：system 为所选角色 Prompt，且发出用户消息", async () => {
    callMock.mockResolvedValue({ success: true, text: "已按《食品安全法》第六十四条拦截，请改单。" });
    renderPanel();
    fireEvent.change(screen.getByLabelText("对话输入"), { target: { value: "临期食材先入库行吗" } });
    fireEvent.click(screen.getByRole("button", { name: /发送/ }));
    await waitFor(() => expect(callMock).toHaveBeenCalledTimes(1));
    const [system, messages, model] = callMock.mock.calls[0];
    expect(system).toContain("食安红线逐字话术");
    expect(messages).toEqual([{ role: "user", content: "临期食材先入库行吗" }]);
    expect(model).toMatchObject({ id: "m1", model: "deepseek-chat" });
    await waitFor(() => expect(screen.getByText(/第六十四条拦截/)).toBeInTheDocument());
  });

  it("3. 多轮：第二次调用携带完整历史（user/assistant 交替）", async () => {
    callMock.mockResolvedValue({ success: true, text: "第一轮答复" });
    renderPanel();
    const input = screen.getByLabelText("对话输入");
    fireEvent.change(input, { target: { value: "第一问" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(callMock).toHaveBeenCalledTimes(1));
    fireEvent.change(input, { target: { value: "第二问" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(callMock).toHaveBeenCalledTimes(2));
    const [, messages2] = callMock.mock.calls[1];
    expect(messages2).toHaveLength(3);
    expect(messages2[1]).toEqual({ role: "assistant", content: "第一轮答复" });
    expect(messages2[2]).toEqual({ role: "user", content: "第二问" });
  });

  it("4. 未激活模型：给出设置引导，不发起调用", () => {
    activeModelId = null;
    renderPanel();
    fireEvent.change(screen.getByLabelText("对话输入"), { target: { value: "你好" } });
    fireEvent.click(screen.getByRole("button", { name: /发送/ }));
    expect(callMock).not.toHaveBeenCalled();
    expect(screen.getByText(/未检测到激活模型/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /未激活模型 · 去设置/ })).toBeInTheDocument();
  });

  it("5. 调用失败：展示错误且保留用户消息", async () => {
    callMock.mockResolvedValue({ success: false, text: "", error: "401 Unauthorized" });
    renderPanel();
    fireEvent.change(screen.getByLabelText("对话输入"), { target: { value: "测试失败" } });
    fireEvent.click(screen.getByRole("button", { name: /发送/ }));
    await waitFor(() => expect(screen.getByText("401 Unauthorized")).toBeInTheDocument());
    expect(screen.getByText("测试失败")).toBeInTheDocument();
  });

  it("6. 切换角色：会话清空并换人格", async () => {
    callMock.mockResolvedValue({ success: true, text: "答复A" });
    renderPanel();
    fireEvent.change(screen.getByLabelText("对话输入"), { target: { value: "第一问" } });
    fireEvent.click(screen.getByRole("button", { name: /发送/ }));
    await waitFor(() => expect(screen.getByText("答复A")).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText("对话角色"), { target: { value: "yyc3-creative" } });
    await waitFor(() => expect(screen.queryByText("答复A")).not.toBeInTheDocument());
    expect(screen.getByText(/以「创想·灵韵」的身份开始餐饮门店域对话/)).toBeInTheDocument();
  });
});
