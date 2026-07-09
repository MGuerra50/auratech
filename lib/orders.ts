import { mockOrders } from "@/data/orders";
import type { Order, OrderFilter } from "@/types/order";

export function getOrdersByUserEmail(email: string): Order[] {
  return mockOrders
    .filter((order) => order.userEmail === email)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function filterOrders(orders: Order[], filter: OrderFilter): Order[] {
  if (filter === "all") return orders;

  if (filter === "active") {
    return orders.filter(
      (order) => order.status === "processing" || order.status === "shipped",
    );
  }

  return orders.filter((order) => order.status === "delivered");
}

export function formatOrderDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const orderStatusLabels: Record<Order["status"], string> = {
  processing: "Em separação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const paymentMethodLabels: Record<Order["paymentMethod"], string> = {
  credit_card: "Cartão de crédito",
  pix: "PIX",
  boleto: "Boleto",
};
