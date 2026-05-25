import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Transfer, TransferFilters } from "../../src/domain/entities/transfer";
import { EmptyState } from "../../src/presentation/components/empty-state";
import { FilterBar } from "../../src/presentation/components/filter-bar";
import { MockModeBanner } from "../../src/presentation/components/mock-mode-banner";
import { ScreenHeader } from "../../src/presentation/components/screen-header";
import { TransferListItem } from "../../src/presentation/components/transfer-list-item";
import { useTransferList } from "../../src/presentation/hooks/use-transfer-list";
import { useAuthStore } from "../../src/presentation/store/auth-store";
import { MACRO_COLORS } from "../../src/shared/constants/theme";

const EMPTY_FILTERS: TransferFilters = {
  name: "",
  minValue: "",
  maxValue: "",
  startDate: "",
  endDate: "",
};

export default function TransfersScreen() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [filters, setFilters] = useState<TransferFilters>(EMPTY_FILTERS);
  const { filteredTransfers, isLoading } = useTransferList(filters);

  function renderItem({ item, index }: { item: Transfer; index: number }) {
    return <TransferListItem transfer={item} index={index} />;
  }

  const hasFilters = Object.values(filters).some((v) => v !== "");

  return (
    <View className="flex-1 bg-macro-gray">
      <ScreenHeader
        title="BancoXYZ"
        subtitle="Movimientos"
        onSettingsPress={logout}
        rightIcon="log-out-outline"
      />

      <SafeAreaView edges={["bottom"]} className="flex-1">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(EMPTY_FILTERS)}
        />

        <MockModeBanner />

        {filteredTransfers.length > 0 && (
          <View className="mx-4 mb-2 mt-1 flex-row items-center justify-between">
            <Text className="text-sm font-bold text-macro-blue-dark">
              {filteredTransfers.length} movimiento{filteredTransfers.length !== 1 ? "s" : ""}
            </Text>
            {hasFilters && (
              <View className="rounded-full bg-accent-pink/10 px-3 py-1">
                <Text className="text-xs font-bold text-accent-pink">Filtrado</Text>
              </View>
            )}
          </View>
        )}

        {isLoading ? (
          <View className="mx-4 mt-4 overflow-hidden rounded-3xl bg-white p-10">
            <ActivityIndicator size="large" color={MACRO_COLORS.blue} />
            <Text className="mt-3 text-center text-sm text-gray-500">Cargando movimientos...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTransfers}
            keyExtractor={(item, index) => `${item.date}-${item.payeer.document}-${index}`}
            renderItem={renderItem}
            contentContainerClassName="pb-8 pt-1"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyState
                icon="swap-horizontal-outline"
                title="Sin movimientos"
                description="No hay transferencias que coincidan con tu búsqueda. Probá ajustar los filtros o realizá tu primera transferencia."
                actionLabel="Realizar transferencia"
                onAction={() => router.push("/(tabs)/transfer")}
              />
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
}
