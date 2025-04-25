import { Category } from "@/types/categories"

export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/categories`, { cache: "no-store" })
    if (!res.ok) {
      console.error("Failed to fetch categories")
      return []
    }
    return await res.json()
  } catch (err) {
    console.error("Error fetching categories", err)
    return []
  }
}