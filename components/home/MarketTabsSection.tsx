const popularMarkets = [
  { symbol: "BTC", name: "Bitcoin", price: "$62,360.01", change: "-0.71%" },
  { symbol: "ETH", name: "Ethereum", price: "$1,762.90", change: "-0.65%" },
  { symbol: "BNB", name: "BNB", price: "$579.47", change: "-1.45%" },
  { symbol: "XRP", name: "XRP", price: "$1.13", change: "-0.89%" },
  { symbol: "ASTER", name: "Aster", price: "$0.634", change: "-1.09%" },
];

export function MarketTabsSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Market watch</p>
          <h2 className="text-2xl font-semibold text-white">Popular</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border-default bg-bg-primary/80 px-2 py-1">
          <button className="rounded-full bg-brand-yellow px-4 py-2 text-xs font-semibold text-bg-primary">Popular</button>
          <button className="rounded-full px-4 py-2 text-xs text-text-secondary transition hover:text-text-primary">New Listing</button>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {popularMarkets.map((market) => (
          <a key={market.symbol} href="#" className="rounded-[1.75rem] border border-border-default bg-bg-primary/80 p-5 transition hover:border-brand-yellow hover:bg-bg-secondary">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#11151D]" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-secondary">{market.symbol}</p>
                <p className="text-lg font-semibold text-white">{market.name}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xl font-semibold text-white">{market.price}</p>
              <span className="rounded-full bg-bear-red/10 px-3 py-1 text-sm text-bear-red">{market.change}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
