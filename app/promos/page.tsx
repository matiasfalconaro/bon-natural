"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/contexts/socket-context";
import { getAllPromos } from "@/lib/api/promos";
import { PromoCombo } from "@/types/promos";
import { useLanguage } from "@/contexts/language-context";
import PromoCard from "@/components/promo-card";
import ProductFilter from "@/components/product-filter";
import SearchBar from "@/components/search-bar";
import styles from "../products/page.module.css";

export default function PromosPage() {
  const { language, t } = useLanguage();
  const lang = language as "en" | "es" | "fr";
  const socket = useSocket();

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [allPromos, setAllPromos] = useState<PromoCombo[]>([]);
  const [filteredPromos, setFilteredPromos] = useState<PromoCombo[]>([]);
  const initialized = useRef(false);

  const loadPromos = async () => {
    const promos = await getAllPromos();
    setAllPromos(promos);
    setFilteredPromos(applyFilters(promos, searchTerm));
    initialized.current = true;
  };

  useEffect(() => {
    if (!initialized.current) {
      loadPromos();
    }
  }, [searchTerm, lang]);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = () => {
      loadPromos();
    };

    socket.on("stockUpdated", handleUpdate);
    return () => {
      socket.off("stockUpdated", handleUpdate);
    };
  }, [socket]);

  const applyFilters = (
    promos: PromoCombo[],
    term: string,
    filters?: {
      categories?: string[];
      priceRange?: [number, number];
      dietary?: string[];
    }
  ): PromoCombo[] => {
    let result = [...promos];
    const searchLower = term.toLowerCase();

    if (filters?.categories?.length) {
      result = result.filter((p) => filters.categories!.includes(p.category));
    }

    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    if (filters?.dietary?.length) {
      result = result.filter((p) =>
        filters.dietary!.some((d) => p.dietary.includes(d))
      );
    }

    if (term) {
      result = result.filter(
        (p) =>
          p.title[lang].toLowerCase().includes(searchLower) ||
          p.description[lang].toLowerCase().includes(searchLower)
      );
    }

    return result;
  };

  const handleFilter = (filters: {
    categories: string[];
    priceRange: [number, number];
    dietary: string[];
    searchTerm: string;
  }) => {
    const filtered = applyFilters(allPromos, filters.searchTerm || searchTerm, filters);
    setFilteredPromos(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <SearchBar />
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductFilter onFilter={handleFilter} initialSearchTerm={searchTerm} />
        </div>

        <div className={styles.products}>
          {filteredPromos.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("product.noResults")}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredPromos.map((promo) => (
                <PromoCard key={promo.slug} promo={promo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
