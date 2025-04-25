"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/button"
import ProductCard from "@/components/product-card"
import SearchBar from "@/components/search-bar"
import PromoCard from "@/components/promo-card"
import styles from "./page.module.css"

import { promoCombos } from "@/data/combos"
import { categories } from "@/data/categories"

export default function Home() {
  const { t, language } = useLanguage()

  const localizedCategories = categories

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={`${styles.hero} hero-section`}>
        <div className={styles.heroContent}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <div className={styles.heroHeading}>
                <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
                <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
              </div>
              <div className={styles.heroButtons}>
                <Button asChild className={styles.primaryButton}>
                  <Link href="/products">
                    {t("hero.shopNow")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">{t("hero.learnMore")}</Link>
                </Button>
              </div>
            </div>
            <div className={styles.heroImageContainer}></div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <div className={styles.searchContent}>
          <h2 className={styles.searchTitle}>{t("search.title")}</h2>
          <p className={styles.searchSubtitle}>{t("search.subtitle")}</p>
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("categories.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("categories.subtitle")}</p>
          </div>
          <div className={styles.categoriesGrid}>
            {localizedCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className={styles.categoryCard}
              >
                <Image
                  src={category.image}
                  alt={category.name[language]}
                  width={200}
                  height={200}
                  className={styles.categoryImage}
                />
                <div className={styles.categoryOverlay}>
                  <h3 className={styles.categoryTitle}>{category.name[language]}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Combos Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("promos.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("promos.subtitle")}</p>
          </div>

          <div className={styles.productsGrid}>
            {promoCombos.slice(0, 4).map((combo) => (
              <PromoCard key={combo.slug} promo={combo} />
            ))}
          </div>

          <div className={styles.viewAllContainer}>
            <Button asChild variant="outline" className={styles.viewAllButton}>
              <Link href="/promos">
                {t("promos.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("newsletter.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("newsletter.subtitle")}</p>
          </div>
          <div className={styles.newsletterContainer}>
            <form className={styles.newsletterForm}>
              <input
                className={styles.newsletterInput}
                placeholder={t("newsletter.placeholder")}
                type="email"
                required
              />
              <Button type="submit" className={styles.newsletterButton}>
                {t("newsletter.subscribe")}
              </Button>
            </form>
            <p className={styles.newsletterDisclaimer}>{t("newsletter.privacy")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
