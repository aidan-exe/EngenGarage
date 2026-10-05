import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { cookies } from "next/headers";
import { CookieBar } from "@/components/CookieBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl, NOTICE_COOKIE } from "@/lib/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Engen",
    template: "%s · Engen",
  },
  description:
    "Find an Engen station, check illustrative inland and coastal fuel prices, and see how Trio, eBucks and Clicks rewards work.",
  applicationName: "Engen",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const noticeDismissed = jar.get(NOTICE_COOKIE)?.value === "1";

  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
      <body
        className={`flex min-h-full flex-col bg-paper font-sans text-ink ${noticeDismissed ? "" : "pb-24"}`}
      >
        <SiteHeader />
        <div id="content" className="flex-1">
          {children}
        </div>
        <SiteFooter />
        <CookieBar dismissed={noticeDismissed} />
      </body>
    </html>
  );
}
