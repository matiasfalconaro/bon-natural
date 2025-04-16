"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import styles from "./footer.module.css"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>{t("site.name")}</h3>
            <p className={styles.description}>
              Providing organic, sustainable, and locally-sourced natural foods since 2010.
            </p>
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
          <div className={styles.column}>
            <h3 className={styles.title}>Shop</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/products" className={styles.link}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/organic-produce" className={styles.link}>
                  Organic Produce
                </Link>
              </li>
              <li>
                <Link href="/categories/superfoods" className={styles.link}>
                  Superfoods
                </Link>
              </li>
              <li>
                <Link href="/categories/gluten-free" className={styles.link}>
                  Gluten-Free
                </Link>
              </li>
              <li>
                <Link href="/categories/plant-based" className={styles.link}>
                  Plant-Based
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Company</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/about" className={styles.link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className={styles.link}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className={styles.link}>
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Help</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/shipping" className={styles.link}>
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.link}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {t("site.name")}. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  )
}
