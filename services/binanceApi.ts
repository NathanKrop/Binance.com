/**
 * services/binanceApi.ts
 *
 * Thin wrapper around Binance REST API.
 * No React dependencies — safe to use in React Native.
 */

const BASE = "https://api.binance.com/api/v3";

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Binance API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export interface RawOrderBook {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

export const binanceApi = {
  getOrderBook: (symbol: string, limit = 20) =>
    get<RawOrderBook>("/depth", { symbol: symbol.toUpperCase(), limit: String(limit) }),

  getTicker: (symbol: string) =>
    get<Record<string, string>>("/ticker/24hr", { symbol: symbol.toUpperCase() }),

  getRecentTrades: (symbol: string, limit = 30) =>
    get<Array<Record<string, unknown>>>("/trades", {
      symbol: symbol.toUpperCase(),
      limit: String(limit),
    }),

  getKlines: (symbol: string, interval: string, limit = 200) =>
    get<number[][]>("/klines", { symbol: symbol.toUpperCase(), interval, limit: String(limit) }),

  getExchangeInfo: () =>
    get<{ symbols: Array<Record<string, unknown>> }>("/exchangeInfo"),
};
