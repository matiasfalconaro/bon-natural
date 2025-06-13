import { useEffect, useState } from "react"
import { Discount } from "@/types/discounts"
import { getAllDiscounts } from "@/lib/api/discounts"

export const useAdminDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await getAllDiscounts()
      setDiscounts(res)
      setLoading(false)
    }
    load()
  }, [])

  return { discounts, loading }
}
