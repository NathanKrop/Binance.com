const coins = [
  { symbol: "BTC", name: "Bitcoin", price: "$62,302.01", change: "-0.95%" },
  { symbol: "ETH", name: "Ethereum", price: "$1,757.68", change: "-1.13%" },
  { symbol: "BNB", name: "BNB", price: "$578.82", change: "-1.71%" },
  { symbol: "XRP", name: "XRP", price: "$1.13", change: "-1.22%" },
  { symbol: "SOL", name: "Solana", price: "$100.11", change: "+0.80%" },
  { symbol: "ADA", name: "Cardano", price: "$0.38", change: "+0.12%" },
];

export function PopularCoins() {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Crypto watchlist</p>
          <h2 className="text-2xl font-semibold text-white">Popular coins</h2>
        </div>
        <button className="rounded-full border border-border-default px-4 py-2 text-xs text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
          Browse all markets
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {coins.map((coin) => (
          <div key={coin.symbol} className="rounded-3xl border border-border-default bg-bg-secondary/90 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">{coin.symbol}</p>
                <p className="mt-2 text-lg font-semibold text-white">{coin.name}</p>
              </div>
              <span className="rounded-full bg-bg-primary px-3 py-1 text-sm text-text-secondary">{coin.change}</span>
            </div>
            <p className="mt-6 text-2xl font-semibold text-white">{coin.price}</p>
            <p className="mt-2 text-sm text-text-secondary">Trade now with advanced charts and low fees.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
