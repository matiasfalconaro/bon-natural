import BundlePageClient from "./BundlePageClient";
import { cookies } from "next/headers";
import { getPromoBySlug, getRelatedPromos } from "@/lib/api/promos";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BundlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  
  const promo = await getPromoBySlug(slug, token);

  if (!promo) {
    return <div>Promo not found</div>;
  }

  const relatedPromos = await getRelatedPromos(promo.category, slug, token);

  return <BundlePageClient bundle={promo} relatedPromos={relatedPromos} />;
}
