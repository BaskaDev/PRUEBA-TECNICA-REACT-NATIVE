import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-macro-gray px-8">
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-card">
        <Ionicons name="help-circle-outline" size={48} color="#E30613" />
      </View>
      <Text className="text-5xl font-black text-macro-navy">404</Text>
      <Text className="mt-2 text-center text-lg text-gray-500">Página no encontrada</Text>
      <Link href="/" className="mt-6 rounded-2xl bg-primary-600 px-8 py-4">
        <Text className="font-bold text-white">Volver al inicio</Text>
      </Link>
    </View>
  );
}
