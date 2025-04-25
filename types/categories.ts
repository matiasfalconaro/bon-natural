export type SupportedLanguage = "en" | "es" | "fr"

export interface LocalizedString {
  en: string
  es: string
  fr: string
}

export interface Category {
  id: string
  slug: string
  name: LocalizedString
  description?: LocalizedString
  image: string
}
