"use client";

import { useEffect, useRef } from "react";
import { Stadium, StadiumZone } from "@/lib/types";
import { densityColor } from "@/lib/utils";

export function LeafletMapView({
  stadium,
  activeZone,
  onSelectZone,
}: {
  stadium: Stadium;
  activeZone: StadiumZone | null;
  onSelectZone: (z: StadiumZone) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").CircleMarker[]>([]);
  const popupRef = useRef<import("leaflet").Popup | null>(null);

  // Initialize map on mount
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamically import leaflet (client-only)
    import("leaflet").then((L) => {
      // Fix default icon paths broken by webpack
      // @ts-expect-error leaflet icon default url
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [stadium.lat, stadium.lng],
        zoom: 17,
        zoomControl: true,
        attributionControl: true,
      });

      // Dark tile layer — CartoDB Dark Matter (free, no key)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      mapRef.current = map;

      // Draw zone markers
      markersRef.current = stadium.zones.map((zone) => {
        const color = densityColor(zone.occupancyPercent);

        const marker = L.circleMarker([zone.lat, zone.lng], {
          radius: 11,
          fillColor: color,
          color: "#ffffff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        // Glow effect via custom pane trick using SVG filter (simple approach)
        marker.on("mouseover", function () {
          this.setStyle({ radius: 14 });
        });
        marker.on("mouseout", function () {
          this.setStyle({ radius: 11 });
        });
        marker.on("click", () => {
          onSelectZone(zone);
          if (popupRef.current) {
            popupRef.current.remove();
          }
          const popup = L.popup({ closeButton: true, className: "stadium-popup" })
            .setLatLng([zone.lat, zone.lng])
            .setContent(
              `<div style="font-family:system-ui;min-width:130px">
                <p style="font-weight:700;font-size:13px;margin:0 0 4px">${zone.name}</p>
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="width:10px;height:10px;border-radius:50%;background:${color};display:inline-block"></span>
                  <span style="font-size:12px;color:#444">${zone.occupancyPercent}% occupied</span>
                </div>
                <p style="font-size:11px;color:#888;margin:3px 0 0;text-transform:capitalize">${zone.status}</p>
              </div>`
            )
            .openOn(map);
          popupRef.current = popup;
        });

        return marker;
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-center & update markers when stadium changes
  useEffect(() => {
    if (!mapRef.current) return;

    import("leaflet").then((L) => {
      const map = mapRef.current!;
      map.setView([stadium.lat, stadium.lng], 17);

      // Remove old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Add new markers for the new stadium
      markersRef.current = stadium.zones.map((zone) => {
        const color = densityColor(zone.occupancyPercent);
        const marker = L.circleMarker([zone.lat, zone.lng], {
          radius: 11,
          fillColor: color,
          color: "#ffffff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        marker.on("mouseover", function () { this.setStyle({ radius: 14 }); });
        marker.on("mouseout", function () { this.setStyle({ radius: 11 }); });
        marker.on("click", () => {
          onSelectZone(zone);
          if (popupRef.current) popupRef.current.remove();
          const popup = L.popup({ closeButton: true })
            .setLatLng([zone.lat, zone.lng])
            .setContent(
              `<div style="font-family:system-ui;min-width:130px">
                <p style="font-weight:700;font-size:13px;margin:0 0 4px">${zone.name}</p>
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="width:10px;height:10px;border-radius:50%;background:${color};display:inline-block"></span>
                  <span style="font-size:12px;color:#444">${zone.occupancyPercent}% occupied</span>
                </div>
                <p style="font-size:11px;color:#888;margin:3px 0 0;text-transform:capitalize">${zone.status}</p>
              </div>`
            )
            .openOn(map);
          popupRef.current = popup;
        });
        return marker;
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stadium]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {/* Badge */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          color: "#fff",
          fontSize: 10,
          padding: "3px 8px",
          borderRadius: 20,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        © OpenStreetMap · CARTO
      </div>
    </div>
  );
}
