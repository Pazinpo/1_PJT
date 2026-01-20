// src/stores/useAuthStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    accessToken: localStorage.getItem("accessToken") || "",
    setAccessToken: (token) => {
      localStorage.setItem("accessToken", token || "");
      set({ accessToken: token || "" });
    },
    reset: () => {
      localStorage.removeItem("accessToken");
      set({ accessToken: "" });
    },
  }))
);

// ✅ User 정보 관리
const useUserStore = create(
  persist((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData ?? null }),

    reset: () =>
      set({
        user: null,
      }),
  }))
);

export { useAuthStore, useUserStore };
