"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeafletMapView } from "@/components/navigation/leaflet-map-view";
import { RouteFinder } from "@/components/navigation/route-finder";
import { STADIUMS } from "@/lib/data/stadiums";
import { useAppStore } from "@/lib/store/app-store";
import { StadiumZone } from "@/lib/types";

export default function NavigatePage() {
  const { selectedStadiumId, setSelectedStadiumId } = useAppStore();
  const stadium = STADIUMS.find((s) => s.id === selectedStadiumId) || STADIUMS[0];
  const [activeZone, setActiveZone] = useState<StadiumZone | null>(null);

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stadium Navigation</h1>
          <p className="text-muted-foreground mt-1">Interactive wayfinding — {stadium.name}</p>
        </div>
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
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[420px] lg:h-[560px]">
          <LeafletMapView stadium={stadium} activeZone={activeZone} onSelectZone={setActiveZone} />
        </div>
        <RouteFinder zones={stadium.zones} />
      </div>
    </div>
  );
}
