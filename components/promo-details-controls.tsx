"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { PromoCombo } from "@/types/promos";
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export default function BundleDetailsControls({ bundle }: { bundle: PromoCombo }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { language, t } = useLanguage()

  const localizedTitle = bundle.title[language]

  const handleAddToCart = () => {
    addItem({
      id: bundle.id,
      title: localizedTitle,
      price: bundle.price,
      image: bundle.image1,
      quantity: quantity,
      itemType: "PromoCombo",
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
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {t("product.addToCart")}
      </Button>
    </div>
  )
}
