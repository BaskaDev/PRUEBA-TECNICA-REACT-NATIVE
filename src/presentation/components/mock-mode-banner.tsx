import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useMockModeStore } from "../store/mock-mode-store";

export function MockModeBanner() {
  const isMockMode = useMockModeStore((s) => s.isMockMode);
  const reasons = useMockModeStore((s) => s.reasons);

  if (!isMockMode) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(300)}
      className="mx-4 mt-2 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50"
    >
      <View className="flex-row items-center px-4 py-3">
        <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-amber-200">
          <Ionicons name="information-circle" size={18} color="#92400E" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold text-amber-800">Modo de prueba</Text>
          <Text className="text-xs text-amber-700">
            {reasons.length > 0
              ? `Usando datos de demostración: ${reasons.join(", ")}`
              : "Usando datos de demostración — la API no está disponible"}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
