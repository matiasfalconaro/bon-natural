import { getProductBySlug } from "@/data/products"
import ProductPageClient from "./ProductPageClient"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  return <ProductPageClient product={product} />
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
