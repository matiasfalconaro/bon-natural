"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"

type Product = {
  id: string
  title: string
  price: number
  image: string
  category: string
  dietary: string[]
}

export default function CategoryPageClient({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    const allProducts: Product[] = [
      {
        id: "1",
        title: "Organic Raw Honey",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Natural Sweeteners",
        dietary: ["Organic", "Gluten-Free"],
      },
      {
        id: "2",
        title: "Cold-Pressed Olive Oil",
        price: 18.5,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Oils & Vinegars",
        dietary: ["Organic", "Vegan", "Gluten-Free"],
      },
      {
        id: "3",
        title: "Gluten-Free Granola",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Gluten-Free",
        dietary: ["Gluten-Free", "Vegan"],
      },
      {
        id: "4",
        title: "Organic Quinoa",
        price: 6.75,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Grains & Legumes",
        dietary: ["Organic", "Gluten-Free", "Vegan"],
      },
      {
        id: "5",
        title: "Almond Butter",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1612540943771-0f492a7b73d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Nuts & Seeds",
        dietary: ["Organic", "Vegan", "Gluten-Free"],
      },
      {
        id: "6",
        title: "Coconut Yogurt",
        price: 5.49,
        image: "https://images.unsplash.com/photo-1615405986729-1b74fd67e6a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Plant-Based",
        dietary: ["Vegan", "Gluten-Free"],
      },
      {
        id: "7",
        title: "Organic Chia Seeds",
        price: 7.25,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Superfoods",
        dietary: ["Organic", "Vegan", "Gluten-Free"],
      },
      {
        id: "8",
        title: "Kombucha",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Beverages",
        dietary: ["Organic", "Vegan", "Gluten-Free"],
      },
      {
        id: "9",
        title: "Fresh Organic Kale",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Organic Produce",
        dietary: ["Organic", "Vegan", "Gluten-Free"],
      },
      {
        id: "10",
        title: "Maple Syrup",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Natural Sweeteners",
        dietary: ["Organic", "Vegan", "Gluten-Free"],
      },
    ]

    const categoryMap: { [key: string]: string } = {
      "organic-produce": "Organic Produce",
      superfoods: "Superfoods",
      "gluten-free": "Gluten-Free",
      "plant-based": "Plant-Based",
      "oils-vinegars": "Oils & Vinegars",
      "grains-legumes": "Grains & Legumes",
      "nuts-seeds": "Nuts & Seeds",
      "natural-sweeteners": "Natural Sweeteners",
    }

    const resolvedName = categoryMap[slug] || slug.replace(/-/g, " ")
    setCategoryName(resolvedName)

    const categoryProducts =
      slug === "all"
        ? allProducts
        : allProducts.filter((product) => product.category.toLowerCase() === resolvedName.toLowerCase())

    setProducts(categoryProducts)
    setFilteredProducts(categoryProducts)
  }, [slug])

  const handleFilter = useCallback(
    (filters: {
      categories: string[]
      priceRange: [number, number]
      dietary: string[]
      searchTerm: string
    }) => {
      let filtered = [...products]

      filtered = filtered.filter(
        (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
      )

      if (filters.dietary.length > 0) {
        filtered = filtered.filter((product) =>
          filters.dietary.some((pref) => product.dietary.includes(pref)),
        )
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower),
        )
      }

      setFilteredProducts(filtered)
    },
    [products],
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/categories" className={styles.backLink}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("categories.allCategories")}
        </Link>
        <h1 className={styles.title}>{categoryName}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductFilter onFilter={handleFilter} />
        </div>
        <div className={styles.products}>
          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("products.noResults")}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
