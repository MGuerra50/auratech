import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-images";
import type { Order } from "@/types/order";

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const mockOrders: Order[] = [
  {
    id: "order-001",
    code: "AT-20481",
    userEmail: "demo@auratech.com",
    createdAt: daysAgo(2),
    status: "processing",
    paymentMethod: "pix",
    items: [
      {
        productId: "teclado-custom",
        title: "Teclado Mecânico Custom TKL",
        image: DEFAULT_PRODUCT_IMAGE,
        quantity: 1,
        unitPrice: 1519,
        variantLabel: "Cherry MX Red",
      },
      {
        productId: "desk-mat",
        title: "Desk Mat Premium XL",
        image: DEFAULT_PRODUCT_IMAGE,
        quantity: 1,
        unitPrice: 279,
      },
    ],
    subtotal: 1798,
    discount: 89.9,
    total: 1708.1,
  },
  {
    id: "order-002",
    code: "AT-19834",
    userEmail: "demo@auratech.com",
    createdAt: daysAgo(8),
    status: "shipped",
    paymentMethod: "credit_card",
    trackingCode: "BR123456789AU",
    items: [
      {
        productId: "monitor-ultrawide",
        title: "Monitor Ultrawide 34\" Curvo",
        image: DEFAULT_PRODUCT_IMAGE,
        quantity: 1,
        unitPrice: 3699,
        variantLabel: "Base premium ajustável",
      },
    ],
    subtotal: 3699,
    discount: 0,
    total: 3699,
  },
  {
    id: "order-003",
    code: "AT-18502",
    userEmail: "demo@auratech.com",
    createdAt: daysAgo(21),
    status: "delivered",
    paymentMethod: "pix",
    items: [
      {
        productId: "cadeira-ergonomica",
        title: "Cadeira Ergonômica Pro",
        image: DEFAULT_PRODUCT_IMAGE,
        quantity: 1,
        unitPrice: 2799,
      },
      {
        productId: "headphone-stand",
        title: "Suporte de Headphone Alumínio",
        image: DEFAULT_PRODUCT_IMAGE,
        quantity: 2,
        unitPrice: 209,
      },
    ],
    subtotal: 3217,
    discount: 160.85,
    total: 3056.15,
  },
  {
    id: "order-004",
    code: "AT-17290",
    userEmail: "demo@auratech.com",
    createdAt: daysAgo(35),
    status: "cancelled",
    paymentMethod: "boleto",
    items: [
      {
        productId: "webcam-4k",
        title: "Webcam 4K Pro Stream",
        image: DEFAULT_PRODUCT_IMAGE,
        quantity: 1,
        unitPrice: 719,
      },
    ],
    subtotal: 719,
    discount: 0,
    total: 719,
  },
];
