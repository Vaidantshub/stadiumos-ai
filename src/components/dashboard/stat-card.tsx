"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  accent = "pitch",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: number;
  accent?: "pitch" | "goldcup" | "red";
}) {
  const accentClasses = {
    pitch: "bg-pitch-500/10 text-pitch-500",
    goldcup: "bg-goldcup-400/15 text-goldcup-500",
    red: "bg-red-500/10 text-red-500",
  }[accent];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="p-5 flex items-center gap-4">
          <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0", accentClasses)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{label}</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">{value}</p>
              {typeof change === "number" && (
                <span
                  className={cn(
                    "flex items-center text-xs font-medium",
                    change >= 0 ? "text-pitch-500" : "text-red-500"
                  )}
                >
                  {change >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                  {Math.abs(change)}%
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
