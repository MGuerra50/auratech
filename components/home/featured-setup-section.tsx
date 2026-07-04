"use client";

import { ProductCard } from "@/components/home/product-card";
import { SectionHeader } from "@/components/home/section-header";
import { featuredSetupProducts } from "@/data/products";

export function FeaturedSetupSection() {
  const [featured, ...rest] = featuredSetupProducts;

  return (
    <section id="setup-destaque" className="px-4 lg:px-6">
      <SectionHeader
        title="Setup em Destaque"
        subtitle="Uma curadoria completa para o workspace dos sonhos."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2">
        {featured && (
          <ProductCard
            product={featured}
            featured
            className="lg:row-span-2"
          />
        )}
        {rest.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
