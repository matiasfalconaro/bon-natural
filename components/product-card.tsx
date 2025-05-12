"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"
import styles from "./product-card.module.css"
import type { Product } from "@/types/products";

export default function ProductCard({ product }: { product: Product }) { 
  const { language, t } = useLanguage()
  const { addItem } = useCart()

  const title = product.title[language];
  const category = product.category[language];

  const isDiscounted = typeof product.promoPercentage === "number" && product.promoPercentage > 0
  const discountedPrice = isDiscounted
    ? product.price * (1 - product.promoPercentage! / 100)
    : product.price

    const handleAddToCart = () => {
      addItem({
        id: product.id,
        title,
        price: discountedPrice,
        image: product.image,
        quantity: 1,
        itemType: "Product",
      });
    
      toast({
        title: t("cart.added"),
        description: `${title} ${t("cart.addedToCart")}`,
      });
    };

  return (
    <Card className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageContainer}>
        {isDiscounted && (
          <div className={styles.discountBadge}>
            {product.promoPercentage}% OFF
          </div>
        )}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={300}
          className={styles.image}
        />
      </Link>
      <CardContent className={styles.content}>
        <div className={styles.details}>
          <p className={styles.category}>{category}</p>
          <Link href={`/products/${product.slug}`} className={styles.title}>
            {title}
          </Link>
          {isDiscounted ? (
            <div>
              <span
                className={styles.price}
                style={{
                  textDecoration: "line-through",
                  color: "#888",
                  marginRight: "0.5rem",
                }}
              >
                ${product.price.toFixed(2)}
              </span>
              <span className={styles.price}>${discountedPrice.toFixed(2)}</span>
            </div>
          ) : (
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          )}

          {/* 👉 Add this here */}
          <p className={styles.stock}>
            {product.stock > 0
              ? `${t("product.stockAvailable")}: ${product.stock}`
              : t("product.outOfStock")}
          </p>
        </div>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Button
          onClick={handleAddToCart}
          className={styles.addButton}
          size="sm"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("product.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  )
}
