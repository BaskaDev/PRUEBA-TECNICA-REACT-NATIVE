import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppHeaderProps {
  userName?: string;
  subtitle?: string;
  onLogout?: () => void;
}

export function AppHeader({ userName = "Usuario", subtitle, onLogout }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="overflow-hidden rounded-b-[32px] bg-primary-600 pb-8"
      style={{ paddingTop: insets.top + 12 }}
    >
      <View className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />
      <View className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-accent-teal/15" />

      <Animated.View entering={FadeInDown.duration(500)} className="px-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View
              className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-white"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              <Text className="text-xl font-black text-primary-600">M</Text>
            </View>
            <View>
              <Text className="text-sm font-medium text-white/80">Hola,</Text>
              <Text className="text-2xl font-black text-white" numberOfLines={1}>
                {userName}
              </Text>
              {subtitle ? (
                <Text className="text-xs text-white/70" numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>

          <View className="flex-row gap-2">
            <Pressable className="h-11 w-11 items-center justify-center rounded-full bg-white/20 active:bg-white/35">
              <Ionicons name="notifications-outline" size={22} color="white" />
            </Pressable>
            {onLogout ? (
              <Pressable
                className="h-11 w-11 items-center justify-center rounded-full bg-white/20 active:bg-white/35"
                onPress={onLogout}
              >
                <Ionicons name="log-out-outline" size={22} color="white" />
              </Pressable>
            ) : null}
          </View>
        </View>

        <View className="mt-5 flex-row rounded-full bg-macro-blue-dark/40 p-1">
          <View className="flex-1 items-center rounded-full bg-white py-2.5">
            <Text className="text-xs font-bold text-primary-600">Para vos</Text>
          </View>
          <View className="flex-1 items-center py-2.5">
            <Text className="text-xs font-semibold text-white/70">Para tu negocio</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
