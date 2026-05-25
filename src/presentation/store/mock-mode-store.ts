import { create } from "zustand";

interface MockModeState {
  isMockMode: boolean;
  reasons: string[];
  setMockMode: (active: boolean, reason?: string) => void;
  clearMockMode: () => void;
}

export const useMockModeStore = create<MockModeState>((set) => ({
  isMockMode: false,
  reasons: [],

  setMockMode: (active, reason) =>
    set((state) => {
      if (active) {
        const newReasons = reason
          ? state.reasons.includes(reason)
            ? state.reasons
            : [...state.reasons, reason]
          : state.reasons;
        return { isMockMode: true, reasons: newReasons };
      }
      return state;
    }),

  clearMockMode: () => set({ isMockMode: false, reasons: [] }),
}));
