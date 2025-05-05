import ProductPageClient from "./ProductPageClient";
import { cookies } from "next/headers";
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const product = await getProductBySlug(slug, token);

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = await getRelatedProducts(product.categorySlug, slug, token);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
