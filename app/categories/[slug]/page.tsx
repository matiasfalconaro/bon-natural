"use client";

import CategoryPageClient from "./CategoryPageClient";

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CategoryPageClient slug={params.slug} />;
}