import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  onSettingsPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
}

export function ScreenHeader({
  title = "BancoXYZ",
  subtitle,
  onSettingsPress,
  rightIcon = "settings-outline",
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="overflow-hidden rounded-b-[28px] bg-primary-600"
      style={{ paddingTop: insets.top + 8, paddingBottom: 20 }}
    >
      <View
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"
        pointerEvents="none"
      />
      <View
        className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-accent-teal/20"
        pointerEvents="none"
      />

      <View className="flex-row items-center justify-between px-5">
        <View className="flex-row items-center">
          <View
            className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-white"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Text className="text-base font-black text-primary-600">M</Text>
          </View>
          <View>
            <Text className="text-xl font-black tracking-tight text-white">{title}</Text>
            {subtitle ? (
              <Text className="text-sm font-medium text-white/75">{subtitle}</Text>
            ) : null}
          </View>
        </View>

        <Pressable
          onPress={onSettingsPress}
          className="h-11 w-11 items-center justify-center rounded-full bg-white/20 active:bg-white/35"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Ionicons name={rightIcon} size={22} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
