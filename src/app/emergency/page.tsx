import { EmergencyReportForm } from "@/components/emergency/emergency-report-form";
import { RecentEmergenciesFeed } from "@/components/emergency/recent-emergencies-feed";
import { Siren } from "lucide-react";

export default function EmergencyPage() {
  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
          <Siren className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Assistant</h1>
          <p className="text-muted-foreground mt-1">Fast, AI-guided help when it matters most</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EmergencyReportForm />
        </div>
        <RecentEmergenciesFeed />
      </div>
    </div>
  );
}
