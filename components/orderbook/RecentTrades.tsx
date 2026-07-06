"use client";

import { useRecentTrades } from "@hooks/useRecentTrades";
import clsx from "clsx";

interface Props {
  symbol: string;
}

export function RecentTrades({ symbol }: Props) {
  const { trades } = useRecentTrades(symbol);

  return (
    <div className="flex flex-col h-full bg-bg-secondary text-xs">
      <div className="px-2 py-1.5 border-b border-border-default shrink-0">
        <span className="text-text-primary font-medium text-xs">Recent Trades</span>
      </div>

      <div className="grid grid-cols-3 px-2 py-1 text-text-muted text-2xs shrink-0">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Time</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="grid grid-cols-3 px-2 py-px font-mono tabular-nums text-2xs hover:bg-bg-elevated"
          >
            <span className={clsx(trade.isBuyerMaker ? "text-bear-red" : "text-bull-green")}>
              {parseFloat(trade.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-right text-text-primary">{parseFloat(trade.qty).toFixed(5)}</span>
            <span className="text-right text-text-secondary">
              {new Date(trade.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
