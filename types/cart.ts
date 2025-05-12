export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    itemType: "Product" | "promo";
  }
  
  export interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    loadCart: () => Promise<void>;
    resetCartState: () => void;
    itemCount: number;
    subtotal: number;
    loading: boolean;
  }
  