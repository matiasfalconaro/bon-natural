type SupportedLanguage = "en" | "es" | "fr"

interface LocalizedString {
  en: string
  es: string
  fr: string
}

export const CATEGORY_MAP: Record<string, LocalizedString> = {
  "organic-produce": {
    en: "Organic Produce",
    es: "Productos Orgánicos",
    fr: "Produits Biologiques",
  },
  "natural-sweeteners": {
    en: "Natural Sweeteners",
    es: "Endulzantes Naturales",
    fr: "Édulcorants Naturels",
  },
  "gluten-free": {
    en: "Gluten-Free",
    es: "Sin Gluten",
    fr: "Sans Gluten",
  },
  "plant-based": {
    en: "Plant-Based",
    es: "A Base de Plantas",
    fr: "À Base de Plantes",
  },
  "superfoods": {
    en: "Superfoods",
    es: "Superalimentos",
    fr: "Superaliments",
  },
  "oils-vinegars": {
    en: "Oils & Vinegars",
    es: "Aceites y Vinagres",
    fr: "Huiles et Vinaigres",
  },
  "grains-legumes": {
    en: "Grains & Legumes",
    es: "Granos y Legumbres",
    fr: "Céréales et Légumineuses",
  },
  "nuts-seeds": {
    en: "Nuts & Seeds",
    es: "Frutos Secos y Semillas",
    fr: "Noix et Graines",
  },
  "beverages": {
    en: "Beverages",
    es: "Bebidas",
    fr: "Boissons",
  },
  "wholefood": {
    en: "Wholefood",
    es: "Mezclas Integrales",
    fr: "Mélanges Complets",
  },
  "dairy-alternatives": {
    en: "Dairy Alternatives",
    es: "Alternativas Lácteas",
    fr: "Substituts Laitiers",
  }
}