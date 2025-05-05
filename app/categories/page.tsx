"use client"

import { Category } from "@/types/categories"
import { getAllCategories } from "@/lib/api/categories"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.css"

export default function CategoriesPage() {
  const { t, language } = useLanguage()

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const fetched = await getAllCategories()
      setCategories(fetched)
    }

    fetchCategories()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("categories.title")}</h1>
        <p className={styles.subtitle}>{t("categories.subtitle")}</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.imageContainer}>
              <Image
                src={category.image}
                alt={category.name[language]}
                width={400}
                height={300}
                className={styles.categoryImage}
              />
            </div>
            <div className={styles.categoryContent}>
              <h2 className={styles.categoryTitle}>{category.name[language]}</h2>
              {category.description && (
                <p className={styles.categoryDescription}>
                  {category.description[language]}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
