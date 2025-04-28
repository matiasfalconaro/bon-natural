import { getProductBySlug, getRelatedProducts } from "@/lib/api/products"
import ProductPageClient from "./ProductPageClient"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const product = await getProductBySlug(slug)
  if (!product) return <div>Product not found</div>

  const relatedProducts = await getRelatedProducts(product.categorySlug, product.slug)

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />
}


/**
Temporary workaround to avoid the Next.js error:
"params.slug must be awaited".

`params` is wrapped in a Promise to comply with Next.js app router expectations
for dynamic routes, avoiding a runtime error when destructuring.

Potential issue: this is a non-standard approach and might not be supported
in future Next.js versions or static generation (SSG/ISR).

TODO: Make `getXBySlug` async and use `await getXBySlug(params.slug)` directly.
*/
