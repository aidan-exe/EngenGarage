import type { Metadata } from "next";
import Link from "next/link";
import { PageBand } from "@/components/PageBand";
import { CARE_DISPLAY, CARE_TEL } from "@/lib/site";
import { stationSearchHref } from "@/lib/stations";

export const metadata: Metadata = {
  title: "Trio, eBucks and Clicks rewards",
  description:
    "See whether you qualify for Engen Trio, FNB eBucks and Clicks ClubCard, and what Engen will never ask for by SMS.",
};

const TRIO_TERMS =
  "https://engen-admin.engen.co.za/storage/app/media/Terms%20and%20Conditions/Trio%20Campaign_Terms%20and%20%20Conditions.pdf";

const SCAM_ALERT = "https://www.engen.co.za/media/media-release/scam-alert-fraudulent-engen-sms";

export default function RewardsPage() {
  return (
    <>
      <PageBand title="Rewards">
        <p>
          Pay with FNB, swipe your Clicks ClubCard, and earn up to R12 a litre at a participating
          Engen.
        </p>
      </PageBand>
      <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <aside className="border-l-4 border-engen bg-scam px-4 py-3" aria-label="Scam warning">
        <h2 className="text-lg font-semibold">Engen will never SMS you a link</h2>
        <p className="mt-2 leading-relaxed">
          We will not text you a web address, ask for your PIN, or tell you to pay a verification
          fee. If an SMS or WhatsApp says it is Engen and includes a link, delete it and call{" "}
          <a className="font-semibold underline" href={`tel:${CARE_TEL}`}>
            {CARE_DISPLAY}
          </a>
          .
        </p>
        <p className="mt-2">
          <a className="font-semibold underline" href={SCAM_ALERT}>
            Engen’s scam alert
          </a>
        </p>
      </aside>

      <section className="mt-8" aria-labelledby="trio-check">
        <h2 id="trio-check" className="text-xl font-semibold text-blue">
          Trio
        </h2>
        <p className="mt-2 leading-relaxed">
          Trio is the FNB eBucks, Clicks and Engen offer. The top rate is R12 a litre from 1 August
          2026. You need all of these:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>You pay with a qualifying FNB account.</li>
          <li>You swipe or scan a Clicks ClubCard on that same fill.</li>
          <li>The station is on the Trio list. Not every Engen is.</li>
          <li>The purchase falls under the Trio terms.</li>
        </ul>
        <p className="mt-3 leading-relaxed">
          Your eBucks level changes the rate. R12 a litre is the top rate, not a promise on every
          litre.
        </p>
        <p className="mt-3">
          <a className="font-semibold underline" href={TRIO_TERMS}>
            Trio terms (PDF)
          </a>
        </p>
      </section>

      <section className="mt-8" aria-labelledby="example-heading">
        <h2 id="example-heading" className="text-xl font-semibold text-blue">
          A worked example
        </h2>
        <p className="mt-2 leading-relaxed">
          50 litres of 95 unleaded at the illustrative inland price of R26.92 comes to R1,346.00.
          If the full Trio rate of R12 a litre applied, that fill would return R600.00. Most fills
          earn less than the top rate.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="ebucks-check">
        <h2 id="ebucks-check" className="text-xl font-semibold text-blue">
          eBucks
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>You need an FNB eBucks account.</li>
          <li>eBucks are earned only at participating Engen stations.</li>
          <li>A station can sell Engen fuel and still be off the eBucks list.</li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="clicks-check">
        <h2 id="clicks-check" className="text-xl font-semibold text-blue">
          Clicks ClubCard
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>Present your ClubCard when you pay.</li>
          <li>Points are not credited at every Engen. The participating-station rule applies.</li>
          <li>
            If a fill is missing from your ClubCard, keep the slip and call {CARE_DISPLAY}. Do not
            tap a link in an SMS.
          </li>
        </ul>
      </section>

      <p className="mt-8">
        <Link href={stationSearchHref({ amenities: ["trio"] })} className="btn btn-primary">
          Stations that earn Trio
        </Link>
      </p>
      </main>
    </>
  );
}
