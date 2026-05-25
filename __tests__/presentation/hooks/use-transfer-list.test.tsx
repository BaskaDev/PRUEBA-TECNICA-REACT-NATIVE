import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useTransferList } from "../../../src/presentation/hooks/use-transfer-list";
import type { Transfer, TransferFilters } from "../../../src/domain/entities/transfer";

jest.mock("../../../src/data/repositories/transfer.repository.impl", () => ({
  transferRepository: {
    getTransferList: jest.fn(),
  },
}));

const { transferRepository } = jest.requireMock("../../../src/data/repositories/transfer.repository.impl");

const mockTransfers: Transfer[] = [
  { value: 100, date: "2026-01-15", currency: "BRL", payeer: { document: "1", name: "Alice" } },
  { value: 200, date: "2026-02-20", currency: "BRL", payeer: { document: "2", name: "Bob" } },
  { value: 300, date: "2026-03-25", currency: "BRL", payeer: { document: "3", name: "Charlie" } },
  { value: 400, date: "2026-04-10", currency: "BRL", payeer: { document: "4", name: "Diana" } },
];

const emptyFilters: TransferFilters = { name: "", minValue: "", maxValue: "", startDate: "", endDate: "" };

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  transferRepository.getTransferList.mockResolvedValue(mockTransfers);
});

describe("useTransferList", () => {
  it("returns all transfers with empty filters", async () => {
    const { result } = renderHook(() => useTransferList(emptyFilters), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(4);
  });

  it("filters by name (case-insensitive)", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, name: "alice" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(1);
    expect(result.current.filteredTransfers[0].payeer.name).toBe("Alice");
  });

  it("filters by min value", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, minValue: "250" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(2);
    expect(result.current.filteredTransfers[0].value).toBe(300);
    expect(result.current.filteredTransfers[1].value).toBe(400);
  });

  it("filters by max value", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, maxValue: "200" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(2);
    expect(result.current.filteredTransfers[0].value).toBe(100);
    expect(result.current.filteredTransfers[1].value).toBe(200);
  });

  it("filters by value range", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, minValue: "150", maxValue: "350" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(2);
  });

  it("filters by start date", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, startDate: "2026-03-01" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(2);
  });

  it("filters by end date", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, endDate: "2026-02-28" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(2);
  });

  it("returns empty array when no transfers match", async () => {
    const { result } = renderHook(() => useTransferList({ ...emptyFilters, name: "NonExistent" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(0);
  });

  it("combines multiple filters", async () => {
    const filters: TransferFilters = { name: "a", minValue: "150", maxValue: "350", startDate: "", endDate: "" };
    const { result } = renderHook(() => useTransferList(filters), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.filteredTransfers).toHaveLength(1);
    expect(result.current.filteredTransfers[0].payeer.name).toBe("Charlie");
  });
});
