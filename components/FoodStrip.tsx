import Image from "next/image";
import Link from "next/link";
import { SectionBand } from "@/components/PageBand";
import { foodOffers } from "@/lib/food";

export function FoodStrip() {
  return (
    <section aria-labelledby="food-heading">
      <SectionBand id="food-heading" title="Food & shop" tone="primary" />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {foodOffers.map((offer) => (
            <li key={offer.id} className="photo-card flex flex-col">
              <Image
                src={offer.image}
                alt={offer.alt}
                width={1200}
                height={800}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-blue">{offer.name}</h3>
                <p className="mt-1 flex-1 text-sm text-mute">{offer.summary}</p>
                <Link href={offer.href} className="mt-2 inline-flex min-h-11 items-center font-semibold text-blue underline">
                  {offer.action}
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-mute">
          Photographs are stock images under the Unsplash License, not Engen sites.
        </p>
      </div>
    </section>
  );
}
