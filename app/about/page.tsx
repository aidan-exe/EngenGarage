import type { Metadata } from "next";
import { CARE_DISPLAY, CARE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Engen retails fuel at about 1,040 stations in South Africa. Find a station, check the price, and see how rewards work.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold tracking-tight">About Engen</h1>
      <div className="mt-3 max-w-prose space-y-3 leading-relaxed">
        <p>Engen retails fuel at about 1,040 stations in South Africa.</p>
        <p>
          Use this site to find a station, check the inland or coastal price, and see whether Trio,
          eBucks or Clicks applies before you fill up.
        </p>
      </div>
      <section className="mt-8" aria-labelledby="care-heading">
        <h2 id="care-heading" className="text-xl font-semibold">
          Customer care
        </h2>
        <p className="mt-2">
          <a className="text-xl font-semibold underline" href={`tel:${CARE_TEL}`}>
            {CARE_DISPLAY}
          </a>
        </p>
        <p className="mt-2 max-w-prose leading-relaxed">Engen will never SMS you a link.</p>
      </section>
      <section className="mt-8" aria-labelledby="company-heading">
        <h2 id="company-heading" className="text-xl font-semibold">
          Company
        </h2>
        <p className="mt-2 max-w-prose leading-relaxed">Engen Court, Thibault Square, Cape Town.</p>
        <p className="mt-2">
          <a className="font-semibold underline" href="https://www.engen.co.za/">
            Fleet, lubricants and media
          </a>
        </p>
      </section>
    </main>
  );
}
