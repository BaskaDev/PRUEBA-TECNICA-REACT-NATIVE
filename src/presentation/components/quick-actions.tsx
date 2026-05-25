import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { MACRO_COLORS } from "../../shared/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

export interface QuickAction {
  id: string;
  label: string;
  icon: IconName;
  color: string;
  bgColor: string;
  onPress?: () => void;
}

interface QuickActionsProps {
  title?: string;
  actions: QuickAction[];
}

export function QuickActions({
  title = "¿Cómo podemos ayudarte hoy?",
  actions,
}: QuickActionsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <View className="mt-6">
      <Text className="mb-4 px-4 text-center text-lg font-black text-macro-blue-dark">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-4 pb-2"
      >
        {actions.map((action, index) => {
          const isActive = activeId === action.id;
          return (
            <Animated.View key={action.id} entering={FadeInRight.duration(400).delay(index * 60)}>
              <Pressable
                onPress={() => {
                  setActiveId(action.id);
                  action.onPress?.();
                }}
                className="w-28 items-center active:scale-95"
              >
                <View
                  className="mb-2 w-full items-center rounded-2xl bg-white px-3 py-4"
                  style={{
                    borderWidth: 2,
                    borderColor: isActive ? MACRO_COLORS.red : "transparent",
                    shadowColor: MACRO_COLORS.blueDark,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  <View
                    className="h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: action.bgColor }}
                  >
                    <Ionicons name={action.icon} size={24} color={action.color} />
                  </View>
                  <Text className="mt-2 text-center text-[10px] font-bold uppercase leading-tight text-macro-blue-dark">
                    {action.label}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export const DEFAULT_QUICK_ACTIONS: Omit<QuickAction, "onPress">[] = [
  {
    id: "transfer",
    label: "Transferir",
    icon: "swap-horizontal",
    color: MACRO_COLORS.blue,
    bgColor: "#DBEAFE",
  },
  {
    id: "statement",
    label: "Extracto",
    icon: "receipt-outline",
    color: MACRO_COLORS.teal,
    bgColor: "#CCFBF1",
  },
];
