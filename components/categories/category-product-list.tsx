"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryProductListItem } from "@/components/categories/category-product-list-item";
import { useInfiniteCategoryProducts } from "@/hooks/use-infinite-category-products";
import type { Category } from "@/types/category";

interface CategoryProductListProps {
  category: Category;
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-2xl border border-border bg-surface-elevated"
        />
      ))}
    </div>
  );
}

export function CategoryProductList({ category }: CategoryProductListProps) {
  const { products, loading, loadingMore, hasMore, error, observeItem } =
    useInfiniteCategoryProducts(category.slug);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/categorias"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às categorias
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
            {category.name}
          </h1>
          <p className="mt-1 text-sm text-muted">{category.tagline}</p>
        </div>

        {!loading && (
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {products.length} itens carregados
            {hasMore ? " · mais disponíveis" : " · fim da lista"}
          </p>
        )}
      </div>

      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          {error}
        </p>
      ) : products.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          Nenhum produto encontrado nesta categoria.
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((product, index) => (
            <CategoryProductListItem
              key={product.id}
              product={product}
              index={index}
              observeItem={observeItem}
            />
          ))}
        </div>
      )}

      {loadingMore && (
        <p className="text-center text-sm text-muted">Carregando mais produtos...</p>
      )}
    </section>
  );
}
