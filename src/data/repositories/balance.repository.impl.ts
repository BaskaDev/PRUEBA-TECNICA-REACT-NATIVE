import type { Balance } from "../../domain/entities/balance";
import type { BalanceRepository } from "../../domain/repositories/balance.repository";
import * as BalanceApi from "../datasources/api/balance.api";

export const balanceRepository: BalanceRepository = {
  async getBalance(): Promise<Balance> {
    return BalanceApi.fetchBalance();
  },
};
