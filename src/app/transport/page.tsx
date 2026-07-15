"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransportCard } from "@/components/transport/transport-card";
import { TRANSPORT_OPTIONS } from "@/lib/data/matches";
import { STADIUMS } from "@/lib/data/stadiums";
import { useAppStore } from "@/lib/store/app-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = "eta" | "cost" | "crowd";

export default function TransportPage() {
  const { selectedStadiumId, setSelectedStadiumId } = useAppStore();
  const stadium = STADIUMS.find((s) => s.id === selectedStadiumId) || STADIUMS[0];
  const [sortKey, setSortKey] = useState<SortKey>("eta");

  const sorted = useMemo(() => {
    const copy = [...TRANSPORT_OPTIONS];
    if (sortKey === "eta") return copy.sort((a, b) => a.etaMinutes - b.etaMinutes);
    if (sortKey === "crowd") {
      const order = { low: 0, medium: 1, high: 2 };
      return copy.sort((a, b) => order[a.crowdLevel] - order[b.crowdLevel]);
    }
    return copy;
  }, [sortKey]);

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transport Recommendations</h1>
          <p className="text-muted-foreground mt-1">Getting to {stadium.name} — {stadium.city}</p>
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

      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5" /> Sort by:
        </span>
        {(["eta", "crowd"] as SortKey[]).map((key) => (
          <Button
            key={key}
            size="sm"
            variant={sortKey === key ? "secondary" : "outline"}
            onClick={() => setSortKey(key)}
            className="capitalize"
          >
            {key === "eta" ? "Fastest" : "Least Crowded"}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sorted.map((option, i) => (
          <TransportCard key={option.id} option={option} index={i} />
        ))}
      </div>
    </div>
  );
}
