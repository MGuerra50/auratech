import {
  Home,
  LayoutGrid,
  Tag,
  Package,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navigationItems: NavItem[] = [
  { label: "Início", href: "/", icon: Home },
  { label: "Categorias", href: "/categorias", icon: LayoutGrid },
  { label: "Ofertas", href: "/ofertas", icon: Tag },
  { label: "Meus Pedidos", href: "/pedidos", icon: Package },
];
