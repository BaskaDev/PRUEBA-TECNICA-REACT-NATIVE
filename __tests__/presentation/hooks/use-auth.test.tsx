import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { act } from "react-test-renderer";
import { useLogin } from "../../../src/presentation/hooks/use-auth";

const mockSetAuth = jest.fn();

jest.mock("../../../src/presentation/store/auth-store", () => ({
  useAuthStore: jest.fn((selector: Function) => {
    const state = { setAuth: mockSetAuth };
    return selector(state);
  }),
}));

jest.mock("../../../src/data/repositories/auth.repository.impl", () => ({
  authRepository: {
    login: jest.fn(),
  },
}));

const { authRepository } = jest.requireMock("../../../src/data/repositories/auth.repository.impl");

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useLogin", () => {
  it("calls authRepository.login on mutation", async () => {
    authRepository.login.mockResolvedValue({
      token: "test-token",
      user: { id: 1, name: "Test", email: "test@test.com" },
    });

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: "test@test.com", password: "1234" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(authRepository.login).toHaveBeenCalledWith("test@test.com", "1234");
  });

  it("calls setAuth on success", async () => {
    authRepository.login.mockResolvedValue({
      token: "test-token",
      user: { id: 1, name: "Test", email: "test@test.com" },
    });

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: "test@test.com", password: "1234" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSetAuth).toHaveBeenCalledWith("test-token", { id: 1, name: "Test", email: "test@test.com" });
  });

  it("handles login failure", async () => {
    authRepository.login.mockRejectedValue(new Error("Credenciales inválidas"));

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: "bad@test.com", password: "wrong" });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
    expect(mockSetAuth).not.toHaveBeenCalled();
  });

  it("tracks pending state during mutation", async () => {
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => { resolvePromise = resolve; });
    authRepository.login.mockReturnValue(promise);

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: "test@test.com", password: "1234" });
    });

    await waitFor(() => expect(result.current.isPending).toBe(true));

    act(() => {
      resolvePromise!({ token: "t", user: { id: 1, name: "T", email: "t@t.com" } });
    });

    await waitFor(() => expect(result.current.isPending).toBe(false));
  });
});
