export type Language = "en" | "es" | "fr" | "ar" | "pt" | "de";

export interface StadiumZone {
  id: string;
  name: string;
  section: string; // e.g. "North Stand", "Gate A"
  capacity: number;
  currentOccupancy: number; // people count
  occupancyPercent: number; // 0-100
  lat: number;
  lng: number;
  type: "seating" | "concourse" | "gate" | "concession" | "restroom" | "parking";
  status: "normal" | "busy" | "critical";
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  lat: number;
  lng: number;
  image: string;
  matchesHosted: number;
  zones: StadiumZone[];
}

export interface Match {
  id: string;
  stadiumId: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  round: string;
  status: "upcoming" | "live" | "finished";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  language?: Language;
}

export interface EmergencyAlert {
  id: string;
  type: "medical" | "security" | "lost_item" | "lost_person" | "fire" | "crowd_crush" | "other";
  description: string;
  zoneId: string;
  zoneName: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "reported" | "acknowledged" | "responding" | "resolved";
  reportedAt: number;
  reporterName?: string;
}

export interface TransportOption {
  id: string;
  mode: "metro" | "bus" | "rideshare" | "walk" | "shuttle" | "taxi";
  name: string;
  etaMinutes: number;
  distanceKm: number;
  cost: string;
  crowdLevel: "low" | "medium" | "high";
  co2SavedKg?: number;
  icon: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

export interface CrowdTrendPoint {
  time: string;
  occupancy: number;
  incidents: number;
}

export interface OrganizerAlert {
  id: string;
  title: string;
  message: string;
  level: "info" | "warning" | "critical";
  timestamp: number;
  zoneName?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: "fan" | "organizer" | "admin";
  language: Language;
  accessibilityMode: boolean;
  favoriteTeam?: string;
}
