export function CartEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
      <p className="font-display text-base font-medium text-foreground">
        Seu carrinho está vazio
      </p>
      <p className="text-center text-sm text-muted">
        Adicione produtos para começar suas compras.
      </p>
    </div>
  );
}
