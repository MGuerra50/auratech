import Link from "next/link";

export function AuthLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <Link href="/" className="mb-8 group flex items-center gap-2">
        <span className="font-display text-2xl font-bold tracking-tight text-foreground">
          Aura
          <span className="text-accent">.</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Tech
        </span>
      </Link>
      {children}
    </div>
  );
}
