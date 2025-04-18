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
import { categories } from "@/data/categories"

// Future API
export async function fetchProducts() {
  const res = await fetch("/api/products")
  return await res.json()
}

categories.map((category) => (
  <Link key={category.slug} href={`/categories/${category.slug}`}>
    <Image src={category.image} alt={category.name} width={200} height={200} className={styles.categoryImage}/>
    <p>{category.name}</p>
  </Link>
))

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
