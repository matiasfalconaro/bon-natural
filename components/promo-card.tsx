"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PromoCombo } from "@/types/promos"
import { ShoppingCart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import styles from "./product-card.module.css"

export default function PromoCard({ promo }: { promo: PromoCombo }) {
  const { language, t } = useLanguage()
  const { addItem } = useCart()

  const title = promo.title[language]
  const description = promo.description[language]

  const handleAddToCart = () => {
    addItem({
      id: promo.id,
      title,
      price: promo.price,
      image: promo.image1,
      quantity: 1,
      itemType: "PromoCombo",
    });
  };

  const renderPromoBadge = () => {
    if (promo.promoPercentage && promo.promoPercentage > 0) {
      return (
        <div className={`${styles.discountBadge} ${styles.discount}`}>
          {promo.promoPercentage}% OFF
        </div>
      );
    }
  
    let label = "";
    let modifierClass = "";
  
    switch (promo.promoType) {
      case "combo":
        label = "Combo";
        modifierClass = styles.combo;
        break;
      case "bulk":
        label = `x${promo.quantity}`;
        modifierClass = styles.bulk;
        break;
      case "gift":
        label = "+1 Free";
        modifierClass = styles.gift;
        break;
      default:
        return null;
    }
  
    return <div className={`${styles.discountBadge} ${modifierClass}`}>{label}</div>;
  };

  return (
    <Card className={styles.card}>
      <Link href={`/promos/${promo.slug}`} className={styles.imageContainer}>
        {renderPromoBadge()}
        <Image
          src={promo.image1}
          alt={title}
          width={300}
          height={200}
          className={styles.image}
        />
      </Link>
      <CardContent className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>${promo.price.toFixed(2)}</p>
        <p className={styles.stock}>
          {promo.stock > 0
            ? `${t("product.stockAvailable")}: ${promo.stock}`
            : t("product.outOfStock")}
        </p>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Button
          onClick={handleAddToCart}
          className={styles.addButton}
          size="sm"
          disabled={promo.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("product.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  )
}
