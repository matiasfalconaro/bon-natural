"use client";

import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useEffect } from "react";

export function useSyncCartWithUser() {
  const { user } = useAuth();
  const { loadCart, resetCartState } = useCart();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      resetCartState();
    }
  }, [user]);
}
