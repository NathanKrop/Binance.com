// ─── Order Book ──────────────────────────────────────────────────────────────

export interface OrderBookLevel {
  price: string;
  quantity: string;
  total?: number;       // cumulative depth, computed client-side
  flash?: "bull" | "bear" | null;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  lastUpdateId: number;
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

export interface TickerData {
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
}

// ─── Trade ────────────────────────────────────────────────────────────────────

export interface RecentTrade {
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyerMaker: boolean;
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export interface WalletBalance {
  asset: string;
  free: string;
  locked: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  apiKey: string | null;
}

// ─── WebSocket ────────────────────────────────────────────────────────────────

export type WsStatus = "connecting" | "open" | "closed" | "error";

export interface WsDepthUpdate {
  e: "depthUpdate";
  E: number;
  s: string;
  U: number;
  u: number;
  b: [string, string][];   // bids [price, qty]
  a: [string, string][];   // asks [price, qty]
}

export interface WsTickerUpdate {
  e: "24hrTicker";
  E: number;
  s: string;
  p: string;   // price change
  P: string;   // price change percent
  c: string;   // last price
  h: string;   // high
  l: string;   // low
  v: string;   // base volume
  q: string;   // quote volume
}

export interface WsTradeUpdate {
  e: "trade";
  E: number;
  s: string;
  t: number;
  p: string;
  q: string;
  T: number;
  m: boolean;  // is buyer maker
}

export interface WsKlineUpdate {
  e: "kline";
  E: number;
  s: string;
  k: {
    t: number;   // kline open time
    T: number;   // kline close time
    i: string;   // interval
    o: string;   // open
    h: string;   // high
    l: string;   // low
    c: string;   // close
    v: string;   // volume
    x: boolean;  // is this kline closed
  };
}
