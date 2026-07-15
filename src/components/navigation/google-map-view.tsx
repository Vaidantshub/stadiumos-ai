"use client";

import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Stadium, StadiumZone } from "@/lib/types";
import { densityColor } from "@/lib/utils";

const containerStyle = { width: "100%", height: "100%", borderRadius: "1rem" };

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0b1f18" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b1f18" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8fb8a8" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#173b2c" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a2a24" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];

export function GoogleMapView({
  stadium,
  activeZone,
  onSelectZone,
}: {
  stadium: Stadium;
  activeZone: StadiumZone | null;
  onSelectZone: (z: StadiumZone) => void;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    id: "stadiumos-google-map-script",
  });

  const center = useMemo(() => ({ lat: stadium.lat, lng: stadium.lng }), [stadium]);

  if (!apiKey) {
    return (
      <div className="w-full h-full rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center p-8 bg-muted/30">
        <p className="font-medium mb-1">Google Maps API key not configured</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Add <code className="text-xs bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your
          environment to enable live interactive maps. The schematic map view below still works fully.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="w-full h-full rounded-2xl bg-muted/30 shimmer-bg" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      options={{
        styles: MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {stadium.zones.map((zone) => (
        <MarkerF
          key={zone.id}
          position={{ lat: zone.lat, lng: zone.lng }}
          onClick={() => onSelectZone(zone)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: densityColor(zone.occupancyPercent),
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
        />
      ))}
      {activeZone && (
        <InfoWindowF
          position={{ lat: activeZone.lat, lng: activeZone.lng }}
          onCloseClick={() => onSelectZone(activeZone)}
        >
          <div className="text-sm text-black">
            <p className="font-semibold">{activeZone.name}</p>
            <p>{activeZone.occupancyPercent}% occupied</p>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}
