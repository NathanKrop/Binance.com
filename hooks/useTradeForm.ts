"use client";

import { useState } from "react";
import { useWalletStore } from "@stores/useWalletStore";
import { useTickerStore } from "@stores/useTickerStore";

export function useTradeForm(symbol: string) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"Limit" | "Market" | "Stop-Limit">("Limit");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [stopPrice, setStopPrice] = useState("");

  const { ticker } = useTickerStore();
  const { getBalance } = useWalletStore();

  const baseAsset = symbol.slice(0, -4);
  const quoteAsset = "USDT";
  const quoteBalance = getBalance(quoteAsset);
  const baseBalance = getBalance(baseAsset);

  const total =
    price && amount
      ? (parseFloat(price) * parseFloat(amount)).toFixed(2)
      : "";

  function fillByPercent(pct: number) {
    if (side === "buy" && quoteBalance && price) {
      setAmount(((parseFloat(quoteBalance.free) * pct) / 100 / parseFloat(price)).toFixed(6));
    } else if (side === "sell" && baseBalance) {
      setAmount(((parseFloat(baseBalance.free) * pct) / 100).toFixed(6));
    }
  }

  function submit() {
    // Phase 2: wire to authenticated REST order endpoint
    alert(
      `${side.toUpperCase()} ${amount} ${baseAsset} @ ${orderType === "Market" ? "Market" : price}`
    );
  }

  return {
    side, setSide,
    orderType, setOrderType,
    price, setPrice,
    amount, setAmount,
    stopPrice, setStopPrice,
    ticker,
    quoteBalance, baseBalance,
    baseAsset, quoteAsset,
    total,
    fillByPercent,
    submit,
  };
}
