export type SupportedLanguage = "en" | "es" | "fr"

export type PromoType = "combo" | "bulk" | "gift"

export interface LocalizedString {
  en: string
  es: string
  fr: string
}

export interface PromoCombo {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  image1: string;
  image2?: string;
  price: number;
  quantity?: number;
  promoType: PromoType;
  category: string;
  dietary: string[];
  promoPercentage?: number;
  ingredients: LocalizedString;
  origin: LocalizedString;
  nutritionalInfo?: {
    servingSize: string;
    calories: number;
    totalFat: string;
    sodium: string;
    totalCarbs: string;
    sugars: string;
    protein: string;
  };
  stock: number;
}
