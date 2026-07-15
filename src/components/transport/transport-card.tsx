"use client";

import { motion } from "framer-motion";
import { Train, Bus, Car, Footprints, CarTaxiFront, Clock, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TransportOption } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof Train> = {
  train: Train,
  bus: Bus,
  car: Car,
  footprints: Footprints,
  "car-taxi-front": CarTaxiFront,
};

const CROWD_BADGE = {
  low: "success" as const,
  medium: "warning" as const,
  high: "critical" as const,
};

export function TransportCard({ option, index = 0 }: { option: TransportOption; index?: number }) {
  const Icon = ICONS[option.icon] || Bus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="hover:border-primary/40 transition-colors">
        <CardContent className="p-5 flex items-center gap-4">
          <div
            className={cn(
              "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
              "bg-pitch-500/10 text-pitch-500"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-sm truncate">{option.name}</p>
              <Badge variant={CROWD_BADGE[option.crowdLevel]} className="text-[10px] shrink-0 uppercase">
                {option.crowdLevel} crowd
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {option.etaMinutes} min
              </span>
              <span>{option.distanceKm} km</span>
              <span className="font-medium text-foreground">{option.cost}</span>
              {option.co2SavedKg && (
                <span className="flex items-center gap-1 text-pitch-500">
                  <Leaf className="h-3 w-3" /> {option.co2SavedKg}kg CO₂ saved
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
