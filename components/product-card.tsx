"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import styles from "./product-card.module.css"

interface LocalizedString {
  en: string
  es: string
  fr: string
}

interface Product {
  id: string
  slug: string
  title: LocalizedString
  price: number
  image: string
  category: LocalizedString
}

export default function ProductCard({ product }: { product: Product }) {
  const { language, t } = useLanguage()
  const { addItem } = useCart()

  const title = product.title[language as keyof LocalizedString]
  const category = product.category[language as keyof LocalizedString]

  const handleAddToCart = () => {
    addItem({
      id: product.slug,
      title,
      price: product.price,
      image: product.image,
    })

    toast({
      title: t("cart.added"),
      description: `${title} ${t("cart.addedToCart")}`,
    })
  }

  return (
    <Card className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageContainer}>
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
          <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Button onClick={handleAddToCart} className={styles.addButton} size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("product.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  )
}
