import { Stadium, StadiumZone } from "@/lib/types";

function makeZones(baseLat: number, baseLng: number): StadiumZone[] {
  const defs: Array<[string, string, StadiumZone["type"], number, number]> = [
    ["North Stand", "Sec 100-120", "seating", 18000, 0.001],
    ["South Stand", "Sec 200-220", "seating", 18000, -0.001],
    ["East Concourse", "Level 1", "concourse", 9000, 0.0015],
    ["West Concourse", "Level 1", "concourse", 9000, -0.0015],
    ["Gate A - Main Entry", "Plaza", "gate", 6000, 0.0008],
    ["Gate B - VIP Entry", "Plaza", "gate", 3000, -0.0008],
    ["Gate C - East Entry", "Plaza", "gate", 5000, 0.0022],
    ["Food Court North", "Level 1", "concession", 2500, 0.0012],
    ["Food Court South", "Level 1", "concession", 2500, -0.0012],
    ["Restrooms - East", "Level 1", "restroom", 800, 0.0018],
    ["Restrooms - West", "Level 1", "restroom", 800, -0.0018],
    ["Parking Lot A", "Outer Ring", "parking", 4000, 0.003],
  ];

  return defs.map(([name, section, type, capacity, offset], i) => {
    const occupancyPercent = Math.round(20 + Math.random() * 75);
    return {
      id: `zone-${i + 1}`,
      name,
      section,
      capacity,
      currentOccupancy: Math.round((occupancyPercent / 100) * capacity),
      occupancyPercent,
      lat: baseLat + offset,
      lng: baseLng + offset * 0.6,
      type,
      status: occupancyPercent >= 90 ? "critical" : occupancyPercent >= 70 ? "busy" : "normal",
    };
  });
}

export const STADIUMS: Stadium[] = [
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "East Rutherford, NJ",
    country: "USA",
    capacity: 82500,
    lat: 40.8135,
    lng: -74.0745,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    matchesHosted: 8,
    zones: makeZones(40.8135, -74.0745),
  },
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    capacity: 87500,
    lat: 19.3029,
    lng: -99.1505,
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&q=80",
    matchesHosted: 5,
    zones: makeZones(19.3029, -99.1505),
  },
  {
    id: "bc-place",
    name: "BC Place",
    city: "Vancouver",
    country: "Canada",
    capacity: 54500,
    lat: 49.2768,
    lng: -123.1119,
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&q=80",
    matchesHosted: 7,
    zones: makeZones(49.2768, -123.1119),
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    city: "Los Angeles, CA",
    country: "USA",
    capacity: 70240,
    lat: 33.9535,
    lng: -118.3392,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    matchesHosted: 8,
    zones: makeZones(33.9535, -118.3392),
  },
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    city: "Arlington, TX",
    country: "USA",
    capacity: 80000,
    lat: 32.7473,
    lng: -97.0945,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
    matchesHosted: 9,
    zones: makeZones(32.7473, -97.0945),
  },
];

export function getStadium(id: string): Stadium | undefined {
  return STADIUMS.find((s) => s.id === id);
}
