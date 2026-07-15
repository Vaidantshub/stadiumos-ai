"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  accent = "pitch",
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accent?: "pitch" | "goldcup";
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link href={href}>
        <Card className="group relative overflow-hidden p-6 h-full hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 cursor-pointer">
          <div
            className={cn(
              "mb-5 flex h-12 w-12 items-center justify-center rounded-xl",
              accent === "pitch" ? "bg-pitch-500/10 text-pitch-500" : "bg-goldcup-400/15 text-goldcup-500"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-1">
            {title}
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </Card>
      </Link>
    </motion.div>
  );
}
