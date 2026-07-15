"use client";

import { useRef, useCallback, useState } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Stadium, StadiumZone } from "@/lib/types";
import { densityColor } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MAP_STYLE = "mapbox://styles/mapbox/dark-v11";

function ZoneMarker({
  zone,
  onClick,
}: {
  zone: StadiumZone;
  onClick: () => void;
}) {
  const color = densityColor(zone.occupancyPercent);
  return (
    <Marker latitude={zone.lat} longitude={zone.lng} anchor="center" onClick={onClick}>
      <div
        title={zone.name}
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: color,
          border: "2.5px solid #ffffff",
          cursor: "pointer",
          boxShadow: `0 0 10px ${color}99`,
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.3)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")}
      />
    </Marker>
  );
}

export function MapboxMapView({
  stadium,
  activeZone,
  onSelectZone,
}: {
  stadium: Stadium;
  activeZone: StadiumZone | null;
  onSelectZone: (z: StadiumZone) => void;
}) {
  const mapRef = useRef(null);
  const [popupZone, setPopupZone] = useState<StadiumZone | null>(null);

  const handleMarkerClick = useCallback(
    (zone: StadiumZone) => {
      setPopupZone(zone);
      onSelectZone(zone);
    },
    [onSelectZone]
  );

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "paste_your_mapbox_token_here") {
    return (
      <div className="w-full h-full rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center p-8 bg-muted/30">
        <div className="text-4xl mb-3">🗺️</div>
        <p className="font-semibold mb-1">Mapbox token not configured</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Add{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            NEXT_PUBLIC_MAPBOX_TOKEN
          </code>{" "}
          to your <code className="text-xs bg-muted px-1 py-0.5 rounded">.env.local</code> file.
          <br />
          Get a free token at{" "}
          <a
            href="https://account.mapbox.com/access-tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            account.mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: stadium.lat,
          longitude: stadium.lng,
          zoom: 16.5,
          pitch: 45,
          bearing: -10,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {stadium.zones.map((zone) => (
          <ZoneMarker
            key={zone.id}
            zone={zone}
            onClick={() => handleMarkerClick(zone)}
          />
        ))}

        {popupZone && (
          <Popup
            latitude={popupZone.lat}
            longitude={popupZone.lng}
            anchor="bottom"
            onClose={() => setPopupZone(null)}
            closeOnClick={false}
            style={{ zIndex: 10 }}
          >
            <div className="p-1 min-w-[140px]">
              <p className="font-semibold text-sm text-black">{popupZone.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: densityColor(popupZone.occupancyPercent) }}
                />
                <span className="text-xs text-gray-700">
                  {popupZone.occupancyPercent}% occupied
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 capitalize">{popupZone.status}</p>
            </div>
          </Popup>
        )}
      </Map>

      {/* Subtle badge */}
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full pointer-events-none">
        Powered by Mapbox
      </div>
    </div>
  );
}
