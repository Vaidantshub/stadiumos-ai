"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trophy,
  MessageCircleQuestion,
  LayoutDashboard,
  Flame,
  Map,
  Bus,
  Siren,
  Sun,
  Moon,
  Accessibility,
  Menu,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store/app-store";
import { LANGUAGES, t } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/fan", label: "nav_assistant", icon: MessageCircleQuestion },
  { href: "/dashboard", label: "nav_dashboard", icon: LayoutDashboard },
  { href: "/heatmap", label: "nav_heatmap", icon: Flame },
  { href: "/navigate", label: "nav_navigate", icon: Map },
  { href: "/transport", label: "nav_transport", icon: Bus },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, accessibilityMode, toggleAccessibilityMode, language, setLanguage } =
    useAppStore();

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pitch-500 to-pitch-700 shadow-lg shadow-pitch-500/30">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Stadium<span className="text-gradient">OS</span> <span className="text-xs align-top text-goldcup-500">AI</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="relative">
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(language, item.label)}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/emergency" className="hidden sm:block">
            <Button variant="destructive" size="sm" className="gap-1.5 animate-pulse">
              <Siren className="h-4 w-4" />
              {t(language, "nav_emergency")}
            </Button>
          </Link>

          <Select value={language} onValueChange={(v) => setLanguage(v as typeof language)}>
            <SelectTrigger className="w-[110px] h-9 hidden md:flex">
              <Globe className="h-3.5 w-3.5 mr-1 opacity-60" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAccessibilityMode}
            title={t(language, "accessibility_mode")}
            className={cn(accessibilityMode && "bg-primary/15 text-primary")}
          >
            <Accessibility className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
                {t(language, item.label)}
              </Link>
            );
          })}
          <Link href="/emergency" onClick={() => setMobileOpen(false)}>
            <Badge variant="critical" className="mt-1 w-full justify-center py-2">
              <Siren className="h-3.5 w-3.5 mr-1" /> {t(language, "nav_emergency")}
            </Badge>
          </Link>
        </div>
      )}
    </header>
  );
}
