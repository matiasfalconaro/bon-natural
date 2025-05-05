import BundlePageClient from "./BundlePageClient";
import { cookies } from "next/headers";
import { PromoCombo } from "@/types/promos";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPromoBySlug(slug: string): Promise<PromoCombo | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/promo/${slug}`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn("Failed to fetch promo:", res.status);
    return null;
  }

  return await res.json();
}

async function getRelatedPromos(category: string | undefined, currentSlug: string): Promise<PromoCombo[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/promos`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn("Failed to fetch related promos:", res.status);
    return [];
  }

  const allPromos: PromoCombo[] = await res.json();

  let filtered: PromoCombo[] = [];

  if (category) {
    filtered = allPromos.filter(p => p.category === category && p.slug !== currentSlug);
  }

  // fallback: show random ones if category is missing or filter returned none
  if (filtered.length === 0) {
    filtered = allPromos.filter(p => p.slug !== currentSlug);
  }

  return filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
}

export default async function BundlePage({ params }: Props) {
  const { slug } = await params;
  const promo = await getPromoBySlug(slug);

  if (!promo) {
    return <div>Promo not found</div>;
  }

  const relatedPromos = await getRelatedPromos(promo.category, slug);

  return <BundlePageClient bundle={promo} relatedPromos={relatedPromos} />;
}
