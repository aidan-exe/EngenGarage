"use client";

import { formatRand, GRADES, gradeById, PRICE_EFFECTIVE, PRICE_NEXT_CHANGE, regionLabel } from "@/lib/prices";
import { RegionDefault, RegionSwitch, useRegion } from "@/components/RegionProvider";

export function FuelTask() {
  const { region } = useRegion();
  const unleaded = gradeById("95")[region];
  const diesel = gradeById("d50")[region];

  return (
    <section
      aria-labelledby="price-heading"
      className="border-b border-line px-4 py-2 lg:border-r lg:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id="price-heading" className="text-lg font-semibold leading-tight text-blue">
          Today’s fuel price
        </h2>
        <RegionSwitch />
      </div>
      <dl className="mt-2">
        <div className="flex items-baseline justify-between gap-3 border-b border-line py-1.5">
          <dt>95 Unleaded</dt>
          <dd className="text-2xl font-semibold tabular-nums text-blue">{formatRand(unleaded)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <dt>
            Diesel 50 ppm
            <span className="font-normal text-mute"> · wholesale</span>
          </dt>
          <dd className="text-2xl font-semibold tabular-nums text-blue">{formatRand(diesel)}</dd>
        </div>
      </dl>
      <p className="mt-1 text-sm leading-snug text-mute">
        Illustrative figures, effective from {PRICE_EFFECTIVE}.{" "}
        <a href="#all-grades" className="font-semibold text-ink underline">
          All grades
        </a>
      </p>
    </section>
  );
}

export function PriceTable() {
  const { region } = useRegion();

  return (
    <section id="all-grades" aria-labelledby="grades-heading" className="scroll-mt-4 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-prose">
            <h2 id="grades-heading" className="text-xl font-semibold text-blue">
              All grades
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-mute">
              Illustrative figures, effective from {PRICE_EFFECTIVE}. Not a live feed. Petrol is the
              regulated retail price. Diesel is a wholesale reference, so the pump price can differ.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <RegionSwitch />
            <RegionDefault />
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[22rem] border-collapse text-left">
            <caption className="sr-only">
              Illustrative fuel prices effective from {PRICE_EFFECTIVE}. Selected region:{" "}
              {regionLabel(region)}.
            </caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Grade
                </th>
                <th
                  scope="col"
                  className={`py-2 pr-4 font-semibold ${region === "inland" ? "bg-mist" : ""}`}
                >
                  Inland
                  {region === "inland" ? <span className="sr-only"> (selected)</span> : null}
                </th>
                <th scope="col" className={`py-2 font-semibold ${region === "coastal" ? "bg-mist" : ""}`}>
                  Coastal
                  {region === "coastal" ? <span className="sr-only"> (selected)</span> : null}
                </th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((grade) => (
                <tr key={grade.id} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    {grade.name}
                    {grade.kind === "wholesale" ? (
                      <span className="block text-sm font-normal text-mute">Wholesale reference</span>
                    ) : null}
                  </th>
                  <td
                    className={`py-3 pr-4 tabular-nums ${region === "inland" ? "bg-mist font-semibold" : ""}`}
                  >
                    {formatRand(grade.inland)}
                  </td>
                  <td className={`py-3 tabular-nums ${region === "coastal" ? "bg-mist font-semibold" : ""}`}>
                    {formatRand(grade.coastal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-mute">
          93 octane is widely available inland. Many coastal stations pump 95 only.
        </p>
        <details className="mt-3 max-w-prose">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold">
            Why these prices differ
          </summary>
          <div className="space-y-2 pb-2 text-sm leading-relaxed">
            <p>
              Inland prices include the cost of moving fuel from the coast, so Gauteng pays more than
              Cape Town or Durban.
            </p>
            <p>
              The regulated price changes on the first Wednesday of the month. The next change is{" "}
              {PRICE_NEXT_CHANGE}.
            </p>
            <p>
              These figures illustrate the {PRICE_EFFECTIVE} adjustment. They are not a live price
              feed.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
