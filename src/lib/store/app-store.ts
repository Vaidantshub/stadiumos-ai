"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language, UserProfile } from "@/lib/types";

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;

  accessibilityMode: boolean;
  toggleAccessibilityMode: () => void;

  theme: "light" | "dark";
  toggleTheme: () => void;

  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;

  selectedStadiumId: string;
  setSelectedStadiumId: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (language) => set({ language }),

      accessibilityMode: false,
      toggleAccessibilityMode: () => set({ accessibilityMode: !get().accessibilityMode }),

      theme: "dark",
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),

      user: null,
      setUser: (user) => set({ user }),

      selectedStadiumId: "metlife",
      setSelectedStadiumId: (id) => set({ selectedStadiumId: id }),
    }),
    { name: "stadiumos-app-store" }
  )
);
