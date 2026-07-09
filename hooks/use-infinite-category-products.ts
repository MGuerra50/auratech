"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProductsByCategory } from "@/lib/api/products";
import type { Product } from "@/types/product";

const PAGE_SIZE = 25;
const TRIGGER_INDEX_MOD = 25;
const TRIGGER_POSITION = 20;

function getTriggerIndex(batchIndex: number) {
  return batchIndex * TRIGGER_INDEX_MOD + (TRIGGER_POSITION - 1);
}

export function useInfiniteCategoryProducts(categorySlug: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(0);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const triggeredBatchesRef = useRef(new Set<number>());

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoadingMore(true);

    try {
      const data = await fetchProductsByCategory(
        categorySlug,
        offsetRef.current,
        PAGE_SIZE,
      );

      setProducts((current) => [...current, ...data.products]);
      offsetRef.current += data.products.length;
      hasMoreRef.current = data.hasMore;
      setHasMore(data.hasMore);
      setError(null);
    } catch {
      setError("Não foi possível carregar os produtos.");
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    let cancelled = false;

    offsetRef.current = 0;
    hasMoreRef.current = true;
    triggeredBatchesRef.current = new Set();
    loadingRef.current = false;

    fetchProductsByCategory(categorySlug, 0, PAGE_SIZE)
      .then((data) => {
        if (cancelled) return;

        setProducts(data.products);
        offsetRef.current = data.products.length;
        hasMoreRef.current = data.hasMore;
        setHasMore(data.hasMore);
        setError(null);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Não foi possível carregar os produtos.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  const observeItem = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (!element) return;

      const batchIndex = Math.floor(index / TRIGGER_INDEX_MOD);
      const triggerIndex = getTriggerIndex(batchIndex);

      if (index !== triggerIndex) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            hasMoreRef.current &&
            !loadingRef.current &&
            !triggeredBatchesRef.current.has(batchIndex)
          ) {
            triggeredBatchesRef.current.add(batchIndex);
            void loadMore();
          }
        },
        { threshold: 0.4 },
      );

      observer.observe(element);

      return () => observer.disconnect();
    },
    [loadMore],
  );

  return {
    products,
    loading,
    loadingMore,
    hasMore,
    error,
    observeItem,
  };
}
