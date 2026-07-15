"use client";

import { motion } from "framer-motion";
import { StadiumZone } from "@/lib/types";
import { densityColor } from "@/lib/utils";

// Simplified schematic positions for a stadium bowl layout (percent-based, not geo)
const LAYOUT_POSITIONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  "North Stand": { x: 20, y: 5, w: 60, h: 16 },
  "South Stand": { x: 20, y: 79, w: 60, h: 16 },
  "East Concourse": { x: 82, y: 30, w: 14, h: 40 },
  "West Concourse": { x: 4, y: 30, w: 14, h: 40 },
  "Gate A - Main Entry": { x: 42, y: 90, w: 16, h: 8 },
  "Gate B - VIP Entry": { x: 4, y: 90, w: 14, h: 8 },
  "Gate C - East Entry": { x: 82, y: 90, w: 14, h: 8 },
  "Food Court North": { x: 40, y: 24, w: 20, h: 10 },
  "Food Court South": { x: 40, y: 66, w: 20, h: 10 },
  "Restrooms - East": { x: 66, y: 44, w: 10, h: 10 },
  "Restrooms - West": { x: 24, y: 44, w: 10, h: 10 },
  "Parking Lot A": { x: 4, y: 4, w: 14, h: 10 },
};

export function StadiumMapView({ zones }: { zones: StadiumZone[] }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl border border-border bg-gradient-to-b from-muted/40 to-background overflow-hidden">
      {/* Pitch */}
      <div className="absolute left-[30%] top-[30%] w-[40%] h-[40%] rounded-2xl bg-pitch-700/20 border-2 border-pitch-500/30 flex items-center justify-center">
        <div className="h-1/2 w-1/2 rounded-full border-2 border-pitch-500/30" />
        <span className="absolute text-[10px] uppercase tracking-widest text-pitch-500/60 font-semibold">Pitch</span>
      </div>

      {zones.map((zone, i) => {
        const pos = LAYOUT_POSITIONS[zone.name];
        if (!pos) return null;
        const color = densityColor(zone.occupancyPercent);
        return (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="absolute group cursor-pointer"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.w}%`, height: `${pos.h}%` }}
          >
            <div
              className="w-full h-full rounded-lg border transition-all group-hover:scale-105 flex items-center justify-center text-center p-1"
              style={{
                backgroundColor: `${color}25`,
                borderColor: `${color}80`,
              }}
            >
              <span className="text-[9px] md:text-[10px] font-medium leading-tight" style={{ color }}>
                {zone.name}
                <br />
                <span className="font-bold">{zone.occupancyPercent}%</span>
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
