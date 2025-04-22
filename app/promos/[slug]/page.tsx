import { getBundleBySlug } from "@/data/combos"
import BundlePageClient from "./BundlePageClient"

export default async function BundlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const bundle = getBundleBySlug(slug)

  return <BundlePageClient bundle={bundle} />
}
