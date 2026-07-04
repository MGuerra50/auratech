"use client";

import { Bell, Heart, Search, ShoppingBag } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onCartOpen: () => void;
  onMobileNavOpen: () => void;
}

export function Header({ onCartOpen, onMobileNavOpen }: HeaderProps) {
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

      <div className="relative flex-1 max-w-lg">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          type="search"
          placeholder="Buscar produtos..."
          className="pl-9"
          aria-label="Buscar produtos"
        />
      </div>

      <div className="flex items-center gap-1">
        <IconButton aria-label="Favoritos" variant="ghost" size="md">
          <Heart className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="Notificações" variant="ghost" size="md">
          <Bell className="h-4 w-4" />
        </IconButton>
        <IconButton
          aria-label="Abrir carrinho"
          variant="ghost"
          size="md"
          onClick={onCartOpen}
        >
          <ShoppingBag className="h-4 w-4" />
        </IconButton>
      </div>
    </header>
  );
}
