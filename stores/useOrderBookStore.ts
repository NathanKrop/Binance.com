/**
 * stores/useOrderBookStore.ts
 *
 * Zustand store for Order Book state.
 * ─ No JSX, no React component logic.
 * ─ Can be imported identically in React Native (Phase 2).
 */

import { create } from "zustand";
import type { OrderBook, OrderBookLevel, WsStatus } from "@/types";

const DEPTH_LEVELS = 20;

interface OrderBookStore {
  orderBook: OrderBook;
  wsStatus: WsStatus;
  spreadValue: string;
  spreadPercent: string;

  // Actions (called by hooks/services — never directly by UI)
  setWsStatus: (status: WsStatus) => void;
  applySnapshot: (lastUpdateId: number, bids: [string, string][], asks: [string, string][]) => void;
  applyDelta: (lastUpdateId: number, bids: [string, string][], asks: [string, string][]) => void;
  setSymbol: (symbol: string) => void;
}

function buildLevels(raw: [string, string][], prevMap: Map<string, string>, side: "bid" | "ask"): OrderBookLevel[] {
  const map = new Map(prevMap);

  for (const [price, qty] of raw) {
    if (qty === "0.00000000" || qty === "0") {
      map.delete(price);
    } else {
      map.set(price, qty);
    }
  }

  const sorted = Array.from(map.entries()).sort(([a], [b]) =>
    side === "bid" ? parseFloat(b) - parseFloat(a) : parseFloat(a) - parseFloat(b)
  );

  let cumulative = 0;
  return sorted.slice(0, DEPTH_LEVELS).map(([price, quantity]) => {
    cumulative += parseFloat(quantity);
    return { price, quantity, total: cumulative, flash: null };
  });
}

function computeSpread(bids: OrderBookLevel[], asks: OrderBookLevel[]): { value: string; percent: string } {
  if (!bids.length || !asks.length) return { value: "—", percent: "—" };
  const bid = parseFloat(bids[0].price);
  const ask = parseFloat(asks[0].price);
  const spread = ask - bid;
  const mid = (bid + ask) / 2;
  return {
    value: spread.toFixed(2),
    percent: ((spread / mid) * 100).toFixed(4) + "%",
  };
}

const emptyBook = (symbol: string): OrderBook => ({
  symbol,
  bids: [],
  asks: [],
  lastUpdateId: 0,
});

// Internal price maps for efficient delta merging
let bidMap: Map<string, string> = new Map();
let askMap: Map<string, string> = new Map();

export const useOrderBookStore = create<OrderBookStore>((set, get) => ({
  orderBook: emptyBook("BTCUSDT"),
  wsStatus: "connecting",
  spreadValue: "—",
  spreadPercent: "—",

  setWsStatus: (status) => set({ wsStatus: status }),

  setSymbol: (symbol) => {
    bidMap = new Map();
    askMap = new Map();
    set({ orderBook: emptyBook(symbol), spreadValue: "—", spreadPercent: "—" });
  },

  applySnapshot: (lastUpdateId, rawBids, rawAsks) => {
    bidMap = new Map(rawBids);
    askMap = new Map(rawAsks);

    const bids = buildLevels(rawBids, new Map(), "bid");
    const asks = buildLevels(rawAsks, new Map(), "ask");
    const { value, percent } = computeSpread(bids, asks);

    set((state) => ({
      orderBook: { ...state.orderBook, lastUpdateId, bids, asks },
      spreadValue: value,
      spreadPercent: percent,
    }));
  },

  applyDelta: (lastUpdateId, rawBids, rawAsks) => {
    if (lastUpdateId <= get().orderBook.lastUpdateId) return;

    const bids = buildLevels(rawBids, bidMap, "bid");
    const asks = buildLevels(rawAsks, askMap, "ask");

    // Update internal maps after building levels
    for (const [p, q] of rawBids) q === "0" ? bidMap.delete(p) : bidMap.set(p, q);
    for (const [p, q] of rawAsks) q === "0" ? askMap.delete(p) : askMap.set(p, q);

    const { value, percent } = computeSpread(bids, asks);

    set((state) => ({
      orderBook: { ...state.orderBook, lastUpdateId, bids, asks },
      spreadValue: value,
      spreadPercent: percent,
    }));
  },
}));
