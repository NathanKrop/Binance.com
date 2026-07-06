export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(252,213,53,0.16),_transparent_35%),radial-gradient(circle_at_50%_20%,_rgba(68,193,255,0.12),_transparent_30%),#0B0E11] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">323,541,110 users trust us</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              The World’s Leading Cryptocurrency Exchange.
            </h1>
            <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
              Trade over 350 cryptocurrencies with top liquidity, low fees, and award-winning security.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="https://accounts.binance.com/en/register?registerChannel=homepage" className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-bg-primary transition hover:bg-brand-yellow-dim">
                Sign Up
              </a>
              <button className="rounded-full border border-border-default px-6 py-3 text-sm text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
                View Markets
              </button>
            </div>
            <div className="rounded-full border border-brand-yellow/30 bg-brand-yellow/5 px-4 py-2 text-sm text-text-secondary">
              Up to $100 Bonus Only Today
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-default bg-bg-secondary/80 p-4">
                <p className="text-sm text-text-secondary">Users</p>
                <p className="mt-2 text-2xl font-semibold text-white">323M+</p>
              </div>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/80 p-4">
                <p className="text-sm text-text-secondary">24h Volume</p>
                <p className="mt-2 text-2xl font-semibold text-white">$53B+</p>
              </div>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/80 p-4">
                <p className="text-sm text-text-secondary">Assets</p>
                <p className="mt-2 text-2xl font-semibold text-white">$130B+</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-border-default bg-[#11151D]/90 p-6 shadow-xl">
            <div className="space-y-4 rounded-3xl bg-bg-secondary p-5">
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>BTC/USDT</span>
                <span>Spot</span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold text-white">$62,313.47</p>
                  <p className="text-xs text-bear-red">-0.96%</p>
                </div>
                <div className="grid gap-1 text-right text-2xs text-text-secondary">
                  <div>24h H<span className="ml-1 text-text-primary">63,999</span></div>
                  <div>24h L<span className="ml-1 text-text-primary">61,306.84</span></div>
                  <div>Vol<span className="ml-1 text-text-primary">17,978.07</span></div>
                </div>
              </div>
              <div className="grid gap-3 rounded-2xl bg-bg-primary p-4 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Trusted</span>
                  <span className="text-white">24/7 monitoring</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Liquidity</span>
                  <span className="text-text-primary">Deep global pools</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Fees</span>
                  <span className="text-text-primary">Low trading fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
