import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { act } from "react-test-renderer";
import { useBalance } from "../../../src/presentation/hooks/use-balance";

jest.mock("../../../src/data/repositories/balance.repository.impl", () => ({
  balanceRepository: {
    getBalance: jest.fn(),
  },
}));

const { balanceRepository } = jest.requireMock("../../../src/data/repositories/balance.repository.impl");

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useBalance", () => {
  it("returns balance data on success", async () => {
    balanceRepository.getBalance.mockResolvedValue({ currency: "BRL", accountBalance: 1500 });

    const { result } = renderHook(() => useBalance(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.currency).toBe("BRL");
    expect(result.current.data?.accountBalance).toBe(1500);
  });

  it("returns error state on failure", async () => {
    balanceRepository.getBalance.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useBalance(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 3000 });

    expect(result.current.error).toBeDefined();
  });

  it("starts in loading state", () => {
    balanceRepository.getBalance.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useBalance(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
  });
});
