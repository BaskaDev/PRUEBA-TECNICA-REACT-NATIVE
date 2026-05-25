import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../src/presentation/components/app-header";
import { BalanceCard } from "../../src/presentation/components/balance-card";
import { HOME_PROMOS, PromoCarousel } from "../../src/presentation/components/promo-carousel";
import {
  DEFAULT_QUICK_ACTIONS,
  QuickActions,
} from "../../src/presentation/components/quick-actions";
import { useBalance } from "../../src/presentation/hooks/use-balance";
import { useAuthStore } from "../../src/presentation/store/auth-store";
import { MACRO_COLORS } from "../../src/shared/constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, refetch, isRefetching } = useBalance();
  const logout = useAuthStore((s) => s.logout);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/(auth)/login");
  }, [logout, router]);

  const promos = useMemo(
    () =>
      HOME_PROMOS.map((p) =>
        p.id === "dream" || p.id === "benefits"
          ? { ...p, onPress: () => Linking.openURL("https://www.macro.com.ar/home-page") }
          : p,
      ),
    [],
  );

  const quickActions = useMemo(
    () =>
      DEFAULT_QUICK_ACTIONS.map((action) => ({
        ...action,
        onPress:
          action.id === "transfer"
            ? () => router.push("/(tabs)/transfer")
            : action.id === "statement"
              ? () => router.push("/(tabs)/transfers")
              : undefined,
      })),
    [router],
  );

  return (
    <View className="flex-1 bg-macro-gray">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={MACRO_COLORS.blue}
            colors={[MACRO_COLORS.blue]}
          />
        }
      >
        <AppHeader
          userName={user?.name ?? "Usuario"}
          subtitle={user?.email}
          onLogout={handleLogout}
        />

        {isLoading ? (
          <View className="-mt-10 mx-4 overflow-hidden rounded-3xl bg-white p-10">
            <ActivityIndicator size="large" color={MACRO_COLORS.blue} />
            <Text className="mt-3 text-center text-sm text-gray-500">Cargando saldo...</Text>
          </View>
        ) : data ? (
          <BalanceCard
            balance={data.accountBalance}
            currency={data.currency}
            isVisible={isBalanceVisible}
            onToggleVisibility={() => setIsBalanceVisible((v) => !v)}
            onTransfer={() => router.push("/(tabs)/transfer")}
          />
        ) : (
          <View className="-mt-10 mx-4 overflow-hidden rounded-3xl bg-white p-10">
            <Text className="text-center text-base font-bold text-macro-blue-dark">
              No se pudo cargar el saldo
            </Text>
            <Pressable
              className="mt-4 self-center rounded-full bg-primary-600 px-6 py-2 active:bg-primary-700"
              onPress={() => refetch()}
            >
              <Text className="text-sm font-bold text-white">Reintentar</Text>
            </Pressable>
          </View>
        )}

        <PromoCarousel items={promos} />

        <QuickActions actions={quickActions} />

        <View
          className="mx-4 mb-8 mt-6 overflow-hidden rounded-3xl bg-white"
          style={{
            shadowColor: MACRO_COLORS.blueDark,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <View className="flex-row items-start p-5">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
              <Ionicons name="lock-closed" size={26} color={MACRO_COLORS.blue} />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-base font-black text-macro-blue-dark">
                Tu seguridad es nuestra prioridad
              </Text>
              <Text className="mt-1 text-sm leading-5 text-macro-gray-dark">
                Las estafas bancarias crecen todos los días. Conocé cómo prevenirlas.
              </Text>
              <Pressable className="mt-4 self-start rounded-full bg-primary-600 px-5 py-2.5 active:bg-primary-700">
                <Text className="text-sm font-bold text-white">Conocer más →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable
        className="absolute bottom-24 right-5 h-14 flex-row items-center rounded-full bg-primary-600 px-5 active:bg-primary-700"
        style={{
          shadowColor: MACRO_COLORS.blue,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <Ionicons name="chatbubble-ellipses" size={22} color="white" />
        <Text className="ml-2 text-sm font-bold text-white">BancoChat</Text>
      </Pressable>

      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}
