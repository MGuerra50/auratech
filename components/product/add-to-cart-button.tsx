"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { getProductUnitPrice } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  variantId?: string;
  variantLabel?: string;
  quantity?: number;
  openDrawer?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  variantId,
  variantLabel,
  quantity = 1,
  openDrawer = false,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { showToast } = useToast();

  const handleClick = () => {
    addItem({
      productId: product.id,
      title: product.title,
      image: product.image,
      unitPrice: getProductUnitPrice(product, variantId),
      quantity,
      variantId,
      variantLabel,
    });

    showToast(`${product.title} adicionado ao carrinho`);

    if (openDrawer) {
      openCart();
    }
  };

  return (
    <Button size="lg" className={className} onClick={handleClick}>
      <ShoppingBag className="h-4 w-4" />
      Adicionar ao carrinho
    </Button>
  );
}
