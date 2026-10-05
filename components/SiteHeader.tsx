"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/find-a-station", label: "Find a station" },
  { href: "/rewards", label: "Rewards" },
  { href: "/food-and-shop", label: "Food & shop" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b-4 border-engen bg-blue text-paper">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 px-4 py-2">
        <Link
          href="/"
          className="text-[1.5rem] font-bold uppercase leading-none tracking-[0.14em] text-paper"
        >
          Engen
        </Link>
        <nav
          aria-label="Primary"
          className="order-last -mx-4 flex w-[calc(100%+2rem)] gap-x-2 overflow-x-auto px-4 md:order-none md:mx-0 md:w-auto md:flex-1 md:justify-end md:gap-x-4 md:overflow-visible md:px-0"
        >
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center text-[0.95rem] font-semibold text-paper underline-offset-8 hover:underline ${
                  active ? "underline decoration-2" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
