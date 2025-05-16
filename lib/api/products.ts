import { Product } from "@/types/products"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getProductBySlug(slug: string, token?: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/product/${slug}`, {
      cache: "no-store",
      credentials: "include",
      headers: token ? { Cookie: `token=${token}` } : {},
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch product", err);
    return null;
  }
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string, token?: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      cache: "no-store",
      credentials: "include",
      headers: token ? { Cookie: `token=${token}` } : {},
    });

    if (!res.ok) return [];

    const allProducts: Product[] = await res.json();

    const related = allProducts
      .filter(p => p.categorySlug === categorySlug && p.slug !== excludeSlug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    return related;
  } catch (err) {
    console.error("Failed to fetch related products", err);
    return [];
  }
}

export async function getAllProducts(token?: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      cache: "no-store",
      credentials: "include",
      headers: token ? { Cookie: `token=${token}` } : {},
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch products. Status:", res.status);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching all products:", err);
    return [];
  }
}

export async function getAdminProducts(token?: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      cache: "no-store",
      credentials: "include",
      headers: token ? { Cookie: `token=${token}` } : {},
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch admin products. Status:", res.status);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching admin products:", err);
    return [];
  }
}
