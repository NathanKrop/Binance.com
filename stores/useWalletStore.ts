import { create } from "zustand";
import type { WalletBalance } from "@/types";

interface WalletStore {
  balances: WalletBalance[];
  setBalances: (balances: WalletBalance[]) => void;
  getBalance: (asset: string) => WalletBalance | undefined;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  balances: [
    { asset: "BTC", free: "0.04821300", locked: "0.00000000" },
    { asset: "USDT", free: "1243.58000000", locked: "200.00000000" },
    { asset: "ETH", free: "1.23400000", locked: "0.00000000" },
    { asset: "BNB", free: "5.67000000", locked: "0.00000000" },
  ],
  setBalances: (balances) => set({ balances }),
  getBalance: (asset) => get().balances.find((b) => b.asset === asset),
}));
