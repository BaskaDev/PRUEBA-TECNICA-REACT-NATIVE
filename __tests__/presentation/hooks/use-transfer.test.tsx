import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useTransfer } from "../../../src/presentation/hooks/use-transfer";
import type { TransferRequest } from "../../../src/domain/entities/transfer";

jest.mock("../../../src/data/repositories/transfer.repository.impl", () => ({
  transferRepository: {
    createTransfer: jest.fn(),
  },
}));

const { transferRepository } = jest.requireMock("../../../src/data/repositories/transfer.repository.impl");

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

const validRequest: TransferRequest = {
  value: 500,
  currency: "BRL",
  payeerDocument: "12345678900",
  transferDate: "2026-06-15",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useTransfer", () => {
  it("calls createTransfer on mutation", async () => {
    transferRepository.createTransfer.mockResolvedValueOnce({ status: "success" });

    const { result } = renderHook(() => useTransfer(), { wrapper: createWrapper() });

    result.current.mutate(validRequest);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(transferRepository.createTransfer).toHaveBeenCalledWith(validRequest);
  });

  it("returns success status", async () => {
    transferRepository.createTransfer.mockResolvedValueOnce({ status: "success" });

    const { result } = renderHook(() => useTransfer(), { wrapper: createWrapper() });

    result.current.mutate(validRequest);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.status).toBe("success");
  });

  it("handles transfer failure", async () => {
    transferRepository.createTransfer.mockRejectedValueOnce(new Error("Transfer failed"));

    const { result } = renderHook(() => useTransfer(), { wrapper: createWrapper() });

    result.current.mutate(validRequest);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it("updates balance cache on success", async () => {
    transferRepository.createTransfer.mockResolvedValueOnce({ status: "success" });

    const { result } = renderHook(() => useTransfer(), { wrapper: createWrapper() });

    result.current.mutate(validRequest);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
