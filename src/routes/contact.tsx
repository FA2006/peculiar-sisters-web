import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Peculiar Sisters Fellowship" },
      { name: "description", content: "Reach out to Peculiar Sisters Fellowship — Abuja, Nigeria." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="We'd Love to Hear From You" subtitle="Prayers, partnerships, questions, invitations — send us a note." />

      <Section>
        <div className="container-app grid gap-10 lg:grid-cols-5">
          <aside className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: "Location", value: "Abuja, Nigeria" },
              { icon: Mail, label: "Email", value: "info@peculiarsistersfellowship.org" },
              { icon: Phone, label: "Phone", value: "+234 813 371 5979" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal text-white"><Icon className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="mt-1 font-medium text-primary break-words">{value}</div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Follow Us</div>
              <div className="mt-3 flex gap-2">
                {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-royal text-white hover:brightness-110 transition"><Icon className="h-4 w-4" /></a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Abuja+Nigeria&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </div>
          </aside>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="rounded-3xl bg-royal p-10 text-primary-foreground text-center shadow-elegant">
                <h2 className="font-display text-3xl text-[--gold]">Message received</h2>
                <p className="mt-3 opacity-90">We'll get back to you shortly. Grace and peace!</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-sm space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Full name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
                  <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <input placeholder="Subject" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
                <textarea required rows={6} placeholder="Your message…" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
                <button className="rounded-full bg-royal text-white font-semibold px-8 py-3.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <a href="https://wa.me/2348133715979" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 shadow-elegant hover:brightness-110 transition">
        <MessageCircle className="h-4 w-4" /> <span className="text-sm font-semibold">WhatsApp</span>
      </a>
    </SiteLayout>
  );
}
