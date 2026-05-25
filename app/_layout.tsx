import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "../src/presentation/store/auth-store";
import "../global.css";

const queryClient = new QueryClient();

function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-primary-600">
      <View className="mb-6 h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-macro">
        <Text className="text-4xl font-black text-primary-600">M</Text>
      </View>
      <Text className="text-3xl font-black tracking-tight text-white">BancoXYZ</Text>
      <Text className="mt-2 text-sm font-medium text-white/70">Pensá en grande</Text>
      <ActivityIndicator size="small" color="white" style={{ marginTop: 24 }} />
    </View>
  );
}

function RootLayout() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack key={isAuthenticated ? "tabs" : "auth"} screenOptions={{ headerShown: false }}>
      {isAuthenticated ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
