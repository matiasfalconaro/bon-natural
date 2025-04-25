import { Product } from "@/types/products"

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/product/${slug}`, { cache: "no-store" })
    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    console.error("Failed to fetch product", err)
    return null
  }
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/related/${categorySlug}/${excludeSlug}`, { cache: "no-store" })
    if (!res.ok) return []
    return await res.json()
  } catch (err) {
    console.error("Failed to fetch related products", err)
    return []
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("❌ Failed to fetch products. Status:", res.status)
      return []
    }

    return await res.json()
  } catch (err) {
    console.error("❌ Error fetching all products:", err)
    return []
  }
}
