import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-muted text-accent">
        <ShoppingBag className="h-6 w-6" />
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
        Nenhum pedido ainda
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Quando você finalizar uma compra, seus pedidos aparecerão aqui com status
        e detalhes de entrega.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
      >
        Explorar produtos
      </Link>
    </div>
  );
}
