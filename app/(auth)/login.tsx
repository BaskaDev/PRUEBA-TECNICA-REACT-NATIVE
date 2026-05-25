import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  type TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../src/presentation/components/button";
import { Input } from "../../src/presentation/components/input";
import { useLogin } from "../../src/presentation/hooks/use-auth";
import { MACRO_COLORS } from "../../src/shared/constants/theme";
import { validateLoginForm } from "../../src/shared/utils/validation";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const login = useLogin();
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (login.isSuccess) {
      router.replace("/(tabs)");
    }
  }, [login.isSuccess, router]);

  function handleLogin() {
    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login.mutate({ email, password });
    }
  }

  const errorMessage = login.error
    ? login.error instanceof Error
      ? login.error.message
      : "Error desconocido"
    : null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
          <View style={styles.heroBubble} pointerEvents="none" />
          <View style={styles.brandRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoLetter}>M</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>BancoXYZ</Text>
              <Text style={styles.brandSubtitle}>
                Pensá en <Text style={styles.brandAccent}>grande</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Bienvenido a tu banca digital</Text>
          <Text style={styles.heroText}>Ingresá con tu usuario y contraseña para continuar</Text>
          <View style={styles.tagsRow}>
            {["Cuentas", "Tarjetas", "Préstamos", "Inversiones"].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Ionicons name="log-in-outline" size={22} color={MACRO_COLORS.red} />
            <Text style={styles.formTitle}>Iniciar sesión</Text>
          </View>

          <Input
            nativeID="login-email"
            label="Correo electrónico"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="tu@email.com"
            icon="mail-outline"
            keyboardType="email-address"
            error={errors.email}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
            autoComplete="email"
            textContentType="emailAddress"
          />

          <Input
            ref={passwordRef}
            nativeID="login-password"
            label="Contraseña"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="Tu contraseña"
            icon="lock-closed-outline"
            secureTextEntry
            error={errors.password}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={handleLogin}
            autoComplete="password"
            textContentType="password"
          />

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color="#dc2626" />
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          ) : null}

          <Button
            variant="primary"
            size="lg"
            loading={login.isPending}
            onPress={handleLogin}
            className="mt-1 rounded-2xl"
          >
            Entrar
          </Button>

          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark-outline" size={18} color={MACRO_COLORS.blueDark} />
            <Text style={styles.securityText}>Canal seguro · Nunca pedimos claves por mensaje</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: MACRO_COLORS.gray,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    overflow: "hidden",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: MACRO_COLORS.blue,
    paddingHorizontal: 24,
    paddingBottom: 64,
  },
  heroBubble: {
    position: "absolute",
    right: -48,
    top: -48,
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  logoLetter: {
    fontSize: 24,
    fontWeight: "900",
    color: MACRO_COLORS.blue,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.75)",
  },
  brandAccent: {
    fontWeight: "900",
    color: MACRO_COLORS.pink,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 30,
  },
  heroText: {
    marginTop: 8,
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 32,
  },
  tag: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  formCard: {
    marginTop: -40,
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 32,
    ...(Platform.OS === "android"
      ? { elevation: 8 }
      : {
          shadowColor: MACRO_COLORS.blue,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
        }),
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  formTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "700",
    color: MACRO_COLORS.blueDark,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#fef2f2",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  errorBannerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#b91c1c",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: MACRO_COLORS.gray,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#64748b",
  },
  bottomSpacer: {
    height: 32,
  },
});
