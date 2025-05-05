"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"
import { useLanguage } from "@/contexts/language-context"
import { getAllProducts } from "@/lib/api/products"
import { getAllCategories } from "@/lib/api/categories"
import styles from "./page.module.css"
import { Product } from "@/types/products"
import { LocalizedString } from "@/types/categories"

export default function CategoryPageClient({ slug }: { slug: string }) {
  const { language, t } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState<string>("")

  useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getAllProducts()
      const fetchedCategories = await getAllCategories()

      const localizedCategory = fetchedCategories.find((cat) => cat.slug === slug)

      setCategoryName(
        localizedCategory
          ? localizedCategory.name[language as keyof LocalizedString]
          : slug.replace(/-/g, " ")
      )

      const categoryProducts =
        slug === "all"
          ? fetchedProducts
          : fetchedProducts.filter((product) => product.categorySlug === slug)

      setProducts(categoryProducts)
      setFilteredProducts(categoryProducts)
    }

    fetchData()
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
            product.title[language as keyof LocalizedString].toLowerCase().includes(searchLower) ||
            product.category[language as keyof LocalizedString].toLowerCase().includes(searchLower)
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
