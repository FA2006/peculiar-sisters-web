import raw from "@/events.json";

export type Speaker = { name: string; role: string };

export type PSFEvent = {
  id: string;
  title: string;
  location: string;
  description: string;
  about?: string;
  theme?: string;
  mode: string;
  image?: string;
  time?: string;
  day?: string; // fixed events only
  date?: string; // upcoming events only (ISO with timezone)
  joinUrl?: string;
  registration?: boolean;
  speakers?: Speaker[];
};

export const FIXED_EVENTS = raw.fixed as unknown as PSFEvent[];
export const DATED_EVENTS = raw.upcoming as unknown as PSFEvent[];

export const getEventById = (id: string): PSFEvent | undefined =>
  [...FIXED_EVENTS, ...DATED_EVENTS].find((e) => e.id === id);

// Resolves "carol-night.jpg" to a bundled URL from src/assets
const images = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string | { url: string }>;

export const resolveImage = (name?: string): string | undefined => {
  if (!name) return undefined;
  const img = images[`/src/assets/${name}`];
  if (!img) return undefined;
  return typeof img === "string" ? img : img.url;
};

// Day and date are derived from `date`, so they can never disagree with it
export const formatWhen = (e: PSFEvent): string => {
  if (e.date) {
    const d = new Date(e.date).toLocaleDateString("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Lagos",
    });
    return e.time ? `${d} · ${e.time}` : d;
  }
  return [e.day, e.time].filter(Boolean).join(" · ");
};

export const formatShortDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });