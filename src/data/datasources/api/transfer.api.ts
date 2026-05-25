import type {
  Transfer,
  TransferRequest,
  TransferResponse,
} from "../../../domain/entities/transfer";
import { API } from "../../../shared/constants/api";
import { apiClient } from "./client";

export async function createTransfer(data: TransferRequest): Promise<TransferResponse> {
  const response = await apiClient.post<TransferResponse>(API.TRANSFER, data, { timeout: 8000 });
  return response.data;
}

export async function fetchTransferList(): Promise<Transfer[]> {
  const response = await apiClient.get(API.TRANSFER_LIST, { timeout: 8000 });
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data?.transfers && Array.isArray(data.transfers)) return data.transfers;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}
