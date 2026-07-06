"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTicker } from "@hooks/useTicker";
import clsx from "clsx";

const ALL_PAIRS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT",
  "ADAUSDT", "AVAXUSDT", "DOTUSDT", "MATICUSDT", "LINKUSDT", "LTCUSDT",
  "UNIUSDT", "ATOMUSDT", "ETCUSDT", "XLMUSDT", "NEARUSDT", "APTUSDT",
];

interface Props {
  symbol: string;
}

export function TopBar({ symbol }: Props) {
  const { ticker, wsStatus } = useTicker(symbol);
  const [showPairs, setShowPairs] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isPositive = ticker ? parseFloat(ticker.priceChangePercent) >= 0 : true;

  const filtered = ALL_PAIRS.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowPairs(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchSymbol(pair: string) {
    setShowPairs(false);
    setSearch("");
    router.push(`/trade/${pair}`);
  }

  return (
    <header className="flex items-center h-10 px-3 bg-bg-secondary border-b border-border-default shrink-0 gap-4 overflow-x-auto">
      {/* Logo */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-brand-yellow font-bold text-base tracking-tight">▲ Binance</span>
      </div>

      {/* Searchable symbol selector */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setShowPairs((v) => !v)}
          className="flex items-center gap-1.5 hover:bg-bg-elevated px-2 py-1 rounded transition-colors"
        >
          <span className="text-text-primary font-semibold text-sm">{symbol}</span>
          <span className="text-text-secondary text-xs">Spot</span>
          <span className="text-text-muted text-2xs">{showPairs ? "▴" : "▾"}</span>
        </button>

        {showPairs && (
          <div className="absolute top-full left-0 mt-1 bg-bg-elevated border border-border-default rounded shadow-xl z-50 w-48">
            <div className="p-2 border-b border-border-default">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pair..."
                className="w-full bg-bg-tertiary text-xs text-text-primary px-2 py-1 rounded outline-none placeholder:text-text-muted border border-border-default focus:border-brand-yellow transition-colors"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-2xs text-text-muted">No results</div>
              ) : (
                filtered.map((pair) => (
                  <button
                    key={pair}
                    onClick={() => switchSymbol(pair)}
                    className={clsx(
                      "w-full text-left px-3 py-1.5 text-xs hover:bg-bg-secondary transition-colors",
                      pair === symbol ? "text-brand-yellow" : "text-text-primary"
                    )}
                  >
                    {pair.slice(0, -4)}
                    <span className="text-text-muted">/{pair.slice(-4)}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Live ticker strip */}
      {ticker && (
        <div className="flex items-center gap-4 text-xs tabular-nums shrink-0">
          <span className={clsx("text-sm font-semibold font-mono", isPositive ? "text-bull-green" : "text-bear-red")}>
            {parseFloat(ticker.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className={clsx(isPositive ? "text-bull-green" : "text-bear-red")}>
            {isPositive ? "+" : ""}{ticker.priceChangePercent}%
          </span>
          <span className="hidden sm:flex gap-1 text-text-secondary">
            <span className="text-text-muted">24h H</span>
            <span>{parseFloat(ticker.highPrice).toLocaleString()}</span>
          </span>
          <span className="hidden sm:flex gap-1 text-text-secondary">
            <span className="text-text-muted">24h L</span>
            <span>{parseFloat(ticker.lowPrice).toLocaleString()}</span>
          </span>
          <span className="hidden md:flex gap-1 text-text-secondary">
            <span className="text-text-muted">Vol</span>
            <span>{parseFloat(ticker.volume).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </span>
          <span className="hidden lg:flex gap-1 text-text-secondary">
            <span className="text-text-muted">24h Change</span>
            <span className={isPositive ? "text-bull-green" : "text-bear-red"}>
              {isPositive ? "+" : ""}{parseFloat(ticker.priceChange).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </span>
        </div>
      )}

      {/* Right: WS status + nav */}
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <span
          title={`WebSocket: ${wsStatus}`}
          className={clsx("w-1.5 h-1.5 rounded-full shrink-0", {
            "bg-bull-green": wsStatus === "open",
            "bg-brand-yellow animate-pulse": wsStatus === "connecting",
            "bg-bear-red": wsStatus === "error" || wsStatus === "closed",
          })}
        />
        <button className="text-xs text-text-secondary hover:text-text-primary transition-colors hidden sm:block">Markets</button>
        <button className="text-xs text-text-secondary hover:text-text-primary transition-colors hidden sm:block">Orders</button>
        <button className="bg-brand-yellow text-bg-primary text-xs font-semibold px-3 py-1 rounded hover:bg-brand-yellow-dim transition-colors">
          Log In
        </button>
        <button className="border border-brand-yellow text-brand-yellow text-xs font-semibold px-3 py-1 rounded hover:bg-brand-yellow hover:text-bg-primary transition-colors hidden sm:block">
          Register
        </button>
      </div>
    </header>
  );
}
