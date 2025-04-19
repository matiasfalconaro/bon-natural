export type LocalizedString = {
  en: string
  es: string
  fr: string
}

export type Category = {
  slug: string
  name: { en: string; es: string; fr: string }
  image: string
  description?: { en: string; es: string; fr: string }
}

export const categories: Category[] = [
  {
    slug: "natural-sweeteners",
    name: {
      en: "Sweeteners",
      es: "Endulzantes",
      fr: "Édulcorants"
    },
    image: "/images/products/photo-1587049352851-8d4e89133924.avif",
    description: {
      en: "Healthier alternatives to refined sugar, from honey to maple syrup and beyond.",
      es: "Alternativas más saludables al azúcar refinada, desde miel hasta jarabe de arce y más.",
      fr: "Des alternatives plus saines au sucre raffiné, du miel au sirop d'érable et plus encore."
    }
  },
  {
    slug: "oils-vinegars",
    name: {
      en: "Oils",
      es: "Aceites",
      fr: "Huiles"
    },
    image: "/images/products/photo-1474979266404-7eaacbcd87c5.avif",
    description: {
      en: "Premium cold-pressed oils and aged vinegars for cooking and dressing.",
      es: "Aceites prensados en frío y vinagres añejos de primera calidad para cocinar y aderezar.",
      fr: "Huiles de première qualité pressées à froid et vinaigres vieillis pour cuisiner et assaisonner."
    }
  },
  {
    slug: "breakfast",
    name: {
      en: "Breakfast",
      es: "Desayuno",
      fr: "Petit Déjeuner"
    },
    image: "/images/products/photo-1724441980123-aca7911329d0.avif",
    description: {
      en: "Start your day right with delicious and nutritious breakfast options.",
      es: "Comienza tu día con opciones de desayuno deliciosas y nutritivas.",
      fr: "Commencez votre journée avec des options de petit déjeuner délicieuses et nutritives."
    }
  },
  {
    slug: "grains-legumes",
    name: {
      en: "Grains",
      es: "Granos",
      fr: "Céréales"
    },
    image: "/images/products/premium_photo-1705207702015-0c1f567a14df.avif",
    description: {
      en: "Wholesome grains and protein-rich legumes for nutritious meals.",
      es: "Granos integrales y legumbres ricas en proteínas para comidas nutritivas.",
      fr: "Céréales complètes et légumineuses riches en protéines pour des repas nutritifs."
    }
  },
  {
    slug: "nuts-seeds",
    name: {
      en: "Spreads",
      es: "Untables",
      fr: "Tartinades"
    },
    image: "/images/products/photo-1615110250484-e8c3b151b957.avif",
    description: {
      en: "Nut butters and more for spreading, dipping, and delighting.",
      es: "Mantequillas de frutos secos y más para untar, mojar y disfrutar.",
      fr: "Beurres de noix et plus encore pour tartiner, tremper et savourer."
    }
  },
  {
    slug: "dairy-alternatives",
    name: {
      en: "Dairy Alternatives",
      es: "Alternativas Lácteas",
      fr: "Substituts Laitiers"
    },
    image: "/images/products/photo-1588413335367-e49d32c5b50b.avif",
    description: {
      en: "Plant-based milks, yogurts, and more for a dairy-free lifestyle.",
      es: "Leches vegetales, yogures y más para un estilo de vida sin lácteos.",
      fr: "Laits végétaux, yaourts et plus encore pour un mode de vie sans produits laitiers."
    }
  },
  {
    slug: "superfoods",
    name: {
      en: "Superfoods",
      es: "Superalimentos",
      fr: "Superaliments"
    },
    image: "/images/products/photo-1604768802835-899055f0e245.avif",
    description: {
      en: "Nutrient-rich ingredients to elevate your health and meals.",
      es: "Ingredientes ricos en nutrientes para mejorar tu salud y comidas.",
      fr: "Ingrédients riches en nutriments pour améliorer votre santé et vos repas."
    }
  },
  {
    slug: "beverages",
    name: {
      en: "Beverages",
      es: "Bebidas",
      fr: "Boissons"
    },
    image: "/images/products/photo-1573812914274-226dc19fbe17.avif",
    description: {
      en: "Organic drinks, kombucha, juices, and refreshing sips.",
      es: "Bebidas orgánicas, kombucha, jugos y sorbos refrescantes.",
      fr: "Boissons bio, kombucha, jus et gorgées rafraîchissantes."
    }
  }
]
