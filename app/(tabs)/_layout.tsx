import { Tabs } from "expo-router";
import { CustomTabBar } from "../../src/presentation/components/custom-tab-bar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="transfer" options={{ title: "Transferir" }} />
      <Tabs.Screen name="transfers" options={{ title: "Movimientos" }} />
    </Tabs>
  );
}
