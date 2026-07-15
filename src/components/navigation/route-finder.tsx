"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation2, MapPin, Footprints, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StadiumZone } from "@/lib/types";

function generateSteps(zone: StadiumZone): string[] {
  return [
    `Head toward the main concourse from your current gate.`,
    `Follow signage for "${zone.section}" — approx. ${Math.max(2, Math.round(zone.capacity / 6000))} min walk.`,
    `Pass through the security checkpoint near ${zone.name}.`,
    `Arrive at ${zone.name}. Staff in green vests are available for assistance.`,
  ];
}

export function RouteFinder({ zones }: { zones: StadiumZone[] }) {
  const [destinationId, setDestinationId] = useState<string>(zones[0]?.id || "");
  const [showRoute, setShowRoute] = useState(false);
  const destination = zones.find((z) => z.id === destinationId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation2 className="h-4 w-4 text-pitch-500" /> Find Your Way
        </CardTitle>
        <CardDescription>Select a destination for turn-by-turn guidance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={destinationId}
          onValueChange={(v) => {
            setDestinationId(v);
            setShowRoute(false);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a destination" />
          </SelectTrigger>
          <SelectContent>
            {zones.map((z) => (
              <SelectItem key={z.id} value={z.id}>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {z.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="w-full gap-2" variant="gradient" onClick={() => setShowRoute(true)}>
          <Footprints className="h-4 w-4" /> Get Directions
        </Button>

        <AnimatePresence>
          {showRoute && destination && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-3">
                {generateSteps(destination).map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {i + 1}
                      </div>
                      {i < 3 && <div className="w-px flex-1 bg-border my-1" />}
                    </div>
                    <p className="text-sm pb-3 leading-relaxed">{step}</p>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 text-sm text-pitch-500 font-medium pt-1">
                  <CheckCircle2 className="h-4 w-4" /> Estimated arrival in {Math.max(2, Math.round(destination.capacity / 6000))} min
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
