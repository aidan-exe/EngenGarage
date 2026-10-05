# Engen

Motorist site for finding an Engen station, checking inland and coastal fuel prices, and reading how Trio, eBucks and Clicks rewards work.

```bash
npm install
npm run dev
```

Pages: Home, Find a station, Rewards, Food & shop, About.

Fuel prices are illustrative figures effective from 2 September 2026. They are not a live feed. The station list is a sample for the UX concept, not the live Engen network. Photographs are stock images under the Unsplash License, not Engen sites. Brand blue `#002c90` and `#0033a0` are taken from the public Engen stylesheet.

## Maps

Find a station shows the sample stations on Google Maps.

- Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to load the Maps JavaScript API and plot a pin for every sample station in the current filter. Enable that API on the key and restrict it by HTTP referrer. The key is public in the browser. Do not commit a real key.
- Leave the key unset to use a keyless Google Maps embed. That embed places one sample-station pin (the first match, or the station you choose with Show on map). South Africa switches it to a metro-wide view. It cannot plot the whole sample list. Copy `.env.example` to `.env.local`. Rebuild after changing the key so Next.js can inline it.
