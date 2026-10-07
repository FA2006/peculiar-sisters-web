import { sanityClient, urlFor } from "@/lib/sanity";

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

type SanityEvent = {
  _id: string;
  title: string;
  slug?: { current?: string } | string;
  date?: string;
  day?: string;
  time?: string;
  location?: string;
  mode?: string;
  description?: string;
  theme?: string;
  about?: string;
  joinUrl?: string;
  registration?: boolean;
  image?: any;
  speakers?: Speaker[];
};

export const EVENTS_QUERY = `
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    day,
    time,
    location,
    mode,
    description,
    theme,
    about,
    registration,
    joinUrl,
    image,
    speakers[]->{
      name,
      role
    }
  }
`;

const normalizeSanityEvent = (event: SanityEvent): PSFEvent => {
  const slugValue =
    typeof event.slug === "string"
      ? event.slug
      : typeof event.slug === "object" && event.slug && "current" in event.slug
        ? event.slug.current ?? event._id
        : event._id;

  return {
    id: slugValue,
    title: event.title,
    location: event.location ?? "To be announced",
    description: event.description ?? "",
    about: event.about,
    theme: event.theme,
    mode: event.mode ?? "Event",
    image: event.image ?? undefined,
    time: event.time,
    day: event.day,
    date: event.date,
    joinUrl: event.joinUrl,
    registration: event.registration,
    speakers: event.speakers,
  };
};

export const FIXED_EVENTS: PSFEvent[] = [];
export const DATED_EVENTS: PSFEvent[] = [];

export const getAllEvents = async (): Promise<PSFEvent[]> =>
  sanityClient
    .fetch<SanityEvent[]>(EVENTS_QUERY)
    .then((events) => events.map(normalizeSanityEvent));

export const getEventById = async (id: string): Promise<PSFEvent | undefined> => {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
};

// Resolves "current.jpg" to a bundled URL from src/assets
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

export const resolveEventImage = (image?: any): string | undefined => {
  if (!image) return undefined;

  if (typeof image === "string") {
    return resolveImage(image);
  }

  if (typeof image === "object") {
    if ("url" in image && typeof image.url === "string") {
      return image.url;
    }

    try {
      return urlFor(image).width(1200).url();
    } catch {
      return undefined;
    }
  }

  return undefined;
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