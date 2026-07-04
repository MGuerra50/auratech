"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/home/product-grid";
import { SectionHeader } from "@/components/home/section-header";
import { fetchProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

function LaunchesSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-2xl border border-border bg-surface-elevated"
        />
      ))}
    </div>
  );
}

export function LaunchesSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchProducts("launch")
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

  return (
    <section id="lancamentos" className="px-4 lg:px-6">
      <SectionHeader
        title="Lançamentos"
        subtitle="Os equipamentos mais recentes para elevar seu setup."
      />
      {loading ? (
        <LaunchesSkeleton />
      ) : (
        <ProductGrid products={products} className="mt-8" />
      )}
    </section>
  );
}
