import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Balance } from "../../src/domain/entities/balance";
import { ScreenHeader } from "../../src/presentation/components/screen-header";
import { TransferForm } from "../../src/presentation/components/transfer-form";
import { useTransfer } from "../../src/presentation/hooks/use-transfer";
import { QUERY_KEYS } from "../../src/shared/constants/api";

export default function TransferScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const transfer = useTransfer();

  function handleSubmit(data: { value: string; payeerDocument: string; transferDate: Date }) {
    const amount = Number.parseFloat(data.value);
    const balance = queryClient.getQueryData<Balance>(QUERY_KEYS.BALANCE);

    if (balance && amount > balance.accountBalance) {
      Alert.alert(
        "Saldo insuficiente",
        "No tenés saldo suficiente para realizar esta transferencia.",
      );
      return;
    }

    const year = data.transferDate.getFullYear();
    const month = String(data.transferDate.getMonth() + 1).padStart(2, "0");
    const day = String(data.transferDate.getDate()).padStart(2, "0");

    transfer.mutate(
      {
        value: amount,
        currency: "BRL",
        payeerDocument: data.payeerDocument,
        transferDate: `${year}-${month}-${day}`,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Transferencia realizada con éxito", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: () => {
          Alert.alert("Error", "No se pudo completar la transferencia. Intentá de nuevo.");
        },
      },
    );
  }

  return (
    <View className="flex-1 bg-macro-gray">
      <ScreenHeader title="BancoXYZ" subtitle="Nueva transferencia" />
      <SafeAreaView edges={["bottom"]} className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <TransferForm onSubmit={handleSubmit} isPending={transfer.isPending} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
