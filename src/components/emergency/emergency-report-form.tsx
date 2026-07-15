"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Siren, Loader2, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { EmergencyTypeSelector } from "./emergency-type-selector";
import { EmergencyAlert } from "@/lib/types";
import { STADIUMS } from "@/lib/data/stadiums";
import { useAppStore } from "@/lib/store/app-store";
import { toast } from "sonner";

export function EmergencyReportForm() {
  const { selectedStadiumId } = useAppStore();
  const stadium = STADIUMS.find((s) => s.id === selectedStadiumId) || STADIUMS[0];

  const [type, setType] = useState<EmergencyAlert["type"] | null>(null);
  const [zoneId, setZoneId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiGuidance, setAiGuidance] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    if (!type) {
      toast.error("Please select an emergency type.");
      return;
    }
    if (!description.trim()) {
      toast.error("Please describe the situation briefly.");
      return;
    }

    setLoading(true);
    setSubmitted(true);
    const zone = stadium.zones.find((z) => z.id === zoneId);

    try {
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: description,
          emergencyType: type,
          zoneName: zone?.name || "Unspecified location",
        }),
      });
      const data = await res.json();
      setAiGuidance(data.reply || data.error);
      toast.success("Emergency report sent. Staff have been notified.");
    } catch {
      setAiGuidance("Your report was logged. Please contact on-site staff directly if this is urgent.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setType(null);
    setZoneId("");
    setDescription("");
    setAiGuidance(null);
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/[0.03]">
        <CardContent className="p-5 flex items-center gap-3">
          <PhoneCall className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm">
            For life-threatening emergencies, call <strong>911</strong> immediately. This assistant
            supplements — not replaces — on-site emergency services.
          </p>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div>
              <p className="text-sm font-medium mb-3">What's happening?</p>
              <EmergencyTypeSelector selected={type} onSelect={setType} />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Nearest Zone</p>
              <Select value={zoneId} onValueChange={setZoneId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your location (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {stadium.zones.map((z) => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Describe the situation</p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what's happening..."
                rows={4}
              />
            </div>

            <Button
              variant="destructive"
              size="lg"
              className="w-full gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              <Siren className="h-5 w-5" />
              Send Emergency Report
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="border-pitch-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-pitch-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-pitch-500" />
                  )}
                  <p className="font-semibold">
                    {loading ? "Analyzing your report..." : "Report received — staff notified"}
                  </p>
                </div>
                {!loading && aiGuidance && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap"
                  >
                    {aiGuidance}
                  </motion.p>
                )}
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full" onClick={resetForm}>
              Submit Another Report
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
