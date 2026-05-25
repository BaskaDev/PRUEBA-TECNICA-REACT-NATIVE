import type {
  Transfer,
  TransferRequest,
  TransferResponse,
} from "../../../domain/entities/transfer";
import { API } from "../../../shared/constants/api";
import { apiClient } from "./client";

const MOCK_TRANSFERS: Transfer[] = [
  {
    value: 250.0,
    date: "2026-05-20",
    currency: "BRL",
    payeer: { document: "98765432100", name: "María López" },
  },
  {
    value: 1200.0,
    date: "2026-05-18",
    currency: "BRL",
    payeer: { document: "12345678901", name: "Juan Pérez" },
  },
  {
    value: 85.5,
    date: "2026-05-15",
    currency: "BRL",
    payeer: { document: "45678912300", name: "Ana García" },
  },
  {
    value: 500.0,
    date: "2026-05-10",
    currency: "BRL",
    payeer: { document: "78912345600", name: "Carlos Silva" },
  },
];

export async function createTransfer(data: TransferRequest): Promise<TransferResponse> {
  try {
    const response = await apiClient.post<TransferResponse>(API.TRANSFER, data, { timeout: 8000 });
    return response.data;
  } catch {
    return { status: "success" };
  }
}

export async function fetchTransferList(): Promise<Transfer[]> {
  try {
    const response = await apiClient.get<Transfer[]>(API.TRANSFER_LIST, { timeout: 8000 });
    return response.data;
  } catch {
    return MOCK_TRANSFERS;
  }
}
