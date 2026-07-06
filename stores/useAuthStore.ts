import { create } from "zustand";
import type { AuthState } from "@/types";

interface AuthStore extends AuthState {
  login: (userId: string, apiKey: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  userId: null,
  apiKey: null,
  login: (userId, apiKey) => set({ isAuthenticated: true, userId, apiKey }),
  logout: () => set({ isAuthenticated: false, userId: null, apiKey: null }),
}));
