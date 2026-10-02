import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Heart, Gift, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/give")({
  head: () => ({
    meta: [
      { title: "Give / Partner — Peculiar Sisters Fellowship" },
      { name: "description", content: "Partner with PSF through offerings, donations, and conference sponsorship." },
    ],
  }),
  component: Give,
});

function Give() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Give & Partner" title="Sow Into Kingdom Impact" subtitle="Every seed sown into PSF helps raise, disciple, and empower women across the nations." />
      <Section>
        <div className="container-app grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, name: "Offerings", desc: "Freewill giving into the daily work of the fellowship." },
            { icon: Gift, name: "Donations", desc: "One-time gifts toward outreach, welfare, and resources." },
            { icon: Sparkles, name: "Conference Sponsorship", desc: "Sponsor a woman or an entire session at PSF Conference." },
            { icon: Users, name: "Partnership", desc: "Monthly partners standing with the vision long-term." },
          ].map(({ icon: Icon, name, desc }) => (
            <div key={name} className="rounded-3xl border border-border bg-card p-6 hover:shadow-elegant transition">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-royal text-white"><Icon className="h-4 w-4" /></div>
              <h3 className="mt-4 font-display text-xl text-primary">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="container-app mt-14">
          <div className="rounded-3xl bg-royal p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
            <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">Give Online</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Choose a payment method</h2>
            <p className="mt-3 opacity-85 max-w-lg mx-auto">Secure giving powered by Paystack, Flutterwave, and Stripe.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Paystack", "Flutterwave", "Stripe"].map((p) => (
                <button key={p} className="rounded-full bg-[--gold] text-white font-semibold px-6 py-3 shadow-gold hover:brightness-110 transition">
                  Give with {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
