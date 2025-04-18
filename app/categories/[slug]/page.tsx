"use client"

import { use } from "react"
import CategoryPageClient from "./CategoryPageClient"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  return <CategoryPageClient slug={slug} />
}
