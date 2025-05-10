"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/contexts/socket-context";
import { useLanguage } from "@/contexts/language-context";
import { Product } from "@/types/products";
import ProductCard from "@/components/product-card";
import ProductFilter from "@/components/product-filter";
import SearchBar from "@/components/search-bar";
import styles from "./page.module.css";

type SupportedLanguage = "en" | "es" | "fr";

export default function ProductsPage() {
  const { language, t } = useLanguage();
  const lang = language as SupportedLanguage;

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const initialized = useRef(false);
  const socket = useSocket();

  const applyFilters = (
    products: Product[],
    term: string,
    filters?: {
      categories?: string[];
      priceRange?: [number, number];
      dietary?: string[];
    }
  ) => {
    let result = [...products];
    const searchLower = term.toLowerCase();

    if (filters?.categories?.length) {
      result = result.filter((p) => filters.categories!.includes(p.categorySlug));
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
          p.category[lang].toLowerCase().includes(searchLower) ||
          p.dietary.some((d) => d.toLowerCase().includes(searchLower))
      );
    }

    return result;
  };

  const fetchAllProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
        cache: "no-store",
        credentials: "include",
      });

      if (res.status === 401) {
        setAllProducts([]);
        setFilteredProducts([]);
        return;
      }

      if (!res.ok) {
        console.error("Failed to fetch products:", res.status);
        return;
      }

      const products: Product[] = await res.json();
      setAllProducts(products);
      setFilteredProducts(applyFilters(products, searchTerm));
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      initialized.current = true;
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      fetchAllProducts();
    }
  }, [searchTerm, lang]);

useEffect(() => {
  if (!socket) return;

  const handleStockUpdate = () => {
    fetchAllProducts();
  };

  socket.on("stockUpdated", handleStockUpdate);

  return () => {
    if (socket) {
      socket.off("stockUpdated", handleStockUpdate);
    }
  };
  }, [socket, searchTerm]);

  const handleFilter = (filters: {
    categories: string[];
    priceRange: [number, number];
    dietary: string[];
    searchTerm: string;
  }) => {
    const filtered = applyFilters(allProducts, filters.searchTerm || searchTerm, filters);
    setFilteredProducts(filtered);
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
          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("product.noResults")}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
