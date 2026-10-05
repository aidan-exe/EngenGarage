export const AMENITIES = [
  { id: "24h", label: "24h" },
  { id: "cafe365", label: "Café 365" },
  { id: "brazmata", label: "Brazmata" },
  { id: "quickshop", label: "Quickshop" },
  { id: "trio", label: "Earns Trio" },
] as const;

export type AmenityId = (typeof AMENITIES)[number]["id"];

/** Shown wherever the hard-coded station list is presented. */
export const SAMPLE_STATION_NOTE =
  "This is a sample station list for the UX concept, not the live Engen network.";

export type Station = {
  slug: string;
  name: string;
  suburb: string;
  city: string;
  province: string;
  address: string;
  lat: number;
  lng: number;
  region: "inland" | "coastal";
  amenities: AmenityId[];
  opens: string;
  closes: string;
};

/** Sample stations for the UX concept. Not the live Engen network. */
export const stations: Station[] = [
  {
    slug: "rivonia",
    name: "Engen Rivonia",
    suburb: "Sandton",
    city: "Johannesburg",
    province: "Gauteng",
    address: "Rivonia Road, Sandton",
    lat: -26.0556,
    lng: 28.0567,
    region: "inland",
    amenities: ["24h", "cafe365", "quickshop", "trio"],
    opens: "00:00",
    closes: "24:00",
  },
  {
    slug: "midrand",
    name: "Engen Midrand",
    suburb: "Midrand",
    city: "Johannesburg",
    province: "Gauteng",
    address: "Grand Central Boulevard, Midrand",
    lat: -25.9964,
    lng: 28.1268,
    region: "inland",
    amenities: ["24h", "quickshop", "trio"],
    opens: "00:00",
    closes: "24:00",
  },
  {
    slug: "menlyn",
    name: "Engen Menlyn",
    suburb: "Menlyn",
    city: "Pretoria",
    province: "Gauteng",
    address: "Garsfontein Road, Menlyn",
    lat: -25.7826,
    lng: 28.2756,
    region: "inland",
    amenities: ["cafe365", "brazmata", "quickshop", "trio"],
    opens: "06:00",
    closes: "22:00",
  },
  {
    slug: "century-city",
    name: "Engen Century City",
    suburb: "Century City",
    city: "Cape Town",
    province: "Western Cape",
    address: "Century Boulevard, Century City",
    lat: -33.8906,
    lng: 18.5108,
    region: "coastal",
    amenities: ["24h", "cafe365", "brazmata", "quickshop", "trio"],
    opens: "00:00",
    closes: "24:00",
  },
  {
    slug: "sea-point",
    name: "Engen Sea Point",
    suburb: "Sea Point",
    city: "Cape Town",
    province: "Western Cape",
    address: "Main Road, Sea Point",
    lat: -33.918,
    lng: 18.388,
    region: "coastal",
    amenities: ["cafe365", "quickshop"],
    opens: "06:00",
    closes: "21:00",
  },
  {
    slug: "umhlanga",
    name: "Engen Umhlanga",
    suburb: "Umhlanga",
    city: "Durban",
    province: "KwaZulu-Natal",
    address: "Chartwell Drive, Umhlanga",
    lat: -29.7278,
    lng: 31.084,
    region: "coastal",
    amenities: ["24h", "brazmata", "quickshop", "trio"],
    opens: "00:00",
    closes: "24:00",
  },
  {
    slug: "gateway",
    name: "Engen Gateway",
    suburb: "Umhlanga Ridge",
    city: "Durban",
    province: "KwaZulu-Natal",
    address: "Palm Boulevard, Umhlanga Ridge",
    lat: -29.7254,
    lng: 31.0686,
    region: "coastal",
    amenities: ["cafe365", "quickshop", "trio"],
    opens: "07:00",
    closes: "22:00",
  },
  {
    slug: "bloemfontein",
    name: "Engen Bloemfontein",
    suburb: "Bloemfontein Central",
    city: "Bloemfontein",
    province: "Free State",
    address: "Nelson Mandela Drive, Bloemfontein",
    lat: -29.116,
    lng: 26.214,
    region: "inland",
    amenities: ["24h", "quickshop"],
    opens: "00:00",
    closes: "24:00",
  },
  {
    slug: "walmer",
    name: "Engen Walmer",
    suburb: "Walmer",
    city: "Gqeberha",
    province: "Eastern Cape",
    address: "Main Road, Walmer",
    lat: -33.973,
    lng: 25.583,
    region: "coastal",
    amenities: ["cafe365", "quickshop", "trio"],
    opens: "06:00",
    closes: "21:00",
  },
  {
    slug: "stellenbosch",
    name: "Engen Stellenbosch",
    suburb: "Stellenbosch",
    city: "Stellenbosch",
    province: "Western Cape",
    address: "Dorp Street, Stellenbosch",
    lat: -33.936,
    lng: 18.861,
    region: "coastal",
    amenities: ["cafe365", "brazmata"],
    opens: "06:30",
    closes: "21:00",
  },
  {
    slug: "polokwane",
    name: "Engen Polokwane",
    suburb: "Polokwane Central",
    city: "Polokwane",
    province: "Limpopo",
    address: "Thabo Mbeki Street, Polokwane",
    lat: -23.9045,
    lng: 29.453,
    region: "inland",
    amenities: ["24h", "quickshop", "trio"],
    opens: "00:00",
    closes: "24:00",
  },
  {
    slug: "beacon-bay",
    name: "Engen Beacon Bay",
    suburb: "Beacon Bay",
    city: "East London",
    province: "Eastern Cape",
    address: "Bonza Bay Road, Beacon Bay",
    lat: -32.958,
    lng: 27.948,
    region: "coastal",
    amenities: ["24h", "cafe365", "quickshop"],
    opens: "05:30",
    closes: "22:00",
  },
];

export function isAmenity(value: string): value is AmenityId {
  return AMENITIES.some((item) => item.id === value);
}

export function amenityLabel(id: AmenityId): string {
  return AMENITIES.find((item) => item.id === id)?.label ?? id;
}

export function parseAmenities(value: string | string[] | undefined): AmenityId[] {
  const raw = Array.isArray(value) ? value : value ? [value] : [];
  const seen = new Set<AmenityId>();
  for (const item of raw) {
    for (const part of item.split(",")) {
      if (isAmenity(part)) seen.add(part);
    }
  }
  return [...seen];
}

export function filterStations(query: string, amenities: AmenityId[]): Station[] {
  const needle = query.trim().toLowerCase();
  return stations.filter((station) => {
    if (needle) {
      const haystack = [
        station.name,
        station.suburb,
        station.city,
        station.province,
        station.address,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return amenities.every((amenity) => station.amenities.includes(amenity));
  });
}

export function getStation(slug: string): Station | undefined {
  return stations.find((station) => station.slug === slug);
}

export function hoursLabel(station: Station): string {
  if (station.amenities.includes("24h")) return "Open 24 hours";
  return `Daily ${station.opens}–${station.closes}`;
}

export function earnsTrio(station: Station): boolean {
  return station.amenities.includes("trio");
}

export function stationSearchHref(options: {
  q?: string;
  amenities?: AmenityId[];
  near?: boolean;
}): string {
  const params = new URLSearchParams();
  if (options.q) params.set("q", options.q);
  for (const amenity of options.amenities ?? []) params.append("amenity", amenity);
  if (options.near) params.set("near", "1");
  const query = params.toString();
  return query ? `/find-a-station?${query}` : "/find-a-station";
}

export function navigateUrl(station: Station): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&travelmode=driving`;
}
