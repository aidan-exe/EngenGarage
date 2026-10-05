import type { Metadata } from "next";
import Link from "next/link";
import { foodOffers } from "@/lib/food";

export const metadata: Metadata = {
  title: "Café 365, Brazmata and Quickshop",
  description:
    "Coffee, hot food and a forecourt shop at selected Engen stations. Find a Café 365, Brazmata or Quickshop.",
};

export default function FoodPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold tracking-tight">Food & shop</h1>
      <p className="mt-3 max-w-prose leading-relaxed">
        Not every station has the same counter. Filter the station list for the one you want.
      </p>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {foodOffers.map((offer) => (
          <section key={offer.id} aria-labelledby={`${offer.id}-heading`} className="py-5">
            <h2 id={`${offer.id}-heading`} className="text-xl font-semibold">
              {offer.name}
            </h2>
            <p className="mt-2 max-w-prose leading-relaxed">{offer.detail}</p>
            <Link href={offer.href} className="mt-3 inline-flex min-h-11 items-center font-semibold underline">
              {offer.action}
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
