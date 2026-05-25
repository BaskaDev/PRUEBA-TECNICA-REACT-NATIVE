import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { TransferFilters } from "../../domain/entities/transfer";
import { MACRO_COLORS } from "../../shared/constants/theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch {
    // No-op in New Architecture
  }
}

interface FilterBarProps {
  filters: TransferFilters;
  onChange: (filters: TransferFilters) => void;
  onClear: () => void;
}

function toDate(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  const parsed = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString: string): string {
  if (!dateString) return "";
  const date = toDate(dateString);
  if (!date) return dateString;
  return date.toLocaleDateString("es", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function FilterBar({ filters, onChange, onClear }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  function updateField<K extends keyof TransferFilters>(key: K, value: TransferFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  const hasFilters = Object.values(filters).some((v) => v !== "");
  const activeCount = Object.values(filters).filter(Boolean).length;

  function toggleOpen() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  }

  function handleStartDateChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    setShowStartPicker(Platform.OS === "ios");
    if (selectedDate) {
      updateField("startDate", toDateString(selectedDate));
    }
  }

  function handleEndDateChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    setShowEndPicker(Platform.OS === "ios");
    if (selectedDate) {
      updateField("endDate", toDateString(selectedDate));
    }
  }

  return (
    <View
      className="mx-4 mt-4 overflow-hidden rounded-3xl bg-white"
      style={{
        shadowColor: MACRO_COLORS.blueDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <View className="p-4">
        <View className="flex-row items-center rounded-2xl border-2 border-primary-100 bg-macro-gray px-4">
          <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
            <Ionicons name="search" size={18} color="white" />
          </View>
          <TextInput
            className="ml-3 flex-1 py-3.5 text-base font-medium text-macro-blue-dark"
            placeholder="Buscar por nombre..."
            placeholderTextColor={MACRO_COLORS.grayMuted}
            value={filters.name}
            onChangeText={(v) => updateField("name", v)}
          />
          {filters.name.length > 0 && (
            <Pressable
              onPress={() => updateField("name", "")}
              hitSlop={8}
              className="h-7 w-7 items-center justify-center rounded-full bg-gray-200 active:bg-gray-300"
            >
              <Ionicons name="close" size={14} color="#64748B" />
            </Pressable>
          )}
        </View>

        <View className="mt-3 flex-row items-center gap-2">
          <Pressable
            onPress={toggleOpen}
            className={`flex-row items-center rounded-full px-4 py-2.5 active:opacity-80 ${
              open ? "bg-primary-600" : "bg-primary-50"
            }`}
          >
            <Ionicons name="options-outline" size={16} color={open ? "white" : MACRO_COLORS.blue} />
            <Text
              className={`ml-1.5 text-sm font-bold ${open ? "text-white" : "text-primary-600"}`}
            >
              Filtros
            </Text>
            {hasFilters && (
              <View
                className={`ml-2 h-5 min-w-[20px] items-center justify-center rounded-full px-1 ${
                  open ? "bg-white/25" : "bg-accent-pink"
                }`}
              >
                <Text className="text-xs font-bold text-white">{activeCount}</Text>
              </View>
            )}
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={14}
              color={open ? "white" : MACRO_COLORS.blue}
              style={{ marginLeft: 4 }}
            />
          </Pressable>

          {hasFilters && (
            <Pressable
              onPress={onClear}
              className="flex-row items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 active:bg-gray-50"
            >
              <Ionicons name="refresh" size={14} color={MACRO_COLORS.grayMuted} />
              <Text className="ml-1.5 text-sm font-semibold text-macro-gray-dark">Limpiar</Text>
            </Pressable>
          )}
        </View>
      </View>

      {open && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          className="border-t border-gray-100 bg-macro-gray/50 px-4 pb-5 pt-4"
        >
          <View className="flex-row gap-2">
            <View className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <View className="flex-row items-center px-3">
                <Text className="text-xs font-bold text-accent-teal">R$</Text>
                <TextInput
                  className="flex-1 py-3.5 pl-1 text-sm font-medium text-macro-blue-dark"
                  placeholder="Mínimo"
                  placeholderTextColor={MACRO_COLORS.grayMuted}
                  keyboardType="decimal-pad"
                  value={filters.minValue}
                  onChangeText={(v) => updateField("minValue", v)}
                />
              </View>
            </View>
            <View className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <View className="flex-row items-center px-3">
                <Text className="text-xs font-bold text-accent-teal">R$</Text>
                <TextInput
                  className="flex-1 py-3.5 pl-1 text-sm font-medium text-macro-blue-dark"
                  placeholder="Máximo"
                  placeholderTextColor={MACRO_COLORS.grayMuted}
                  keyboardType="decimal-pad"
                  value={filters.maxValue}
                  onChangeText={(v) => updateField("maxValue", v)}
                />
              </View>
            </View>
          </View>

          <View className="mt-2 flex-row gap-2">
            <TouchableOpacity
              className="flex-1 flex-row items-center rounded-2xl border border-gray-200 bg-white px-3 active:bg-gray-50"
              onPress={() => setShowStartPicker(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar-outline" size={16} color={MACRO_COLORS.blue} />
              <Text className="ml-2 flex-1 py-3.5 text-sm font-medium text-macro-blue-dark">
                {filters.startDate ? formatDisplayDate(filters.startDate) : "Desde"}
              </Text>
              {filters.startDate && (
                <Pressable
                  onPress={() => updateField("startDate", "")}
                  hitSlop={8}
                  className="h-6 w-6 items-center justify-center rounded-full bg-gray-200"
                >
                  <Ionicons name="close" size={12} color="#64748B" />
                </Pressable>
              )}
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={toDate(filters.startDate) ?? new Date()}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}

            <TouchableOpacity
              className="flex-1 flex-row items-center rounded-2xl border border-gray-200 bg-white px-3 active:bg-gray-50"
              onPress={() => setShowEndPicker(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar-outline" size={16} color={MACRO_COLORS.blue} />
              <Text className="ml-2 flex-1 py-3.5 text-sm font-medium text-macro-blue-dark">
                {filters.endDate ? formatDisplayDate(filters.endDate) : "Hasta"}
              </Text>
              {filters.endDate && (
                <Pressable
                  onPress={() => updateField("endDate", "")}
                  hitSlop={8}
                  className="h-6 w-6 items-center justify-center rounded-full bg-gray-200"
                >
                  <Ionicons name="close" size={12} color="#64748B" />
                </Pressable>
              )}
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={toDate(filters.endDate) ?? new Date()}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
