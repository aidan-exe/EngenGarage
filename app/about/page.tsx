import type { Metadata } from "next";
import { PageBand } from "@/components/PageBand";
import { CARE_DISPLAY, CARE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Engen retails fuel at about 1,040 stations in South Africa. The stations listed on this site are a sample for the UX concept, not that live network.",
};

export default function AboutPage() {
  return (
    <>
      <PageBand title="About Engen">
        <p>
          Engen retails fuel at about 1,040 stations in South Africa. The stations listed on this
          site are a sample for the UX concept, not that live network.
        </p>
      </PageBand>
      <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="max-w-prose space-y-3 leading-relaxed">
        <p>
          Use this site to find a station, check the inland or coastal price, and see whether Trio,
          eBucks or Clicks applies before you fill up.
        </p>
      </div>
      <section className="mt-8" aria-labelledby="care-heading">
        <h2 id="care-heading" className="text-xl font-semibold text-blue">
          Customer care
        </h2>
        <p className="mt-2">
          <a className="text-xl font-semibold text-blue underline" href={`tel:${CARE_TEL}`}>
            {CARE_DISPLAY}
          </a>
        </p>
        <p className="mt-2 max-w-prose leading-relaxed">Engen will never SMS you a link.</p>
      </section>
      <section className="mt-8" aria-labelledby="company-heading">
        <h2 id="company-heading" className="text-xl font-semibold text-blue">
          Company
        </h2>
        <p className="mt-2 max-w-prose leading-relaxed">Engen Court, Thibault Square, Cape Town.</p>
        <p className="mt-2">
          <a className="font-semibold text-blue underline" href="https://www.engen.co.za/">
            Fleet, lubricants and media
          </a>
        </p>
      </section>
      </main>
    </>
  );
}
