import { cn } from "@/lib/utils";

interface CheckoutSectionProps {
  step: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CheckoutSection({
  step,
  title,
  children,
  className,
}: CheckoutSectionProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-surface p-6",
        className,
      )}
    >
      <h2 className="mb-5 font-display text-lg font-semibold text-foreground">
        {step}. {title}
      </h2>
      {children}
    </section>
  );
}
