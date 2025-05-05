import ProductPageClient from "./ProductPageClient";
import { cookies } from "next/headers";
import { Product } from "@/types/products";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/product/${slug}`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn("Failed to fetch product:", res.status);
    return null;
  }

  return await res.json();
}

async function getRelatedProducts(categorySlug: string, currentSlug: string): Promise<Product[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn("Failed to fetch related products:", res.status);
    return [];
  }

  const allProducts: Product[] = await res.json();
  return allProducts.filter((p) => p.categorySlug === categorySlug && p.slug !== currentSlug);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = await getRelatedProducts(product.categorySlug, slug);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
