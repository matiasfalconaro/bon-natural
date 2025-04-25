"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import PromoCard from "@/components/promo-card"
import ProductFilter from "@/components/product-filter"
import SearchBar from "@/components/search-bar"
import { useLanguage } from "@/contexts/language-context"
import { getAllPromos } from "@/lib/api/promos"
import { PromoCombo } from "@/types/promos"
import styles from "../products/page.module.css" // Reusing products styles

export default function PromosPage() {
  const { language, t } = useLanguage()
  const lang = language as "en" | "es" | "fr"

  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("search") || ""

  const [allPromos, setAllPromos] = useState<PromoCombo[]>([])
  const [filteredPromos, setFilteredPromos] = useState<PromoCombo[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    async function loadPromos() {
      const promos = await getAllPromos()
      setAllPromos(promos)
      setFilteredPromos(promos)
      initialized.current = true
    }

    if (!initialized.current) {
      loadPromos()
    }
  }, [])

  const handleFilter = (filters: {
    categories: string[]
    priceRange: [number, number]
    dietary: string[]
    searchTerm: string
  }) => {
    let filtered = [...allPromos]

    if (filters.categories.length > 0) {
      filtered = filtered.filter(promo => filters.categories.includes(promo.category))
    }

    filtered = filtered.filter(promo =>
      promo.price >= filters.priceRange[0] && promo.price <= filters.priceRange[1]
    )

    if (filters.dietary.length > 0) {
      filtered = filtered.filter(promo =>
        filters.dietary.some(diet => promo.dietary.includes(diet))
      )
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(promo =>
        promo.title[lang].toLowerCase().includes(searchLower) ||
        promo.description[lang].toLowerCase().includes(searchLower)
      )
    }

    setFilteredPromos(filtered)
  }

  return (
    <div className={styles.container}>
      {/* Search Section */}
      <div className={styles.searchSection}>
        <SearchBar />
      </div>

      {/* Content Layout */}
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductFilter onFilter={handleFilter} initialSearchTerm={searchTerm} />
        </div>

        <div className={styles.products}>
          {/* Optional: Section Header */}
          {/* 
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("promos.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("promos.subtitle")}</p>
          </div>
          */}

          {filteredPromos.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("product.noResults")}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredPromos.map((promo) => (
                <PromoCard key={promo.slug} promo={promo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
