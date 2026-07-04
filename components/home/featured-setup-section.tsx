"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/home/product-card";
import { SectionHeader } from "@/components/home/section-header";
import { fetchProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

function FeaturedSetupSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2">
      <div className="h-[520px] animate-pulse rounded-2xl border border-border bg-surface-elevated lg:row-span-2" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-2xl border border-border bg-surface-elevated"
        />
      ))}
    </div>
  );
}

export function FeaturedSetupSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchProducts("featured")
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const [featured, ...rest] = products;

  return (
    <section id="setup-destaque" className="px-4 lg:px-6">
      <SectionHeader
        title="Setup em Destaque"
        subtitle="Uma curadoria completa para o workspace dos sonhos."
      />

      {loading ? (
        <FeaturedSetupSkeleton />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2">
          {featured && (
            <ProductCard
              product={featured}
              featured
              className="lg:row-span-2"
            />
          )}
          {rest.slice(0, 3).map((product, index, array) => (
            <ProductCard
              key={product.id}
              product={product}
              className={
                index === array.length - 1 ? "lg:col-span-2" : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
