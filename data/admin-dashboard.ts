export type DashboardTrend = "up" | "down" | "neutral";

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  changePercent: number;
  trend: DashboardTrend;
  format: "currency" | "number";
}

export interface MonthlyRevenue {
  month: string;
  value: number;
}

export const dashboardStats: DashboardStat[] = [
  {
    id: "revenue",
    label: "Faturamento do mês",
    value: 128450,
    changePercent: 12.4,
    trend: "up",
    format: "currency",
  },
  {
    id: "orders",
    label: "Pedidos do mês",
    value: 284,
    changePercent: 8.1,
    trend: "up",
    format: "number",
  },
  {
    id: "avg-ticket",
    label: "Ticket médio",
    value: 452.29,
    changePercent: 3.6,
    trend: "up",
    format: "currency",
  },
  {
    id: "active-products",
    label: "Produtos ativos",
    value: 8,
    changePercent: 0,
    trend: "neutral",
    format: "number",
  },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Abril", value: 98200 },
  { month: "Maio", value: 114300 },
  { month: "Junho", value: 128450 },
];

export const maxMonthlyRevenue = Math.max(
  ...monthlyRevenue.map((item) => item.value),
);
