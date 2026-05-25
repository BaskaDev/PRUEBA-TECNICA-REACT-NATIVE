import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { MACRO_COLORS } from "../../shared/constants/theme";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  returnKeyType?: TextInputProps["returnKeyType"];
  onSubmitEditing?: TextInputProps["onSubmitEditing"];
  textContentType?: TextInputProps["textContentType"];
  autoComplete?: TextInputProps["autoComplete"];
  blurOnSubmit?: boolean;
  importantForAutofill?: TextInputProps["importantForAutofill"];
  nativeID?: string;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    value,
    onChangeText,
    placeholder,
    icon,
    error,
    secureTextEntry,
    keyboardType = "default",
    autoCapitalize = "none",
    returnKeyType,
    onSubmitEditing,
    textContentType,
    autoComplete,
    blurOnSubmit,
    importantForAutofill,
    nativeID,
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => inputRef.current as TextInput);

  const borderColor = error ? "#ef4444" : focused ? MACRO_COLORS.blue : "#f1f5f9";
  const backgroundColor = error ? "#fef2f2" : "#ffffff";

  return (
    <View style={styles.wrapper} collapsable={false}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldShell} collapsable={false}>
        {icon && (
          <View style={styles.iconWrap} pointerEvents="none">
            <Ionicons
              name={icon}
              size={18}
              color={focused ? MACRO_COLORS.blue : error ? "#ef4444" : "#94A3B8"}
            />
          </View>
        )}
        <TextInput
          ref={inputRef}
          nativeID={nativeID}
          style={[
            styles.input,
            icon ? styles.inputWithIcon : null,
            {
              borderColor,
              backgroundColor,
            },
            focused && styles.inputFocused,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          spellCheck={false}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          textContentType={textContentType}
          autoComplete={autoComplete}
          importantForAutofill={importantForAutofill}
          editable
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...(Platform.OS === "android" && { underlineColorAndroid: "transparent" })}
        />
      </View>
      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={12} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: MACRO_COLORS.blueDark,
  },
  fieldShell: {
    position: "relative",
    width: "100%",
  },
  iconWrap: {
    position: "absolute",
    left: 14,
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    minHeight: 52,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 16 : 12,
    fontSize: 16,
    color: "#111827",
  },
  inputWithIcon: {
    paddingLeft: 52,
  },
  inputFocused: {
    ...(Platform.OS === "android"
      ? { elevation: 2 }
      : {
          shadowColor: MACRO_COLORS.blue,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        }),
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  errorText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#dc2626",
  },
});
