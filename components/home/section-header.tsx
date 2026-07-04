import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  href = "#",
  linkLabel = "Ver todos",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted lg:text-base">{subtitle}</p>
        )}
      </div>
      <Link
        href={href}
        className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
