"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function FeaturedCategories() {
  const { t } = useLanguage()

  const categories = [
    {
      name: t("categories.organicProduce"),
      image: "/placeholder.svg?height=200&width=200",
      slug: "organic-produce",
    },
    {
      name: t("categories.superfoods"),
      image: "/placeholder.svg?height=200&width=200",
      slug: "superfoods",
    },
    {
      name: t("categories.glutenFree"),
      image: "/placeholder.svg?height=200&width=200",
      slug: "gluten-free",
    },
    {
      name: t("categories.plantBased"),
      image: "/placeholder.svg?height=200&width=200",
      slug: "plant-based",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            width={200}
            height={200}
            className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white font-bold text-xl">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
