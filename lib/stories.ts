export type Story = {
  href: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  alt: string;
  action: string;
};

/** Illustrative cards. Headlines are written for this site, not copied from Engen media. */
export const stories: Story[] = [
  {
    href: "/find-a-station",
    title: "Find the station, then fill up",
    date: "5 October 2026",
    summary: "Near me, or search by town. Filter for 24 hours, Café 365, Brazmata, Quickshop and Trio.",
    image: "/photos/forecourt.jpg",
    alt: "Fuel pumps on a forecourt at night",
    action: "Find a station",
  },
  {
    href: "/food-and-shop",
    title: "Coffee with the fill-up",
    date: "1 August 2026",
    summary: "Café 365 for a meal, Brazmata when you want a barista coffee.",
    image: "/photos/coffee.jpg",
    alt: "A cup of coffee on a wooden table",
    action: "Café 365 and Brazmata",
  },
  {
    href: "/find-a-station?amenity=quickshop",
    title: "The shop is on the forecourt",
    date: "2 September 2026",
    summary: "Quickshop covers drinks, snacks and the basics so the stop stays one stop.",
    image: "/photos/shop.jpg",
    alt: "Shelves of packaged food in a shop aisle",
    action: "Find a Quickshop",
  },
];
