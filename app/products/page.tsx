"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"
import SearchBar from "@/components/search-bar"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"
import { Product } from "@/types/products"

type SupportedLanguage = "en" | "es" | "fr"

async function fetchAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Failed to fetch products", error)
    return []
  }
}

export default function ProductsPage() {
  const { language, t } = useLanguage()
  const lang = language as SupportedLanguage

  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("search") || ""

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchAllProducts()
      setAllProducts(products)

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const filtered = products.filter((product) =>
          product.title[lang].toLowerCase().includes(searchLower) ||
          product.category[lang].toLowerCase().includes(searchLower) ||
          product.dietary.some((diet: string) => diet.toLowerCase().includes(searchLower))
        )
        setFilteredProducts(filtered)
      } else {
        setFilteredProducts(products)
      }
      initialized.current = true
    }

    if (!initialized.current) {
      loadProducts()
    }
  }, [searchTerm, lang])

  const handleFilter = (filters: {
    categories: string[]
    priceRange: [number, number]
    dietary: string[]
    searchTerm: string
  }) => {
    let filtered = [...allProducts]
    const currentSearchTerm = filters.searchTerm || searchTerm

    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.categorySlug)
      )
    }

    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    if (filters.dietary.length > 0) {
      filtered = filtered.filter((product) =>
        filters.dietary.some((pref) => product.dietary.includes(pref))
      )
    }

    if (currentSearchTerm) {
      const searchLower = currentSearchTerm.toLowerCase()
      filtered = filtered.filter((product) =>
        product.title[lang].toLowerCase().includes(searchLower) ||
        product.category[lang].toLowerCase().includes(searchLower) ||
        product.dietary.some((diet: string) => diet.toLowerCase().includes(searchLower))
      )
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <SearchBar />
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductFilter onFilter={handleFilter} initialSearchTerm={searchTerm} />
        </div>
        <div className={styles.products}>
          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("product.noResults")}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
