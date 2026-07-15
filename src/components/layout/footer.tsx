import { Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-pitch-500" />
          <span>StadiumOS AI &mdash; Built for FIFA World Cup 2026 Hackathon</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Powered by Gemini 2.5 Flash</span>
          <span>•</span>
          <span>Google Cloud & Firebase</span>
        </div>
      </div>
    </footer>
  );
}
