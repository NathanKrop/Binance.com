/**
 * services/wsClient.ts
 *
 * Abstract WebSocket service layer.
 * ─ Zero React dependencies — safe to import in React Native.
 * ─ Manages connection lifecycle, auto-reconnect, and multi-stream subscriptions.
 * ─ UI layers (web or mobile) subscribe via callbacks; they never touch WebSocket directly.
 */

import type { WsDepthUpdate, WsTickerUpdate, WsTradeUpdate, WsKlineUpdate, WsStatus } from "@/types";

const BINANCE_WS_BASE = "wss://stream.binance.com:9443/stream?streams=";
const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_ATTEMPTS = 10;

type StreamPayload = WsDepthUpdate | WsTickerUpdate | WsTradeUpdate | WsKlineUpdate;
type StreamCallback<T = StreamPayload> = (data: T) => void;
type StatusCallback = (status: WsStatus) => void;

class WsClient {
  private ws: WebSocket | null = null;
  private subscriptions: Map<string, Set<StreamCallback>> = new Map();
  private statusListeners: Set<StatusCallback> = new Set();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private intentionallyClosed = false;
  private currentStreams: Set<string> = new Set();

  // ─── Public API ────────────────────────────────────────────────────────────

  subscribe<T extends StreamPayload>(streamName: string, callback: StreamCallback<T>): () => void {
    if (!this.subscriptions.has(streamName)) {
      this.subscriptions.set(streamName, new Set());
    }
    this.subscriptions.get(streamName)!.add(callback as StreamCallback);
    this.currentStreams.add(streamName);
    this.reconnectIfNeeded();

    // Return unsubscribe function
    return () => this.unsubscribe(streamName, callback as StreamCallback);
  }

  onStatusChange(callback: StatusCallback): () => void {
    this.statusListeners.add(callback);
    return () => this.statusListeners.delete(callback);
  }

  disconnect(): void {
    this.intentionallyClosed = true;
    this.clearReconnectTimer();
    this.ws?.close();
    this.ws = null;
  }

  // ─── Internal ──────────────────────────────────────────────────────────────

  private reconnectIfNeeded(): void {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }
    this.connect();
  }

  private connect(): void {
    if (this.currentStreams.size === 0) return;

    this.intentionallyClosed = false;
    const streamList = Array.from(this.currentStreams).join("/");
    const url = `${BINANCE_WS_BASE}${streamList}`;

    this.emitStatus("connecting");
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.emitStatus("open");
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const envelope = JSON.parse(event.data as string) as { stream: string; data: StreamPayload };
        const listeners = this.subscriptions.get(envelope.stream);
        listeners?.forEach((cb) => cb(envelope.data));
      } catch {
        // Malformed frame — silently discard
      }
    };

    this.ws.onerror = () => {
      this.emitStatus("error");
    };

    this.ws.onclose = () => {
      this.emitStatus("closed");
      if (!this.intentionallyClosed) {
        this.scheduleReconnect();
      }
    };
  }

  private unsubscribe(streamName: string, callback: StreamCallback): void {
    const listeners = this.subscriptions.get(streamName);
    if (!listeners) return;
    listeners.delete(callback);
    if (listeners.size === 0) {
      this.subscriptions.delete(streamName);
      this.currentStreams.delete(streamName);
      // Reconnect with updated stream list (drops removed stream)
      if (this.currentStreams.size > 0) {
        this.ws?.close();
      } else {
        this.disconnect();
      }
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) return;
    this.clearReconnectTimer();
    const delay = RECONNECT_DELAY_MS * Math.pow(1.5, this.reconnectAttempts);
    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private emitStatus(status: WsStatus): void {
    this.statusListeners.forEach((cb) => cb(status));
  }
}

// Singleton — one shared connection for the entire app (web or mobile)
export const wsClient = new WsClient();

// ─── Stream name helpers ──────────────────────────────────────────────────────

export const streams = {
  depth: (symbol: string, levels: 5 | 10 | 20 = 20) =>
    `${symbol.toLowerCase()}@depth${levels}@100ms`,
  ticker: (symbol: string) =>
    `${symbol.toLowerCase()}@ticker`,
  trade: (symbol: string) =>
    `${symbol.toLowerCase()}@trade`,
  kline: (symbol: string, interval: string) =>
    `${symbol.toLowerCase()}@kline_${interval}`,
} as const;
