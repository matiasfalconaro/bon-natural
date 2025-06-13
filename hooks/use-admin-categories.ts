import { useEffect, useState } from "react"
import { getAllCategories } from "@/lib/api/categories"
import { Category } from "@/types/categories"

export interface CategoryRow {
  id: string
  name: string
  description: string
  parentCategory: string | null
  productCount: number
  featured: boolean
}

export const useAdminCategories = () => {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const raw: (Category & { productCount?: number })[] = await getAllCategories()

      const mapped = raw.map((cat): CategoryRow => ({
        id: cat.id,
        name: cat.name.en,
        description: cat.description?.en || "",
        parentCategory: null,
        productCount: cat.productCount ?? 0,
        featured: false, // extend
      }))

      setCategories(mapped)
      setLoading(false)
    }

    load()
  }, [])

  return { categories, loading }
}
