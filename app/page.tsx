import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { FoodStrip } from "@/components/FoodStrip";
import { FuelTask, PriceTable } from "@/components/FuelPrices";
import { RegionProvider } from "@/components/RegionProvider";
import { Stories } from "@/components/Stories";
import { TrioPanel } from "@/components/TrioPanel";
import { parseRegion } from "@/lib/prices";
import { REGION_COOKIE } from "@/lib/site";
import { stationSearchHref } from "@/lib/stations";

export const metadata: Metadata = {
  title: {
    absolute: "Engen · Find a station, today’s fuel price and rewards",
  },
  description:
    "Find a nearby Engen station, check illustrative inland and coastal fuel prices, and see how Trio, eBucks and Clicks rewards work.",
};

export default async function HomePage() {
  const jar = await cookies();
  const saved = jar.get(REGION_COOKIE)?.value;
  const region = parseRegion(saved);

  return (
    <RegionProvider initialRegion={region} initialSaved={saved === "inland" || saved === "coastal"}>
      <main>
        <div className="bg-blue text-paper">
          <div className="mx-auto max-w-6xl md:px-4 md:pt-4">
            <h1 className="sr-only md:not-sr-only md:text-xl md:font-semibold md:leading-tight">
              Find a station, today’s price, and rewards
            </h1>
          </div>
          <div id="tasks" className="mx-auto grid max-w-6xl lg:grid-cols-3">
            <section
              aria-labelledby="find-heading"
              className="border-b border-white/30 px-4 py-2 lg:border-r lg:border-b-0"
            >
              <h2 id="find-heading" className="text-lg font-semibold">
                Find a station
              </h2>
              <Link href={stationSearchHref({ near: true })} className="btn btn-on-dark mt-2 w-full">
                Near me
              </Link>
              <form action="/find-a-station" method="get" className="mt-2">
                <label htmlFor="station-query" className="sr-only">
                  Town, suburb or station
                </label>
                <div className="flex gap-2">
                  <input
                    id="station-query"
                    name="q"
                    className="field"
                    placeholder="Town or suburb"
                    autoComplete="off"
                  />
                  <button type="submit" className="btn btn-ghost-on-dark shrink-0">
                    Search
                  </button>
                </div>
              </form>
            </section>
            <FuelTask />
            <section aria-labelledby="rewards-heading" className="px-4 py-2">
              <h2 id="rewards-heading" className="text-lg font-semibold">
                Rewards
              </h2>
              <p className="mt-1 leading-snug">Up to R12 a litre with FNB and Clicks.</p>
              <Link href="/rewards" className="btn btn-on-dark mt-2 w-full">
                Check if you qualify
              </Link>
            </section>
          </div>
        </div>
        <Stories />
        <TrioPanel />
        <PriceTable />
        <FoodStrip />
      </main>
    </RegionProvider>
  );
}
