import { Discount } from "@/types/discounts"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export async function getAllDiscounts(token?: string): Promise<Discount[]> {
  try {
    const res = await fetch(`${API_BASE}/api/discounts`, {
      cache: "no-store",
      credentials: "include",
      headers: token ? { Cookie: `token=${token}` } : {},
    })

    if (!res.ok) {
      console.error("❌ Failed to fetch discounts. Status:", res.status)
      return []
    }

    return await res.json()
  } catch (err) {
    console.error("❌ Error fetching discounts:", err)
    return []
  }
}
