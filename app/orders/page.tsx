"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import Link from "next/link";
import styles from "./orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5100/api/orders", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <ShoppingBag className="mr-2 h-6 w-6" />
          {t("user.orders")}
        </h1>
        <Link href="/home" className={styles.backLink}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("orders.back")}
        </Link>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className={styles.emptyCart}>
          <ShoppingBag className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>{t("orders.empty")}</h2>
          <Button asChild className={styles.shopButton}>
            <Link href="/products">{t("hero.shopNow")}</Link>
          </Button>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={styles.content}>
            <h2 className="text-lg font-semibold mb-2">
              {t("orders.orderId")}: {order._id}
            </h2>
            <div className={styles.cartItems}>
              {order.items.map((item: any, index: number) => (
                <div key={`${item.productId}-${index}`} className={styles.cartItem}>
                  <div className={styles.product}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className={styles.productImage}
                    />
                    <div className={styles.productInfo}>
                      <h3 className={styles.productTitle}>{item.title}</h3>
                    </div>
                  </div>
                  <div className={styles.price}>${item.price.toFixed(2)}</div>
                  <div className={styles.quantity}>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                  </div>
                  <div className={styles.total}>${(item.price * item.quantity).toFixed(2)}</div>
                  <div className={styles.action}></div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>{t("cart.total")}</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {t("orders.placedOn")}: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
