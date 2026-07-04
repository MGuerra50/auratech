import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/data/admin-dashboard";

interface DashboardStatCardProps {
  stat: DashboardStat;
}

function formatStatValue(stat: DashboardStat) {
  if (stat.format === "currency") {
    return formatPrice(stat.value);
  }

  return new Intl.NumberFormat("pt-BR").format(stat.value);
}

function TrendIcon({ trend }: { trend: DashboardStat["trend"] }) {
  if (trend === "up") {
    return <ArrowUpRight className="h-3.5 w-3.5" />;
  }

  if (trend === "down") {
    return <ArrowDownRight className="h-3.5 w-3.5" />;
  }

  return <Minus className="h-3.5 w-3.5" />;
}

export function DashboardStatCard({ stat }: DashboardStatCardProps) {
  const changeLabel =
    stat.changePercent === 0
      ? "Sem variação"
      : `${stat.changePercent > 0 ? "+" : ""}${stat.changePercent}% vs mês anterior`;

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm text-muted">{stat.label}</p>
      <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
        {formatStatValue(stat)}
      </p>
      <div
        className={cn(
          "mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
          stat.trend === "up" && "bg-accent-muted text-accent",
          stat.trend === "down" && "bg-red-500/10 text-red-400",
          stat.trend === "neutral" && "bg-surface-elevated text-muted",
        )}
      >
        <TrendIcon trend={stat.trend} />
        {changeLabel}
      </div>
    </article>
  );
}
