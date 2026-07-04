import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  cartLineId: string;
  productId: string;
  variantId?: string;
  variantLabel?: string;
  title: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export interface AddItemPayload {
  productId: string;
  title: string;
  image: string;
  unitPrice: number;
  quantity?: number;
  variantId?: string;
  variantLabel?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (payload: AddItemPayload) => void;
  removeItem: (cartLineId: string) => void;
  updateQuantity: (cartLineId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

function buildCartLineId(productId: string, variantId?: string) {
  return `${productId}:${variantId ?? "default"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (payload) => {
        const quantity = payload.quantity ?? 1;
        const cartLineId = buildCartLineId(payload.productId, payload.variantId);

        set((state) => {
          const existing = state.items.find(
            (item) => item.cartLineId === cartLineId,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.cartLineId === cartLineId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                cartLineId,
                productId: payload.productId,
                variantId: payload.variantId,
                variantLabel: payload.variantLabel,
                title: payload.title,
                image: payload.image,
                unitPrice: payload.unitPrice,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (cartLineId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartLineId !== cartLineId),
        }));
      },

      updateQuantity: (cartLineId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartLineId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.cartLineId === cartLineId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      itemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0,
        ),
    }),
    {
      name: "auratech-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
