import type { Metadata } from "next";
import { PageBand } from "@/components/PageBand";
import { StationResults } from "@/components/StationResults";
import { StationSearch } from "@/components/StationSearch";
import { filterStations, parseAmenities, SAMPLE_STATION_NOTE } from "@/lib/stations";

export const metadata: Metadata = {
  title: "Find an Engen station",
  description:
    "Sample station list for this UX concept, not the live Engen network. Filter for 24-hour sites, Café 365, Brazmata, Quickshop and Trio.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function FindStationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const amenities = parseAmenities(params.amenity);
  const near = params.near === "1";
  const matches = filterStations(query, amenities);

  return (
    <>
      <PageBand title="Find an Engen station">
        <p>{SAMPLE_STATION_NOTE}</p>
        <p>
          Search by town, or use Near me. Filter for 24-hour sites, Café 365, Brazmata, Quickshop and
          stations that earn Trio.
        </p>
      </PageBand>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <StationSearch query={query} amenities={amenities} near={near} />
        <StationResults stations={matches} requestNearMe={near} />
      </main>
    </>
  );
}
