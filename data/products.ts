export type SupportedLanguage = "en" | "es" | "fr"

export interface LocalizedString {
  en: string
  es: string
  fr: string
}

interface Product {
  id: string
  slug: string
  title: LocalizedString
  price: number
  promoPercentage?: number | null
  image: string
  category: LocalizedString
  categorySlug: string
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
      slug: "organic-raw-honey",
      categorySlug: "natural-sweeteners",
      image: "/images/products/photo-1587049352851-8d4e89133924.avif",
      price: 12.99,
      promoPercentage: null,
      category: {
        en: "Natural Sweeteners",
        es: "Endulzantes Naturales",
        fr: "Édulcorants Naturals",
      },
      dietary: ["Organic", "Gluten-Free", "Paleo", "Non-GMO"],
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
      id: "9",
      slug: "organic-stevia",
      categorySlug: "natural-sweeteners",
      image: "/images/products/photo-1610219171189-286769cc9b20.avif",
      price: 6.49,
      promoPercentage: 25,
      category: {
        en: "Natural Sweeteners",
        es: "Endulzantes Naturales",
        fr: "Édulcorants Natural",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free", "Sugar-Free", "Gluten-Free"],
      title: {
        en: "Organic Stevia Extract",
        es: "Extracto de Stevia Orgánica",
        fr: "Extrait de Stévia Biologique",
      },
      description: {
        en: "Pure organic stevia extract, a natural sugar substitute with zero calories. Perfect for drinks, baking, and cooking.",
        es: "Extracto puro de stevia orgánica, un sustituto natural del azúcar sin calorías. Perfecto para bebidas, repostería y cocina.",
        fr: "Extrait pur de stévia biologique, un substitut naturel du sucre sans calories. Parfait pour les boissons, les pâtisseries et la cuisine.",
      },
      ingredients: {
        en: "100% Organic Stevia Extract",
        es: "100% Extracto de Stevia Orgánica",
        fr: "100% Extrait de Stévia Biologique",
      },
      origin: {
        en: "Paraguay",
        es: "Paraguay",
        fr: "Paraguay",
      },
      nutritionalInfo: {
        servingSize: "1/8 tsp (0.5g)",
        calories: 0,
        totalFat: "0g",
        sodium: "0mg",
        totalCarbs: "0g",
        sugars: "0g",
        protein: "0g",
      },
    },
    {
      id: "2",
      slug: "olive-oil",
      categorySlug: "oils-vinegars",
      title: {
        en: "Cold-Pressed Olive Oil",
        es: "Aceite de Oliva Prensado en Frío",
        fr: "Huile d'Olive Pressée à Froid",
      },
      price: 18.5,
      promoPercentage: null,
      image: "/images/products/photo-1474979266404-7eaacbcd87c5.avif",
      category: {
        en: "Oils & Vinegars",
        es: "Aceites & Vinagres",
        fr: "Huiles & Vinaigres",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free", "Non-GMO", "Paleo", "Sugar-Free"],
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
      id: "11",
      slug: "organic-rice-vinegar",
      categorySlug: "oils-vinegars",
      title: {
        en: "Organic Rice Vinegar",
        es: "Vinagre de Arroz Orgánico",
        fr: "Vinaigre de Riz Biologique",
      },
      price: 6.75,
      promoPercentage: 15,
      image: "/images/products/rice-vinegar.png",
      category: {
        en: "Oils & Vinegars",
        es: "Aceites & Vinagres",
        fr: "Huiles & Vinaigres",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "Mild and tangy organic rice vinegar, naturally brewed and perfect for dressings, marinades, and sushi rice.",
        es: "Vinagre de arroz orgánico suave y ácido, naturalmente fermentado. Ideal para aderezos, marinados y arroz para sushi.",
        fr: "Vinaigre de riz biologique doux et acidulé, naturellement fermenté. Parfait pour les vinaigrettes, les marinades et le riz à sushi.",
      },
      ingredients: {
        en: "Organic rice, water",
        es: "Arroz orgánico, agua",
        fr: "Riz biologique, eau",
      },
      origin: {
        en: "Japan",
        es: "Japón",
        fr: "Japon",
      },
      nutritionalInfo: {
        servingSize: "1 tbsp (15ml)",
        calories: 5,
        totalFat: "0g",
        sodium: "0mg",
        totalCarbs: "1g",
        sugars: "0g",
        protein: "0g",
      },
    },    
    {
      id: "3",
      slug: "granola",
      categorySlug: "wholefood",
      title: {
        en: "Gluten-Free Granola",
        es: "Granola Sin Gluten",
        fr: "Granola Sans Gluten",
      },
      price: 8.99,
      promoPercentage: null,
      image: "/images/products/photo-1724441980123-aca7911329d0.avif",
      category: {
        en: "Wholefood",
        es: "Mezclas Integrales",
        fr: "Mélanges Complets",
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
      id: "12",
      slug: "integral-cereal-bars",
      categorySlug: "wholefood",
      title: {
        en: "Integral Cereal Bars",
        es: "Barras de Cereal Integral",
        fr: "Barres de Céréales Complètes",
      },
      price: 5.25,
      promoPercentage: null,
      image: "/images/products/premium_photo-1726490292042-7587d23d52de.avif",
      category: {
        en: "Wholefood",
        es: "Mezclas Integrales",
        fr: "Mélanges Complets",
      },
      dietary: ["Whole Grain", "Vegan", "Non-GMO"],
      description: {
        en: "Wholesome cereal bars made with whole grains, seeds, and natural sweeteners. Ideal for a quick and healthy breakfast on the go.",
        es: "Barras de cereal integrales hechas con granos enteros, semillas y endulzantes naturales. Ideales para un desayuno rápido y saludable.",
        fr: "Barres de céréales complètes à base de grains entiers, de graines et d’édulcorants naturels. Parfaites pour un petit déjeuner rapide et sain.",
      },
      ingredients: {
        en: "Whole grain oats, sunflower seeds, agave syrup, dried berries",
        es: "Avena integral, semillas de girasol, jarabe de agave, frutos secos",
        fr: "Flocons d’avoine complets, graines de tournesol, sirop d’agave, fruits secs",
      },
      origin: {
        en: "Canada",
        es: "Canadá",
        fr: "Canada",
      },
      nutritionalInfo: {
        servingSize: "1 bar (35g)",
        calories: 140,
        totalFat: "5g",
        sodium: "30mg",
        totalCarbs: "22g",
        sugars: "7g",
        protein: "3g",
      },
    },
    {
      id: "4",
      slug: "quinoa",
      categorySlug: "grains-legumes",
      title: {
        en: "Organic Quinoa",
        es: "Quinua Orgánica",
        fr: "Quinoa Biologique",
      },
      price: 6.75,
      promoPercentage: null,
      image: "/images/products/premium_photo-1705207702015-0c1f567a14df.avif",
      category: {
        en: "Grains & Legumes",
        es: "Granos & Legumbres",
        fr: "Céréales & Légumineuses",
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
      id: "13",
      slug: "organic-red-lentils",
      categorySlug: "grains-legumes",
      title: {
        en: "Organic Red Lentils",
        es: "Lentejas Rojas Orgánicas",
        fr: "Lentilles Rouges Biologiques",
      },
      price: 4.95,
      promoPercentage: null,
      image: "/images/products/premium_photo-1700842181817-e7f4c9fa828a.avif",
      category: {
        en: "Grains & Legumes",
        es: "Granos & Legumbres",
        fr: "Céréales & Légumineuses",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free", "Paleo", "Whole Grain"],
      description: {
        en: "Fast-cooking red lentils rich in protein and iron. Ideal for soups, stews, and curries.",
        es: "Lentejas rojas de cocción rápida ricas en proteínas y hierro. Ideales para sopas, guisos y curries.",
        fr: "Lentilles rouges à cuisson rapide riches en protéines et en fer. Idéales pour les soupes, ragoûts et currys.",
      },
      ingredients: {
        en: "100% Organic Red Lentils",
        es: "100% Lentejas Rojas Orgánicas",
        fr: "100% Lentilles Rouges Biologiques",
      },
      origin: {
        en: "India",
        es: "India",
        fr: "Inde",
      },
      nutritionalInfo: {
        servingSize: "1/4 cup dry (35g)",
        calories: 130,
        totalFat: "0.5g",
        sodium: "0mg",
        totalCarbs: "23g",
        sugars: "1g",
        protein: "9g",
      },
    },    
    {
      id: "5",
      slug: "almond-butter",
      categorySlug: "nuts-seeds",
      title: {
        en: "Almond Butter",
        es: "Mantequilla de Almendras",
        fr: "Beurre d'Amandes",
      },
      price: 9.99,
      promoPercentage: null,
      image: "/images/products/photo-1615110250484-e8c3b151b957.avif",
      category: {
        en: "Nuts & Seeds",
        es: "Frutos Secos y Semillas",
        fr: "Fruits Secs & Graines",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free", "Sugar-Free"],
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
      id: "14",
      slug: "pumpkin-seeds",
      categorySlug: "nuts-seeds",
      title: {
        en: "Organic Pumpkin Seeds",
        es: "Semillas de Calabaza Orgánicas",
        fr: "Graines de Citrouille Biologiques",
      },
      price: 5.25,
      promoPercentage: null,
      image: "/images/products/photo-1515670112266-c6d33ec59d6b.avif",
      category: {
        en: "Frutos Secos & Semillas",
        es: "Nuts & Seeds",
        fr: "Fruits Secs & Graines",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free", "Whole Grain", "Paleo"],
      description: {
        en: "Crunchy and nutrient-rich organic pumpkin seeds, great for snacking or as a salad topping.",
        es: "Semillas de calabaza orgánicas crujientes y ricas en nutrientes, ideales como snack o para ensaladas.",
        fr: "Graines de citrouille biologiques croquantes et riches en nutriments, parfaites en collation ou sur des salades.",
      },
      ingredients: {
        en: "100% Organic Pumpkin Seeds",
        es: "100% Semillas de Calabaza Orgánicas",
        fr: "100% Graines de Citrouille Biologiques",
      },
      origin: {
        en: "Mexico",
        es: "México",
        fr: "Mexique",
      },
      nutritionalInfo: {
        servingSize: "1 oz (28g)",
        calories: 160,
        totalFat: "13g",
        sodium: "0mg",
        totalCarbs: "4g",
        sugars: "0g",
        protein: "8g",
      },
    },    
    {
      id: "6",
      slug: "coconut-yogurt",
      categorySlug: "dairy-alternatives",
      title: {
        en: "Coconut Yogurt",
        es: "Yogur de Coco",
        fr: "Yaourt à la Noix de Coco",
      },
      price: 5.49,
      promoPercentage: null,
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
      id: "15",
      slug: "cashew-milk",
      categorySlug: "dairy-alternatives",
      title: {
        en: "Creamy Cashew Milk",
        es: "Leche de Castañas de Cajú Cremosa",
        fr: "Lait de Cajou Crémeux",
      },
      price: 4.99,
      promoPercentage: null,
      image: "/images/products/photo-1680901106907-3374ffaa25c6.avif",
      category: {
        en: "Dairy Alternatives",
        es: "Alternativas Lácteas",
        fr: "Substituts Laitiers",
      },
      dietary: ["Vegan", "Gluten-Free"],
      description: {
        en: "Smooth and creamy plant-based milk made from organic cashews. A perfect alternative for coffee, cereal, or baking.",
        es: "Leche vegetal suave y cremosa hecha con anacardos orgánicos. Una alternativa perfecta para café, cereales o repostería.",
        fr: "Lait végétal onctueux et crémeux à base de noix de cajou biologiques. Parfait pour le café, les céréales ou la pâtisserie.",
      },
      ingredients: {
        en: "Filtered water, organic cashews, sea salt",
        es: "Agua filtrada, anacardos orgánicos, sal marina",
        fr: "Eau filtrée, noix de cajou biologiques, sel marin",
      },
      origin: {
        en: "Vietnam",
        es: "Vietnam",
        fr: "Vietnam",
      },
      nutritionalInfo: {
        servingSize: "1 cup (240ml)",
        calories: 70,
        totalFat: "4g",
        sodium: "80mg",
        totalCarbs: "8g",
        sugars: "1g",
        protein: "3g",
      },
    },    
    {
      id: "7",
      slug: "chia-seeds",
      categorySlug: "superfoods",
      title: {
        en: "Organic Chia Seeds",
        es: "Semillas de Chía Orgánicas",
        fr: "Graines de Chia Biologiques",
      },
      price: 7.25,
      promoPercentage: null,
      image: "/images/products/photo-1604768802835-899055f0e245.avif",
      category: {
        en: "Superfoods",
        es: "Superalimentos",
        fr: "Superaliments",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free", "Whole Grain", "Paleo"],
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
      id: "16",
      slug: "spirulina-powder",
      categorySlug: "superfoods",
      title: {
        en: "Organic Spirulina Powder",
        es: "Polvo de Espirulina Orgánica",
        fr: "Poudre de Spiruline Biologique",
      },
      price: 9.5,
      promoPercentage: null,
      image: "/images/products/photo-1664956618676-9e65fe31a165.avif",
      category: {
        en: "Superfoods",
        es: "Superalimentos",
        fr: "Superaliments",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "A nutrient-dense blue-green algae rich in protein, iron, and antioxidants. Great for smoothies and detox blends.",
        es: "Un alga verde azul rica en nutrientes, proteínas, hierro y antioxidantes. Ideal para batidos y mezclas detox.",
        fr: "Une algue bleu-vert riche en protéines, fer et antioxydants. Idéale pour les smoothies et mélanges détox.",
      },
      ingredients: {
        en: "100% Organic Spirulina Powder",
        es: "100% Polvo de Espirulina Orgánica",
        fr: "100% Poudre de Spiruline Biologique",
      },
      origin: {
        en: "India",
        es: "India",
        fr: "Inde",
      },
      nutritionalInfo: {
        servingSize: "1 tsp (5g)",
        calories: 20,
        totalFat: "0.5g",
        sodium: "40mg",
        totalCarbs: "1g",
        sugars: "0g",
        protein: "4g",
      },
    },    
    {
      id: "8",
      slug: "kombucha",
      categorySlug: "beverages",
      title: {
        en: "Kombucha",
        es: "Kombucha",
        fr: "Kombucha",
      },
      price: 4.99,
      promoPercentage: null,
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
    {
      id: "17",
      slug: "matcha-green-tea",
      categorySlug: "beverages",
      title: {
        en: "Matcha Green Tea",
        es: "Té Verde Matcha",
        fr: "Thé Vert Matcha",
      },
      price: 3.75,
      promoPercentage: null,
      image: "/images/products/photo-1565117661210-fd54898de423.avif",
      category: {
        en: "Beverages",
        es: "Bebidas",
        fr: "Boissons",
      },
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description: {
        en: "Refreshing organic matcha green tea, lightly sweetened and packed with antioxidants. Perfect for a natural energy boost.",
        es: "Refrescante té verde matcha orgánico, ligeramente endulzado y lleno de antioxidantes. Perfecto para un impulso natural de energía.",
        fr: "Thé vert matcha biologique rafraîchissant, légèrement sucré et riche en antioxydants. Parfait pour un regain d’énergie naturel.",
      },
      ingredients: {
        en: "Filtered water, organic matcha powder, organic cane sugar",
        es: "Agua filtrada, polvo de matcha orgánico, azúcar de caña orgánica",
        fr: "Eau filtrée, poudre de matcha biologique, sucre de canne biologique",
      },
      origin: {
        en: "Japan",
        es: "Japón",
        fr: "Japon",
      },
      nutritionalInfo: {
        servingSize: "1 bottle (330ml)",
        calories: 45,
        totalFat: "0g",
        sodium: "0mg",
        totalCarbs: "10g",
        sugars: "8g",
        protein: "1g",
      },
    }
    
  ]

export function getProductById(id: string) {
return allProducts.find((p) => p.id === id) || null
}

export function getProductBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug) || null
}

export function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string
) {
  return allProducts
    .filter((p) => 
      p.categorySlug === categorySlug &&
      p.slug !== excludeSlug
    )
    .slice(0, 4)
}
