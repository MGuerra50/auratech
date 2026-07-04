"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import type { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants?.[0]?.id,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      <ProductGallery images={product.images} title={product.title} />
      <ProductInfo
        product={product}
        selectedVariantId={selectedVariantId}
        onVariantChange={setSelectedVariantId}
      />
    </div>
  );
}
