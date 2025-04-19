export type SupportedLanguage = "en" | "es" | "fr"

export interface LocalizedString {
  en: string
  es: string
  fr: string
}

export interface Product {
  id: string
  slug: string
  title: LocalizedString
  price: number
  image: string
  category: LocalizedString
  dietary: string[]
  description: LocalizedString
  ingredients: LocalizedString
  origin: LocalizedString
  nutritionalInfo: {
    servingSize: string
    calories: number
    totalFat: string
    sodium: string
    totalCarbs: string
    sugars: string
    protein: string
  }
}

export const allProducts: Product[] = [
    {
      id: "1",
      slug: "natural-sweeteners",
      image: "/images/products/photo-1587049352851-8d4e89133924.avif",
      price: 12.99,
      category: {
        en: "Sweeteners",
        es: "Endulzantes",
        fr: "Édulcorants",
      },
      dietary: ["Organic", "Gluten-Free"],
      title: {
        en: "Organic Raw Honey",
        es: "Miel Cruda Orgánica",
        fr: "Miel Crue Biologique",
      },
      description: {
        en: "Our raw honey is sourced from local beekeepers...",
        es: "Nuestra miel cruda proviene de apicultores locales...",
        fr: "Notre miel cru provient d'apiculteurs locaux...",
      },
      ingredients: {
        en: "100% Raw, Unfiltered Honey",
        es: "100% Miel cruda sin filtrar",
        fr: "100% Miel crue non filtrée",
      },
      origin: {
        en: "Locally sourced from sustainable apiaries",
        es: "Origen local de colmenas sostenibles",
        fr: "D'origine locale, apicultures durables",
      },
      nutritionalInfo: {
        servingSize: "1 tbsp (21g)",
        calories: 64,
        totalFat: "0g",
        sodium: "0mg",
        totalCarbs: "17g",
        sugars: "17g",
        protein: "0g",
      },
    },
    {
      id: "2",
      slug: "oils-vinegars",
      title: {
        en: "Cold-Pressed Olive Oil",
        es: "Aceite de Oliva Prensado en Frío",
        fr: "Huile d'Olive Pressée à Froid",
      },
      price: 18.5,
      image: "/images/products/photo-1474979266404-7eaacbcd87c5.avif",
      category: {
        en: "Oils",
        es: "Aceites",
        fr: "Huiles",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "Extra virgin olive oil made from handpicked olives, cold-pressed for superior flavor and nutrients. Ideal for cooking or dressings.",
        es: "Aceite de oliva virgen extra elaborado con aceitunas recolectadas a mano y prensado en frío para un sabor y nutrientes superiores. Ideal para cocinar o aderezar.",
        fr: "Huile d'olive extra vierge fabriquée à partir d'olives cueillies à la main et pressées à froid pour une saveur et des nutriments supérieurs. Idéale pour la cuisine ou les vinaigrettes.",
      },
      ingredients: {
        en: "100% Extra Virgin Olive Oil",
        es: "100% Aceite de Oliva Virgen Extra",
        fr: "100% Huile d'Olive Extra Vierge",
      },
      origin: {
        en: "Greece",
        es: "Grecia",
        fr: "Grèce",
      },
      nutritionalInfo: {
        servingSize: "1 tbsp (15ml)",
        calories: 120,
        totalFat: "14g",
        sodium: "0mg",
        totalCarbs: "0g",
        sugars: "0g",
        protein: "0g",
      },
    },
    {
      id: "3",
      slug: "breakfast",
      title: {
        en: "Gluten-Free Granola",
        es: "Granola Sin Gluten",
        fr: "Granola Sans Gluten",
      },
      price: 8.99,
      image: "/images/products/photo-1724441980123-aca7911329d0.avif",
      category: {
        en: "Breakfast",
        es: "Desayuno",
        fr: "Petit Déjeuner",
      },
      dietary: ["Gluten-Free", "Vegan"],
      description: {
        en: "Crunchy gluten-free granola made with rolled oats, nuts, and dried fruit. Perfect for breakfast or snacking.",
        es: "Crujiente granola sin gluten elaborada con avena, nueces y frutas secas. Perfecta para el desayuno o como snack.",
        fr: "Granola croustillant sans gluten à base de flocons d’avoine, de noix et de fruits secs. Idéal pour le petit-déjeuner ou en collation.",
      },
      ingredients: {
        en: "Rolled oats, almonds, raisins, maple syrup",
        es: "Avena enrollada, almendras, pasas, jarabe de arce",
        fr: "Flocons d’avoine, amandes, raisins secs, sirop d’érable",
      },
      origin: {
        en: "USA",
        es: "EE.UU.",
        fr: "États-Unis",
      },
      nutritionalInfo: {
        servingSize: "1/2 cup (50g)",
        calories: 210,
        totalFat: "8g",
        sodium: "50mg",
        totalCarbs: "32g",
        sugars: "10g",
        protein: "5g",
      },
    },
    {
      id: "4",
      slug: "grains-legumes",
      title: {
        en: "Organic Quinoa",
        es: "Quinua Orgánica",
        fr: "Quinoa Biologique",
      },
      price: 6.75,
      image: "/images/products/premium_photo-1705207702015-0c1f567a14df.avif",
      category: {
        en: "Grains",
        es: "Granos",
        fr: "Céréales",
      },
      dietary: ["Organic", "Gluten-Free", "Vegan"],
      description: {
        en: "Nutritious and versatile organic quinoa, rich in protein and fiber. Great as a side dish or salad base.",
        es: "Quinua orgánica nutritiva y versátil, rica en proteínas y fibra. Ideal como guarnición o base para ensaladas.",
        fr: "Quinoa biologique nutritive et polyvalente, riche en protéines et en fibres. Parfait en accompagnement ou comme base de salade.",
      },
      ingredients: {
        en: "100% Organic Quinoa",
        es: "100% Quinua Orgánica",
        fr: "100% Quinoa Biologique",
      },
      origin: {
        en: "Peru",
        es: "Perú",
        fr: "Pérou",
      },
      nutritionalInfo: {
        servingSize: "1/4 cup dry (43g)",
        calories: 160,
        totalFat: "2.5g",
        sodium: "0mg",
        totalCarbs: "29g",
        sugars: "0g",
        protein: "6g",
      },
    },
    {
      id: "5",
      slug: "nuts-seeds",
      title: {
        en: "Almond Butter",
        es: "Mantequilla de Almendras",
        fr: "Beurre d'Amandes",
      },
      price: 9.99,
      image: "/images/products/photo-1615110250484-e8c3b151b957.avif",
      category: {
        en: "Spreads",
        es: "Untables",
        fr: "Tartinades",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "Creamy almond butter made from roasted organic almonds. No additives or preservatives.",
        es: "Mantequilla cremosa de almendras elaborada con almendras orgánicas tostadas. Sin aditivos ni conservantes.",
        fr: "Beurre d'amandes crémeux fait à partir d'amandes biologiques grillées. Sans additifs ni conservateurs.",
      },
      ingredients: {
        en: "100% Roasted Organic Almonds",
        es: "100% Almendras Orgánicas Tostadas",
        fr: "100% Amandes Biologiques Grillées",
      },
      origin: {
        en: "California, USA",
        es: "California, EE. UU.",
        fr: "Californie, États-Unis",
      },
      nutritionalInfo: {
        servingSize: "2 tbsp (32g)",
        calories: 190,
        totalFat: "17g",
        sodium: "0mg",
        totalCarbs: "6g",
        sugars: "1g",
        protein: "7g",
      },
    },
    {
      id: "6",
      slug: "dairy alternatives",
      title: {
        en: "Coconut Yogurt",
        es: "Yogur de Coco",
        fr: "Yaourt à la Noix de Coco",
      },
      price: 5.49,
      image: "/images/products/photo-1588413335367-e49d32c5b50b.avif",
      category: {
        en: "Dairy Alternatives",
        es: "Alternativas Lácteas",
        fr: "Substituts Laitiers",
      },
      dietary: ["Vegan", "Gluten-Free"],
      description: {
        en: "Creamy dairy-free coconut yogurt with live cultures for gut health. A delicious and nutritious alternative to dairy.",
        es: "Yogur de coco cremoso sin lácteos con cultivos vivos para la salud intestinal. Una alternativa deliciosa y nutritiva a los productos lácteos.",
        fr: "Yaourt à la noix de coco crémeux sans produits laitiers, avec des cultures vivantes pour la santé intestinale. Une alternative délicieuse et nutritive aux produits laitiers.",
      },
      ingredients: {
        en: "Coconut milk, probiotic cultures",
        es: "Leche de coco, cultivos probióticos",
        fr: "Lait de coco, cultures probiotiques",
      },
      origin: {
        en: "Thailand",
        es: "Tailandia",
        fr: "Thaïlande",
      },
      nutritionalInfo: {
        servingSize: "1 cup (170g)",
        calories: 150,
        totalFat: "9g",
        sodium: "35mg",
        totalCarbs: "15g",
        sugars: "10g",
        protein: "2g",
      },
    },
    {
      id: "7",
      slug: "superfoods",
      title: {
        en: "Organic Chia Seeds",
        es: "Semillas de Chía Orgánicas",
        fr: "Graines de Chia Biologiques",
      },
      price: 7.25,
      image: "/images/products/photo-1604768802835-899055f0e245.avif",
      category: {
        en: "Superfoods",
        es: "Superalimentos",
        fr: "Superaliments",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "Packed with omega-3s, protein, and fiber. Perfect for smoothies, puddings, or baking.",
        es: "Ricas en omega-3, proteínas y fibra. Perfectas para batidos, puddings o repostería.",
        fr: "Riches en oméga-3, protéines et fibres. Parfaites pour les smoothies, puddings ou la pâtisserie.",
      },
      ingredients: {
        en: "100% Organic Chia Seeds",
        es: "100% Semillas de Chía Orgánicas",
        fr: "100% Graines de Chia Biologiques",
      },
      origin: {
        en: "Bolivia",
        es: "Bolivia",
        fr: "Bolivie",
      },
      nutritionalInfo: {
        servingSize: "2 tbsp (28g)",
        calories: 140,
        totalFat: "9g",
        sodium: "0mg",
        totalCarbs: "12g",
        sugars: "0g",
        protein: "5g",
      },
    },
    {
      id: "8",
      slug: "beverages",
      title: {
        en: "Kombucha",
        es: "Kombucha",
        fr: "Kombucha",
      },
      price: 4.99,
      image: "/images/products/photo-1573812914274-226dc19fbe17.avif",
      category: {
        en: "Beverages",
        es: "Bebidas",
        fr: "Boissons",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "Fermented tea drink with live probiotics to support digestion and energy.",
        es: "Bebida de té fermentado con probióticos vivos que apoyan la digestión y brindan energía.",
        fr: "Boisson de thé fermenté avec des probiotiques vivants pour soutenir la digestion et l'énergie.",
      },
      ingredients: {
        en: "Tea, sugar, SCOBY, natural flavor",
        es: "Té, azúcar, SCOBY, sabor natural",
        fr: "Thé, sucre, SCOBY, arôme naturel",
      },
      origin: {
        en: "USA",
        es: "Estados Unidos",
        fr: "États-Unis",
      },
      nutritionalInfo: {
        servingSize: "1 bottle (355ml)",
        calories: 30,
        totalFat: "0g",
        sodium: "10mg",
        totalCarbs: "7g",
        sugars: "6g",
        protein: "0g",
      },
    },
  ]

export function getProductById(id: string) {
return allProducts.find((p) => p.id === id) || null
}

export function getRelatedProducts(
  categoryValue: string,
  excludeId: string,
  language: "en" | "es" | "fr"
) {
  return allProducts
    .filter((p) => p.category[language] === categoryValue && p.id !== excludeId)
    .slice(0, 4)
}