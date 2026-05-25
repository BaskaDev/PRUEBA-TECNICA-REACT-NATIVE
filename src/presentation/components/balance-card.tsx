import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { MACRO_COLORS } from "../../shared/constants/theme";
import { formatCurrency } from "../../shared/utils/format";

interface BalanceCardProps {
  balance: number;
  currency: string;
  isVisible?: boolean;
  onTransfer?: () => void;
  onToggleVisibility?: () => void;
}

export function BalanceCard({
  balance,
  currency,
  isVisible = true,
  onTransfer,
  onToggleVisibility,
}: BalanceCardProps) {
  return (
    <Animated.View entering={FadeInUp.duration(600).springify()} className="-mt-10 mx-4">
      <View
        className="overflow-hidden rounded-3xl bg-white"
        style={{
          shadowColor: MACRO_COLORS.blueDark,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 10,
        }}
      >
        <View className="bg-macro-blue-dark px-6 pb-5 pt-6">
          <View className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-teal/20" />

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Ionicons name="wallet" size={18} color="white" />
              </View>
              <Text className="ml-2.5 text-sm font-semibold text-white/80">Saldo disponible</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={onToggleVisibility}
                className="h-8 w-8 items-center justify-center rounded-full bg-white/10 active:bg-white/20"
              >
                <Ionicons
                  name={isVisible ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="white"
                />
              </Pressable>
              <View className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                <Text className="text-xs font-bold text-white">{currency}</Text>
              </View>
            </View>
          </View>

          <Text className="mt-3 text-4xl font-black tracking-tight text-white">
            {isVisible ? formatCurrency(balance, currency) : "••••••"}
          </Text>

          <View className="mt-5 flex-row gap-3">
            <Pressable
              onPress={onTransfer}
              className="flex-1 flex-row items-center justify-center rounded-full bg-primary-600 py-3.5 active:bg-primary-700"
              style={{
                shadowColor: MACRO_COLORS.blue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Ionicons name="arrow-up" size={18} color="white" />
              <Text className="ml-2 text-sm font-bold text-white">Transferir</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row border-t border-gray-100 bg-white px-6 py-3.5">
          <View className="flex-1 flex-row items-center">
            <Ionicons name="shield-checkmark" size={14} color={MACRO_COLORS.teal} />
            <Text className="ml-1.5 text-xs font-semibold text-gray-500">Cuenta protegida</Text>
          </View>
          <View className="flex-row items-center rounded-full bg-success-50 px-2.5 py-1">
            <View className="mr-1.5 h-2 w-2 rounded-full bg-success-500" />
            <Text className="text-xs font-bold text-success-600">Activo</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
