"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/button"
import ProductCard from "@/components/product-card"
import SearchBar from "@/components/search-bar"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"

export default function Home() {
  const { t } = useLanguage()

  // Featured products with real images
  const featuredProducts = [
    {
      id: "1",
      title: "Organic Raw Honey",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Sweeteners",
    },
    {
      id: "2",
      title: "Cold-Pressed Olive Oil",
      price: 18.5,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Oils",
    },
    {
      id: "3",
      title: "Gluten-Free Granola",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Breakfast",
    },
    {
      id: "4",
      title: "Organic Quinoa",
      price: 6.75,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Grains",
    },
  ]

  // Categories with real images
  const categories = [
    {
      name: t("categories.organicProduce"),
      image:
        "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "organic-produce",
    },
    {
      name: t("categories.superfoods"),
      image:
        "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "superfoods",
    },
    {
      name: t("categories.glutenFree"),
      image:
        "https://images.unsplash.com/photo-1486887396153-fa416526c108?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "gluten-free",
    },
    {
      name: t("categories.plantBased"),
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "plant-based",
    },
  ]

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
      <section className={`${styles.searchSection} search-section`}>
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
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className={styles.categoryCard}>
                <Image
                  src={category.image || "/placeholder.svg"}
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
      <section className={`${styles.section} ${styles.testimonials} testimonials-section`}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("testimonials.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("testimonials.subtitle")}</p>
          </div>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "The organic honey is absolutely delicious! I use it every morning in my tea and on toast."
                </p>
                <h3 className={styles.testimonialAuthor}>Sarah T.</h3>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "I love that I can find all my favorite natural foods in one place. The quality is outstanding!"
                </p>
                <h3 className={styles.testimonialAuthor}>Michael R.</h3>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "The gluten-free options are amazing. Finally, I can enjoy delicious foods without worry."
                </p>
                <h3 className={styles.testimonialAuthor}>Emma L.</h3>
              </div>
            </div>
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
