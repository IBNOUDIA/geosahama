"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { MapPin, Search, Crosshair, Copy, Check, Loader2 } from "lucide-react";

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

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function MapWithControls({ t }: { t: any }) {
  const map = useMap();
  const geocodingLib = useMapsLibrary("geocoding");

  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);

  const [markedPoint, setMarkedPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestHub, setNearestHub] = useState<{ name: string; distanceKm: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!geocodingLib || !map || !searchValue.trim()) return;
    setSearching(true);
    setSearchError("");
    try {
      const geocoder = new geocodingLib.Geocoder();
      const { results } = await geocoder.geocode({ address: searchValue });
      if (results && results[0]) {
        const loc = results[0].geometry.location;
        const point = { lat: loc.lat(), lng: loc.lng() };
        map.panTo(point);
        map.setZoom(11);
        setMarkedPoint(point);
        setUserLocation(null);
        setNearestHub(null);
      } else {
        setSearchError(t.searchError);
      }
    } catch {
      setSearchError(t.searchError);
    } finally {
      setSearching(false);
    }
  };

  const handleMapClick = (event: MapMouseEvent) => {
    const latLng = event.detail.latLng;
    if (!latLng) return;
    setMarkedPoint({ lat: latLng.lat, lng: latLng.lng });
    setUserLocation(null);
    setNearestHub(null);
    setCopied(false);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocateError(t.geoNotSupported);
      return;
    }
    setLocating(true);
    setLocateError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const point = { lat: latitude, lng: longitude };
        setUserLocation(point);
        setMarkedPoint(null);
        map?.panTo(point);
        map?.setZoom(6);

        let nearest = { name: HUBS[0].name, distanceKm: haversineKm(latitude, longitude, HUBS[0].lat, HUBS[0].lng) };
        for (const hub of HUBS.slice(1)) {
          const d = haversineKm(latitude, longitude, hub.lat, hub.lng);
          if (d < nearest.distanceKm) nearest = { name: hub.name, distanceKm: d };
        }
        setNearestHub(nearest);
        setLocating(false);
      },
      () => {
        setLocateError(t.locateError);
        setLocating(false);
      }
    );
  };

  const handleCopy = () => {
    if (!markedPoint) return;
    navigator.clipboard.writeText(`${markedPoint.lat.toFixed(6)}, ${markedPoint.lng.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={{ lat: 22, lng: -25 }}
        defaultZoom={3}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        styles={DARK_MAP_STYLE}
        onClick={handleMapClick}
      >
        {HUBS.map((hub) => (
          <Marker key={hub.name} position={{ lat: hub.lat, lng: hub.lng }} title={hub.name} />
        ))}
        {markedPoint && <Marker position={markedPoint} title={t.coordinatesLabel} />}
        {userLocation && <Marker position={userLocation} title={t.youAreHere} />}
      </Map>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="absolute top-4 left-4 right-16 md:right-auto md:w-80 z-10 flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-black/80 backdrop-blur border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-sahamaOrange"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="bg-sahamaOrange text-black px-3 rounded-lg text-sm font-semibold shrink-0 disabled:opacity-60 flex items-center justify-center"
        >
          {searching ? <Loader2 size={15} className="animate-spin" /> : t.searchButton}
        </button>
      </form>
      {searchError && (
        <div className="absolute top-16 left-4 z-10 bg-red-950/90 border border-red-900 text-red-300 text-xs px-3 py-1.5 rounded-lg">
          {searchError}
        </div>
      )}

      {/* My location button */}
      <button
        onClick={handleLocate}
        disabled={locating}
        title={t.myLocationTitle}
        className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur border border-zinc-700 hover:border-sahamaYellow p-2.5 rounded-lg text-white transition disabled:opacity-60"
      >
        <Crosshair size={17} className={locating ? "animate-spin" : ""} />
      </button>
      {locateError && (
        <div className="absolute top-16 right-4 z-10 bg-red-950/90 border border-red-900 text-red-300 text-xs px-3 py-1.5 rounded-lg max-w-[220px] text-right">
          {locateError}
        </div>
      )}

      {/* Clicked / searched coordinates panel */}
      {markedPoint && (
        <div className="absolute bottom-4 right-4 z-10 bg-black/80 backdrop-blur border border-zinc-700 rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-gray-200">
          <MapPin size={13} className="text-sahamaOrange shrink-0" />
          <span className="font-mono">
            {markedPoint.lat.toFixed(6)}, {markedPoint.lng.toFixed(6)}
          </span>
          <button
            onClick={handleCopy}
            title={t.copyLabel}
            className="text-gray-400 hover:text-sahamaYellow transition"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      )}

      {/* Nearest hub panel */}
      {nearestHub && (
        <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur border border-zinc-700 rounded-lg px-3 py-2 text-xs text-gray-200">
          {t.nearestHubLabel} <span className="text-sahamaYellow font-semibold">{nearestHub.name}</span> —{" "}
          {Math.round(nearestHub.distanceKm)} km
        </div>
      )}
    </>
  );
}

export default function GoogleMapView({ apiKey, t }: { apiKey: string; t: any }) {
  return (
    <APIProvider apiKey={apiKey}>
      <MapWithControls t={t} />
    </APIProvider>
  );
}
