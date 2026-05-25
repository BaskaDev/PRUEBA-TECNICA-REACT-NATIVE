import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { MACRO_COLORS } from "../../shared/constants/theme";
import { validatePayeerDocument, validateTransferValue } from "../../shared/utils/validation";
import { Button } from "./button";
import { Input } from "./input";

interface TransferFormData {
  value: string;
  payeerDocument: string;
  transferDate: Date;
}

interface TransferFormProps {
  onSubmit: (data: TransferFormData) => void;
  isPending: boolean;
}

export function TransferForm({ onSubmit, isPending }: TransferFormProps) {
  const [value, setValue] = useState("");
  const [payeerDocument, setPayeerDocument] = useState("");
  const [transferDate, setTransferDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleDateChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setTransferDate(selectedDate);
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    const valueError = validateTransferValue(value);
    const docError = validatePayeerDocument(payeerDocument);

    if (valueError) newErrors.value = valueError;
    if (docError) newErrors.payeerDocument = docError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      onSubmit({ value, payeerDocument, transferDate });
    }
  }

  const formattedDate = transferDate.toLocaleDateString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <View
      className="mx-4 mt-4 overflow-hidden rounded-3xl bg-white"
      style={{
        shadowColor: MACRO_COLORS.blueDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
        elevation: 8,
      }}
    >
      <View className="bg-primary-600 px-6 py-5">
        <View className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
        <View className="flex-row items-center">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="swap-horizontal" size={26} color="white" />
          </View>
          <View className="ml-3">
            <Text className="text-lg font-black text-white">Nueva transferencia</Text>
            <Text className="text-sm text-white/75">Completá los datos del destinatario</Text>
          </View>
        </View>
      </View>

      <View className="px-6 py-6">
        <Input
          label="Valor"
          value={value}
          onChangeText={(v) => {
            setValue(v);
            setErrors((e) => ({ ...e, value: "" }));
          }}
          placeholder="0,00"
          icon="cash-outline"
          keyboardType="decimal-pad"
          error={errors.value}
        />

        <Input
          label="Documento del destinatario"
          value={payeerDocument}
          onChangeText={(v) => {
            setPayeerDocument(v);
            setErrors((e) => ({ ...e, payeerDocument: "" }));
          }}
          placeholder="DNI/RUC"
          icon="document-text-outline"
          keyboardType="number-pad"
          error={errors.payeerDocument}
        />

        <View className="mb-5">
          <Text className="mb-2 text-sm font-bold text-macro-blue-dark">
            Fecha de la transferencia
          </Text>
          <TouchableOpacity
            className="flex-row items-center rounded-2xl border-2 border-gray-100 bg-macro-gray px-4 py-4 active:bg-gray-100"
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <View className="mr-3 h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
              <Ionicons name="calendar-outline" size={18} color={MACRO_COLORS.blue} />
            </View>
            <Text className="flex-1 text-base font-semibold text-gray-900">{formattedDate}</Text>
            <Ionicons name="chevron-down" size={18} color="#94A3B8" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={transferDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              onChange={handleDateChange}
            />
          )}
        </View>

        <Button variant="primary" size="lg" loading={isPending} onPress={handleSubmit}>
          Enviar transferencia
        </Button>
      </View>
    </View>
  );
}
