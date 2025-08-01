"use client";

import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { useCart } from "@/contexts/cart-context";
import BundleDetailsControls from "@/components/promo-details-controls";
import PromoCard from "@/components/promo-card";
import Image from "next/image";
import Link from "next/link";
import type { PromoCombo } from "@/types/promos";
import type { SupportedLanguage } from "@/types/i18n";
import styles from "../page.module.css";

const getLocalized = (
  field: Record<SupportedLanguage, string> | undefined,
  lang: SupportedLanguage
): string => field?.[lang] ?? "N/A";

export default function BundlePageClient({bundle,relatedPromos,}: {
  bundle: PromoCombo;
  relatedPromos: PromoCombo[];
}) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();

  const title = getLocalized(bundle.title, language);
  const description = getLocalized(bundle.description, language);
  const isDiscounted = (bundle.promoPercentage ?? 0) > 0;
  const discountedPrice = isDiscounted
    ? bundle.price * (1 - bundle.promoPercentage! / 100)
    : bundle.price;

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Link href="/bundles" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("promos.viewAll")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative bg-[#f8f5f0] rounded-lg p-6 flex items-center justify-center">
          <div className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded shadow-md z-10">
            {isDiscounted
              ? `${bundle.promoPercentage}% OFF`
              : bundle.promoType === "bulk"
              ? `x${bundle.quantity ?? 1}`
              : bundle.promoType === "gift"
              ? "+1 Free"
              : "Combo"}
          </div>
          <Image
            src={bundle.image1 || "/placeholder.svg"}
            alt={title}
            width={600}
            height={600}
            className="max-w-full h-auto"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mt-1">{title}</h1>
            {isDiscounted ? (
              <p className="text-2xl font-bold mt-2">
                <span className="line-through text-gray-400 mr-2">${bundle.price.toFixed(2)}</span>
                <span className="text-green-600">${discountedPrice.toFixed(2)}</span>
              </p>
            ) : (
              <p className="text-2xl font-bold mt-2">${bundle.price.toFixed(2)}</p>
            )}
            <p className={styles.stock}>
              {bundle.stock > 0
                ? `${t("product.stockAvailable")}: ${bundle.stock}`
                : t("product.outOfStock")}
            </p>
          </div>

          <p className="text-muted-foreground">{description}</p>

          <BundleDetailsControls bundle={bundle} />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">{t("promos.description")}</TabsTrigger>
              <TabsTrigger value="nutrition">{t("promos.nutrition")}</TabsTrigger>
              <TabsTrigger value="ingredients">{t("promos.ingredients")}</TabsTrigger>
              <TabsTrigger value="origin">{t("promos.origin")}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-4">
              <p>{description}</p>
            </TabsContent>

            <TabsContent value="nutrition" className="pt-4">
              <div className="space-y-2">
                <p><strong>{t("nutrition.servingSize")}:</strong> {bundle.nutritionalInfo?.servingSize || "N/A"}</p>
                <p><strong>{t("nutrition.calories")}:</strong> {bundle.nutritionalInfo?.calories || "N/A"}</p>
                <p><strong>{t("nutrition.totalFat")}:</strong> {bundle.nutritionalInfo?.totalFat || "N/A"}</p>
                <p><strong>{t("nutrition.sodium")}:</strong> {bundle.nutritionalInfo?.sodium || "N/A"}</p>
                <p><strong>{t("nutrition.totalCarbs")}:</strong> {bundle.nutritionalInfo?.totalCarbs || "N/A"}</p>
                <p><strong>{t("nutrition.sugars")}:</strong> {bundle.nutritionalInfo?.sugars || "N/A"}</p>
                <p><strong>{t("nutrition.protein")}:</strong> {bundle.nutritionalInfo?.protein || "N/A"}</p>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="pt-4">
              <p>{getLocalized(bundle.ingredients, language)}</p>
            </TabsContent>

            <TabsContent value="origin" className="pt-4">
              <p>{getLocalized(bundle.origin, language)}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {relatedPromos.length > 0 ? (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t("promos.relatedPromos")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedPromos.map((promo) => (
              <PromoCard key={promo.slug} promo={promo} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-16 text-muted-foreground">{t("promos.noRelatedPromos")}</div>
      )}
    </div>
  );
}
