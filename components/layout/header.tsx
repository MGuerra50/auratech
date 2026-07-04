"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Bell, Heart, LogOut, Search, ShoppingBag, User } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";

interface HeaderProps {
  onMobileNavOpen: () => void;
}

export function Header({ onMobileNavOpen }: HeaderProps) {
  const openCart = useCartStore((state) => state.openCart);
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { showToast } = useToast();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleLogout = () => {
    logout();
    showToast("Você saiu da sua conta");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <button
        type="button"
        onClick={onMobileNavOpen}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-surface-elevated lg:hidden"
        aria-label="Abrir menu de navegação"
      >
        <span className="h-0.5 w-5 rounded-full bg-foreground" />
        <span className="h-0.5 w-5 rounded-full bg-foreground" />
        <span className="h-0.5 w-3 rounded-full bg-accent" />
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <div className="relative w-full max-w-lg">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            type="search"
            placeholder="Buscar produtos..."
            className="pl-9"
            aria-label="Buscar produtos"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
        {mounted && user ? (
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated hover:text-accent"
            >
              Painel
            </Link>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5">
              <User className="h-4 w-4 text-accent" />
              <span className="max-w-[120px] truncate text-sm text-foreground">
                {user.name}
              </span>
            </div>
            <IconButton
              aria-label="Sair da conta"
              variant="ghost"
              size="md"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </IconButton>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated hover:text-accent sm:inline-flex"
          >
            Entrar
          </Link>
        )}

        <IconButton aria-label="Favoritos" variant="ghost" size="md">
          <Heart className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="Notificações" variant="ghost" size="md">
          <Bell className="h-4 w-4" />
        </IconButton>
        <div className="relative">
          <IconButton
            aria-label="Abrir carrinho"
            variant="ghost"
            size="md"
            onClick={openCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </IconButton>
          {mounted && itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-background">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </div>
        </div>
      </div>
    </header>
  );
}
