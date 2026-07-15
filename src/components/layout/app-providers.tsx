"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { useAppStore } from "@/lib/store/app-store";
import { LANGUAGES } from "@/lib/i18n/translations";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((s) => s.theme);
  const accessibilityMode = useAppStore((s) => s.accessibilityMode);
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("a11y-mode", accessibilityMode);
  }, [accessibilityMode]);

  useEffect(() => {
    const langMeta = LANGUAGES.find((l) => l.code === language);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", langMeta?.dir === "rtl" ? "rtl" : "ltr");
  }, [language]);

  return (
    <>
      {children}
      <Toaster richColors position="top-right" theme={theme} />
    </>
  );
}
