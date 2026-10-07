import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Calendar, MapPin } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";

type SanityEvent = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  day?: string;
  time?: string;
  location?: string;
  mode?: string;
  description?: string;
  theme?: string;
  about?: string;
  registration?: boolean;
  joinUrl?: string;
  image?: any;
  speakers?: {
    name: string;
    role: string;
  }[];
};

const EVENTS_QUERY = `
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

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content:
          "Upcoming prayer nights, Bible studies, conferences and outreach events at PSF.",
      },
    ],
  }),

  loader: async () => {
    const events = await sanityClient.fetch<SanityEvent[]>(EVENTS_QUERY);

    return {
      events,
    };
  },

  component: Events,
});

function formatWhen(event: SanityEvent) {
  if (event.date) {
    return new Date(event.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return [event.day, event.time].filter(Boolean).join(" · ");
}

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Events() {
  const { events } = Route.useLoaderData();

  const now = new Date();

  // Events without a date are our recurring/weekly events.
  const FIXED_EVENTS = events.filter((event) => !event.date);

  // Events with a date in the future.
  const UPCOMING = events
    .filter((event) => event.date && new Date(event.date) > now)
    .sort(
      (a, b) =>
        new Date(a.date!).getTime() - new Date(b.date!).getTime(),
    );

  // Events with a date that has already passed.
  const PAST = events
    .filter((event) => event.date && new Date(event.date) <= now)
    .sort(
      (a, b) =>
        new Date(b.date!).getTime() - new Date(a.date!).getTime(),
    );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Calendar"
        title="Events & Programmes"
        subtitle="Gather, grow, and glow. There's a seat saved for you at every table."
      />

      {/* Fixed Events */}
      <Section>
        <div className="container-app">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">
            Weekly
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {FIXED_EVENTS.map((e) => {
              const img = e.image
                ? urlFor(e.image).width(1200).url()
                : null;

              return (
                <article
                  key={e._id}
                  className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition"
                >
                  {img && (
                    <img
                      src={img}
                      alt={e.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-6">
                    <span className="inline-flex rounded-full bg-secondary/20 text-primary text-xs font-medium px-3 py-1">
                      {e.mode}
                    </span>

                    <h3 className="mt-3 font-display text-2xl text-primary">
                      {e.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-accent" />
                        {formatWhen(e)}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-accent" />
                        {e.location}
                      </span>
                    </div>

                    <p className="mt-2 text-sm">
                      {e.description}
                    </p>

                    <Link
                      to="/events/$eventId"
                      params={{ eventId: e.slug }}
                      className="mt-4 inline-flex rounded-full bg-royal text-white text-sm font-semibold px-5 py-2.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition"
                    >
                      Join
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section>
        <div className="container-app">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">
            Upcoming Programs
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {UPCOMING.length > 0 ? (
              UPCOMING.map((e) => {
                const img = e.image
                  ? urlFor(e.image).width(1200).url()
                  : null;

                return (
                  <article
                    key={e._id}
                    id={e.slug}
                    className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition"
                  >
                    {img && (
                      <img
                        src={img}
                        alt={e.title}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    <div className="p-6">
                      <span className="inline-flex rounded-full bg-secondary/20 text-primary text-xs font-medium px-3 py-1">
                        {e.mode}
                      </span>

                      <h3 className="mt-3 font-display text-2xl text-primary">
                        {e.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-accent" />
                          {formatWhen(e)}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-accent" />
                          {e.location}
                        </span>
                      </div>

                      <p className="mt-2 text-sm">
                        {e.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          to="/events/$eventId"
                          params={{ eventId: e.slug }}
                          className="inline-flex rounded-full bg-royal text-white text-sm font-semibold px-5 py-2.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition"
                        >
                          View Program
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No upcoming events at the moment.
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Past Events */}
      <Section className="pt-0">
        <div className="container-app">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">
            Past Programs
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PAST.length > 0 ? (
              PAST.map((e) => {
                const img = e.image
                  ? urlFor(e.image).width(1200).url()
                  : null;

                return (
                  <article
                    key={e._id}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-card"
                  >
                    {img && (
                      <img
                        src={img}
                        alt={e.title}
                        className="h-72 w-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[--purple] via-[--purple]/85 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                      <div className="font-display text-xl">
                        {e.title}
                      </div>

                      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[--gold] opacity-90">
                        {formatShortDate(e.date!)}
                      </div>

                      <div className="mt-2 text-sm text-white/80">
                        {e.location}
                      </div>

                      <p className="mt-3 text-sm text-white/75">
                        {e.description}
                      </p>

                      <Link
                        to="/events/$eventId"
                        params={{ eventId: e.slug }}
                        className="mt-4 inline-flex rounded-full bg-white/10 text-white text-sm font-semibold px-5 py-2.5 ring-1 ring-white/20 hover:bg-white/15 transition"
                      >
                        View previous program
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No past events yet.
              </p>
            )}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}