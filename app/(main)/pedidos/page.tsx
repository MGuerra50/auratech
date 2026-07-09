import type { Metadata } from "next";
import { OrdersContent } from "@/components/orders/orders-content";

export const metadata: Metadata = {
  title: "Meus Pedidos | Aura Tech",
  description: "Acompanhe o status e o histórico dos seus pedidos na Aura Tech.",
};

export default function OrdersPage() {
  return <OrdersContent />;
}
