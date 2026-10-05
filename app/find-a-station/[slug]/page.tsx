import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  amenityLabel,
  earnsTrio,
  getStation,
  hoursLabel,
  navigateUrl,
  SAMPLE_STATION_NOTE,
  stations,
  stationSearchHref,
} from "@/lib/stations";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stations.map((station) => ({ slug: station.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const station = getStation(slug);
  if (!station) return { title: "Station" };

  const trio = earnsTrio(station) ? "Earns Trio." : "Not on the Trio list.";
  return {
    title: {
      absolute: `${station.name} in ${station.city} · Find an Engen station`,
    },
    description: `Sample station for this UX concept, not the live Engen network. ${station.address}. ${hoursLabel(station)}. ${trio}`,
  };
}

export default async function StationPage({ params }: Props) {
  const { slug } = await params;
  const station = getStation(slug);
  if (!station) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <p className="text-sm">
        <Link href="/find-a-station" className="font-semibold underline">
          Find an Engen station
        </Link>
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{station.name}</h1>
      <p className="mt-2 max-w-prose text-sm leading-snug">{SAMPLE_STATION_NOTE}</p>
      <p className="mt-1 text-mute">
        {station.suburb}, {station.city} · {station.province}
      </p>
      <p className="mt-4">{station.address}</p>
      <p className="mt-2">
        {hoursLabel(station)} · {station.region === "inland" ? "Inland price" : "Coastal price"}
      </p>
      <p className="mt-3 font-semibold">
        {earnsTrio(station)
          ? "This station earns Trio."
          : "This station is not on the Trio list."}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Amenities">
        {station.amenities.map((amenity) => (
          <li key={amenity} className="border border-line px-2 py-1 text-sm">
            {amenityLabel(amenity)}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <a className="btn btn-primary" href={navigateUrl(station)} target="_blank" rel="noopener noreferrer">
          Navigate
          <span className="sr-only"> to {station.name} (opens Google Maps)</span>
        </a>
        <Link href={stationSearchHref({ q: station.city })} className="btn btn-secondary">
          More in {station.city}
        </Link>
      </div>
    </main>
  );
}
