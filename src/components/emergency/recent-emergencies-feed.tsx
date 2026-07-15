"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RECENT_EMERGENCIES } from "@/lib/data/matches";

const STATUS_VARIANT = {
  reported: "outline" as const,
  acknowledged: "warning" as const,
  responding: "warning" as const,
  resolved: "success" as const,
};

const SEVERITY_VARIANT = {
  low: "outline" as const,
  medium: "warning" as const,
  high: "critical" as const,
  critical: "critical" as const,
};

export function RecentEmergenciesFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports (This Stadium)</CardTitle>
        <CardDescription>Live status of reported incidents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {RECENT_EMERGENCIES.map((e) => (
          <div key={e.id} className="rounded-lg border border-border p-3.5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-sm font-medium capitalize">{e.type.replace("_", " ")}</span>
              <div className="flex gap-1.5">
                <Badge variant={SEVERITY_VARIANT[e.severity]} className="text-[10px] uppercase">
                  {e.severity}
                </Badge>
                <Badge variant={STATUS_VARIANT[e.status]} className="text-[10px] uppercase">
                  {e.status}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{e.description}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{e.zoneName}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
