import type { PaymentMethod } from "@/types/checkout";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type OrderFilter = "all" | "active" | "delivered";

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  unitPrice: number;
  variantLabel?: string;
}

export interface Order {
  id: string;
  code: string;
  userEmail: string;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  trackingCode?: string;
}
