"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/toast";
import { adminNavigationItems } from "@/config/admin-navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

interface AdminMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminMobileNav({ isOpen, onClose }: AdminMobileNavProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    showToast("Você saiu da sua conta");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="admin-mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="admin-mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu administrativo"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-surface shadow-2xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <Link href="/admin" onClick={onClose} className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-foreground">
                  Aura
                  <span className="text-accent">.</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Admin
                </span>
              </Link>
              <IconButton
                aria-label="Fechar menu"
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </IconButton>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-4">
              {adminNavigationItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                if (item.disabled) {
                  return (
                    <span
                      key={item.href}
                      className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted/60"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "border-l-2 border-accent bg-accent-muted pl-[10px] text-accent"
                        : "border-l-2 border-transparent text-muted hover:bg-surface-elevated hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors duration-200",
                        isActive
                          ? "text-accent"
                          : "text-muted group-hover:text-foreground",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {user && (
              <div className="border-t border-border p-4">
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2">
                  <User className="h-4 w-4 text-accent" />
                  <span className="truncate text-sm text-foreground">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
