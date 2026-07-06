"use client";

import { useOrderBook } from "@hooks/useOrderBook";
import { useTickerStore } from "@stores/useTickerStore";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import type { OrderBookLevel } from "@/types";

interface Props {
  symbol: string;
}

type DisplayMode = "both" | "bids" | "asks";

export function OrderBook({ symbol }: Props) {
  const { orderBook, spreadValue, spreadPercent, wsStatus } = useOrderBook(symbol);
  const { ticker } = useTickerStore();
  const [mode, setMode] = useState<DisplayMode>("both");

  const levels = mode === "both" ? 12 : 20;
  const asks = [...orderBook.asks].slice(0, levels).reverse();
  const bids = orderBook.bids.slice(0, levels);

  const maxTotal = Math.max(
    ...[...orderBook.asks, ...orderBook.bids].map((l) => l.total ?? 0),
    1
  );

  const lastPrice = ticker?.lastPrice ?? null;
  const isPositive = ticker ? parseFloat(ticker.priceChangePercent) >= 0 : true;

  return (
    <div className="flex flex-col h-full bg-bg-secondary text-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-border-default shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-text-primary font-medium text-xs">Order Book</span>
          <span
            title={`WebSocket: ${wsStatus}`}
            className={clsx("w-1.5 h-1.5 rounded-full", {
              "bg-bull-green": wsStatus === "open",
              "bg-brand-yellow animate-pulse": wsStatus === "connecting",
              "bg-bear-red": wsStatus === "error" || wsStatus === "closed",
            })}
          />
        </div>
        <div className="flex gap-1">
          {(["both", "bids", "asks"] as DisplayMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={clsx(
                "px-1.5 py-0.5 rounded text-2xs transition-colors",
                mode === m ? "bg-bg-elevated text-text-primary" : "text-text-muted hover:text-text-secondary"
              )}
            >
              {m === "both" ? "⬛" : m === "bids" ? "🟩" : "🟥"}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 px-2 py-1 text-text-muted text-2xs shrink-0">
        <span>Price (USDT)</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Asks */}
        {mode !== "bids" && (
          <div className="flex flex-col flex-1 overflow-hidden justify-end">
            {asks.map((level) => (
              <OrderBookRow key={level.price} level={level} side="ask" maxTotal={maxTotal} />
            ))}
          </div>
        )}

        {/* Last price + spread row */}
        <div className="flex items-center justify-between px-2 py-1.5 bg-bg-tertiary shrink-0 border-y border-border-default">
          <div className="flex items-center gap-2">
            {lastPrice && (
              <span className={clsx("font-mono font-semibold text-sm", isPositive ? "text-bull-green" : "text-bear-red")}>
                {parseFloat(lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            )}
            {lastPrice && (
              <span className={clsx("text-2xs", isPositive ? "text-bull-green" : "text-bear-red")}>
                {isPositive ? "▲" : "▼"}
              </span>
            )}
          </div>
          <span className="text-text-muted text-2xs">
            Spread: {spreadValue} ({spreadPercent})
          </span>
        </div>

        {/* Bids */}
        {mode !== "asks" && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {bids.map((level) => (
              <OrderBookRow key={level.price} level={level} side="bid" maxTotal={maxTotal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface RowProps {
  level: OrderBookLevel;
  side: "bid" | "ask";
  maxTotal: number;
}

function OrderBookRow({ level, side, maxTotal }: RowProps) {
  const prevQty = useRef(level.quantity);
  const [flash, setFlash] = useState<"bull" | "bear" | null>(null);

  useEffect(() => {
    if (prevQty.current === level.quantity) return;
    const prev = parseFloat(prevQty.current);
    const curr = parseFloat(level.quantity);
    setFlash(curr > prev ? "bull" : "bear");
    prevQty.current = level.quantity;
    const t = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(t);
  }, [level.quantity]);

  const depthPct = ((level.total ?? 0) / maxTotal) * 100;
  const isBid = side === "bid";

  return (
    <div
      className={clsx(
        "relative grid grid-cols-3 px-2 py-px font-mono tabular-nums text-2xs cursor-pointer",
        "hover:bg-bg-elevated transition-colors",
        flash === "bull" && "animate-flash-green",
        flash === "bear" && "animate-flash-red"
      )}
    >
      <div
        className={clsx("absolute inset-y-0 right-0 opacity-20", isBid ? "bg-bull-green" : "bg-bear-red")}
        style={{ width: `${depthPct}%` }}
      />
      <span className={clsx("relative z-10", isBid ? "text-bull-green" : "text-bear-red")}>
        {parseFloat(level.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="relative z-10 text-right text-text-primary">
        {parseFloat(level.quantity).toFixed(5)}
      </span>
      <span className="relative z-10 text-right text-text-secondary">
        {(level.total ?? 0).toFixed(3)}
      </span>
    </div>
  );
}
