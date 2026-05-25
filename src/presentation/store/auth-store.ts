import { create } from "zustand";
import { balanceRepository } from "../../data/repositories/balance.repository.impl";
import type { User } from "../../domain/entities/user";
import { STORAGE_KEYS } from "../../shared/constants/api";
import { deleteSecureItem, getSecureItem, setSecureItem } from "../../shared/utils/storage";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (token, user) => {
    await setSecureItem(STORAGE_KEYS.AUTH_TOKEN, token);
    await setSecureItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    await deleteSecureItem(STORAGE_KEYS.AUTH_TOKEN);
    await deleteSecureItem(STORAGE_KEYS.AUTH_USER);
    set({ token: null, user: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const token = await getSecureItem(STORAGE_KEYS.AUTH_TOKEN);
      const userJson = await getSecureItem(STORAGE_KEYS.AUTH_USER);
      if (token && userJson) {
        const user = JSON.parse(userJson) as User;
        try {
          await balanceRepository.getBalance();
          set({ token, user, isAuthenticated: true, isLoading: false });
          return;
        } catch {
          set({ token, user, isAuthenticated: true, isLoading: false });
          return;
        }
      }
    } catch {
      //
    }
    set({ isLoading: false });
  },
}));
