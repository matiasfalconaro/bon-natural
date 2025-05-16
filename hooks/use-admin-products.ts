import { useEffect, useState } from "react"
import { Product } from "@/types/products"
import { getAdminProducts } from "@/lib/api/products"

export interface AdminProductRow {
  id: string
  name: string
  category: string
  price: number
  stock: number
  organic: boolean
  featured: boolean
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

export const useAdminProducts = () => {
  const [products, setProducts] = useState<AdminProductRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const raw: Product[] = await getAdminProducts()

      const mapped = raw.map((p): AdminProductRow => {
        const stock = p.stock
        const status =
          stock === 0 ? "Out of Stock" : stock < 20 ? "Low Stock" : "In Stock"

        return {
          id: p.id,
          name: p.title.en,
          category: p.category.en,
          price: p.price,
          stock: p.stock,
          organic: p.dietary.includes("organic"),
          featured: p.featured ?? false,
          status,
        }
      })

      setProducts(mapped)
      setLoading(false)
    }

    load()
  }, [])

  return { products, loading }
}
