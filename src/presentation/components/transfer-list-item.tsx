import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import type { Transfer } from "../../domain/entities/transfer";
import { MACRO_COLORS } from "../../shared/constants/theme";
import { formatCurrency, formatDate } from "../../shared/utils/format";

interface TransferListItemProps {
  transfer: Transfer;
  index: number;
}

export function TransferListItem({ transfer, index }: TransferListItemProps) {
  return (
    <Animated.View entering={FadeInRight.duration(400).delay(index * 60)}>
      <Pressable
        className="mx-4 mb-3 overflow-hidden rounded-2xl bg-white active:opacity-95"
        style={{
          shadowColor: MACRO_COLORS.blueDark,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View className="absolute left-0 top-0 h-full w-1.5 bg-accent-teal" />
        <View className="flex-row items-center px-5 py-4">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
            <Ionicons name="arrow-up" size={22} color={MACRO_COLORS.blue} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-base font-bold text-macro-blue-dark" numberOfLines={1}>
              {transfer.payeer.name}
            </Text>
            <View className="mt-1 flex-row items-center">
              <Ionicons name="calendar-outline" size={12} color="#94A3B8" />
              <Text className="ml-1 text-xs text-macro-gray-dark">{formatDate(transfer.date)}</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-base font-black text-macro-blue-dark">
              {formatCurrency(transfer.value, transfer.currency)}
            </Text>
            <View className="mt-1.5 flex-row items-center rounded-full bg-success-50 px-2.5 py-1">
              <Ionicons name="checkmark-circle" size={11} color="#16a34a" />
              <Text className="ml-1 text-xs font-bold text-success-600">Completada</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 8 }} />
        </View>
      </Pressable>
    </Animated.View>
  );
}
