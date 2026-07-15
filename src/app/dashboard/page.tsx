"use client";

import { Users, Gauge, Siren, Ticket } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { CrowdTrendChart } from "@/components/dashboard/crowd-trend-chart";
import { ZoneOccupancyChart } from "@/components/dashboard/zone-occupancy-chart";
import { OrganizerAlertsFeed } from "@/components/dashboard/organizer-alerts-feed";
import { AIInsightPanel } from "@/components/dashboard/ai-insight-panel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STADIUMS } from "@/lib/data/stadiums";
import { CROWD_TRENDS, ORGANIZER_ALERTS, RECENT_EMERGENCIES } from "@/lib/data/matches";
import { useAppStore } from "@/lib/store/app-store";
import { formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const { selectedStadiumId, setSelectedStadiumId } = useAppStore();
  const stadium = STADIUMS.find((s) => s.id === selectedStadiumId) || STADIUMS[0];
  const totalOccupancy = stadium.zones.reduce((a, z) => a + z.currentOccupancy, 0);
  const avgOccupancyPct = Math.round(
    stadium.zones.reduce((a, z) => a + z.occupancyPercent, 0) / stadium.zones.length
  );
  const activeIncidents = RECENT_EMERGENCIES.filter((e) => e.status !== "resolved").length;

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Live operational intelligence for {stadium.name}</p>
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Current Attendance" value={formatNumber(totalOccupancy)} change={4.2} accent="pitch" />
        <StatCard icon={Gauge} label="Avg. Occupancy" value={`${avgOccupancyPct}%`} change={avgOccupancyPct > 70 ? 6.1 : -2.3} accent="goldcup" />
        <StatCard icon={Siren} label="Active Incidents" value={activeIncidents} change={activeIncidents > 2 ? 12 : -8} accent="red" />
        <StatCard icon={Ticket} label="Stadium Capacity" value={formatNumber(stadium.capacity)} accent="pitch" />
      </div>

      <div className="mb-8">
        <AIInsightPanel zones={stadium.zones} activeIncidents={activeIncidents} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <CrowdTrendChart data={CROWD_TRENDS} />
        <ZoneOccupancyChart zones={stadium.zones} />
      </div>

      <OrganizerAlertsFeed alerts={ORGANIZER_ALERTS} />
    </div>
  );
}
