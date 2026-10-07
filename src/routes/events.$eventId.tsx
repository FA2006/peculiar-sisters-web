import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section } from "@/components/SiteLayout";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Calendar, MapPin, Mic, ArrowLeft } from "lucide-react";
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
    role?: string;
  }[];
};

const EVENT_QUERY = `
  *[_type == "event" && slug.current == $slug][0] {
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

function formatWhen(event: SanityEvent) {
  if (event.date) {
    return new Date(event.date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  if (event.day && event.time) {
    return `${event.day} · ${event.time}`;
  }

  if (event.day) {
    return event.day;
  }

  return event.time ?? "Date to be announced";
}

export const Route = createFileRoute("/events/$eventId")({
  loader: async ({ params }) => {
    const event = await sanityClient.fetch<SanityEvent | null>(
      EVENT_QUERY,
      {
        slug: params.eventId,
      },
    );

    return {
      event,
    };
  },

  head: ({ loaderData }) => {
    const event = loaderData?.event;

    const title = event
      ? `${event.title} — Peculiar Sisters Fellowship`
      : "Event — Peculiar Sisters Fellowship";

    const description =
      event?.theme ??
      event?.description ??
      "An event at Peculiar Sisters Fellowship.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },

  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();

  if (!event) {
    return (
      <SiteLayout>
        <Section>
          <div className="container-app text-center py-24">
            <h1 className="font-display text-4xl text-primary">
              Event not found
            </h1>

            <p className="mt-3 text-muted-foreground">
              We couldn't find the event you're looking for.
            </p>

            <Link
              to="/events"
              className="mt-8 inline-flex rounded-full bg-royal text-white text-sm font-semibold px-5 py-2.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition"
            >
              Back to events
            </Link>
          </div>
        </Section>
      </SiteLayout>
    );
  }

  const img = event.image
    ? urlFor(event.image).width(1600).height(1000).url()
    : undefined;

  // Events without a date are recurring/fixed events.
  const isFixed = !event.date;

  // Dated events can be upcoming or past.
  const isPast =
    !!event.date && new Date(event.date).getTime() <= Date.now();

  const showForm = !isPast;

  const formEyebrow = isFixed ? "Join us" : "Registration";
  const formTitle = isFixed ? "Join" : "Reserve your seat";
  const submitLabel = isFixed ? "Join" : "Reserve Seat";

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {img && (
          <img
            src={img}
            alt={event.title}
            width={1600}
            height={1000}
            className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px]"
          />
        )}

        <div className="absolute inset-0 bg-[--purple]/90" />

        <div className="container-app relative py-24 text-primary-foreground text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">
            {event.mode}
          </div>

          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold">
            {event.title}
          </h1>

          <p className="mt-5 opacity-90 max-w-2xl mx-auto">
            {event.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_0_rgba(100,110,120,0.9),0_18px_32px_rgba(0,0,0,0.28)]">
              <Calendar className="h-4 w-4 text-[--gold]" />
              {formatWhen(event)}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_0_rgba(100,110,120,0.9),0_18px_32px_rgba(0,0,0,0.28)]">
              <MapPin className="h-4 w-4 text-[--gold]" />
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <Section>
        <div className="container-app">
          <Link
            to="/events"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />
            All events
          </Link>

          <div
            className={
              showForm
                ? "grid gap-12 lg:grid-cols-3"
                : "max-w-3xl"
            }
          >
            {/* Event Information */}
            <div
              className={
                showForm
                  ? "lg:col-span-2 space-y-8"
                  : "space-y-8"
              }
            >
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">
                  {event.theme ? "Theme" : "About"}
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-primary">
                  {event.theme ?? event.title}
                </h2>

                {event.about && (
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {event.about}
                  </p>
                )}
              </div>

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">
                    Speakers
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {event.speakers.map((speaker) => (
                      <div
                        key={`${speaker.name}-${speaker.role}`}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                      >
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal text-white">
                          <Mic className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="font-display text-lg text-primary">
                            {speaker.name}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {speaker.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Registration / Join Form */}
            {showForm && (
              <RegistrationForm
                eyebrow={formEyebrow}
                title={formTitle}
                submitLabel={submitLabel}
                successMessage={
                  isFixed
                    ? "Thank you for joining! We'll be in touch with the details."
                    : `Registration received. See you at ${event.location}!`
                }
                joinUrl={isFixed ? event.joinUrl : undefined}
                joinLabel={
                  isFixed
                    ? `Open ${event.mode}`
                    : undefined
                }
              />
            )}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}