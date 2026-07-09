import { HorizontalBanner } from "@/components/ui/horizontal-banner";

interface OrdersHeroProps {
  userName: string;
  orderCount: number;
}

export function OrdersHero({ userName, orderCount }: OrdersHeroProps) {
  return (
    <HorizontalBanner contentClassName="px-6 py-8 lg:px-10 lg:py-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        Área do cliente
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
        Meus Pedidos
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted lg:text-base">
        Olá, {userName}. Acompanhe o status das suas compras, rastreio e
        histórico de pedidos na Aura Tech.
      </p>
      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
        {orderCount} {orderCount === 1 ? "pedido" : "pedidos"} no histórico
      </p>
    </HorizontalBanner>
  );
}
