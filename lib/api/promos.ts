import { PromoCombo } from "@/types/promos"

export async function getAllPromos(): Promise<PromoCombo[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/promos`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch promos", error);
    return [];
  }
}

export async function getPromoBySlug(slug: string): Promise<PromoCombo | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/promo/${slug}`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch promo by slug", error);
    return null;
  }
}
