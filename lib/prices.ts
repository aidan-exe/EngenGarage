export type Region = "inland" | "coastal";

export type Grade = {
  id: string;
  name: string;
  kind: "retail" | "wholesale";
  inland: number;
  coastal: number;
};

/** Illustrative September 2026 adjustment. Not a live feed. */
export const PRICE_EFFECTIVE = "2 September 2026";
export const PRICE_NEXT_CHANGE = "7 October 2026";

export const GRADES: Grade[] = [
  { id: "93", name: "93 Unleaded", kind: "retail", inland: 26.76, coastal: 25.97 },
  { id: "95", name: "95 Unleaded", kind: "retail", inland: 26.92, coastal: 26.05 },
  { id: "d500", name: "Diesel 500 ppm", kind: "wholesale", inland: 29.11, coastal: 28.24 },
  { id: "d50", name: "Diesel 50 ppm", kind: "wholesale", inland: 29.56, coastal: 28.69 },
];

export function parseRegion(value: string | undefined): Region {
  return value === "coastal" ? "coastal" : "inland";
}

export function gradeById(id: string): Grade {
  const grade = GRADES.find((item) => item.id === id);
  if (!grade) throw new Error(`Unknown fuel grade: ${id}`);
  return grade;
}

export function formatRand(value: number): string {
  return `R${value.toFixed(2)}`;
}

export function regionLabel(region: Region): string {
  return region === "inland" ? "Inland" : "Coastal";
}
