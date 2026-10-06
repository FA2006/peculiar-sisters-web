import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { FormShell } from "@/components/FormShell";
import { Lock } from "lucide-react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

export const Route = createFileRoute("/prayer-request")({
  head: () => ({
    meta: [
      { title: "Prayer Request — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content:
          "Submit a prayer request, book counselling, or request a one-on-one prayer session.",
      },
    ],
  }),
  component: PrayerRequest,
});

function PrayerRequest() {
  const { submitted, loading, error, handleSubmit } =
    useEmailSubmission("prayerRequest");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Prayer Request"
        title="We Would Love to Pray With You"
        subtitle="No burden is too small, no situation too tangled. Send us your prayer request — we're standing with you."
      />
      <Section>
        <div className="container-app max-w-2xl">
          {submitted ? (
            <div className="rounded-3xl bg-royal p-10 text-primary-foreground text-center shadow-elegant">
              <h2 className="font-display text-3xl text-[--gold]">
                Prayer received
              </h2>
              <p className="mt-3 opacity-90">
                Our intercessors will lift your request before the Lord. Expect
                testimonies!
              </p>
            </div>
          ) : (
            <FormShell className="shadow-elegant space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Phone / WhatsApp (optional)"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <select
                  name="requestType"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option>Prayer Request</option>
                  <option>One-on-One Prayer</option>
                  <option>Counselling</option>
                </select>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="Please share your request…"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    name="private"
                    type="checkbox"
                    value="yes"
                    className="mt-1 accent-[--gold]"
                  />
                  <span className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5" /> Please handle my request
                    privately
                  </span>
                </label>
                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}
                <button
                  disabled={loading}
                  className="w-full rounded-full bg-royal text-white font-semibold py-3.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Submit Request"}
                </button>
              </form>
            </FormShell>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
