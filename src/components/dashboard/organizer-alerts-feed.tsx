"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, AlertOctagon, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrganizerAlert } from "@/lib/types";
import { cn } from "@/lib/utils";

const LEVEL_CONFIG = {
  info: { icon: Info, badge: "outline" as const, color: "text-blue-500 bg-blue-500/10" },
  warning: { icon: AlertTriangle, badge: "warning" as const, color: "text-goldcup-500 bg-goldcup-400/10" },
  critical: { icon: AlertOctagon, badge: "critical" as const, color: "text-red-500 bg-red-500/10" },
};

function timeAgo(ts: number): string {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  return `${mins} min ago`;
}

export function OrganizerAlertsFeed({ alerts }: { alerts: OrganizerAlert[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Operations Feed</CardTitle>
        <CardDescription>Real-time alerts from stadium sensors & staff reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, i) => {
          const config = LEVEL_CONFIG[alert.level];
          const Icon = config.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-lg border border-border p-3.5 hover:border-primary/30 transition-colors"
            >
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", config.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm truncate">{alert.title}</p>
                  <Badge variant={config.badge} className="text-[10px] shrink-0 uppercase">
                    {alert.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{alert.message}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                  {alert.zoneName && <span>{alert.zoneName}</span>}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {timeAgo(alert.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
