import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { FormShell } from "@/components/FormShell";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";
import { siteConfig } from "@/config/sites";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content: "Reach out to Peculiar Sisters Fellowship — Abuja, Nigeria.",
      },
    ],
  }),
  component: Contact,
});

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  whatsapp: MessageCircle,
};

function Contact() {
  const { submitted, loading, error, handleSubmit } =
    useEmailSubmission("contact");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        subtitle="Prayers, partnerships, questions, invitations — send us a note."
      />

      <Section>
        <div className="container-app grid gap-10 lg:grid-cols-5">
          <aside className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: "Location", value: "Abuja, Nigeria" },
              {
                icon: Mail,
                label: "Email",
                value: "info@peculiarsistersfellowship.org",
              },
              { icon: Phone, label: "Phone", value: "+234 813 371 5979" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-1 font-medium text-primary break-words">
                    {value}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Follow Us
              </div>
              <div className="mt-3 flex gap-2">
                {siteConfig.socialLinks.map((social) => {
                  const iconName = social.name.toLowerCase();
                  const Icon =
                    socialIcons[iconName as keyof typeof socialIcons];

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="grid h-10 w-10 place-items-center rounded-full bg-royal text-white hover:brightness-110 transition"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                    </a>
                  );
                })}
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
            {submitted ? (
              <div className="rounded-3xl bg-royal p-10 text-primary-foreground text-center shadow-elegant">
                <h2 className="font-display text-3xl text-[--gold]">
                  Message received
                </h2>
                <p className="mt-3 opacity-90">
                  We'll get back to you shortly. Grace and peace!
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
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Your message…"
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
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </FormShell>
            )}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
