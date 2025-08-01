"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Product } from "@/types/products"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export default function ProductDetailsControls({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { language } = useLanguage()

  const localizedTitle = product.title[language]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: localizedTitle,
      price: product.price,
      image: product.image,
      quantity: quantity,
      itemType: "Product",
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        className="flex-1 bg-[#5a7c5a] hover:bg-[#4a6a4a]"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}