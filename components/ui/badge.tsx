import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline" | "muted";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-elevated text-foreground border border-border",
  accent: "bg-accent-muted text-accent border border-accent/20",
  outline: "bg-transparent text-foreground border border-border",
  muted: "bg-surface text-muted border border-border-subtle",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs uppercase tracking-wider",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
