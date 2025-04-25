import { getPromoBySlug } from "@/lib/api/promos"
import BundlePageClient from "./BundlePageClient"

export default async function BundlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // 🔥 await params!

  const bundle = await getPromoBySlug(slug)

  return <BundlePageClient bundle={bundle} />
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
