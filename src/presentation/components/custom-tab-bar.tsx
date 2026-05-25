import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MACRO_COLORS } from "../../shared/constants/theme";

const TAB_CONFIG: Record<
  string,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconFocused: keyof typeof Ionicons.glyphMap;
  }
> = {
  index: { label: "Inicio", icon: "home-outline", iconFocused: "home" },
  transfer: {
    label: "Transferir",
    icon: "swap-horizontal-outline",
    iconFocused: "swap-horizontal",
  },
  transfers: { label: "Movimientos", icon: "list-outline", iconFocused: "list" },
};

export function CustomTabBar({ state, descriptors: _descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-t border-gray-100 bg-white px-2"
      style={{
        paddingBottom: Math.max(insets.bottom, 10),
        paddingTop: 8,
        shadowColor: MACRO_COLORS.blueDark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 12,
      }}
    >
      <View className="flex-row items-center justify-around">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const config = TAB_CONFIG[route.name] ?? {
            label: route.name,
            icon: "ellipse-outline" as const,
            iconFocused: "ellipse" as const,
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="min-w-[80px] items-center py-1 active:opacity-80"
            >
              <View
                className={`mb-1 items-center justify-center rounded-2xl px-5 py-2 ${
                  focused ? "bg-primary-50" : ""
                }`}
                style={
                  focused
                    ? {
                        borderWidth: 1,
                        borderColor: `${MACRO_COLORS.blue}20`,
                      }
                    : undefined
                }
              >
                <Ionicons
                  name={focused ? config.iconFocused : config.icon}
                  size={24}
                  color={focused ? MACRO_COLORS.blue : MACRO_COLORS.grayMuted}
                />
              </View>
              <Text
                className={`text-xs font-bold ${focused ? "text-primary-600" : "text-macro-gray-dark"}`}
              >
                {config.label}
              </Text>
              {focused && <View className="mt-1 h-1 w-6 rounded-full bg-accent-pink" />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
