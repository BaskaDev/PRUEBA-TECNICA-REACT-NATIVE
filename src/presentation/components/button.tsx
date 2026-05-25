import type { ComponentProps } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { MACRO_COLORS } from "../../shared/constants/theme";

type ButtonVariant = "primary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<typeof TouchableOpacity> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; active: string }> = {
  primary: { bg: "bg-primary-600", text: "text-white", active: "active:bg-primary-700" },
  outline: {
    bg: "border-2 border-primary-600 bg-white",
    text: "text-primary-600",
    active: "active:bg-primary-50",
  },
  danger: { bg: "bg-danger-600", text: "text-white", active: "active:bg-danger-700" },
  ghost: { bg: "bg-transparent", text: "text-primary-600", active: "active:bg-gray-100" },
};

const SIZE_STYLES: Record<ButtonSize, { padding: string; text: string }> = {
  sm: { padding: "px-4 py-2", text: "text-sm" },
  md: { padding: "px-6 py-3.5", text: "text-base" },
  lg: { padding: "px-8 py-4", text: "text-lg" },
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];

  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-full ${v.bg} ${s.padding} ${v.active} ${disabled || loading ? "opacity-50" : ""} ${className}`}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={
        variant === "primary"
          ? {
              shadowColor: MACRO_COLORS.blue,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }
          : undefined
      }
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" || variant === "danger" ? "white" : MACRO_COLORS.blue}
        />
      ) : (
        <Text className={`font-bold ${s.text} ${v.text}`}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
