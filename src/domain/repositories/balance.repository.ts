import type { Balance } from "../entities/balance";

export interface BalanceRepository {
  getBalance(): Promise<Balance>;
}
