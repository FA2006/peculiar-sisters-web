import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Quote } from "lucide-react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

export const Route = createFileRoute("/testimonies")({
  head: () => ({
    meta: [
      { title: "Testimonies — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content:
          "Read and share testimonies of God's goodness in the lives of PSF sisters.",
      },
    ],
  }),
  component: Testimonies,
});

const T = [
  {
    name: "Adaeze O.",
    where: "Lagos",
    text: "My marriage was on the verge of collapse. Through PSF prayer nights and mentorship, God restored my home. Today, my husband and I minister together.",
  },
  {
    name: "Ngozi A.",
    where: "Abuja",
    text: "I struggled with depression for years. In this fellowship, I found sisters who prayed me back to life. Jesus set me free!",
  },
  {
    name: "Chioma E.",
    where: "London",
    text: "PSF taught me who I am in Christ. I now run a business rooted in kingdom principles and mentor 15 young women.",
  },
  {
    name: "Halimat S.",
    where: "Kaduna",
    text: "The 40 Days of Prayer changed my life. I received clarity, healing, and open doors I had prayed about for years.",
  },
  {
    name: "Blessing U.",
    where: "Port Harcourt",
    text: "After 9 years of waiting, God answered our prayer for a child during a PSF fasting programme. Glory to Jesus!",
  },
  {
    name: "Ruth K.",
    where: "Nairobi",
    text: "Being part of PSF virtually has been a lifeline. Purpose has become clear and I am walking boldly.",
  },
];

function Testimonies() {
  const { submitted, loading, error, handleSubmit } =
    useEmailSubmission("testimony");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Testimonies"
        title="God Is Still Doing Wonders"
        subtitle="Read what the Lord has done — and share what He's done for you."
      />

      <Section>
        <div className="container-app grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {T.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-3xl bg-card border border-border p-7 shadow-sm"
            >
              <Quote className="h-6 w-6 text-secondary" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                "{t.text}"
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-royal text-white font-display">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-primary text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.where}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="container-app max-w-2xl">
          <div className="rounded-3xl bg-royal p-8 md:p-10 text-primary-foreground shadow-elegant">
            <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">
              Share Your Testimony
            </div>
            <h2 className="mt-2 font-display text-3xl">Tell of His goodness</h2>
            {submitted ? (
              <p className="mt-6 text-lg font-display italic text-[--gold]">
                Thank you! Your testimony blesses the sisterhood.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]"
                />
                <input
                  name="city"
                  placeholder="City / Country"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]"
                />
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us what God has done…"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]"
                />
                {error && (
                  <p role="alert" className="text-sm text-red-200">
                    {error}
                  </p>
                )}
                <button
                  disabled={loading}
                  className="rounded-full bg-[--gold] text-white font-semibold px-6 py-3 shadow-gold hover:brightness-110 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Testimony"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
