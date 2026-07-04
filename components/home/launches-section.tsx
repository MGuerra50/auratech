"use client";

import { ProductGrid } from "@/components/home/product-grid";
import { SectionHeader } from "@/components/home/section-header";
import { launchProducts } from "@/data/products";

export function LaunchesSection() {
  return (
    <section id="lancamentos" className="px-4 lg:px-6">
      <SectionHeader
        title="Lançamentos"
        subtitle="Os equipamentos mais recentes para elevar seu setup."
      />
      <ProductGrid products={launchProducts} className="mt-8" />
    </section>
  );
}
