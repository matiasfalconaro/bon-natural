"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getAllCategories } from "@/lib/api/categories" // 🛠 FETCH CATEGORIES
import { Category } from "@/types/categories" // 🛠 Import types if you have them
import styles from "./footer.module.css"

export default function Footer() {
  const { t, language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([]) // 🛠

  useEffect(() => {
    async function loadCategories() {
      const fetched = await getAllCategories()
      setCategories(fetched)
    }
    loadCategories()
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.column}>
            <h3 className={styles.title}>{t("site.name")}</h3>
            <p className={styles.description}>{t("footer.description")}</p>
            <div className={styles.socialLinks}>
              <Link href="#" className={styles.socialLink}>
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className={styles.socialLink}>
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className={styles.socialLink}>
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.shop")}</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/products" className={styles.link}>
                  {t("footer.allProducts")}
                </Link>
              </li>
              {categories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link href={`/categories/${category.slug}`} className={styles.link}>
                    {category.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.company")}</h3>
            <ul className={styles.links}>
              <li><Link href="/about" className={styles.link}>{t("footer.aboutUs")}</Link></li>
              <li><Link href="/contact" className={styles.link}>{t("footer.contactUs")}</Link></li>
              <li><Link href="/blog" className={styles.link}>{t("footer.blog")}</Link></li>
              <li><Link href="/careers" className={styles.link}>{t("footer.careers")}</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.help")}</h3>
            <ul className={styles.links}>
              <li><Link href="/shipping" className={styles.link}>{t("footer.shippingReturns")}</Link></li>
              <li><Link href="/faq" className={styles.link}>{t("footer.faq")}</Link></li>
              <li><Link href="/privacy" className={styles.link}>{t("footer.privacyPolicy")}</Link></li>
              <li><Link href="/terms" className={styles.link}>{t("footer.termsOfService")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {t("site.name")}. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  )
}
