"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"
import SearchBar from "@/components/search-bar"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"
import { allProducts } from "@/data/products"
import { categories as rawCategories } from "@/data/categories"

type SupportedLanguage = "en" | "es" | "fr"

interface LocalizedString {
  en: string
  es: string
  fr: string
}

interface Product {
  id: string
  title: LocalizedString
  category: LocalizedString
  dietary: string[]
  price: number
  image: string
}

interface Category {
  slug: string
  name: LocalizedString
  image: string
}

export default function ProductsPage() {
  const { language, t } = useLanguage()
  const lang = language as SupportedLanguage // only cast once here

  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const searchTerm = searchParams.get("search") || ""
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current && !searchTerm) return

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const filtered = allProducts.filter((product) =>
        product.title[lang].toLowerCase().includes(searchLower) ||
        product.category[lang].toLowerCase().includes(searchLower) ||
        product.dietary.some((diet: string) => diet.toLowerCase().includes(searchLower))
      )
      setFilteredProducts(filtered)
    } else if (!initialized.current) {
      setFilteredProducts(allProducts)
    }

    initialized.current = true
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
        filters.categories.includes(product.category[lang])
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

      <h1 className={styles.title}>
        {searchTerm ? `${t("products.searchResults")}: "${searchTerm}"` : t("products.allProducts")}
      </h1>

      <div className={styles.categoriesGrid}>
        {(rawCategories as Category[]).map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className={styles.categoryCard}>
            <Image
              src={category.image}
              alt={category.name[lang]}
              width={200}
              height={200}
              className={styles.categoryImage}
            />
            <p>{category.name[lang]}</p>
          </Link>
        ))}
      </div>

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
