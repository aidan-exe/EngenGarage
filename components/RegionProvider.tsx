"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { regionLabel, type Region } from "@/lib/prices";
import { REGION_COOKIE } from "@/lib/site";

type RegionContextValue = {
  region: Region;
  savedRegion: Region | null;
  setRegion: (region: Region) => void;
  saveDefault: () => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({
  initialRegion,
  initialSaved,
  children,
}: {
  initialRegion: Region;
  initialSaved: boolean;
  children: React.ReactNode;
}) {
  const [region, setRegion] = useState<Region>(initialRegion);
  const [savedRegion, setSavedRegion] = useState<Region | null>(initialSaved ? initialRegion : null);

  const value = useMemo<RegionContextValue>(
    () => ({
      region,
      savedRegion,
      setRegion,
      saveDefault: () => {
        document.cookie = `${REGION_COOKIE}=${region}; Path=/; Max-Age=31536000; SameSite=Lax`;
        setSavedRegion(region);
      },
    }),
    [region, savedRegion],
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion(): RegionContextValue {
  const value = useContext(RegionContext);
  if (!value) throw new Error("useRegion must be used within RegionProvider");
  return value;
}

export function RegionSwitch() {
  const { region, setRegion } = useRegion();

  return (
    <div role="radiogroup" aria-label="Price region" className="inline-flex shrink-0 border border-ink">
      {(["inland", "coastal"] as const).map((id) => {
        const selected = region === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setRegion(id)}
            className={`min-h-11 px-3 text-sm font-semibold ${
              selected ? "bg-blue text-paper" : "bg-paper text-blue"
            }`}
          >
            {regionLabel(id)}
          </button>
        );
      })}
    </div>
  );
}

export function RegionDefault() {
  const { region, savedRegion, saveDefault } = useRegion();
  const label = regionLabel(region);

  if (savedRegion === region) {
    return <p className="text-sm text-mute">{label} is your default.</p>;
  }

  return (
    <button type="button" className="inline-flex min-h-11 items-center text-sm font-semibold underline" onClick={saveDefault}>
      Set {label.toLowerCase()} as default
    </button>
  );
}
