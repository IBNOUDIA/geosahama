"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";

const HUBS = [
  { name: "Dakar", lat: 14.6928, lng: -17.4467 },
  { name: "Abidjan", lat: 5.36, lng: -4.0083 },
  { name: "Conakry", lat: 9.6412, lng: -13.5784 },
  { name: "Bamako", lat: 12.6392, lng: -8.0029 },
  { name: "Montréal", lat: 45.5019, lng: -73.5674 },
];

// Dark map theme so the embed matches the site instead of a stock white map
const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#141414" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#141414" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#3f3f3f" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1c1c1c" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3a2a1a" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0b1f2a" }] },
];

export default function GoogleMapView({ apiKey }: { apiKey: string }) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={{ lat: 22, lng: -25 }}
        defaultZoom={3}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        styles={DARK_MAP_STYLE}
      >
        {HUBS.map((hub) => (
          <Marker key={hub.name} position={{ lat: hub.lat, lng: hub.lng }} title={hub.name} />
        ))}
      </Map>
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-2 rounded-lg border border-zinc-800 flex items-center gap-2 text-xs text-gray-300">
        <MapPin size={14} className="text-sahamaOrange" />
        Hubs Sahama Services : {HUBS.map((h) => h.name).join(" · ")}
      </div>
    </APIProvider>
  );
}
