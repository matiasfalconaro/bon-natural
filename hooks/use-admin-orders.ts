import { useEffect, useState } from "react"
import { IOrder } from "@/types/orders"
import { getAllAdminOrders } from "@/lib/api/orders"

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await getAllAdminOrders()
      setOrders(res)
      setLoading(false)
    }
    load()
  }, [])

  return { orders, loading }
}
