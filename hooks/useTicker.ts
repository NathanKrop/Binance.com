"use client";

import { useEffect } from "react";
import { wsClient, streams } from "@services/wsClient";
import { useTickerStore } from "@stores/useTickerStore";
import type { WsTickerUpdate } from "@/types";

export function useTicker(symbol: string) {
  const { ticker, wsStatus, setTicker, setWsStatus } = useTickerStore();

  useEffect(() => {
    const streamName = streams.ticker(symbol);
    const unsubStatus = wsClient.onStatusChange(setWsStatus);

    const unsubTicker = wsClient.subscribe<WsTickerUpdate>(streamName, (update) => {
      setTicker({
        symbol: update.s,
        lastPrice: update.c,
        priceChange: update.p,
        priceChangePercent: update.P,
        highPrice: update.h,
        lowPrice: update.l,
        volume: update.v,
        quoteVolume: update.q,
      });
    });

    return () => {
      unsubTicker();
      unsubStatus();
    };
  }, [symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ticker, wsStatus };
}
