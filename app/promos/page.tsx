"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import PromoCard from "@/components/promo-card"
import ProductFilter from "@/components/product-filter"
import SearchBar from "@/components/search-bar"
import { useLanguage } from "@/contexts/language-context"
import { promoCombos } from "@/data/combos"
import styles from "../products/page.module.css" // Reusing styles

type SupportedLanguage = "en" | "es" | "fr"

interface LocalizedString {
  en: string
  es: string
  fr: string
}

interface PromoCombo {
  id: string
  slug: string
  title: LocalizedString
  description: LocalizedString
  image1: string
  image2?: string
  price: number
  quantity?: number
  promoType: "combo" | "bulk" | "gift"
  category: string
  dietary: string[]
}

export default function BundlesPage() {
  const { language, t } = useLanguage()
  const lang = language as SupportedLanguage

  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("search") || ""
  const [filteredCombos, setFilteredCombos] = useState<PromoCombo[]>(promoCombos)
  const initialized = useRef(false)

  const handleFilter = (filters: {
    categories: string[]
    priceRange: [number, number]
    dietary: string[]
    searchTerm: string
  }) => {
    let filtered = [...promoCombos]

    if (filters.categories.length > 0) {
      filtered = filtered.filter((combo) => filters.categories.includes(combo.category))
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (combo) => combo.price >= filters.priceRange[0] && combo.price <= filters.priceRange[1]
      )
    }

    if (filters.dietary.length > 0) {
      filtered = filtered.filter((combo) =>
        filters.dietary.some((diet) => combo.dietary.includes(diet))
      )
    }

    if (filters.searchTerm) {
      const lowerSearch = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (combo) =>
          combo.title[lang].toLowerCase().includes(lowerSearch) ||
          combo.description[lang].toLowerCase().includes(lowerSearch)
      )
    }

    setFilteredCombos(filtered)
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
          {/*
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("promos.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("promos.subtitle")}</p>
          </div>
          */}

          {filteredCombos.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("product.noResults")}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredCombos.map((combo) => (
                <PromoCard key={combo.slug} promo={combo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
