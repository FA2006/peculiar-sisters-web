import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Calendar, MapPin, MessageCircle } from "lucide-react";
import fellowship from "@/assets/fellowship.jpg";
import conf from "@/assets/conference.jpg";
import prayer from "@/assets/prayer.jpg";
import bibleStudyImg from "@/assets/bible-study-new.jpg";
import conferenceFlyer from "@/assets/PSF_CONF2.jpeg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Peculiar Sisters Fellowship" },
      { name: "description", content: "Upcoming prayer nights, Bible studies, conferences and outreach events at PSF." },
    ],
  }),
  component: Events,
});

const UPCOMING = [
  { title: "Prayer and Intercession (Virtual)", date: "Mondays · PSF Fasting & Prayer · 6:00 AM – 2:00 PM", place: "Virtual", tag: "Prayer & Fasting", cta: "Join Us" },
  { title: "PSF Prayer Night (Virtual)", date: "Wednesdays · 11:00 PM", place: "Virtual", tag: "Prayer", cta: "Join Us" },
  { title: "Midnight Prayer Watch", date: "Last Friday of the month · 11:30 PM WAT", place: "Zoom / Abuja Chapel", tag: "Prayer", cta: "Register" },
  { title: "PSF Bible Study", date: "Every Friday at 6:00pm on PSF WhatsApp platform", place: "PSF WhatsApp Platform", tag: "Bible Study", cta: "Join Us", img: bibleStudyImg, whatsapp: "https://chat.whatsapp.com/K367slmStAt8DIIkGcalf4?s=cl&p=a&mlu=0&ilr=0&amv=0" },
  { title: "3-Day Fasting & Prayer (Corporate Fast)", date: "First 3 days of every new month", place: "Corporate Fast for all PSF Members", tag: "Fasting", cta: "Register" },
  { title: "PSF Women Conference 2026 — A Woman of Purpose in the Digital Age", date: "25 July 2026", place: "Dresdner Suits, Gwarinpa, Abuja-Nigeria", tag: "Conference", cta: "Register", flyer: conferenceFlyer},
  { title: "Community Outreach — Widows", date: "April 20, 2026", place: "Nyanya, Abuja", tag: "Outreach", cta: "Register" },
  { title: "Peculiar Sisters Quarterly Retreat", date: "Date & location to be communicated accordingly", place: "To Be Announced", tag: "Retreat", cta: "Register" },
  { title: "Annual Thanksgiving", date: "December · Date & time to be communicated accordingly", place: "To Be Announced", tag: "Thanksgiving", cta: "Register" },
  { title: "Outreaches to the Less Privileged", date: "December · Date & location to be communicated accordingly", place: "To Be Announced", tag: "Outreach", cta: "Register" },
  { title: "Carol Night", date: "December · Date & time to be communicated accordingly", place: "To Be Announced", tag: "Carol Night", cta: "Register" },
  { title: "PSF Last Meeting for the Year", date: "December · Date & time to be communicated accordingly", place: "To Be Announced", tag: "Fellowship", cta: "Register" },
];

const PAST = [
  { img: fellowship, title: "Sisters United 2025", place: "Abuja" },
  { img: conf, title: "Arise Conference 2025", place: "Lagos" },
  { img: prayer, title: "40 Days of Prayer", place: "Global" },
];

function Events() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Calendar" title="Events & Programmes" subtitle="Gather, grow, and glow. There's a seat saved for you at every table." />

      <Section className="pb-0">
        <div className="container-app">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">Featured Event</div>
            <h2 className="font-display text-3xl md:text-4xl text-primary">PSF Women Conference 2026</h2>
          </div>
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-elegant ring-1 ring-[--gold]/30 bg-[--purple]">
            <img
              src={conferenceFlyer}
              alt="PSF Women Conference 2026 — A Woman of Purpose in the Digital Age. 25 July 2026, Dresdner Suits, Gwarinpa, Abuja-Nigeria."
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/conference" className="inline-flex items-center gap-2 rounded-full bg-[--gold] px-6 py-3 text-sm font-semibold text-white shadow-gold hover:brightness-110 transition">
              Register Now
            </Link>
            <Link to="/conference" className="inline-flex items-center gap-2 rounded-full bg-royal text-white px-6 py-3 text-sm font-semibold shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition">
              View Programme
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-app">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Upcoming</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {UPCOMING.map((e) => (
              <article key={e.title} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition">
                {e.img && (
                  <div className="relative overflow-hidden border-b border-border bg-[--purple]">
                    <img
                      src={e.img}
                      alt={`${e.title}`}
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                {e.flyer && (
                  <div className="relative overflow-hidden border-b border-border bg-[--purple]">
                    <img
                      src={e.flyer}
                      alt={`${e.title} flyer`}
                      loading="lazy"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-secondary/20 text-primary text-xs font-medium px-3 py-1">{e.tag}</span>
                  <h3 className="mt-3 font-display text-2xl text-primary">{e.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-accent" />{e.date}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" />{e.place}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {e.whatsapp ? (
                      <a
                        href={e.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 hover:brightness-110 transition"
                      >
                        <MessageCircle className="h-4 w-4" /> Join on WhatsApp
                      </a>
                    ) : (
                      <button className="rounded-full bg-royal text-white text-sm font-semibold px-5 py-2.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition">{e.cta}</button>
                    )}
                    {e.flyer && (
                      <a
                        href={e.flyer}
                        download="PSF_Women_Conference_2026_Flyer.jpeg"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card text-primary text-sm font-semibold px-5 py-2.5 hover:bg-secondary transition"
                      >
                        Download Flyer
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="container-app">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Past Events</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PAST.map((p) => (
              <div key={p.title} className="group relative overflow-hidden rounded-3xl">
                <img src={p.img} alt={p.title} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[--purple] via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6 text-primary-foreground">
                  <div className="font-display text-xl">{p.title}</div>
                  <div className="text-xs opacity-80 mt-1">{p.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
