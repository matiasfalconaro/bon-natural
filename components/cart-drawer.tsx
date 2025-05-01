"use client";

import { useState } from "react";
import { ShoppingBag, Plus, Minus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import Link from "next/link";
import styles from "./cart-drawer.module.css";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal, loading } = useCart();
  const { t } = useLanguage();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleApplyDiscount = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/cart/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code: discountCode }),
      });
      console.log("Applying code:", discountCode);

  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        setDiscount(0);
        setDiscountApplied(false);
        return;
      }
  
      const data = await response.json();
      setDiscount(data.amount);
      setDiscountApplied(true);
    } catch (err) {
      console.error("Discount validation failed", err);
      alert("Failed to apply discount");
    }
  };

  const resetDiscount = () => {
    setDiscount(0);
    setDiscountApplied(false);
    setDiscountCode("");
  };  

  const total = subtotal - subtotal * (discount / 100);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      alert(`Proceeding to checkout with total: $${total.toFixed(2)}`);
      await clearCart();
      resetDiscount();
      alert("✅ Purchase completed! Cart is now empty.");
      setIsOpen(false);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("❌ Checkout failed, please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={`${styles.button} ${styles.active}`}>
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && <Badge className="cart-badge">{itemCount}</Badge>}
          <span className="sr-only">{t("cart.open")}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className={styles.cartDrawer}>
        <SheetHeader>
          <SheetTitle className={styles.cartTitle}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            {t("cart.title")} ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className={styles.emptyCart}>
            <p>Loading cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>{t("cart.empty")}</p>
            <Button asChild className="mt-4" onClick={() => setIsOpen(false)}>
              <Link href="/products">{t("hero.shopNow")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.itemType}-${index}`} 
                  className={styles.cartItem}
                >
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title || "Unnamed"}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>
                      {item.title || "Unnamed Item"}
                    </h3>
                    <p className={styles.itemPrice}>
                      ${item.price?.toFixed(2) ?? "0.00"}
                    </p>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <Button
                          variant="outline"
                          size="icon"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
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
                </div>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className="discount-container">
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{t("cart.discountCode")}</span>
                </div>
                <div className="discount-form">
                  <Input
                    type="text"
                    // placeholder=""
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="discount-input"
                  />
                  <Button size="sm" onClick={handleApplyDiscount}>
                    {t("cart.apply")}
                  </Button>
                </div>
                {discountApplied && (
                  <p className="text-sm text-green-600 mt-1">
                    {discount}% {t("cart.discountApplied")}
                  </p>
                )}
              </div>

              <div className={styles.subtotal}>
                <span>{t("cart.subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className={styles.discount}>
                  <span>
                    {t("cart.discount")} ({discount}%)
                  </span>
                  <span>-${(subtotal * (discount / 100)).toFixed(2)}</span>
                </div>
              )}

              <div className={styles.total}>
                <span>{t("cart.total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                className={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={checkoutLoading || loading}
              >
                {checkoutLoading ? "Processing..." : t("cart.checkout")}
              </Button>
              <Button
                variant="outline"
                className={styles.clearButton}
                onClick={() => {
                  clearCart();
                  resetDiscount();
                }}
                disabled={checkoutLoading || loading}
              >
                {t("cart.clear")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
