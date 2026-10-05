"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StationMap } from "@/components/StationMap";
import { haversineKm } from "@/lib/geo";
import { GOOGLE_MAPS_API_KEY } from "@/lib/maps";
import {
  amenityLabel,
  earnsTrio,
  hoursLabel,
  navigateUrl,
  SAMPLE_STATION_NOTE,
  type Station,
} from "@/lib/stations";

type Origin = { lat: number; lng: number };

export function StationResults({
  stations,
  requestNearMe,
}: {
  stations: Station[];
  requestNearMe: boolean;
}) {
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [locating, setLocating] = useState(requestNearMe);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  const [countryView, setCountryView] = useState(false);

  useEffect(() => {
    if (!requestNearMe) return;

    if (!navigator.geolocation) {
      const timeout = window.setTimeout(() => {
        setLocating(false);
        setMessage("This browser cannot share a location. Search by town instead.");
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocating(false);
      },
      () => {
        if (cancelled) return;
        setLocating(false);
        setMessage("Location is off. Search by town, or allow location and try Near me again.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 120000 },
    );

    return () => {
      cancelled = true;
    };
  }, [requestNearMe]);

  const ordered = useMemo(() => {
    if (!origin) return stations;
    return [...stations].sort((a, b) => haversineKm(origin, a) - haversineKm(origin, b));
  }, [origin, stations]);

  const nearest = origin && ordered.length > 0 ? haversineKm(origin, ordered[0]) : null;
  const farAway = nearest != null && nearest > 400;
  const explicit = ordered.find((station) => station.slug === focusSlug) ?? null;
  const shownSlug = GOOGLE_MAPS_API_KEY
    ? (explicit?.slug ?? null)
    : countryView
      ? null
      : (explicit?.slug ?? ordered[0]?.slug ?? null);

  function showOnMap(slug: string) {
    setCountryView(false);
    setFocusSlug(slug);
    document.getElementById("station-map")?.scrollIntoView({ block: "nearest" });
  }

  return (
    <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
      <div className="lg:sticky lg:top-3">
        <StationMap
          stations={ordered}
          focusSlug={explicit?.slug ?? null}
          countryView={countryView}
          onFocus={showOnMap}
          onCountry={() => {
            setCountryView(true);
            setFocusSlug(null);
          }}
          origin={origin}
        />
      </div>
      <div>
      <p className="max-w-prose text-sm leading-snug">{SAMPLE_STATION_NOTE}</p>
      <p aria-live="polite" className="mt-2 text-sm font-semibold">
        {locating
          ? "Finding stations near you."
          : `${ordered.length} ${ordered.length === 1 ? "station" : "stations"}`}
        {origin ? " · sorted by distance" : ""}
      </p>
      {message ? <p className="mt-2 max-w-prose text-sm">{message}</p> : null}
      {farAway ? (
        <p className="mt-2 max-w-prose text-sm text-mute">
          These stations are in South Africa. Distances are from your current location.
        </p>
      ) : null}
      {ordered.length === 0 ? (
        <p className="mt-4 max-w-prose">
          No station matches. Clear a filter, or try a city such as Durban, Cape Town or Polokwane.
        </p>
      ) : (
        <ol className="mt-2 divide-y divide-line border-y border-line">
          {ordered.map((station) => {
            const distance = origin ? haversineKm(origin, station) : null;
            return (
              <li key={station.slug} className="py-4">
                <article
                  className={`grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start ${
                    shownSlug === station.slug ? "border-l-4 border-blue bg-panel pl-3" : ""
                  }`}
                >
                  <div>
                    <h2 className="text-lg font-semibold text-blue">
                      <Link href={`/find-a-station/${station.slug}`} className="underline-offset-4 hover:underline">
                        {station.name}
                      </Link>
                    </h2>
                    <p className="text-sm text-mute">
                      {station.suburb}, {station.city} · {station.province}
                    </p>
                    <p className="mt-1">{station.address}</p>
                    <p className="mt-1 text-sm">
                      {hoursLabel(station)} · {station.region === "inland" ? "Inland price" : "Coastal price"}
                      {" · "}
                      {earnsTrio(station) ? "Earns Trio" : "Not on the Trio list"}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${station.name} amenities`}>
                      {station.amenities.map((amenity) => (
                        <li key={amenity} className="border border-line px-2 py-1 text-sm">
                          {amenityLabel(amenity)}
                        </li>
                      ))}
                    </ul>
                    {distance != null ? (
                      <p className="mt-2 text-sm font-semibold tabular-nums">{distance.toFixed(1)} km away</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      aria-pressed={shownSlug === station.slug}
                      onClick={() => showOnMap(station.slug)}
                    >
                      {shownSlug === station.slug ? "Shown on map" : "Show on map"}
                      <span className="sr-only"> {station.name}</span>
                    </button>
                    <a
                      className="btn btn-primary"
                      href={navigateUrl(station)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Navigate
                      <span className="sr-only"> to {station.name} (opens Google Maps)</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
      </div>
    </div>
  );
}
