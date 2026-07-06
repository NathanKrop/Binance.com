import { create } from "zustand";

export type OrderSide = "BUY" | "SELL";
export type OrderStatus = "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELED";
export type OrderType = "LIMIT" | "MARKET" | "STOP_LIMIT";

export interface Order {
  orderId: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price: string;
  origQty: string;
  executedQty: string;
  status: OrderStatus;
  time: number;
}

interface OpenOrdersStore {
  openOrders: Order[];
  orderHistory: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
  fillOrder: (orderId: string, executedQty: string) => void;
}

// Seed with mock data so the panel is not empty on first load
const MOCK_OPEN: Order[] = [
  {
    orderId: "mock-1",
    symbol: "BTCUSDT",
    side: "BUY",
    type: "LIMIT",
    price: "58000.00",
    origQty: "0.001000",
    executedQty: "0.000000",
    status: "NEW",
    time: Date.now() - 120_000,
  },
  {
    orderId: "mock-2",
    symbol: "BTCUSDT",
    side: "SELL",
    type: "LIMIT",
    price: "72000.00",
    origQty: "0.002000",
    executedQty: "0.000000",
    status: "NEW",
    time: Date.now() - 60_000,
  },
];

export const useOpenOrdersStore = create<OpenOrdersStore>((set) => ({
  openOrders: MOCK_OPEN,
  orderHistory: [],

  addOrder: (order) =>
    set((s) => ({ openOrders: [order, ...s.openOrders] })),

  cancelOrder: (orderId) =>
    set((s) => {
      const found = s.openOrders.find((o) => o.orderId === orderId);
      if (!found) return s;
      const canceled: Order = { ...found, status: "CANCELED" };
      return {
        openOrders: s.openOrders.filter((o) => o.orderId !== orderId),
        orderHistory: [canceled, ...s.orderHistory],
      };
    }),

  fillOrder: (orderId, executedQty) =>
    set((s) => {
      const found = s.openOrders.find((o) => o.orderId === orderId);
      if (!found) return s;
      const filled: Order = { ...found, executedQty, status: "FILLED" };
      return {
        openOrders: s.openOrders.filter((o) => o.orderId !== orderId),
        orderHistory: [filled, ...s.orderHistory],
      };
    }),
}));
