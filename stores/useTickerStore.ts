import { create } from "zustand";
import type { TickerData, WsStatus } from "@/types";

interface TickerStore {
  ticker: TickerData | null;
  wsStatus: WsStatus;
  setTicker: (data: TickerData) => void;
  setWsStatus: (status: WsStatus) => void;
}

export const useTickerStore = create<TickerStore>((set) => ({
  ticker: null,
  wsStatus: "connecting",
  setTicker: (data) => set({ ticker: data }),
  setWsStatus: (status) => set({ wsStatus: status }),
}));
