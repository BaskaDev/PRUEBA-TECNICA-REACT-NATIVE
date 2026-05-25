import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { transferRepository } from "../../data/repositories/transfer.repository.impl";
import type { Transfer, TransferFilters } from "../../domain/entities/transfer";
import { QUERY_KEYS } from "../../shared/constants/api";

export function useTransferList(filters: TransferFilters) {
  const query = useQuery({
    queryKey: QUERY_KEYS.TRANSFER_LIST,
    queryFn: () => transferRepository.getTransferList(),
    retry: 1,
    retryDelay: 1000,
    staleTime: 10000,
  });

  const filteredTransfers = useMemo(() => {
    if (!query.data) return [];

    return query.data.filter((t: Transfer) => {
      if (filters.name && !t.payeer.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      if (filters.minValue && t.value < Number.parseFloat(filters.minValue)) {
        return false;
      }
      if (filters.maxValue && t.value > Number.parseFloat(filters.maxValue)) {
        return false;
      }
      if (filters.startDate && t.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && t.date > filters.endDate) {
        return false;
      }
      return true;
    });
  }, [query.data, filters]);

  return {
    ...query,
    filteredTransfers,
  };
}
