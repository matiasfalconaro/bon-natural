import CategoryPageClient from "./CategoryPageClient"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryPageClient slug={params.slug} />
}
