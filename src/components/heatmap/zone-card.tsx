"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { StadiumZone } from "@/lib/types";
import { densityColor, densityLabel, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ZoneCard({ zone, index = 0 }: { zone: StadiumZone; index?: number }) {
  const color = densityColor(zone.occupancyPercent);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      className="relative rounded-xl border border-border p-4 overflow-hidden bg-card"
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ background: `radial-gradient(circle at 30% 20%, ${color}, transparent 70%)` }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-sm">{zone.name}</p>
            <p className="text-xs text-muted-foreground">{zone.section}</p>
          </div>
          <span
            className="relative flex h-3 w-3 shrink-0 mt-1"
            title={densityLabel(zone.occupancyPercent)}
          >
            <span
              className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: color }} />
          </span>
        </div>

        <div className="flex items-end justify-between mb-2">
          <span className="text-2xl font-bold" style={{ color }}>
            {zone.occupancyPercent}%
          </span>
          <Badge variant="outline" className="text-[10px]">
            {densityLabel(zone.occupancyPercent)}
          </Badge>
        </div>

        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${zone.occupancyPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-1 mt-2.5 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          {formatNumber(zone.currentOccupancy)} / {formatNumber(zone.capacity)}
        </div>
      </div>
    </motion.div>
  );
}
