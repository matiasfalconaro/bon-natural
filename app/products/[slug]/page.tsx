import { getProductBySlug } from "@/data/products"
import ProductPageClient from "./ProductPageClient"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  return <ProductPageClient product={product} />
}