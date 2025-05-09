"use client"

import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, LogIn, ShoppingBag } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import styles from "./user-menu.module.css"

export default function UserMenu() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { clearCart } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout();
    clearCart();
    setIsOpen(false);
  };
  return (
    <div className="user-menu">
      <Button variant="ghost" size="icon" data-active={isOpen || pathname === "/account"} className={`${styles.button} ${styles.active}`} onClick={toggleMenu}>
        <User className="h-5 w-5" />
        <span className="sr-only">User menu</span>
      </Button>

      {isOpen && (
        <div className="user-menu-content">
          {user ? (
            <>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <User className="h-6 w-6" />
                </div>
                <div className={styles.userDetails}>
                  <p className={styles.userName}>{user.name}</p>
                  <p className={styles.userEmail}>{user.email}</p>
                </div>
              </div>
              <div className={styles.menuDivider}></div>
              <Link href="/orders" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <ShoppingBag className="h-4 w-4" />
                <span>{t("user.orders")}</span>
              </Link>
              <Link href="/account" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <Settings className="h-4 w-4" />
                <span>{t("user.settings")}</span>
              </Link>
              <button className="user-menu-item" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>{t("user.logout")}</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <LogIn className="h-4 w-4" />
                <span>{t("user.login")}</span>
              </Link>
              <Link href="/register" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <User className="h-4 w-4" />
                <span>{t("user.register")}</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
