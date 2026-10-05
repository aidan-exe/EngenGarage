import Link from "next/link";
import { stationSearchHref } from "@/lib/stations";

export function TrioPanel() {
  return (
    <section aria-labelledby="trio-heading" className="bg-blue text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em]">Trio</p>
          <h2 id="trio-heading" className="mt-1 text-2xl font-semibold leading-tight">
            Up to R12 a litre
          </h2>
          <p className="mt-2 leading-relaxed">
            Pay with FNB and swipe a Clicks ClubCard at a participating Engen. From 1 August 2026.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/rewards" className="btn btn-on-dark">
            See if you qualify
          </Link>
          <Link href={stationSearchHref({ amenities: ["trio"] })} className="btn btn-ghost-on-dark">
            Stations that earn Trio
          </Link>
        </div>
      </div>
    </section>
  );
}
