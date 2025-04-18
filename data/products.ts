// /data/products.ts

export const allProducts = [
    {
      id: "1",
      title: "Organic Raw Honey",
      price: 12.99,
      image: "/images/products/photo-1587049352851-8d4e89133924.avif",
      category: "Sweeteners",
      dietary: ["Organic", "Gluten-Free"],
      description:
        "Our raw honey is sourced from local beekeepers who practice sustainable beekeeping. This unfiltered, unpasteurized honey retains all of its natural enzymes, vitamins, and minerals.",
      ingredients: "100% Raw, Unfiltered Honey",
      origin: "Locally sourced from sustainable apiaries",
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
      title: "Cold-Pressed Olive Oil",
      price: 18.5,
      image: "/images/products/photo-1474979266404-7eaacbcd87c5.avif",
      category: "Oils",
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description:
        "Extra virgin olive oil made from handpicked olives, cold-pressed for superior flavor and nutrients. Ideal for cooking or dressings.",
      ingredients: "100% Extra Virgin Olive Oil",
      origin: "Greece",
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
      title: "Gluten-Free Granola",
      price: 8.99,
      image: "/images/products/photo-1724441980123-aca7911329d0.avif",
      category: "Breakfast",
      dietary: ["Gluten-Free", "Vegan"],
      description:
        "Crunchy gluten-free granola made with rolled oats, nuts, and dried fruit. Perfect for breakfast or snacking.",
      ingredients: "Rolled oats, almonds, raisins, maple syrup",
      origin: "USA",
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
      title: "Organic Quinoa",
      price: 6.75,
      image: "/images/products/premium_photo-1705207702015-0c1f567a14df.avif",
      category: "Grains",
      dietary: ["Organic", "Gluten-Free", "Vegan"],
      description:
        "Nutritious and versatile organic quinoa, rich in protein and fiber. Great as a side dish or salad base.",
      ingredients: "100% Organic Quinoa",
      origin: "Peru",
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
      title: "Almond Butter",
      price: 9.99,
      image: "/images/products/photo-1615110250484-e8c3b151b957.avif",
      category: "Spreads",
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description:
        "Creamy almond butter made from roasted organic almonds. No additives or preservatives.",
      ingredients: "100% Roasted Organic Almonds",
      origin: "California, USA",
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
      title: "Coconut Yogurt",
      price: 5.49,
      image: "/images/products/photo-1588413335367-e49d32c5b50b.avif",
      category: "Dairy Alternatives",
      dietary: ["Vegan", "Gluten-Free"],
      description:
        "Creamy dairy-free coconut yogurt with live cultures for gut health. A delicious and nutritious alternative to dairy.",
      ingredients: "Coconut milk, probiotic cultures",
      origin: "Thailand",
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
      title: "Organic Chia Seeds",
      price: 7.25,
      image: "/images/products/photo-1604768802835-899055f0e245.avif",
      category: "Superfoods",
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description:
        "Packed with omega-3s, protein, and fiber. Perfect for smoothies, puddings, or baking.",
      ingredients: "100% Organic Chia Seeds",
      origin: "Bolivia",
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
      title: "Kombucha",
      price: 4.99,
      image: "/images/products/photo-1573812914274-226dc19fbe17.avif",
      category: "Beverages",
      dietary: ["Organic", "Vegan", "Gluten-Free"],
      description:
        "Fermented tea drink with live probiotics to support digestion and energy.",
      ingredients: "Tea, sugar, SCOBY, natural flavor",
      origin: "USA",
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

export function getRelatedProducts(category: string, excludeId: string) {
return allProducts
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, 4)
}