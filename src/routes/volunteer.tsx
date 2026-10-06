import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { FormShell } from "@/components/FormShell";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content:
          "Join the PSF volunteer team and serve alongside sisters across the world.",
      },
    ],
  }),
  component: Volunteer,
});

const AREAS = [
  "Prayer Team",
  "Media & Tech",
  "Ushering / Hospitality",
  "Worship",
  "Follow-up & Counselling",
  "Outreach",
  "Content & Blog",
];

function Volunteer() {
  const { submitted, loading, error, handleSubmit } =
    useEmailSubmission("volunteer");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Volunteer"
        title="Serve With Us"
        subtitle="Your time, gift, and heart are treasures — help us reach and disciple more women."
      />
      <Section>
        <div className="container-app max-w-2xl">
          {submitted ? (
            <div className="rounded-3xl bg-royal p-10 text-primary-foreground text-center shadow-elegant">
              <h2 className="font-display text-3xl text-[--gold]">
                Application received
              </h2>
              <p className="mt-3 opacity-90">
                Our team will reach out shortly. Welcome to the family!
              </p>
            </div>
          ) : (
            <FormShell className="shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    name="name"
                    placeholder="Full name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <input
                  name="phone"
                  placeholder="Phone / WhatsApp"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  name="city"
                  placeholder="City / Country"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <div>
                  <label className="text-sm font-medium text-primary">
                    Area of interest
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {AREAS.map((a) => (
                      <label
                        key={a}
                        className="cursor-pointer rounded-full border border-border bg-background px-4 py-1.5 text-xs hover:border-secondary has-[:checked]:bg-royal has-[:checked]:text-white has-[:checked]:border-transparent transition"
                      >
                        <input
                          name="areas"
                          type="checkbox"
                          value={a}
                          className="sr-only"
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                </div>
                <textarea
                  name="reason"
                  rows={4}
                  placeholder="Why do you want to volunteer with PSF?"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}
                <button
                  disabled={loading}
                  className="rounded-full bg-royal text-white font-semibold px-8 py-3.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </FormShell>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
