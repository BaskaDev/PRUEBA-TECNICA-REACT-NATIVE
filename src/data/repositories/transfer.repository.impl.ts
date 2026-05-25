import type { Transfer, TransferRequest, TransferResponse } from "../../domain/entities/transfer";
import type { TransferRepository } from "../../domain/repositories/transfer.repository";
import * as TransferApi from "../datasources/api/transfer.api";

export const transferRepository: TransferRepository = {
  async createTransfer(data: TransferRequest): Promise<TransferResponse> {
    return TransferApi.createTransfer(data);
  },
  async getTransferList(): Promise<Transfer[]> {
    return TransferApi.fetchTransferList();
  },
};
