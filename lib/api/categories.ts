import { Category } from "@/types/categories"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export async function getAllCategories(token?: string): Promise<(Category & { productCount?: number })[]> {
  try {
    const res = await fetch(`${API_BASE}/api/categories`, {
      cache: "no-store",
      credentials: "include",
      headers: token ? { Cookie: `token=${token}` } : {},
    })

    if (!res.ok) {
      console.error("❌ Failed to fetch admin categories. Status:", res.status)
      return []
    }

    return await res.json()
  } catch (err) {
    console.error("❌ Error fetching admin categories:", err)
    return []
  }
}
