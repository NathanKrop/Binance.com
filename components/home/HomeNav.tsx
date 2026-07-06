export function HomeNav() {
  return (
    <header className="border-b border-border-default bg-bg-secondary/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="text-brand-yellow text-xl font-bold tracking-tight">Binance</span>
          <nav className="hidden items-center gap-4 text-sm text-text-secondary md:flex">
            <a href="#" className="transition hover:text-text-primary">Buy Crypto</a>
            <a href="#" className="transition hover:text-text-primary">Markets</a>
            <a href="#" className="transition hover:text-text-primary">Trade</a>
            <a href="#" className="transition hover:text-text-primary">Derivatives</a>
            <a href="#" className="transition hover:text-text-primary">Earn</a>
            <a href="#" className="transition hover:text-text-primary">Wallet</a>
            <a href="#" className="transition hover:text-text-primary">Download</a>
            <a href="#" className="transition hover:text-text-primary">Support</a>
          </nav>
        </div>
        <div className="hidden items-center gap-2 text-xs text-text-secondary md:flex lg:gap-3">
          <button className="rounded-full border border-border-default px-3 py-2 text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
            English
          </button>
          <button className="rounded-full border border-border-default px-3 py-2 text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
            USD-$
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button className="rounded-full border border-border-default px-4 py-2 text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
            Log In
          </button>
          <button className="rounded-full bg-brand-yellow px-4 py-2 text-bg-primary font-semibold transition hover:bg-brand-yellow-dim">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
