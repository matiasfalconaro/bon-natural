"use client";

import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, loading } = useCart();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Loading cart...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <ShoppingBag className="mr-2 h-6 w-6" />
          {t("cart.title")}
        </h1>
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("nav.products")}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <ShoppingBag className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>{t("cart.empty")}</h2>
          <p className={styles.emptyText}>{t("cart.addToCartMessage")}</p>
          <Button asChild className={styles.shopButton}>
            <Link href="/products">{t("hero.shopNow")}</Link>
          </Button>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.cartItems}>
            <div className={styles.cartHeader}>
              <div className={styles.productHeader}>{t("cart.productHeader")}</div>
              <div className={styles.priceHeader}>{t("cart.priceHeader")}</div>
              <div className={styles.quantityHeader}>{t("cart.quantityHeader")}</div>
              <div className={styles.totalHeader}>{t("cart.totalHeader")}</div>
              <div className={styles.actionHeader}></div>
            </div>

            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.product}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={80}
                    height={80}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{item.title}</h3>
                  </div>
                </div>
                <div className={styles.price}>${item.price.toFixed(2)}</div>
                <div className={styles.quantity}>
                  <div className={styles.quantityControl}>
                    <Button
                      variant="outline"
                      size="icon"
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className={styles.total}>${(item.price * item.quantity).toFixed(2)}</div>
                <div className={styles.action}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>{t("cart.orderSummary")}</h2>
            <div className={styles.summaryRow}>
              <span>{t("cart.subtotal")}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>{t("cart.shipping")}</span>
              <span>{t("cart.shippingCalculation")}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>{t("cart.total")}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button
              className={styles.checkoutButton}
              onClick={async () => {
                alert(`Proceeding to checkout! Total: $${subtotal.toFixed(2)}`);
                await clearCart();
              }}
            >
              {t("cart.checkout")}
            </Button>
            <Button variant="outline" className={styles.clearButton} onClick={clearCart}>
              {t("cart.clear")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
