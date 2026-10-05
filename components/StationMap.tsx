"use client";

import { useEffect, useRef, useState } from "react";
import { haversineKm } from "@/lib/geo";
import {
  GOOGLE_MAPS_API_KEY,
  MAPS_KEY_NOTE,
  SA_METROS,
  loadGoogleMaps,
  mapsEmbedSrc,
  mapsNamespace,
  type InfoHandle,
  type MapHandle,
  type MarkerHandle,
} from "@/lib/maps";
import type { Station } from "@/lib/stations";

type Origin = { lat: number; lng: number };

export function StationMap({
  stations,
  focusSlug,
  countryView,
  onFocus,
  onCountry,
  origin,
}: {
  stations: Station[];
  focusSlug: string | null;
  countryView: boolean;
  onFocus: (slug: string) => void;
  onCountry: () => void;
  origin: Origin | null;
}) {
  const [jsFailed, setJsFailed] = useState(false);
  const useJs = GOOGLE_MAPS_API_KEY.length > 0 && !jsFailed;
  const nodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapHandle | null>(null);
  const markersRef = useRef<MarkerHandle[]>([]);
  const infoRef = useRef<InfoHandle | null>(null);
  const onFocusRef = useRef(onFocus);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    onFocusRef.current = onFocus;
  });

  useEffect(() => {
    if (!useJs) return;
    const node = nodeRef.current;
    if (!node) return;

    let cancelled = false;
    loadGoogleMaps(GOOGLE_MAPS_API_KEY)
      .then((maps) => {
        if (cancelled) return;
        node.replaceChildren();
        mapRef.current = new maps.Map(node, {
          center: SA_METROS,
          zoom: SA_METROS.zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          clickableIcons: false,
          gestureHandling: "cooperative",
        });
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setJsFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [useJs]);

  useEffect(() => {
    if (!useJs || !mapReady) return;
    const map = mapRef.current;
    const maps = mapsNamespace();
    if (!map || !maps) return;

    for (const marker of markersRef.current) {
      maps.event.clearInstanceListeners(marker);
      marker.setMap(null);
    }

    const bounds = new maps.LatLngBounds();
    const next: MarkerHandle[] = [];
    const info = infoRef.current ?? new maps.InfoWindow();
    infoRef.current = info;

    for (const station of stations) {
      const focused = station.slug === focusSlug;
      const marker = new maps.Marker({
        map,
        position: { lat: station.lat, lng: station.lng },
        title: `${station.name}. Sample station.`,
        icon: {
          path: maps.SymbolPath.CIRCLE,
          fillColor: "#002c90",
          fillOpacity: 1,
          strokeColor: focused ? "#c8102e" : "#ffffff",
          strokeWeight: focused ? 3 : 2,
          scale: focused ? 11 : 8,
        },
      });
      marker.addListener("click", () => onFocusRef.current(station.slug));
      bounds.extend({ lat: station.lat, lng: station.lng });
      next.push(marker);

      if (focused) {
        info.setContent(infoContent(station));
        info.open({ map, anchor: marker });
      }
    }

    if (origin && stations.length > 0) {
      const nearestKm = stations.reduce(
        (best, station) => Math.min(best, haversineKm(origin, station)),
        Infinity,
      );
      if (nearestKm <= 400) {
        const you = new maps.Marker({
          map,
          position: origin,
          title: "Your location",
          icon: {
            path: maps.SymbolPath.CIRCLE,
            fillColor: "#ffffff",
            fillOpacity: 1,
            strokeColor: "#002c90",
            strokeWeight: 3,
            scale: 7,
          },
        });
        next.push(you);
      }
    }

    markersRef.current = next;

    const focus = stations.find((station) => station.slug === focusSlug);
    if (focus) {
      map.panTo({ lat: focus.lat, lng: focus.lng });
      map.setZoom(13);
    } else if (stations.length === 1) {
      map.panTo({ lat: stations[0].lat, lng: stations[0].lng });
      map.setZoom(13);
    } else if (stations.length > 1) {
      map.fitBounds(bounds);
    } else {
      map.panTo(SA_METROS);
      map.setZoom(SA_METROS.zoom);
    }

    return () => {
      for (const marker of next) {
        maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }
    };
  }, [useJs, mapReady, stations, focusSlug, origin]);

  const embedStation = countryView
    ? null
    : (stations.find((station) => station.slug === focusSlug) ?? stations[0] ?? null);
  const caption = useJs
    ? "Sample pins for the stations in this list."
    : embedStation
      ? `Sample pin: ${embedStation.name}`
      : "South Africa, centred on the major metros.";
  const iframeTitle = embedStation
    ? `Map pin for sample station ${embedStation.name}`
    : "Map of South Africa, centred on the major metros";

  return (
    <div id="station-map" className="border-4 border-blue bg-blue">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-paper">
        <p className="text-sm font-semibold">{caption}</p>
        {useJs ? null : (
          <button
            type="button"
            className="btn btn-on-dark px-3 text-sm"
            aria-pressed={countryView}
            onClick={onCountry}
          >
            South Africa
          </button>
        )}
      </div>
      <div className="h-64 bg-panel sm:h-80 lg:h-[28rem]">
        {useJs ? (
          <div ref={nodeRef} className="h-full w-full" role="region" aria-label="Sample station map" />
        ) : (
          <iframe
            title={iframeTitle}
            src={mapsEmbedSrc(embedStation, jsFailed ? GOOGLE_MAPS_API_KEY : "")}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
      {useJs ? null : <p className="px-3 py-2 text-sm leading-snug text-paper">{MAPS_KEY_NOTE}</p>}
    </div>
  );
}

function infoContent(station: Station): HTMLElement {
  const root = document.createElement("div");
  const name = document.createElement("p");
  name.style.fontWeight = "700";
  name.style.margin = "0 0 0.25rem";
  name.textContent = station.name;
  const note = document.createElement("p");
  note.style.margin = "0 0 0.25rem";
  note.textContent = "Sample station, not the live Engen network.";
  const link = document.createElement("a");
  link.href = `/find-a-station/${station.slug}`;
  link.textContent = "Station details";
  root.append(name, note, link);
  return root;
}
