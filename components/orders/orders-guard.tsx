"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore, type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

interface OrdersGuardProps {
  children: ReactNode;
}

function subscribeToHydration(onStoreChange: () => void) {
  const unsubscribe = useAuthStore.persist.onFinishHydration(onStoreChange);
  return () => {
    unsubscribe();
  };
}

function getHydratedSnapshot() {
  return useAuthStore.persist.hasHydrated();
}

function getHydrationServerSnapshot() {
  return false;
}

export function OrdersGuard({ children }: OrdersGuardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getHydrationServerSnapshot,
  );

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login?redirect=/pedidos");
    }
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <p className="text-sm text-muted">Carregando seus pedidos...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
