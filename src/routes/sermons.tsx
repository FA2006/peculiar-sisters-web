import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Search, Play, BookOpen, FileText, Headphones, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons & Resources — Peculiar Sisters Fellowship" },
      { name: "description", content: "Messages, devotionals, articles, prayer points, e-books, and video teachings." },
    ],
  }),
  component: Sermons,
});

const CATEGORIES = ["All", "Messages", "Devotionals", "Articles", "Prayer Points", "E-books", "Videos", "Podcast"] as const;

const RESOURCES = [
  { title: "The Peculiar Woman", type: "Messages", icon: Play, by: "Evang. Francisca F-N", length: "48 min" },
  { title: "30 Days of Purpose", type: "Devotionals", icon: BookOpen, by: "PSF Editorial", length: "30 days" },
  { title: "Fighting on Your Knees", type: "Prayer Points", icon: FileText, by: "PSF Prayer Team", length: "12 pages" },
  { title: "Virtuous & Victorious (E-book)", type: "E-books", icon: Download, by: "Evang. Francisca F-N", length: "PDF · 120 pgs" },
  { title: "Sisters Talk — Ep. 12", type: "Podcast", icon: Headphones, by: "PSF Podcast", length: "36 min" },
  { title: "Arise & Shine (Video)", type: "Videos", icon: Play, by: "Conference 2025", length: "1h 12m" },
  { title: "Marriage on the Rock", type: "Articles", icon: FileText, by: "Grace A.", length: "8 min read" },
  { title: "Mothers in Zion", type: "Messages", icon: Play, by: "Evang. Francisca F-N", length: "52 min" },
];

function Sermons() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = RESOURCES.filter((r) =>
    (cat === "All" || r.type === cat) &&
    (q === "" || r.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <SiteLayout>
      <PageHero eyebrow="Sermons & Resources" title="Feed Your Faith" subtitle="Messages, devotionals, e-books, and prayer resources to strengthen your walk." />
      <Section>
        <div className="container-app">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search resources…"
                className="w-full rounded-full bg-card border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium border transition ${cat === c ? "bg-royal text-white border-transparent shadow-gold" : "bg-card border-border text-foreground/80 hover:border-secondary"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(({ title, type, icon: Icon, by, length }) => (
              <article key={title} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-royal text-white"><Icon className="h-4 w-4" /></div>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">{type}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-primary group-hover:text-accent transition">{title}</h3>
                <div className="mt-3 text-xs text-muted-foreground flex justify-between">
                  <span>{by}</span><span>{length}</span>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No resources match your search.</p>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
