"use client"

import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "@/components/product-card"
import ProductDetailsControls from "@/components/product-details-controls"
import type { Product } from "@/types/products"
import type { SupportedLanguage } from "@/types/i18n"

const getLocalized = (
  field: Product["title"] | undefined,
  lang: SupportedLanguage
): string => field?.[lang] || "N/A";

export default function ProductPageClient({product, relatedProducts,}: {
  product: Product
  relatedProducts: Product[]
}) {
  const { language, t } = useLanguage()

  const categoryName = getLocalized(product.category, language)
  const isDiscounted = typeof product.promoPercentage === "number" && product.promoPercentage > 0
  const discountedPrice = isDiscounted
    ? product.price * (1 - product.promoPercentage! / 100)
    : product.price;

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("product.backToProducts")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative bg-[#f8f5f0] rounded-lg p-6 flex items-center justify-center">
          {isDiscounted && (
            <div className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded shadow-md z-10">
              {product.promoPercentage}% OFF
            </div>
          )}
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
            <p className="text-sm text-muted-foreground">{categoryName}</p>
            <h1 className="text-3xl font-bold mt-1">{getLocalized(product.title, language)}</h1>
            {isDiscounted ? (
              <p className="text-2xl font-bold mt-2">
                <span className="line-through text-gray-400 mr-2">${product.price.toFixed(2)}</span>
                <span className="text-green-600">${discountedPrice.toFixed(2)}</span>
              </p>
            ) : (
              <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
            )}
          </div>

          <p className="text-muted-foreground">{getLocalized(product.description, language)}</p>

          <ProductDetailsControls product={product} />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">{t("product.description")}</TabsTrigger>
              <TabsTrigger value="nutrition">{t("product.nutrition")}</TabsTrigger>
              <TabsTrigger value="ingredients">{t("product.ingredients")}</TabsTrigger>
              <TabsTrigger value="origin">{t("product.origin")}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-4">
              <p>{getLocalized(product.description, language)}</p>
            </TabsContent>

            <TabsContent value="nutrition" className="pt-4">
              <div className="space-y-2">
                <p><strong>{t("nutrition.servingSize")}:</strong> {product.nutritionalInfo?.servingSize || "N/A"}</p>
                <p><strong>{t("nutrition.calories")}:</strong> {product.nutritionalInfo?.calories || "N/A"}</p>
                <p><strong>{t("nutrition.totalFat")}:</strong> {product.nutritionalInfo?.totalFat || "N/A"}</p>
                <p><strong>{t("nutrition.sodium")}:</strong> {product.nutritionalInfo?.sodium || "N/A"}</p>
                <p><strong>{t("nutrition.totalCarbs")}:</strong> {product.nutritionalInfo?.totalCarbs || "N/A"}</p>
                <p><strong>{t("nutrition.sugars")}:</strong> {product.nutritionalInfo?.sugars || "N/A"}</p>
                <p><strong>{t("nutrition.protein")}:</strong> {product.nutritionalInfo?.protein || "N/A"}</p>
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
        <h2 className="text-2xl font-bold mb-6">{t("product.relatedProducts")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rp) => (
            <ProductCard key={rp.slug} product={rp} />
          ))}
        </div>
      </div>
    </div>
  )
}
