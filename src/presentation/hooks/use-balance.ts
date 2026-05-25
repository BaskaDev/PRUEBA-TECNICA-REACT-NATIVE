import { useQuery } from "@tanstack/react-query";
import { balanceRepository } from "../../data/repositories/balance.repository.impl";
import { QUERY_KEYS } from "../../shared/constants/api";

export function useBalance() {
  return useQuery({
    queryKey: QUERY_KEYS.BALANCE,
    queryFn: () => balanceRepository.getBalance(),
    refetchInterval: 30000,
    retry: 1,
    retryDelay: 1000,
    staleTime: 10000,
  });
}
