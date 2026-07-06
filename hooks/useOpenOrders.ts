"use client";

import { useOpenOrdersStore } from "@stores/useOpenOrdersStore";

export function useOpenOrders(symbol?: string) {
  const { openOrders, orderHistory, cancelOrder } = useOpenOrdersStore();

  const filteredOpen = symbol
    ? openOrders.filter((o) => o.symbol === symbol)
    : openOrders;

  const filteredHistory = symbol
    ? orderHistory.filter((o) => o.symbol === symbol)
    : orderHistory;

  return { openOrders: filteredOpen, orderHistory: filteredHistory, cancelOrder };
}
