"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore, type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

interface AdminGuardProps {
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

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getHydrationServerSnapshot,
  );

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login?redirect=/admin");
    }
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted">Carregando painel...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
