/**
 * Google Maps for the sample station list.
 * The key is read only from NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. Never hardcode one.
 * Without a key, Find a station uses the keyless Maps embed (one place pin, or a South Africa view).
 */

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";

/** South Africa, framed on the metros the sample list covers. */
export const SA_METROS = { lat: -29, lng: 25.5, zoom: 5 } as const;

export const MAPS_KEY_NOTE =
  "This embed can show South Africa, or one sample station at a time. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY plots a pin for every sample station.";

type LatLng = { lat: number; lng: number };

export type MapHandle = {
  panTo(position: LatLng): void;
  setZoom(zoom: number): void;
  fitBounds(bounds: BoundsHandle): void;
};

export type BoundsHandle = {
  extend(position: LatLng): void;
};

export type MarkerHandle = {
  setMap(map: MapHandle | null): void;
  addListener(event: string, handler: () => void): void;
};

export type InfoHandle = {
  setContent(content: HTMLElement): void;
  open(options: { map: MapHandle; anchor: MarkerHandle }): void;
};

export type MapsNamespace = {
  Map: new (element: HTMLElement, options: Record<string, unknown>) => MapHandle;
  Marker: new (options: Record<string, unknown>) => MarkerHandle;
  InfoWindow: new () => InfoHandle;
  LatLngBounds: new () => BoundsHandle;
  SymbolPath: { CIRCLE: number };
  event: { clearInstanceListeners(instance: object): void };
};

declare global {
  interface Window {
    google?: { maps?: MapsNamespace };
    __engenMapsOnLoad?: () => void;
  }
}

let loading: Promise<MapsNamespace> | null = null;

export function loadGoogleMaps(key: string): Promise<MapsNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }
  if (window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    window.__engenMapsOnLoad = () => {
      const maps = window.google?.maps;
      if (!maps?.Map) {
        loading = null;
        reject(new Error("Google Maps loaded without a map constructor"));
        return;
      }
      resolve(maps);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&callback=__engenMapsOnLoad`;
    script.async = true;
    script.onerror = () => {
      loading = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(script);
  });

  return loading;
}

export function mapsNamespace(): MapsNamespace | null {
  return window.google?.maps?.Map ? window.google.maps : null;
}

/**
 * Keyless embed, or the official Embed API when a key is present and the JS map cannot load.
 * Place mode drops one pin. View mode centres on South Africa. Embed cannot plot the whole sample list.
 */
export function mapsEmbedSrc(station: { lat: number; lng: number } | null, key = ""): string {
  if (key) {
    if (station) {
      return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${station.lat},${station.lng}&zoom=13`;
    }
    return `https://www.google.com/maps/embed/v1/view?key=${encodeURIComponent(key)}&center=${SA_METROS.lat},${SA_METROS.lng}&zoom=${SA_METROS.zoom}`;
  }

  if (station) {
    return `https://www.google.com/maps?hl=en&q=${encodeURIComponent(`${station.lat},${station.lng}`)}&z=13&output=embed`;
  }
  return `https://www.google.com/maps?hl=en&ll=${SA_METROS.lat},${SA_METROS.lng}&z=${SA_METROS.zoom}&output=embed`;
}
