import { useEffect, useState } from "react"
import { getAllPromos } from "@/lib/api/promos"
import { PromoCombo } from "@/types/promos"

export interface PromotionRow {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  promoType: string
  stock: number
  category: string
}

export const useAdminPromotions = () => {
  const [promotions, setPromotions] = useState<PromotionRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const raw: PromoCombo[] = await getAllPromos()

      const mapped: PromotionRow[] = raw.map((promo) => ({
        id: promo.id,
        name: promo.title.en,
        description: promo.description.en,
        price: promo.price,
        quantity: promo.quantity ?? 1,
        promoType: promo.promoType,
        stock: promo.stock,
        category: promo.category,
      }))

      setPromotions(mapped)
      setLoading(false)
    }

    load()
  }, [])

  return { promotions, loading }
}
