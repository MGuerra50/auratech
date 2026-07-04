"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigationItems } from "@/config/admin-navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/admin" className="group flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Aura
            <span className="text-accent">.</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Admin
          </span>
        </Link>
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
                className="flex cursor-not-allowed items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-muted/60"
                aria-disabled="true"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider">
                  Em breve
                </span>
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
