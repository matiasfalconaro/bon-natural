// /data/categories.ts
export type Category = {
  slug: string
  name: string
  image: string
  description?: string
}

export const categories: Category[] = [
  {
    slug: "sweeteners",
    name: "Sweeteners",
    image: "/images/products/photo-1587049352851-8d4e89133924.avif",
    description: "Healthier alternatives to refined sugar, from honey to maple syrup and beyond.",
  },
  {
    slug: "oils",
    name: "Oils",
    image: "/images/products/photo-1474979266404-7eaacbcd87c5.avif",
    description: "Premium cold-pressed oils and aged vinegars for cooking and dressing.",
  },
  {
    slug: "breakfast",
    name: "Breakfast",
    image: "/images/products/photo-1724441980123-aca7911329d0.avif",
    description: "Start your day right with delicious and nutritious breakfast options.",
  },
  {
    slug: "grains",
    name: "Grains",
    image: "/images/products/premium_photo-1705207702015-0c1f567a14df.avif",
    description: "Wholesome grains and protein-rich legumes for nutritious meals.",
  },
  {
    slug: "spreads",
    name: "Spreads",
    image: "/images/products/photo-1615110250484-e8c3b151b957.avif",
    description: "Nut butters and more for spreading, dipping, and delighting.",
  },
  {
    slug: "dairy-alternatives",
    name: "Dairy Alternatives",
    image: "/images/products/photo-1588413335367-e49d32c5b50b.avif",
    description: "Plant-based milks, yogurts, and more for a dairy-free lifestyle.",
  },
  {
    slug: "superfoods",
    name: "Superfoods",
    image: "/images/products/photo-1604768802835-899055f0e245.avif",
    description: "Nutrient-rich ingredients to elevate your health and meals.",
  },
  {
    slug: "beverages",
    name: "Beverages",
    image: "/images/products/photo-1573812914274-226dc19fbe17.avif",
    description: "Organic drinks, kombucha, juices, and refreshing sips.",
  },
]
