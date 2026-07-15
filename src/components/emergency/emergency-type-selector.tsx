"use client";

import {
  HeartPulse,
  ShieldAlert,
  Search,
  UserSearch,
  Flame,
  Users,
  CircleAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { EMERGENCY_TYPES } from "@/lib/data/matches";
import { EmergencyAlert } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof HeartPulse> = {
  "heart-pulse": HeartPulse,
  "shield-alert": ShieldAlert,
  search: Search,
  "user-search": UserSearch,
  flame: Flame,
  users: Users,
  "circle-alert": CircleAlert,
};

export function EmergencyTypeSelector({
  selected,
  onSelect,
}: {
  selected: EmergencyAlert["type"] | null;
  onSelect: (t: EmergencyAlert["type"]) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {EMERGENCY_TYPES.map((type, i) => {
        const Icon = ICONS[type.icon] || CircleAlert;
        const active = selected === type.value;
        return (
          <motion.button
            key={type.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(type.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
              active
                ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border hover:border-destructive/40 hover:bg-destructive/5"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-medium leading-tight">{type.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
