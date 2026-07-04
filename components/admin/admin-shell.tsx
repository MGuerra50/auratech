"use client";

import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { IconButton } from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/store/auth-store";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("Você saiu da sua conta");
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-surface-elevated lg:hidden"
            aria-label="Abrir menu administrativo"
          >
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-3 rounded-full bg-accent" />
          </button>

          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted lg:block">
            Painel do lojista
          </p>

          {user && (
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 sm:flex">
                <User className="h-4 w-4 text-accent" />
                <span className="max-w-[140px] truncate text-sm text-foreground">
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
          )}
        </header>

        <main className="flex flex-1 flex-col p-4 lg:p-6">{children}</main>
      </div>

      <AdminMobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </div>
  );
}
