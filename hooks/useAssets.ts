"use client";

import { useWalletStore } from "@stores/useWalletStore";

export function useAssets() {
  const { balances, setBalances } = useWalletStore();
  return { balances, setBalances };
}
