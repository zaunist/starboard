// store.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  username: "zaunist",
  setUsername: (name) => set({ username: name }),
}));
