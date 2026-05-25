import type { Balance } from "../../../domain/entities/balance";
import { useMockModeStore } from "../../../presentation/store/mock-mode-store";
import { API } from "../../../shared/constants/api";
import { apiClient } from "./client";

export async function fetchBalance(): Promise<Balance> {
  try {
    const response = await apiClient.get<Balance>(API.BALANCE, { timeout: 8000 });
    return response.data;
  } catch {
    useMockModeStore.getState().setMockMode(true, "saldo");
    return { currency: "BRL", accountBalance: 1800 };
  }
}
