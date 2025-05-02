"use client";

import { createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { CartItem, CartContextType } from "@/types/cart";


const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldLoadCart, setShouldLoadCart] = useState(false);

  const API_URL = "http://localhost:5100";

  const loadCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token, skipping cart fetch.");
      resetCartState();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.warn("Cart fetch failed:", res.status);
        setItems([]);
        return;
      }

      const data = await res.json();
      const mappedItems = data.items.map((item: any) => {
        const isProduct = !!item.product;
        const base = isProduct ? item.product : item.promo;
      
        return {
          id: base?._id ?? item._id ?? Math.random().toString(),
          title: base?.title?.en ?? "Unnamed Item",
          price: base?.price ?? 0,
          image: base?.image || base?.image1 || "/placeholder.svg",
          quantity: item.quantity ?? 1,
          itemType: isProduct ? "product" : "promo",
        };
      });

      setItems(mappedItems);
    } catch (error) {
      console.error("Failed to load cart", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldLoadCart) {
      loadCart();
    }
  }, [shouldLoadCart]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShouldLoadCart(true);
    }
  }, []);

  const addItem = async (item: CartItem) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      });
      setItems((prev) => [...prev, item]);
    } catch (error) {
      console.error("Failed to add item", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/cart/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      resetCartState();
      return;
    }
  
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
        credentials: "include",
      });
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    } finally {
      setLoading(false);
    }
  };

  const resetCartState = () => {
    setItems([]);
    setLoading(false);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        loadCart,
        resetCartState,
        itemCount,
        subtotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
