import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Heart, BookOpen, Users, Sparkles, Quote, MessageCircle } from "lucide-react";
import { SiteLayout, Section } from "@/components/SiteLayout";
import heroImg from "@/assets/hero-worship.jpg";
import fellowshipImg from "@/assets/fellowship.jpg";
import bibleStudyImg from "@/assets/bible-study-new.jpg";
import prayerImg from "@/assets/prayer.jpg";
import conferenceImg from "@/assets/conference.jpg";
import psfLogoAsset from "@/assets/PSF_LOGO.jpeg";
import events from "@/events.json";
import EventCard from "@/components/EventCard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const FEATURED_EVENTS = [
  { title: "Midnight Prayer Watch", tag: "Prayer Night", date: "Last Friday of the month · 11:30 PM WAT", day: "Fri", month: "Monthly", img: prayerImg, desc: "A night of intense intercession for women, families, and nations.", cta: "Join Now" },
  { title: "PSF Bible Study", tag: "Bible Study", date: "Every Friday at 6:00pm on PSF WhatsApp platform", day: "Fri", month: "Weekly", img: bibleStudyImg, desc: "Digging deep into scripture and biblical womanhood — growing together in God's Word.", cta: "Join Now", whatsapp: "https://chat.whatsapp.com/K367slmStAt8DIIkGcalf4?s=cl&p=a&mlu=0&ilr=0&amv=0" },
  { title: "PSF Women Conference 2026", tag: "Conference", date: "25 July 2026 · Dresdner Suits, Gwarinpa, Abuja-Nigeria", day: "25", month: "Jul", img: conferenceImg, desc: "Theme: A Woman of Purpose in the Digital Age. A day of worship, teaching, and impartation.", cta: "Learn More" },
];

const WEEKLY = [
  { title: "PSF Fasting & Prayer", when: "Mondays · 6:00 AM – 2:00 PM (Virtual)" },
  { title: "PSF Prayer Night", when: "Wednesdays · 11:00 PM (Virtual)" },
];

const TESTIMONIES = [
  { name: "Adaeze O.", role: "Lagos, Nigeria", text: "PSF walked with me through the hardest season of my life. Today my marriage is restored and my calling is clearer than ever." },
  { name: "Ngozi A.", role: "Abuja, Nigeria", text: "The sisterhood, the prayers, the teachings — I came broken and left carrying purpose. God truly moves in this fellowship." },
  { name: "Chioma E.", role: "London, UK", text: "Through PSF's mentorship I discovered gifts I never knew I had. I now lead a small group in my own community." },
];



function Countdown({ target }: { target: Date }) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const box = (n: number, label: string) => (
    <div className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-3 min-w-[68px] ring-1 ring-[--gold]/30">
      <span className="font-display text-2xl md:text-3xl text-[--gold]">{n.toString().padStart(2, "0")}</span>
      <span className="text-[10px] uppercase tracking-widest opacity-75">{label}</span>
    </div>
  );
  if (!mounted) {
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {box(0, "Days")}{box(0, "Hours")}{box(0, "Min")}{box(0, "Sec")}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {box(d, "Days")}{box(h, "Hours")}{box(m, "Min")}{box(s, "Sec")}
    </div>
  );
}

function MiniCountdown({ target }: { target: Date }) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const cell = (n: number, label: string) => (
    <div className="flex flex-col items-center rounded-lg bg-white/10 px-2 py-2.5 ring-1 ring-[--gold]/25">
      <span className="font-display text-xl text-[--gold] leading-none">{n.toString().padStart(2, "0")}</span>
      <span className="mt-1 text-[9px] uppercase tracking-widest opacity-75">{label}</span>
    </div>
  );
  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {cell(0, "Days")}{cell(0, "Hrs")}{cell(0, "Min")}{cell(0, "Sec")}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      {cell(d, "Days")}{cell(h, "Hrs")}{cell(m, "Min")}{cell(s, "Sec")}
    </div>
  );
}

export default function HomePage() {
  const conferenceDate = new Date();
  const upcoming = events.upcoming?.[0] ?? null;
  const upcomingLink = upcoming ? `/events#${upcoming.id}` : "/events";

  return (
    <SiteLayout>
      
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Women worshipping in fellowship"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[--purple]/80 via-[--purple]/30 to-transparent" />
        <div className="container-app relative py-24 md:py-32 text-primary-foreground">
          <div className="max-w-3xl">
            <img
              src={psfLogoAsset}
              alt="Peculiar Sisters Fellowship Logo"
              width={128}
              height={128}
              className="mb-6 h-32 w-32 rounded-full object-cover shadow-gold ring-4 ring-[--gold]/40"
            />
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 ring-1 ring-[--gold]/40">
              <Sparkles className="h-3.5 w-3.5 text-[--gold]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[--gold]">We Are Peculiar. We Are Virtuous.</span>
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05]">
              Empowering Women to <span className="text-gradient-gold italic">Discover</span> and Fulfil Their God-Given Purpose
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg opacity-90">
              Welcome to Peculiar Sisters Fellowship — a community of virtuous women growing together in faith, purpose, and impact.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-2 rounded-full border border-[--gold]/60 bg-[--gold] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_0_rgba(100,75,16,0.9),0_18px_32px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_0_rgba(100,75,16,0.95),0_26px_36px_rgba(0,0,0,0.32)] active:translate-y-0.5 active:shadow-[0_6px_0_rgba(100,75,16,0.95),0_12px_18px_rgba(0,0,0,0.22)]"
              >
                Join Our Fellowship <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/events"
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_0_rgba(18,30,60,0.8),0_18px_32px_rgba(0,0,0,0.24)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_14px_0_rgba(18,30,60,0.85),0_26px_36px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[0_6px_0_rgba(18,30,60,0.85),0_12px_18px_rgba(0,0,0,0.2)]"
              >
                Upcoming Events
              </Link>
              <Link
                to="/prayer-request"
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_0_rgba(18,30,60,0.8),0_18px_32px_rgba(0,0,0,0.24)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_14px_0_rgba(18,30,60,0.85),0_26px_36px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[0_6px_0_rgba(18,30,60,0.85),0_12px_18px_rgba(0,0,0,0.2)]"
              >
                Prayer Request
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <Section>
        <div className="container-app grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative">
            <img src={fellowshipImg} alt="Sisters in fellowship" width={1400} height={1000} loading="lazy" className="rounded-3xl shadow-elegant object-cover w-full aspect-[4/3]" />
            <div className="absolute -bottom-6 -right-6 hidden md:block rounded-2xl bg-royal text-primary-foreground p-5 shadow-gold ring-1 ring-[--gold]/40 max-w-[220px]">
              <div className="text-[--gold] font-display text-3xl">10+</div>
              <div className="text-xs opacity-85">Years walking together in faith and purpose</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-accent mb-3">Who We Are</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">A Sisterhood of Peculiar, Purpose-Driven Women</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Peculiar Sisters Fellowship (PSF) is an interdenominational Christian women's fellowship dedicated to empowering women spiritually, emotionally, mentally, and socially to fulfil God's purpose. We believe every woman is uniquely designed by God — set apart, chosen, and called to be a light to her family, community, and nation.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Prayer & Intercession" },
                { icon: BookOpen, label: "Bible Study" },
                { icon: Users, label: "Sisterhood" },
                { icon: Sparkles, label: "Purpose & Empowerment" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/20 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition">
              Read Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* SCRIPTURE */}
      <section className="relative py-20 md:py-28 bg-royal text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_50%_50%,var(--gold)_0,transparent_60%)]" />
        <div className="container-app relative text-center max-w-3xl">
          <Quote className="h-10 w-10 mx-auto text-[--gold]" />
          <p className="mt-6 font-display text-2xl md:text-4xl leading-tight italic">
            "She is clothed with strength and dignity; she can laugh at the days to come."
          </p>
          <div className="mt-6 text-[--gold] tracking-[0.3em] text-xs uppercase">Proverbs 31 : 25 · Scripture of the Week</div>
        </div>
      </section>

      {/* EVENTS */}
      <Section>
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">Featured Upcoming Events</div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">Events & Programmes</h2>
            </div>
            <Link to="/events" className="text-sm font-semibold tracking-widest uppercase text-primary hover:text-accent inline-flex items-center gap-2">
              View all events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: 3 event cards */}
            <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {FEATURED_EVENTS.map((e) => (
                <article key={e.title} className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition flex flex-col">
                  <div className="relative">
                    <img src={e.img} alt={e.title} loading="lazy" className="h-44 w-full object-cover group-hover:scale-105 transition duration-700" />
                    <span className="absolute top-3 left-3 rounded-md bg-[--purple] text-[--gold] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 shadow">{e.tag}</span>
                    <div className="absolute top-3 right-3 rounded-md bg-white/95 backdrop-blur px-2.5 py-1.5 text-center leading-none shadow">
                      <div className="font-display text-lg text-[--purple]">{e.day}</div>
                      <div className="text-[9px] uppercase tracking-widest text-accent font-semibold">{e.month}</div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3 w-3 text-accent" />{e.date}</div>
                    <h3 className="mt-2 font-display text-xl text-primary leading-snug">{e.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1">{e.desc}</p>
                    {e.whatsapp ? (
                      <a
                        href={e.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 hover:brightness-110 transition"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Join on WhatsApp
                      </a>
                    ) : (
                      <Link to="/events" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition">
                        {e.cta} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Right: highlight + weekly programmes */}
            <aside className="flex flex-col gap-6">
              <div>
                {upcoming ? (
                  <EventCard
                    title={upcoming.title}
                    date={upcoming.date}
                    location={upcoming.location}
                    link={upcomingLink}
                  />
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-card p-5 text-center shadow-sm">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Upcoming Event</div>
                    <p className="mt-3 font-display text-2xl text-primary">No upcoming events</p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-accent text-accent-foreground p-6 shadow-elegant">
                <div className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-90">Prayer & Intercession (Virtual)</div>
                <ul className="mt-4 space-y-3">
                  {WEEKLY.map((w) => (
                    <li key={w.title} className="flex items-start justify-between gap-3 border-b border-white/20 pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-display text-base leading-tight">{w.title}</div>
                        <div className="text-[11px] opacity-90 mt-0.5">{w.when}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/events" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/40 px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white/25 transition">
                  Join Us <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {/* CONFERENCE COUNTDOWN */}
      <section className="relative py-24 overflow-hidden">
        <img src={prayerImg} alt="" width={1200} height={1400} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[--purple]/85" />
        <div className="container-app relative text-primary-foreground text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">PSF Annual Conference 2026</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold">A Woman of Purpose in the Digital Age</h2>
          <p className="mt-4 opacity-85 max-w-xl mx-auto">A day of worship, teaching, prophetic ministry, and impartation. 25 July 2026 · Dresdner Suits, Gwarinpa, Abuja-Nigeria.</p>
          <div className="mt-10"><Countdown target={conferenceDate} /></div>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/events/$eventId" params={{ eventId: "psf-women-conference-2026" }} className="inline-flex items-center gap-2 rounded-full bg-[--gold] px-6 py-3.5 text-sm font-semibold text-white shadow-gold hover:brightness-110 transition">
              Register Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/events/$eventId" params={{ eventId: "psf-women-conference-2026" }} className="inline-flex items-center gap-2 rounded-full border border-[--gold]/60 px-6 py-3.5 text-sm font-semibold text-white hover:bg-[--gold]/10 transition">
              View Programme
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <Section>
        <div className="container-app">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">Testimonies</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">Lives Transformed by Grace</h2>
            <p className="mt-4 text-muted-foreground">Hear from women whose lives have been touched through the ministry of Peculiar Sisters Fellowship.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIES.map((t) => (
              <blockquote key={t.name} className="rounded-3xl bg-card border border-border p-8 shadow-sm">
                <Quote className="h-6 w-6 text-secondary" />
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.text}"</p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-royal text-white font-display">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-primary text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/testimonies" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition">
              Share your testimony <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section className="pt-0">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-3xl bg-royal p-10 md:p-14 text-primary-foreground shadow-elegant">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[--gold]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[--orange]/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">Stay Connected</div>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Join our newsletter</h2>
                <p className="mt-3 opacity-85 max-w-md">Weekly devotionals, event updates, and words of encouragement — delivered gently to your inbox.</p>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 rounded-full bg-white/10 backdrop-blur px-5 py-3.5 text-sm ring-1 ring-white/25 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]"
                />
                <button className="rounded-full bg-[--gold] px-6 py-3.5 text-sm font-semibold text-white shadow-gold hover:brightness-110 transition">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </Section>

    </SiteLayout>
  );
}
