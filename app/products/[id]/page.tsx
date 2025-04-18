// app/products/[id]/page.tsx

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card"
import { allProducts, getProductById } from "@/data/products"
import ProductDetailsControls from "@/components/product-details-controls"

// ✅ Fix: mark the params as a Promise and await it
type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = getProductById(id)
  if (!product) return notFound()
  if (!product) return notFound()

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#f8f5f0] rounded-lg p-6 flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            className="max-w-full h-auto"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="text-3xl font-bold mt-1">{product.title}</h1>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <ProductDetailsControls product={product} />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="origin">Origin</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>{product.description}</p>
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
              <p>{product.ingredients || "N/A"}</p>
            </TabsContent>
            <TabsContent value="origin" className="pt-4">
              <p>{product.origin || "N/A"}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rp) => (
            <ProductCard key={rp.id} product={rp} />
          ))}
        </div>
      </div>
    </div>
  )
}
