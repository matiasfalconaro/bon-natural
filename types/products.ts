export type SupportedLanguage = "en" | "es" | "fr"

export interface LocalizedString {
  en: string
  es: string
  fr: string
}

export interface Product {
  id: string
  slug: string
  categorySlug: string
  title: LocalizedString
  price: number
  image: string
  category: LocalizedString
  dietary: string[]
  description: LocalizedString
  ingredients: LocalizedString
  origin: LocalizedString
  nutritionalInfo?: {
    servingSize: string
    calories: number
    totalFat: string
    sodium: string
    totalCarbs: string
    sugars: string
    protein: string
  }
  promoPercentage?: number | null
  featured?: boolean
  stock: number
}
