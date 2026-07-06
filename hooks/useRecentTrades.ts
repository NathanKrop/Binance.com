"use client";

import { useEffect, useState } from "react";
import { wsClient, streams } from "@services/wsClient";
import type { RecentTrade, WsTradeUpdate } from "@/types";

const MAX_TRADES = 30;

export function useRecentTrades(symbol: string) {
  const [trades, setTrades] = useState<RecentTrade[]>([]);

  useEffect(() => {
    setTrades([]);
    const streamName = streams.trade(symbol);

    const unsub = wsClient.subscribe<WsTradeUpdate>(streamName, (update) => {
      const trade: RecentTrade = {
        id: update.t,
        price: update.p,
        qty: update.q,
        time: update.T,
        isBuyerMaker: update.m,
      };
      setTrades((prev) => [trade, ...prev].slice(0, MAX_TRADES));
    });

    return unsub;
  }, [symbol]);

  return { trades };
}
