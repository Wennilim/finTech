import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useBalanceStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),
      balance: () => get().transactions.reduce((a, b) => a + b.amount, 0),
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "balance-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
