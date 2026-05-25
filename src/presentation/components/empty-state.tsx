import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { MACRO_COLORS } from "../../shared/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "document-text-outline",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500).springify()}
      className="mx-4 mt-4 overflow-hidden rounded-3xl bg-white"
      style={{
        shadowColor: MACRO_COLORS.blueDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      <View className="items-center px-8 py-10">
        <View className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-primary-50" />
        <View className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-accent-teal/10" />

        <View
          className="mb-5 h-20 w-20 items-center justify-center rounded-3xl bg-primary-50"
          style={{
            borderWidth: 2,
            borderColor: `${MACRO_COLORS.teal}30`,
          }}
        >
          <Ionicons name={icon} size={40} color={MACRO_COLORS.blue} />
        </View>

        <Text className="text-center text-xl font-black text-macro-blue-dark">{title}</Text>
        <Text className="mt-2 text-center text-sm leading-5 text-macro-gray-dark">
          {description}
        </Text>

        {actionLabel && onAction ? (
          <Pressable
            onPress={onAction}
            className="mt-6 flex-row items-center rounded-full bg-primary-600 px-8 py-3.5 active:bg-primary-700"
            style={{
              shadowColor: MACRO_COLORS.blue,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text className="ml-2 text-sm font-bold text-white">{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
