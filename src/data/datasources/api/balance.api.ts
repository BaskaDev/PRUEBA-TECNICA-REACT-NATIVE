import type { Balance } from "../../../domain/entities/balance";
import { API } from "../../../shared/constants/api";
import { apiClient } from "./client";

export async function fetchBalance(): Promise<Balance> {
  const response = await apiClient.get<Balance>(API.BALANCE, { timeout: 8000 });
  return response.data;
}
