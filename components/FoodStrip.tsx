import Link from "next/link";
import { foodOffers } from "@/lib/food";

export function FoodStrip() {
  return (
    <section aria-labelledby="food-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 id="food-heading" className="text-xl font-semibold">
          Food & shop
        </h2>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {foodOffers.map((offer) => (
            <li key={offer.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">{offer.name}</h3>
                <p className="text-sm text-mute">{offer.summary}</p>
              </div>
              <Link href={offer.href} className="inline-flex min-h-11 items-center font-semibold underline sm:shrink-0">
                {offer.action}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
