"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"
import { allProducts } from "@/data/products"
import { CATEGORY_MAP } from "@/data/category-map"

// Localized string extractor
const getLocalized = (
  localized: { en: string; es: string; fr: string },
  lang: string
): string => {
  return localized[lang as keyof typeof localized] || ""
}

type SupportedLanguage = "en" | "es" | "fr"

interface LocalizedString {
  en: string
  es: string
  fr: string
}

interface Product {
  id: string
  slug: string
  title: LocalizedString
  price: number
  image: string
  category: LocalizedString
  dietary: string[]
}

export default function CategoryPageClient({ slug }: { slug: string }) {
  const { language, t } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState<string>("")

  useEffect(() => {
    const resolvedName = CATEGORY_MAP[slug] || {
      en: slug.replace(/-/g, " "),
      es: slug.replace(/-/g, " "),
      fr: slug.replace(/-/g, " "),
    }

    setCategoryName(getLocalized(resolvedName, language))

    const categoryProducts =
      slug === "all"
        ? allProducts
        : allProducts.filter((product) => product.slug === slug)

    setProducts(categoryProducts)
    setFilteredProducts(categoryProducts)
  }, [slug, language])

  const handleFilter = useCallback(
    (filters: {
      categories: string[]
      priceRange: [number, number]
      dietary: string[]
      searchTerm: string
    }) => {
      let filtered = [...products]

      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      )

      if (filters.dietary.length > 0) {
        filtered = filtered.filter((product) =>
          filters.dietary.some((pref) => product.dietary.includes(pref))
        )
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        filtered = filtered.filter(
          (product) =>
            getLocalized(product.title, language).toLowerCase().includes(searchLower) ||
            getLocalized(product.category, language).toLowerCase().includes(searchLower)
        )
      }

      setFilteredProducts(filtered)
    },
    [products, language]
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
