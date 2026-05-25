import type { Transfer, TransferRequest, TransferResponse } from "../entities/transfer";

export interface TransferRepository {
  createTransfer(data: TransferRequest): Promise<TransferResponse>;
  getTransferList(): Promise<Transfer[]>;
}
