import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const adminNavigationItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/produtos", icon: Package, disabled: true },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart, disabled: true },
  { label: "Voltar à loja", href: "/", icon: ArrowLeft },
];
