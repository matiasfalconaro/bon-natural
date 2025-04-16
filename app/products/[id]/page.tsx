import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, this would fetch the product from Shopify API using the ID
  // For now, we'll use mock data
  const product = {
    id: params.id,
    title: "Organic Raw Honey",
    price: 12.99,
    description:
      "Our raw honey is sourced from local beekeepers who practice sustainable beekeeping. This unfiltered, unpasteurized honey retains all of its natural enzymes, vitamins, and minerals. Perfect for sweetening tea, drizzling over yogurt, or using in baking.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Sweeteners",
    nutritionalInfo: {
      servingSize: "1 tbsp (21g)",
      calories: 64,
      totalFat: "0g",
      sodium: "0mg",
      totalCarbs: "17g",
      sugars: "17g",
      protein: "0g",
    },
    ingredients: "100% Raw, Unfiltered Honey",
    origin: "Locally sourced from sustainable apiaries",
  }

  // Related products would also come from the API
  const relatedProducts = [
    {
      id: "2",
      title: "Maple Syrup",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Sweeteners",
    },
    {
      id: "5",
      title: "Coconut Sugar",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Sweeteners",
    },
    {
      id: "8",
      title: "Date Syrup",
      price: 8.49,
      image: "/placeholder.svg?height=300&width=300",
      category: "Sweeteners",
    },
  ]

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

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="rounded-none">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">1</span>
              <Button variant="ghost" size="icon" className="rounded-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="flex-1 bg-[#5a7c5a] hover:bg-[#4a6a4a]">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

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
                <p>
                  <strong>Serving Size:</strong> {product.nutritionalInfo.servingSize}
                </p>
                <p>
                  <strong>Calories:</strong> {product.nutritionalInfo.calories}
                </p>
                <p>
                  <strong>Total Fat:</strong> {product.nutritionalInfo.totalFat}
                </p>
                <p>
                  <strong>Sodium:</strong> {product.nutritionalInfo.sodium}
                </p>
                <p>
                  <strong>Total Carbohydrates:</strong> {product.nutritionalInfo.totalCarbs}
                </p>
                <p>
                  <strong>Sugars:</strong> {product.nutritionalInfo.sugars}
                </p>
                <p>
                  <strong>Protein:</strong> {product.nutritionalInfo.protein}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="pt-4">
              <p>{product.ingredients}</p>
            </TabsContent>
            <TabsContent value="origin" className="pt-4">
              <p>{product.origin}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
