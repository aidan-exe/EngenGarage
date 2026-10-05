import Link from "next/link";
import { CARE_DISPLAY, CARE_TEL } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/find-a-station", label: "Find a station" },
  { href: "/rewards", label: "Rewards" },
  { href: "/food-and-shop", label: "Food & shop" },
  { href: "/about", label: "About" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="bg-blue text-paper">
        <p className="mx-auto max-w-6xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em]">
          Engen
        </p>
      </div>
      <div className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-blue">Customer care</p>
          <a
            className="mt-1 inline-flex min-h-11 items-center text-xl font-semibold text-blue"
            href={`tel:${CARE_TEL}`}
          >
            {CARE_DISPLAY}
          </a>
          <p className="mt-2 max-w-prose text-sm leading-relaxed">
            Engen will never SMS you a link. If a message asks you to tap a link, share a PIN, or
            pay a fee, delete it and call customer care.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col sm:items-end">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center font-semibold text-blue underline-offset-4 hover:underline sm:justify-end"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      </div>
    </footer>
  );
}
