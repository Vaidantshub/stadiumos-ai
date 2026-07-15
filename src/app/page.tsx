"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircleQuestion,
  LayoutDashboard,
  Flame,
  Map,
  Bus,
  Siren,
  Accessibility,
  Languages,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/shared/feature-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { STADIUMS } from "@/lib/data/stadiums";
import { MATCHES } from "@/lib/data/matches";
import { useAppStore } from "@/lib/store/app-store";
import { t } from "@/lib/i18n/translations";
import { formatNumber } from "@/lib/utils";

const FEATURES = [
  {
    icon: MessageCircleQuestion,
    title: "AI Fan Assistant",
    description: "Ask anything — directions, seating, food, schedules — answered instantly by Gemini 2.5 Flash.",
    href: "/fan",
    accent: "pitch" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Organizer Dashboard",
    description: "Real-time operational insights, crowd analytics, and AI-generated recommendations for staff.",
    href: "/dashboard",
    accent: "goldcup" as const,
  },
  {
    icon: Flame,
    title: "Crowd Heatmap",
    description: "Live density visualization across every zone, gate, and concourse in the stadium.",
    href: "/heatmap",
    accent: "pitch" as const,
  },
  {
    icon: Map,
    title: "Stadium Navigation",
    description: "Turn-by-turn wayfinding to your seat, nearest restroom, food court, or exit gate.",
    href: "/navigate",
    accent: "goldcup" as const,
  },
  {
    icon: Bus,
    title: "Transport Recommendations",
    description: "Compare metro, shuttle, rideshare, and walking options with live ETAs and crowd levels.",
    href: "/transport",
    accent: "pitch" as const,
  },
  {
    icon: Siren,
    title: "Emergency Assistant",
    description: "One-tap emergency reporting with AI-guided safety instructions and instant staff alerts.",
    href: "/emergency",
    accent: "goldcup" as const,
  },
];

export default function HomePage() {
  const language = useAppStore((s) => s.language);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pitch-500/10 via-transparent to-transparent" />
        <div className="absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-pitch-500/20 blur-[120px]" />
        <div className="absolute -top-20 left-0 -z-10 h-72 w-72 rounded-full bg-goldcup-400/20 blur-[120px]" />

        <div className="container pt-20 pb-24 md:pt-28 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <Badge variant="success" className="gap-1.5 px-3 py-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Powered by Gemini 2.5 Flash · Built for FIFA World Cup 2026
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]"
          >
            {t(language, "welcome_title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6"
          >
            {t(language, "welcome_sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
          >
            <Link href="/fan">
              <Button variant="gradient" size="lg" className="gap-2 w-full sm:w-auto">
                {t(language, "cta_ask_assistant")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t(language, "cta_view_dashboard")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
          >
            {[
              { label: "Host Stadiums", value: STADIUMS.length, suffix: "" },
              { label: "Total Capacity", value: formatNumber(STADIUMS.reduce((a, s) => a + s.capacity, 0)), suffix: "" },
              { label: "Matches Tracked", value: MATCHES.length, suffix: "" },
              { label: "Languages", value: 6, suffix: "" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="container py-16">
        <SectionHeading
          eyebrow="Platform"
          title="Everything a fan and organizer needs"
          description="A unified AI operating system for World Cup stadiums — built for speed, safety, and an unforgettable fan experience."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.href} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* ACCESSIBILITY + LANGUAGE STRIP */}
      <section className="container py-8">
        <div className="glass rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Accessibility className="h-5 w-5 text-pitch-500" />
              <Languages className="h-5 w-5 text-goldcup-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Built for every fan, everywhere</h3>
            <p className="text-muted-foreground leading-relaxed">
              StadiumOS AI supports 6 languages and a dedicated Accessibility Mode with larger text,
              higher contrast, and simplified navigation — because the World Cup belongs to everyone.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {["English", "Español", "Français", "العربية", "Português", "Deutsch"].map((l) => (
              <Badge key={l} variant="outline" className="text-sm px-3 py-1.5">
                {l}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING MATCHES PREVIEW */}
      <section className="container py-16">
        <SectionHeading eyebrow="Schedule" title="Upcoming Matches" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATCHES.map((m, i) => {
            const stadium = STADIUMS.find((s) => s.id === m.stadiumId);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={m.status === "live" ? "critical" : "outline"} className="uppercase text-[10px]">
                    {m.status === "live" ? "● LIVE" : m.round}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{m.date} · {m.time}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold mb-3">
                  <span className="flex items-center gap-2">{m.homeFlag} {m.homeTeam}</span>
                  <span className="text-muted-foreground text-sm">vs</span>
                  <span className="flex items-center gap-2">{m.awayTeam} {m.awayFlag}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stadium?.name}, {stadium?.city}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
