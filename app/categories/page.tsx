"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"

export default function CategoriesPage() {
  const { t } = useLanguage()

  // All categories with real images
  const categories = [
    {
      name: t("categories.organicProduce"),
      image:
        "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "organic-produce",
      description: "Fresh, locally-sourced organic fruits and vegetables free from pesticides and chemicals.",
    },
    {
      name: t("categories.superfoods"),
      image:
        "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "superfoods",
      description: "Nutrient-rich foods that provide exceptional health benefits and boost your wellbeing.",
    },
    {
      name: t("categories.glutenFree"),
      image:
        "https://images.unsplash.com/photo-1486887396153-fa416526c108?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "gluten-free",
      description: "Delicious alternatives for those with gluten sensitivities or celiac disease.",
    },
    {
      name: t("categories.plantBased"),
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "plant-based",
      description: "Wholesome plant-based alternatives for a sustainable and cruelty-free lifestyle.",
    },
    {
      name: "Oils & Vinegars",
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "oils-vinegars",
      description: "Premium cold-pressed oils and aged vinegars for cooking and dressing.",
    },
    {
      name: "Grains & Legumes",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "grains-legumes",
      description: "Wholesome grains and protein-rich legumes for nutritious meals.",
    },
    {
      name: "Nuts & Seeds",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "nuts-seeds",
      description: "Raw and roasted nuts and seeds, perfect for snacking or adding to recipes.",
    },
    {
      name: "Natural Sweeteners",
      image:
        "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "natural-sweeteners",
      description: "Healthier alternatives to refined sugar, from honey to maple syrup and beyond.",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("categories.title")}</h1>
        <p className={styles.subtitle}>{t("categories.subtitle")}</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className={styles.categoryCard}>
            <div className={styles.imageContainer}>
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={300}
                className={styles.categoryImage}
              />
            </div>
            <div className={styles.categoryContent}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
