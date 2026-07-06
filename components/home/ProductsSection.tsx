const products = [
  { title: "Spot Trading", description: "Buy and sell top crypto pairs with deep liquidity.", badge: "Top" },
  { title: "Derivatives", description: "Trade futures and options with advanced order tools.", badge: "New" },
  { title: "Earn", description: "Stake, savings, and liquidity products for passive yield.", badge: "Earn" },
  { title: "Wallet", description: "Securely store crypto and manage your assets in one place.", badge: "Secure" },
];

export function ProductsSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Products</p>
          <h2 className="text-2xl font-semibold text-white">Everything you need to trade crypto.</h2>
        </div>
        <button className="rounded-full border border-border-default px-4 py-2 text-xs text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
          Explore Products
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.title} className="rounded-3xl border border-border-default bg-bg-primary/80 p-5 transition hover:border-brand-yellow hover:bg-bg-secondary">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">{product.badge}</p>
              <span className="h-10 w-10 rounded-2xl bg-[#11151D]/80" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">{product.title}</h3>
            <p className="mt-3 text-sm text-text-secondary">{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
