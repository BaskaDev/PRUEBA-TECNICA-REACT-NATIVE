import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

let SecureStore: typeof import("expo-secure-store") | null = null;

try {
  SecureStore = require("expo-secure-store");
} catch {
  SecureStore = null;
}

function isSecureStoreAvailable(): boolean {
  return SecureStore != null && Platform.OS !== "web";
}

export async function setSecureItem(key: string, value: string) {
  if (isSecureStoreAvailable()) {
    try {
      await SecureStore?.setItemAsync(key, value);
      return;
    } catch {
      //
    }
  }
  await AsyncStorage.setItem(key, value);
}

export async function getSecureItem(key: string): Promise<string | null> {
  if (isSecureStoreAvailable()) {
    try {
      return (await SecureStore?.getItemAsync(key)) ?? null;
    } catch {
      //
    }
  }
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function deleteSecureItem(key: string) {
  if (isSecureStoreAvailable()) {
    try {
      await SecureStore?.deleteItemAsync(key);
      return;
    } catch {
      //
    }
  }
  await AsyncStorage.removeItem(key);
}
