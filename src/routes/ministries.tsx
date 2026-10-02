import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Flame, BookOpen, Sparkles, Megaphone, Compass, Flower2 } from "lucide-react";

export const Route = createFileRoute("/ministries")({
  head: () => ({
    meta: [
      { title: "Ministries — Peculiar Sisters Fellowship" },
      { name: "description", content: "Prayer, Bible Study, Empowerment, Outreach, Mentorship, and Young Ladies Ministry at PSF." },
      { property: "og:title", content: "PSF Ministries" },
      { property: "og:description", content: "Discover the arms of ministry raising virtuous women worldwide." },
    ],
  }),
  component: Ministries,
});

const MINISTRIES = [
  { icon: Flame, name: "Prayer Ministry", desc: "Weekly prayer watches, intercession trainings, and prophetic prayer nights." },
  { icon: BookOpen, name: "Bible Study Ministry", desc: "Verse-by-verse study, biblical womanhood series, and small-group discipleship." },
  { icon: Sparkles, name: "Women's Empowerment", desc: "Skills, business, and financial teachings that empower women beyond the pew." },
  { icon: Megaphone, name: "Evangelism & Outreach", desc: "Reaching the lost, the broken, and the marginalized with the love of Christ." },
  { icon: Compass, name: "Mentorship Programme", desc: "One-on-one and group mentorship to raise the next generation of virtuous women." },
  { icon: Flower2, name: "Young Ladies Ministry", desc: "A safe, inspiring space for teenagers and young adults to discover their identity in Christ." },
];

function Ministries() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Ministries" title="Every Sister Has a Place to Grow" subtitle="Six arms of ministry — one heartbeat: to raise virtuous women who fulfil God's purpose." />
      <Section>
        <div className="container-app grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map(({ icon: Icon, name, desc }) => (
            <article key={name} className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:shadow-elegant transition">
              <div className="absolute -top-14 -right-14 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-royal text-white shadow-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-primary">{name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
