"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ZoneCard } from "@/components/heatmap/zone-card";
import { StadiumMapView } from "@/components/heatmap/stadium-map-view";
import { STADIUMS } from "@/lib/data/stadiums";
import { useAppStore } from "@/lib/store/app-store";
import { StadiumZone } from "@/lib/types";

function jitterZones(zones: StadiumZone[]): StadiumZone[] {
  return zones.map((z) => {
    const delta = Math.round((Math.random() - 0.5) * 8);
    const newPct = Math.max(5, Math.min(99, z.occupancyPercent + delta));
    return {
      ...z,
      occupancyPercent: newPct,
      currentOccupancy: Math.round((newPct / 100) * z.capacity),
      status: newPct >= 90 ? "critical" : newPct >= 70 ? "busy" : "normal",
    };
  });
}

export default function HeatmapPage() {
  const { selectedStadiumId, setSelectedStadiumId } = useAppStore();
  const baseStadium = STADIUMS.find((s) => s.id === selectedStadiumId) || STADIUMS[0];
  const [zones, setZones] = useState<StadiumZone[]>(baseStadium.zones);
  const [live, setLive] = useState(true);

  useEffect(() => {
    setZones(baseStadium.zones);
  }, [baseStadium]);

  useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => setZones((z) => jitterZones(z)), 3500);
    return () => clearInterval(interval);
  }, [live]);

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crowd Heatmap</h1>
          <p className="text-muted-foreground mt-1">Live density visualization — {baseStadium.name}</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={selectedStadiumId} onValueChange={setSelectedStadiumId}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STADIUMS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} — {s.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={live ? "gradient" : "outline"}
            size="icon"
            onClick={() => setLive((l) => !l)}
            title={live ? "Live updates on" : "Live updates paused"}
          >
            <RefreshCw className={live ? "h-4 w-4 animate-spin" : "h-4 w-4"} style={{ animationDuration: "3s" }} />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs">
        {[
          { label: "Low (<40%)", color: "#16c988" },
          { label: "Moderate (40-70%)", color: "#f9c80b" },
          { label: "High (70-90%)", color: "#f97316" },
          { label: "Critical (90%+)", color: "#ef4444" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>

      <div className="mb-8">
        <StadiumMapView zones={zones} />
      </div>

      <h2 className="text-lg font-semibold mb-4">All Zones</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {zones.map((zone, i) => (
          <ZoneCard key={zone.id} zone={zone} index={i} />
        ))}
      </div>
    </div>
  );
}
