const markets = [
  { symbol: "BTC", name: "Bitcoin", price: "$62,302.01", change: "-0.95%" },
  { symbol: "ETH", name: "Ethereum", price: "$1,757.68", change: "-1.13%" },
  { symbol: "BNB", name: "BNB", price: "$578.82", change: "-1.71%" },
  { symbol: "XRP", name: "XRP", price: "$1.13", change: "-1.22%" },
  { symbol: "ASTER", name: "Aster", price: "$0.635", change: "-1.09%" },
];

export function MarketTicker() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6 shadow-[0_0_80px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Popular markets</p>
          <h2 className="text-2xl font-semibold text-white">Top crypto prices</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-border-default px-4 py-2 text-xs text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
            View All Coins
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {markets.map((market) => (
          <div key={market.symbol} className="rounded-[1.75rem] border border-border-default bg-bg-secondary/80 p-5 transition hover:border-brand-yellow/30 hover:bg-bg-secondary">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-text-secondary">{market.name}</p>
                <p className="mt-2 text-xl font-semibold text-white">{market.price}</p>
              </div>
              <span className={market.change.startsWith("+") ? "rounded-full bg-bull-green/10 px-3 py-1 text-sm text-bull-green" : "rounded-full bg-bear-red/10 px-3 py-1 text-sm text-bear-red"}>
                {market.change}
              </span>
            </div>
            <p className="mt-4 text-xs text-text-secondary">Fast execution and deep liquidity for top crypto markets.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
