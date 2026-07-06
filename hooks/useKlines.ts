"use client";

import { useEffect, useRef, useState } from "react";
import { binanceApi } from "@services/binanceApi";
import { wsClient, streams } from "@services/wsClient";
import type { WsKlineUpdate } from "@/types";
import type { Time } from "lightweight-charts";

export interface Candle {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function useKlines(symbol: string, interval: string) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const candlesRef = useRef<Candle[]>([]);

  useEffect(() => {
    setLoading(true);
    setCandles([]);
    candlesRef.current = [];

    // 1. Load historical snapshot via REST
    binanceApi
      .getKlines(symbol, interval)
      .then((data) => {
        const loaded: Candle[] = data.map((k) => ({
          time: (k[0] / 1000) as unknown as Time,
          open: parseFloat(String(k[1])),
          high: parseFloat(String(k[2])),
          low: parseFloat(String(k[3])),
          close: parseFloat(String(k[4])),
        }));
        candlesRef.current = loaded;
        setCandles(loaded);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // 2. Subscribe to live kline WebSocket stream
    const streamName = streams.kline(symbol, interval);
    const unsub = wsClient.subscribe<WsKlineUpdate>(streamName, (update) => {
      const k = update.k;
      const liveCandle: Candle = {
        time: (k.t / 1000) as unknown as Time,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };

      setCandles((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        // Same candle — update in place; new candle — append
        if (last.time === liveCandle.time) {
          return [...prev.slice(0, -1), liveCandle];
        }
        return [...prev, liveCandle];
      });
    });

    return unsub;
  }, [symbol, interval]);

  return { candles, loading };
}
