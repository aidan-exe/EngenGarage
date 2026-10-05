import { stationSearchHref, type AmenityId } from "@/lib/stations";

export type FoodOffer = {
  id: AmenityId;
  name: string;
  summary: string;
  detail: string;
  href: string;
  action: string;
  image: string;
  alt: string;
};

export const foodOffers: FoodOffer[] = [
  {
    id: "cafe365",
    name: "Café 365",
    summary: "Coffee and a hot meal on the forecourt.",
    detail:
      "Selected stations serve Café 365 for a meal with the fill-up, to sit in or take away. Hours follow that station.",
    href: stationSearchHref({ amenities: ["cafe365"] }),
    action: "Find a Café 365",
    image: "/photos/cafe.jpg",
    alt: "A café counter with coffee equipment",
  },
  {
    id: "brazmata",
    name: "Brazmata",
    summary: "Barista coffee at selected stations.",
    detail:
      "Brazmata is the barista counter. Use it when you want a made coffee, not a flask from the shop fridge.",
    href: stationSearchHref({ amenities: ["brazmata"] }),
    action: "Find a Brazmata",
    image: "/photos/coffee.jpg",
    alt: "A cup of coffee seen from above",
  },
  {
    id: "quickshop",
    name: "Quickshop",
    summary: "Drinks, snacks and everyday items.",
    detail:
      "Quickshop is the forecourt shop: drinks, snacks, bread and basics, so a top-up does not mean a second stop.",
    href: stationSearchHref({ amenities: ["quickshop"] }),
    action: "Find a Quickshop",
    image: "/photos/shop.jpg",
    alt: "Shelves of packaged food in a shop",
  },
];
