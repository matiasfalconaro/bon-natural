"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/button"
import ProductCard from "@/components/product-card"
import SearchBar from "@/components/search-bar"
import styles from "./page.module.css"

import { categories } from "@/data/categories"
import { allProducts } from "@/data/products"

export default function Home() {
  const { t } = useLanguage()

  // Optional: Localize category names using translation keys
  const localizedCategories = categories

  // Featured products (slice as needed)
  const featuredProducts = allProducts.slice(0, 4)

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
            <div className={styles.heroImageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Natural Food Collection"
                width={500}
                height={500}
                className={styles.heroImage}
              />
            </div>
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
                  alt={category.name}
                  width={200}
                  height={200}
                  className={styles.categoryImage}
                />
                <div className={styles.categoryOverlay}>
                  <h3 className={styles.categoryTitle}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("featured.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("featured.subtitle")}</p>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.viewAllContainer}>
            <Button asChild variant="outline" className={styles.viewAllButton}>
              <Link href="/products">
                {t("featured.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${styles.section} ${styles.testimonials}`}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("testimonials.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("testimonials.subtitle")}</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {[
              {
                quote: t("testimonials.1"),
                author: "Sarah T.",
              },
              {
                quote: t("testimonials.2"),
                author: "Michael R.",
              },
              {
                quote: t("testimonials.3"),
                author: "Emma L.",
              },
            ].map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>"{testimonial.quote}"</p>
                  <h3 className={styles.testimonialAuthor}>{testimonial.author}</h3>
                </div>
              </div>
            ))}
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
