import { IOrder } from "@/types/orders"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export async function getAllAdminOrders(token?: string): Promise<IOrder[]> {
  try {
    const res = await fetch(`${API_BASE}/api/orders/admin`, {
      credentials: "include",
      cache: "no-store",
      headers: token ? { Cookie: `token=${token}` } : {},
    })

    if (!res.ok) {
      console.error("❌ Failed to fetch admin orders. Status:", res.status)
      return []
    }

    return await res.json()
  } catch (err) {
    console.error("❌ Error fetching admin orders:", err)
    return []
  }
}
