import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/prayer-request")({
  head: () => ({
    meta: [
      { title: "Prayer Request — Peculiar Sisters Fellowship" },
      { name: "description", content: "Submit a prayer request, book counselling, or request a one-on-one prayer session." },
    ],
  }),
  component: PrayerRequest,
});

function PrayerRequest() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="Prayer Request" title="We Would Love to Pray With You" subtitle="No burden is too small, no situation too tangled. Send us your prayer request — we're standing with you." />
      <Section>
        <div className="container-app max-w-2xl">
          {sent ? (
            <div className="rounded-3xl bg-royal p-10 text-primary-foreground text-center shadow-elegant">
              <h2 className="font-display text-3xl text-[--gold]">Prayer received</h2>
              <p className="mt-3 opacity-90">Our intercessors will lift your request before the Lord. Expect testimonies!</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-elegant space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Full name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
                <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
              <input placeholder="Phone / WhatsApp (optional)" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              <select className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option>Prayer Request</option>
                <option>One-on-One Prayer</option>
                <option>Counselling</option>
              </select>
              <textarea required rows={6} placeholder="Please share your request…" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" className="mt-1 accent-[--gold]" />
                <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> Keep this request private (only prayer team sees it)</span>
              </label>
              <button className="w-full rounded-full bg-royal text-white font-semibold py-3.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition">Submit Request</button>
            </form>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
