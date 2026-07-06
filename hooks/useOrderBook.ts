/**
 * hooks/useOrderBook.ts
 *
 * Headless logic hook — bridges wsClient ↔ useOrderBookStore.
 * ─ Contains ALL WebSocket subscription and REST snapshot logic.
 * ─ Returns only plain data + status — zero JSX.
 * ─ Identical interface works in React Native (Phase 2).
 */

"use client";

import { useEffect, useRef } from "react";
import { wsClient, streams } from "@services/wsClient";
import { binanceApi } from "@services/binanceApi";
import { useOrderBookStore } from "@stores/useOrderBookStore";
import type { WsDepthUpdate } from "@/types";

export function useOrderBook(symbol: string) {
  const { orderBook, wsStatus, spreadValue, spreadPercent, applySnapshot, applyDelta, setWsStatus, setSymbol } =
    useOrderBookStore();

  // Buffer delta updates that arrive before the REST snapshot is ready
  const deltaBuffer = useRef<WsDepthUpdate[]>([]);
  const snapshotLoaded = useRef(false);
  const currentSymbol = useRef(symbol);

  useEffect(() => {
    currentSymbol.current = symbol;
    snapshotLoaded.current = false;
    deltaBuffer.current = [];
    setSymbol(symbol);

    // 1. Subscribe to WebSocket depth stream immediately
    const streamName = streams.depth(symbol, 20);

    const unsubscribeStatus = wsClient.onStatusChange(setWsStatus);

    const unsubscribeDepth = wsClient.subscribe<WsDepthUpdate>(streamName, (update) => {
      if (!snapshotLoaded.current) {
        // Buffer until REST snapshot arrives
        deltaBuffer.current.push(update);
        return;
      }
      applyDelta(update.u, update.b, update.a);
    });

    // 2. Fetch REST snapshot (source of truth for initial state)
    binanceApi
      .getOrderBook(symbol, 20)
      .then((snap) => {
        if (currentSymbol.current !== symbol) return; // stale — symbol changed
        applySnapshot(snap.lastUpdateId, snap.bids, snap.asks);
        snapshotLoaded.current = true;

        // 3. Drain buffered deltas that arrived after snapshot
        for (const delta of deltaBuffer.current) {
          if (delta.u > snap.lastUpdateId) {
            applyDelta(delta.u, delta.b, delta.a);
          }
        }
        deltaBuffer.current = [];
      })
      .catch(console.error);

    return () => {
      unsubscribeDepth();
      unsubscribeStatus();
    };
  }, [symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  return { orderBook, wsStatus, spreadValue, spreadPercent };
}
