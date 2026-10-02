import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Peculiar Sisters Fellowship" },
      { name: "description", content: "Join the PSF volunteer team and serve alongside sisters across the world." },
    ],
  }),
  component: Volunteer,
});

const AREAS = ["Prayer Team", "Media & Tech", "Ushering / Hospitality", "Worship", "Follow-up & Counselling", "Outreach", "Content & Blog"];

function Volunteer() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="Volunteer" title="Serve With Us" subtitle="Your time, gift, and heart are treasures — help us reach and disciple more women." />
      <Section>
        <div className="container-app max-w-2xl">
          {sent ? (
            <div className="rounded-3xl bg-royal p-10 text-primary-foreground text-center shadow-elegant">
              <h2 className="font-display text-3xl text-[--gold]">Application received</h2>
              <p className="mt-3 opacity-90">Our team will reach out shortly. Welcome to the family!</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Full name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
                <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
              <input placeholder="Phone / WhatsApp" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              <input placeholder="City / Country" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              <div>
                <label className="text-sm font-medium text-primary">Area of interest</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AREAS.map((a) => (
                    <label key={a} className="cursor-pointer rounded-full border border-border bg-background px-4 py-1.5 text-xs hover:border-secondary has-[:checked]:bg-royal has-[:checked]:text-white has-[:checked]:border-transparent transition">
                      <input type="checkbox" className="sr-only" />{a}
                    </label>
                  ))}
                </div>
              </div>
              <textarea rows={4} placeholder="Why do you want to volunteer with PSF?" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              <button className="rounded-full bg-royal text-white font-semibold px-8 py-3.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition">Submit Application</button>
            </form>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
