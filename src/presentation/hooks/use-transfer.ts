import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transferRepository } from "../../data/repositories/transfer.repository.impl";
import type { Balance } from "../../domain/entities/balance";
import type { Transfer, TransferRequest } from "../../domain/entities/transfer";
import { QUERY_KEYS } from "../../shared/constants/api";

export function useTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransferRequest) => transferRepository.createTransfer(data),
    onSuccess: (_data, variables) => {
      const balance = queryClient.getQueryData<Balance>(QUERY_KEYS.BALANCE);
      if (balance) {
        queryClient.setQueryData<Balance>(QUERY_KEYS.BALANCE, {
          ...balance,
          accountBalance: balance.accountBalance - variables.value,
        });
      }

      queryClient.setQueryData<Transfer[]>(QUERY_KEYS.TRANSFER_LIST, (old) => {
        const newTransfer: Transfer = {
          value: variables.value,
          date: variables.transferDate,
          currency: variables.currency,
          payeer: { document: variables.payeerDocument, name: "Transferencia" },
        };
        return old ? [newTransfer, ...old] : [newTransfer];
      });
    },
  });
}
