"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Category } from "@/types/categories";
import { getAllCategories } from "@/lib/api/categories";
import { getAllProducts } from "@/lib/api/products";
import { getAllPromos } from "@/lib/api/promos";
import { Product } from "@/types/products";
import { PromoCombo } from "@/types/promos";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/contexts/socket-context";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import PromoCard from "@/components/promo-card";

import SearchBar from "@/components/search-bar";
import styles from "./page.module.css";

export default function Home() {
  const { t, language } = useLanguage();
  const { user, isLoading } = useAuth();
  const socket = useSocket();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [promos, setPromos] = useState<PromoCombo[]>([]);

  const loadData = async () => {
    const [fetchedCategories, fetchedProducts, fetchedPromos] = await Promise.all([
      getAllCategories(),
      getAllProducts(),
      getAllPromos(),
    ]);
    setCategories(fetchedCategories);
    setProducts(fetchedProducts);
    setPromos(fetchedPromos);
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = () => {
      loadData();
    };

    socket.on("stockUpdated", handleUpdate);

    return () => {
      socket.off("stockUpdated", handleUpdate);
    };
  }, [socket]);

  const featuredProducts =
    products.filter((p) => p.featured).length > 0
      ? products.filter((p) => p.featured)
      : products.slice(0, 4);

  if (isLoading || !user) return null;

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
                <Button variant="outline" asChild>
                  <Link href="/admin">
                    Admin Panel
                  </Link>
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
            {categories.length === 0 ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category) => (
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
              ))
            )}
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
              <ProductCard key={product.slug} product={product} />
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

      {/* Promos Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("promos.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("promos.subtitle")}</p>
          </div>
          <div className={styles.productsGrid}>
            {promos.slice(0, 4).map((combo: PromoCombo) => (
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
  );
}
