import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { MACRO_COLORS } from "../../shared/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

export interface PromoItem {
  id: string;
  title: string;
  highlight?: string;
  subtitle: string;
  cta: string;
  icon: IconName;
  variant: "blue" | "navy" | "gold";
  onPress?: () => void;
}

const VARIANT_STYLES = {
  blue: {
    bg: "bg-primary-600",
    accent: "bg-white/20",
    iconColor: "#FFFFFF",
    highlightColor: MACRO_COLORS.pink,
  },
  navy: {
    bg: "bg-macro-blue-dark",
    accent: "bg-white/15",
    iconColor: "#FFFFFF",
    highlightColor: MACRO_COLORS.teal,
  },
  gold: {
    bg: "bg-macro-gold",
    accent: "bg-macro-blue-dark/10",
    iconColor: "#002B49",
    highlightColor: MACRO_COLORS.blue,
  },
} as const;

function PromoTitle({
  title,
  highlight,
  isGold,
  highlightColor,
}: {
  title: string;
  highlight?: string;
  isGold: boolean;
  highlightColor: string;
}) {
  if (!highlight || !title.includes(highlight)) {
    return (
      <Text
        className={`text-base font-black leading-snug ${isGold ? "text-macro-blue-dark" : "text-white"}`}
      >
        {title}
      </Text>
    );
  }

  const [before, after] = title.split(highlight);
  return (
    <Text
      className={`text-base font-black leading-snug ${isGold ? "text-macro-blue-dark" : "text-white"}`}
    >
      {before}
      <Text style={{ color: highlightColor }}>{highlight}</Text>
      {after}
    </Text>
  );
}

interface PromoCarouselProps {
  items: PromoItem[];
}

export function PromoCarousel({ items }: PromoCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-4 pb-1 pt-1"
      className="-mt-2"
    >
      {items.map((item, index) => {
        const style = VARIANT_STYLES[item.variant];
        const isGold = item.variant === "gold";
        return (
          <Animated.View key={item.id} entering={FadeInRight.duration(500).delay(index * 100)}>
            <Pressable
              onPress={item.onPress}
              className={`w-72 overflow-hidden rounded-3xl ${style.bg} active:opacity-95`}
              style={{
                shadowColor: MACRO_COLORS.blueDark,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View className="flex-row p-5">
                <View className="flex-1 pr-3">
                  <PromoTitle
                    title={item.title}
                    highlight={item.highlight}
                    isGold={isGold}
                    highlightColor={style.highlightColor}
                  />
                  <Text
                    className={`mt-1.5 text-sm leading-snug ${isGold ? "text-macro-blue-dark/80" : "text-white/85"}`}
                  >
                    {item.subtitle}
                  </Text>
                  <View className={`mt-4 self-start rounded-full px-5 py-2.5 ${style.accent}`}>
                    <Text
                      className={`text-xs font-bold ${isGold ? "text-macro-blue-dark" : "text-white"}`}
                    >
                      {item.cta} →
                    </Text>
                  </View>
                </View>
                <View
                  className={`h-14 w-14 items-center justify-center rounded-2xl ${style.accent}`}
                >
                  <Ionicons name={item.icon} size={28} color={style.iconColor} />
                </View>
              </View>
            </Pressable>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}

export const HOME_PROMOS: PromoItem[] = [
  {
    id: "dream",
    title: "Soñá en grande",
    highlight: "grande",
    subtitle: "Pensá en BancoXYZ. Beneficios exclusivos para vos.",
    cta: "Conocer más",
    icon: "star",
    variant: "blue",
  },
  {
    id: "benefits",
    title: "Hasta 30% ahorro",
    highlight: "30%",
    subtitle: "En supermercados pagando con tu tarjeta",
    cta: "Ver más",
    icon: "pricetag",
    variant: "navy",
  },
  {
    id: "premium",
    title: "Experiencia Selecta",
    subtitle: "Accedé a beneficios únicos",
    cta: "Descubrir",
    icon: "diamond-outline",
    variant: "gold",
  },
];
