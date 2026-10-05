export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const CARE_TEL = "+27860036436";
export const CARE_DISPLAY = "086 003 6436";
export const NOTICE_COOKIE = "engen-notice";
export const REGION_COOKIE = "engen-region";
