"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ProductDetailsControls from "@/components/product-details-controls"
import ProductCard from "@/components/product-card"
import { allProducts } from "@/data/products"
import { getRelatedProducts } from "@/data/products"


interface LocalizedString {
  en: string
  es: string
  fr: string
}

interface Product {
  id: string
  slug: string
  categorySlug: string
  title: LocalizedString
  price: number
  image: string
  category: LocalizedString
  dietary: string[]
  description: LocalizedString
  ingredients: LocalizedString
  origin: LocalizedString
  nutritionalInfo?: {
    servingSize: string
    calories: number
    totalFat: string
    sodium: string
    totalCarbs: string
    sugars: string
    protein: string
  }
}

const getLocalized = (field: LocalizedString | undefined, lang: string): string => {
  return field?.[lang as keyof LocalizedString] || "N/A"
}

export default function ProductPageClient({ product }: { product: Product | null }) {
  const { language, t } = useLanguage()

  if (!product || !product.slug) {
    return (
      <div className="container px-4 py-8">
        <h2 className="text-lg font-bold text-red-500">Product not found</h2>
        <Link href="/products" className="mt-4 inline-block text-blue-600 underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("product.backToAll")}
        </Link>
      </div>
    )
  }

  const categoryName = getLocalized(product.category, language)

  const relatedProducts = getRelatedProducts(product.categorySlug, product.slug)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("product.backToProducts")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#f8f5f0] rounded-lg p-6 flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={getLocalized(product.title, language)}
            width={600}
            height={600}
            className="max-w-full h-auto"
          />
        </div>

        <div className="space-y-6">
          <div>
          <p className="text-sm text-muted-foreground">{getLocalized(product.category, language)}</p>
            <h1 className="text-3xl font-bold mt-1">{getLocalized(product.title, language)}</h1>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{getLocalized(product.description, language)}</p>

          <ProductDetailsControls product={product} />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="origin">Origin</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>{getLocalized(product.description, language)}</p>
            </TabsContent>
            <TabsContent value="nutrition" className="pt-4">
              <div className="space-y-2">
                <p><strong>Serving Size:</strong> {product.nutritionalInfo?.servingSize || "N/A"}</p>
                <p><strong>Calories:</strong> {product.nutritionalInfo?.calories || "N/A"}</p>
                <p><strong>Total Fat:</strong> {product.nutritionalInfo?.totalFat || "N/A"}</p>
                <p><strong>Sodium:</strong> {product.nutritionalInfo?.sodium || "N/A"}</p>
                <p><strong>Total Carbs:</strong> {product.nutritionalInfo?.totalCarbs || "N/A"}</p>
                <p><strong>Sugars:</strong> {product.nutritionalInfo?.sugars || "N/A"}</p>
                <p><strong>Protein:</strong> {product.nutritionalInfo?.protein || "N/A"}</p>
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="pt-4">
              <p>{getLocalized(product.ingredients, language)}</p>
            </TabsContent>
            <TabsContent value="origin" className="pt-4">
              <p>{getLocalized(product.origin, language)}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{t("products.relatedProducts")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rp) => (
            <ProductCard key={rp.slug} product={rp} />
          ))}
        </div>
      </div>
    </div>
  )
}
