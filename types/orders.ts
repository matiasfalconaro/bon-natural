export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export interface OrderItem {
  productId: string;
  itemType: "Product" | "promo";
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}