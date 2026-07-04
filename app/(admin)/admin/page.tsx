import type { Metadata } from "next";
import { DashboardStatCard } from "@/components/admin/dashboard-stat-card";
import {
  dashboardStats,
  maxMonthlyRevenue,
  monthlyRevenue,
} from "@/data/admin-dashboard";
import { formatPrice } from "@/lib/format-price";

export const metadata: Metadata = {
  title: "Dashboard | Aura Tech Admin",
  description: "Painel administrativo da Aura Tech",
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Visão geral
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted">
          Resumo simulado do desempenho da loja no mês atual.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <DashboardStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Faturamento mensal
            </h2>
            <p className="mt-1 text-sm text-muted">
              Comparativo simulado dos últimos 3 meses.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Abr – Jun 2026
          </p>
        </div>

        <ul className="mt-6 space-y-4">
          {monthlyRevenue.map((item) => {
            const width = Math.round((item.value / maxMonthlyRevenue) * 100);

            return (
              <li key={item.month}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted">{item.month}</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(item.value)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
