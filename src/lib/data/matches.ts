import { Match, TransportOption, OrganizerAlert, CrowdTrendPoint, EmergencyAlert } from "@/lib/types";

export const MATCHES: Match[] = [
  {
    id: "m1",
    stadiumId: "metlife",
    homeTeam: "USA",
    awayTeam: "Mexico",
    homeFlag: "🇺🇸",
    awayFlag: "🇲🇽",
    date: "2026-06-14",
    time: "19:00",
    round: "Group Stage",
    status: "upcoming",
  },
  {
    id: "m2",
    stadiumId: "azteca",
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    homeFlag: "🇧🇷",
    awayFlag: "🇦🇷",
    date: "2026-06-15",
    time: "16:00",
    round: "Group Stage",
    status: "live",
  },
  {
    id: "m3",
    stadiumId: "bc-place",
    homeTeam: "Canada",
    awayTeam: "France",
    homeFlag: "🇨🇦",
    awayFlag: "🇫🇷",
    date: "2026-06-16",
    time: "13:00",
    round: "Group Stage",
    status: "upcoming",
  },
  {
    id: "m4",
    stadiumId: "sofi",
    homeTeam: "Germany",
    awayTeam: "Spain",
    homeFlag: "🇩🇪",
    awayFlag: "🇪🇸",
    date: "2026-06-17",
    time: "20:00",
    round: "Group Stage",
    status: "upcoming",
  },
  {
    id: "m5",
    stadiumId: "att-stadium",
    homeTeam: "England",
    awayTeam: "Portugal",
    homeFlag: "🏴",
    awayFlag: "🇵🇹",
    date: "2026-06-18",
    time: "18:30",
    round: "Group Stage",
    status: "upcoming",
  },
];

export const TRANSPORT_OPTIONS: TransportOption[] = [
  { id: "t1", mode: "metro", name: "NJ Transit Rail - Meadowlands", etaMinutes: 12, distanceKm: 3.2, cost: "$5.50", crowdLevel: "medium", co2SavedKg: 2.1, icon: "train" },
  { id: "t2", mode: "shuttle", name: "Official FIFA Fan Shuttle", etaMinutes: 8, distanceKm: 2.1, cost: "Free", crowdLevel: "high", co2SavedKg: 1.8, icon: "bus" },
  { id: "t3", mode: "rideshare", name: "Uber/Lyft Pickup Zone C", etaMinutes: 15, distanceKm: 4.5, cost: "$28-35", crowdLevel: "low", icon: "car" },
  { id: "t4", mode: "bus", name: "Coach USA Express Bus", etaMinutes: 20, distanceKm: 5.8, cost: "$12", crowdLevel: "medium", co2SavedKg: 3.4, icon: "bus" },
  { id: "t5", mode: "walk", name: "Walking Path from Secaucus", etaMinutes: 35, distanceKm: 2.8, cost: "Free", crowdLevel: "low", co2SavedKg: 4.0, icon: "footprints" },
  { id: "t6", mode: "taxi", name: "Yellow Cab Stand", etaMinutes: 10, distanceKm: 3.0, cost: "$32-40", crowdLevel: "low", icon: "car-taxi-front" },
];

export const CROWD_TRENDS: CrowdTrendPoint[] = [
  { time: "14:00", occupancy: 12, incidents: 0 },
  { time: "15:00", occupancy: 28, incidents: 1 },
  { time: "16:00", occupancy: 45, incidents: 1 },
  { time: "17:00", occupancy: 63, incidents: 2 },
  { time: "18:00", occupancy: 81, incidents: 3 },
  { time: "18:30", occupancy: 92, incidents: 4 },
  { time: "19:00", occupancy: 97, incidents: 2 },
  { time: "19:30", occupancy: 95, incidents: 1 },
  { time: "20:00", occupancy: 88, incidents: 1 },
];

export const ORGANIZER_ALERTS: OrganizerAlert[] = [
  { id: "a1", title: "Gate C Congestion", message: "Entry queue exceeding 20 min wait. Recommend opening auxiliary lanes.", level: "warning", timestamp: Date.now() - 1000 * 60 * 5, zoneName: "Gate C - East Entry" },
  { id: "a2", title: "Medical Response Dispatched", message: "Medical team en route to North Stand, Section 112.", level: "critical", timestamp: Date.now() - 1000 * 60 * 12, zoneName: "North Stand" },
  { id: "a3", title: "Concession Restock Complete", message: "Food Court North fully restocked, wait times normalized.", level: "info", timestamp: Date.now() - 1000 * 60 * 20, zoneName: "Food Court North" },
  { id: "a4", title: "Parking Lot A Near Capacity", message: "Lot A at 94% capacity. Redirect incoming traffic to Lot B.", level: "warning", timestamp: Date.now() - 1000 * 60 * 30, zoneName: "Parking Lot A" },
];

export const EMERGENCY_TYPES: Array<{ value: EmergencyAlert["type"]; label: string; icon: string }> = [
  { value: "medical", label: "Medical Emergency", icon: "heart-pulse" },
  { value: "security", label: "Security Concern", icon: "shield-alert" },
  { value: "lost_item", label: "Lost Item", icon: "search" },
  { value: "lost_person", label: "Lost Person / Child", icon: "user-search" },
  { value: "fire", label: "Fire Hazard", icon: "flame" },
  { value: "crowd_crush", label: "Overcrowding / Crush Risk", icon: "users" },
  { value: "other", label: "Other", icon: "circle-alert" },
];

export const RECENT_EMERGENCIES: EmergencyAlert[] = [
  { id: "e1", type: "medical", description: "Fan feeling dizzy, requesting medical assistance", zoneId: "zone-1", zoneName: "North Stand", severity: "high", status: "responding", reportedAt: Date.now() - 1000 * 60 * 4 },
  { id: "e2", type: "lost_item", description: "Lost backpack near Gate A", zoneId: "zone-5", zoneName: "Gate A - Main Entry", severity: "low", status: "reported", reportedAt: Date.now() - 1000 * 60 * 9 },
  { id: "e3", type: "crowd_crush", description: "Overcrowding reported at concourse pinch point", zoneId: "zone-3", zoneName: "East Concourse", severity: "critical", status: "acknowledged", reportedAt: Date.now() - 1000 * 60 * 2 },
];
