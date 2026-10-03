import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Calendar, MapPin, Mic } from "lucide-react";
import confImg from "@/assets/PSF_CONF2.jpeg";

export const Route = createFileRoute("/conference")({
  head: () => ({
    meta: [
      { title: "PSF Women Conference 2026 — Peculiar Sisters Fellowship" },
      { name: "description", content: "A Woman of Purpose in the Digital Age — PSF Women Conference 2026. 25 July 2026, Dresdner Suits, Gwarinpa, Abuja-Nigeria." },
      { property: "og:title", content: "A Woman of Purpose in the Digital Age — PSF Conference 2026" },
      { property: "og:description", content: "A day of worship, teaching, and impartation. 25 July 2026, Abuja-Nigeria." },
    ],
  }),
  component: Conference,
});

const SPEAKERS = [
  { name: "Evang. Francisca Francis-Nwaoha", role: "Convener · PSF" },
  { name: "Pst. Kate Edmond-Ekele", role: "Guest Minister" },
  { name: "Pst. Princess King", role: "Guest Minister" },
  { name: "Sis IZ Osoria & the G-Twins", role: "Worship Leader" },
];

function Conference() {
  return (
    <SiteLayout>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img src={confImg} alt="Conference worship" width={1600} height={1000} className="absolute inset-0 h-full w-full scale-[1.00] object-cover brightness-55 blur-[1.03px]" />
        <div className="absolute inset-0 bg-[--purple]/75" />
        <div className="container-app relative py-24 text-primary-foreground text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">PSF Women Conference 2026</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold">A Woman of Purpose in the Digital Age</h1>
          <p className="mt-5 opacity-90 max-w-2xl mx-auto">A holy convocation of women rising in worship, purpose, and power in the digital age. Come expecting encounters.</p>
          <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm">
            <span className="inline-flex items-center gap-2  rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur "><Calendar className="h-4 w-4 text-[--gold]" /> 25 July 2026</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur "><MapPin className="h-4 w-4 text-[--gold]" /> Dresdner Suits, Gwarinpa, Abuja-Nigeria</span>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-app grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">Theme</div>
              <h2 className="font-display text-3xl md:text-4xl text-primary">A Woman of Purpose in the Digital Age</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">This year's conference equips women to walk in purpose, influence, and godly impact in a rapidly changing digital world.</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">Speakers</div>
              <div className="grid gap-4 sm:grid-cols-2">
                {SPEAKERS.map((s) => (
                  <div key={s.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal text-white"><Mic className="h-5 w-5" /></div>
                    <div className="min-w-0">
                      <div className="font-display text-lg text-primary truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-3xl bg-royal p-8 text-primary-foreground shadow-elegant h-fit sticky top-24">
            <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">Registration</div>
            <h3 className="mt-2 font-display text-2xl">Reserve your seat</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Registration received. See you in Abuja!"); }} className="mt-5 space-y-3">
              <input required placeholder="Full name" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]" />
              <input required type="email" placeholder="Email" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]" />
              <input placeholder="Phone / WhatsApp" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]" />
              <input placeholder="Country / City" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]" />
              <button className="w-full rounded-full bg-[--gold] text-white font-semibold py-3 shadow-gold hover:brightness-110 transition">Register Now</button>
            </form>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
