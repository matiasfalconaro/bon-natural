export type PromoType = "combo" | "bulk" | "gift"

export interface LocalizedString {
  en: string
  es: string
  fr: string
}

export interface PromoCombo {
  id: string
  slug: string
  title: LocalizedString
  description: LocalizedString
  image1: string
  image2?: string
  price: number
  quantity?: number
  promoType: PromoType
  category: string
  dietary: string[]
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
}

export const promoCombos: PromoCombo[] = [
  {
    id: "combo-1",
    slug: "granola-honey-combo",
    title: {
      en: "Granola + Coconut yogurt",
      es: "Combo Granola + yogurt de coco",
      fr: "Combo Granola + Yaourt de Coco",
    },
    description: {
      en: "Perfect breakfast duo at a special price.",
      es: "Dúo perfecto para el desayuno a precio especial.",
      fr: "Duo parfait pour le petit déjeuner à prix spécial.",
    },
    image1: "/images/promos/photo-1614961233913-a5113a4a34ed.avif",
    price: 14.99,
    promoType: "combo",
    category: "dairy-alternatives",
    dietary: ["Gluten-Free", "Organic"],
    ingredients: {
      en: "Granola (oats, honey), Coconut yogurt",
      es: "Granola (avena, miel), Yogur de coco",
      fr: "Granola (avoine, miel), Yaourt de coco",
    },
    origin: {
      en: "USA",
      es: "EE.UU.",
      fr: "États-Unis",
    },
    nutritionalInfo: {
      servingSize: "200g",
      calories: 250,
      totalFat: "8g",
      sodium: "80mg",
      totalCarbs: "36g",
      sugars: "12g",
      protein: "6g",
    }
  },
  {
    id: "combo-2",
    slug: "chia-pack",
    title: {
      en: "3x Chia Pack",
      es: "Pack 3x Chía",
      fr: "Pack 3x Chia",
    },
    description: {
      en: "Save more when buying 3 organic chia seed packs.",
      es: "Compra 3 paquetes de semillas de chía orgánicas.",
      fr: "Achetant 3 paquets de graines de chia bio.",
    },
    image1: "/images/products/photo-1604768802835-899055f0e245.avif",
    price: 14.50,
    quantity: 3,
    promoType: "bulk",
    category: "superfoods",
    dietary: ["Vegan", "Organic", "Non-GMO"],
    ingredients: {
      en: "100% Organic Chia Seeds",
      es: "100% Semillas de Chía Orgánicas",
      fr: "100% Graines de Chia Bio",
    },
    origin: {
      en: "Mexico",
      es: "México",
      fr: "Mexique",
    },
    nutritionalInfo: {
      servingSize: "28g",
      calories: 138,
      totalFat: "9g",
      sodium: "0mg",
      totalCarbs: "12g",
      sugars: "0g",
      protein: "5g",
    }
  },
  {
    id: "combo-4",
    slug: "olive-oil-vinegar",
    title: {
      en: "Olive Oil + Rice Vinegar",
      es: "Aceite Oliva + Vinagre Arroz",
      fr: "Huile d'Olive + Vinaigre de Riz",
    },
    description: {
      en: "Gourmet pair for your salads and dishes.",
      es: "Pareja gourmet para tus ensaladas y platillos.",
      fr: "Duo gourmet pour vos salades et plats.",
    },
    image1: "/images/promos/photo-1642189941430-7073f85d7140.avif",
    price: 18.50,
    promoType: "combo",
    category: "oils-vinegars",
    dietary: ["Vegan", "Gluten-Free"],
    ingredients: {
      en: "Extra virgin olive oil, rice vinegar",
      es: "Aceite de oliva virgen extra, vinagre de arroz",
      fr: "Huile d'olive extra vierge, vinaigre de riz",
    },
    origin: {
      en: "Spain & Japan",
      es: "España y Japón",
      fr: "Espagne et Japon",
    },
    nutritionalInfo: {
      servingSize: "15ml",
      calories: 120,
      totalFat: "14g",
      sodium: "0mg",
      totalCarbs: "0g",
      sugars: "0g",
      protein: "0g",
    }
  },
  {
    id: "combo-3",
    slug: "10-cereal-bars",
    title: {
      en: "10x Cereal Bars",
      es: "Pack 10x Barras de Cereal",
      fr: "Pack 10x Barres de Céréales",
    },
    description: {
      en: "Buy 10 natural cereal bars at a bundle price.",
      es: "Compra 10 barras de cereal natural a precio promocional.",
      fr: "Achetez 10 barres de céréales naturelles à prix réduit.",
    },
    image1: "/images/products/premium_photo-1726490292042-7587d23d52de.avif",
    price: 30.00,
    quantity: 10,
    promoType: "bulk",
    category: "wholefood",
    dietary: ["Whole Grain", "Non-GMO"],
    ingredients: {
      en: "Oats, honey, dried fruits, nuts",
      es: "Avena, miel, frutas secas, nueces",
      fr: "Avoine, miel, fruits secs, noix",
    },
    origin: {
      en: "Canada",
      es: "Canadá",
      fr: "Canada",
    },
    nutritionalInfo: {
      servingSize: "35g",
      calories: 150,
      totalFat: "5g",
      sodium: "50mg",
      totalCarbs: "24g",
      sugars: "10g",
      protein: "3g",
    }
  }
]

export function getBundleBySlug(slug: string): PromoCombo | null {
  return promoCombos.find((bundle) => bundle.slug === slug) || null
}
