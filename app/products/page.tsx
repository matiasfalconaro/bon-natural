"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/molecules/product-card/product-card"
import ProductFilter from "@/components/molecules/product-filter/product-filter"
import SearchBar from "@/components/molecules/search-bar/search-bar"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"

// Mock products data - in a real app, this would come from your API
const allProducts = [
  {
    id: "1",
    title: "Organic Raw Honey",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Sweeteners",
    dietary: ["Organic", "Gluten-Free"],
  },
  {
    id: "2",
    title: "Cold-Pressed Olive Oil",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Oils",
    dietary: ["Organic", "Vegan", "Gluten-Free"],
  },
  {
    id: "3",
    title: "Gluten-Free Granola",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Breakfast",
    dietary: ["Gluten-Free", "Vegan"],
  },
  {
    id: "4",
    title: "Organic Quinoa",
    price: 6.75,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Grains",
    dietary: ["Organic", "Gluten-Free", "Vegan"],
  },
  {
    id: "5",
    title: "Almond Butter",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1612540943771-0f492a7b73d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Spreads",
    dietary: ["Organic", "Vegan", "Gluten-Free"],
  },
  {
    id: "6",
    title: "Coconut Yogurt",
    price: 5.49,
    image:
      "https://images.unsplash.com/photo-1615405986729-1b74fd67e6a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dairy Alternatives",
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
]

export default function ProductsPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const searchTerm = searchParams.get("search") || ""
  const initialized = useRef(false)

  // Initial filtering based on URL search parameter
  useEffect(() => {
    // Skip if already initialized and searchTerm hasn't changed
    if (initialized.current && !searchTerm) return

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const filtered = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.dietary.some((diet: string) => diet.toLowerCase().includes(searchLower)),
      )
      setFilteredProducts(filtered)
    } else if (!initialized.current) {
      setFilteredProducts(allProducts)
    }

    initialized.current = true
  }, [searchTerm])

  // Filter handler that doesn't depend on component state
  const handleFilter = (filters: {
    categories: string[]
    priceRange: [number, number]
    dietary: string[]
    searchTerm: string
  }) => {
    let filtered = [...allProducts]

    // Use search term from filter or from URL
    const currentSearchTerm = filters.searchTerm || searchTerm

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.category))
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Filter by dietary preferences
    if (filters.dietary.length > 0) {
      filtered = filtered.filter((product) => filters.dietary.some((pref) => product.dietary.includes(pref)))
    }

    // Filter by search term
    if (currentSearchTerm) {
      const searchLower = currentSearchTerm.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.dietary.some((diet: string) => diet.toLowerCase().includes(searchLower)),
      )
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <SearchBar />
      </div>

      <h1 className={styles.title}>
        {searchTerm ? `${t("products.searchResults")}: "${searchTerm}"` : t("products.allProducts")}
      </h1>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductFilter onFilter={handleFilter} initialSearchTerm={searchTerm} />
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
