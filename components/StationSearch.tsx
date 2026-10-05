import Link from "next/link";
import { AMENITIES, stationSearchHref, type AmenityId } from "@/lib/stations";

export function StationSearch({
  query,
  amenities,
  near,
}: {
  query: string;
  amenities: AmenityId[];
  near: boolean;
}) {
  const hasFilters = query.length > 0 || amenities.length > 0 || near;

  return (
    <div className="mt-4">
      <form action="/find-a-station" method="get" className="flex flex-col gap-2 sm:flex-row sm:items-end">
        {amenities.map((amenity) => (
          <input key={amenity} type="hidden" name="amenity" value={amenity} />
        ))}
        {near ? <input type="hidden" name="near" value="1" /> : null}
        <div className="min-w-0 flex-1">
          <label htmlFor="station-q" className="text-sm font-semibold">
            Town, suburb or station
          </label>
          <input
            id="station-q"
            name="q"
            defaultValue={query}
            className="field mt-1"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <Link
          href={stationSearchHref({ q: query, amenities, near: true })}
          className="btn btn-secondary"
        >
          Near me
        </Link>
      </form>
      <div className="mt-4">
        <p id="station-filters" className="text-sm font-semibold">
          Filters
        </p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="station-filters">
          {AMENITIES.map((amenity) => {
            const selected = amenities.includes(amenity.id);
            const next = selected
              ? amenities.filter((item) => item !== amenity.id)
              : [...amenities, amenity.id];
            return (
              <Link
                key={amenity.id}
                href={stationSearchHref({ q: query, amenities: next, near })}
                aria-current={selected ? "true" : undefined}
                className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold ${
                  selected ? "bg-blue text-paper" : "bg-paper text-blue shadow-[inset_0_0_0_1px_#002c90]"
                }`}
              >
                {amenity.label}
                {selected ? <span className="sr-only">, selected</span> : null}
              </Link>
            );
          })}
        </div>
      </div>
      {hasFilters ? (
        <Link href="/find-a-station" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline">
          Clear filters
        </Link>
      ) : null}
    </div>
  );
}
