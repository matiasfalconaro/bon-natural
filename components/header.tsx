"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeSwitcher from "@/components/theme-switcher"
import CartDrawer from "@/components/cart-drawer"
import UserMenu from "@/components/user-menu"
import styles from "./header.module.css"

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const closeSheet = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={`${styles.mobileMenuButton} ${styles.active}`}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className={styles.mobileMenu}>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileNavLink} onClick={closeSheet}>
                {t("nav.home")}
              </Link>
              <Link href="/products" className={styles.mobileNavLink} onClick={closeSheet}>
                {t("nav.products")}
              </Link>
              <Link href="/categories" className={styles.mobileNavLink} onClick={closeSheet}>
                {t("nav.categories")}
              </Link>
              <Link href="/about" className={styles.mobileNavLink} onClick={closeSheet}>
                {t("nav.about")}
              </Link>
              <Link href="/contact" className={styles.mobileNavLink} onClick={closeSheet}>
                {t("nav.contact")}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className={styles.logo}>
          <div className={styles.logoCircle}>
            <Image
              src="/logo.png"
              alt="Bon Natural"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>
            {t("nav.home")}
          </Link>
          <Link href="/products" className={styles.navLink}>
            {t("nav.products")}
          </Link>
          <Link href="/categories" className={styles.navLink}>
            {t("nav.categories")}
          </Link>
          <Link href="/about" className={styles.navLink}>
            {t("nav.about")}
          </Link>
          <Link href="/contact" className={styles.navLink}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className={styles.actions}>
          <ThemeSwitcher />
          <LanguageSwitcher />
          <UserMenu />
          <CartDrawer />
        </div>
      </div>
    </header>
  )
}
