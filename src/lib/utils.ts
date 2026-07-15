import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(d);
}

export function densityColor(occupancy: number): string {
  if (occupancy >= 90) return "#ef4444"; // red - critical
  if (occupancy >= 70) return "#f97316"; // orange - high
  if (occupancy >= 40) return "#f9c80b"; // yellow - moderate
  return "#16c988"; // green - low
}

export function densityLabel(occupancy: number): string {
  if (occupancy >= 90) return "Critical";
  if (occupancy >= 70) return "High";
  if (occupancy >= 40) return "Moderate";
  return "Low";
}

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
