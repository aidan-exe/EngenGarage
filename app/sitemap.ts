import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { stations } from "@/lib/stations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date("2026-10-05");
  const paths = ["", "/find-a-station", "/rewards", "/food-and-shop", "/about"];

  return [
    ...paths.map((path) => ({
      url: `${base}${path || "/"}`,
      lastModified,
    })),
    ...stations.map((station) => ({
      url: `${base}/find-a-station/${station.slug}`,
      lastModified,
    })),
  ];
}
