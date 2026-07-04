import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Aura
              <span className="text-accent">.</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Tech
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à loja
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
        {children}
      </main>
    </div>
  );
}
