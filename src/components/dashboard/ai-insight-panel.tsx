"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StadiumZone } from "@/lib/types";

export function AIInsightPanel({ zones, activeIncidents }: { zones: StadiumZone[]; activeIncidents: number }) {
  const [insight, setInsight] = useState<string>(
    "Click 'Generate Insight' to get AI-powered operational recommendations based on current crowd data."
  );
  const [loading, setLoading] = useState(false);

  async function generateInsight() {
    setLoading(true);
    try {
      const res = await fetch("/api/organizer-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zones: zones.map((z) => ({ name: z.name, occupancyPercent: z.occupancyPercent, status: z.status })),
          activeIncidents,
        }),
      });
      const data = await res.json();
      setInsight(data.insight || data.error || "No insight generated.");
    } catch {
      setInsight("Failed to generate insight. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-pitch-500/5 to-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pitch-500" /> AI Operational Insight
          </CardTitle>
          <CardDescription>Gemini-generated recommendations based on live zone data</CardDescription>
        </div>
        <Button size="sm" variant="outline" onClick={generateInsight} disabled={loading} className="gap-1.5 shrink-0">
          <RefreshCw className={loading ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} />
          {loading ? "Analyzing..." : "Generate Insight"}
        </Button>
      </CardHeader>
      <CardContent>
        <motion.p
          key={insight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90"
        >
          {insight}
        </motion.p>
      </CardContent>
    </Card>
  );
}
