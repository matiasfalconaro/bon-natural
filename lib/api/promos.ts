import { PromoCombo } from "@/types/promos";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getPromoBySlug(slug: string, token?: string): Promise<PromoCombo | null> {
  try {
    const res = await fetch(`${API_BASE}/api/promo/${slug}`, {
      credentials: "include",
      cache: "no-store",
      headers: token ? { Cookie: `token=${token}` } : {},
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch promo by slug", err);
    return null;
  }
}

export async function getAllPromos(token?: string): Promise<PromoCombo[]> {
  try {
    const res = await fetch(`${API_BASE}/api/promos`, {
      credentials: "include",
      cache: "no-store",
      headers: token ? { Cookie: `token=${token}` } : {},
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch promos", err);
    return [];
  }
}

export async function getRelatedPromos(category: string, excludeSlug: string, token?: string): Promise<PromoCombo[]> {
  try {
    const allPromos = await getAllPromos(token);
    return allPromos
      .filter(p => p.category === category && p.slug !== excludeSlug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } catch (err) {
    console.error("Failed to fetch related promos", err);
    return [];
  }
}
