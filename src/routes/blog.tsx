import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Peculiar Sisters Fellowship" },
      { name: "description", content: "Christian living, marriage, purpose, faith, and leadership — inspiration for peculiar women." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { title: "10 Habits of a Virtuous Woman", cat: "Christian Living", date: "Jul 4, 2026", excerpt: "Small, sacred rhythms that shape a life anchored in Christ." },
  { title: "When Marriage Feels Hard", cat: "Marriage", date: "Jun 21, 2026", excerpt: "God's word for the seasons when love needs faith to hold on." },
  { title: "Discovering Your God-Given Purpose", cat: "Purpose", date: "Jun 10, 2026", excerpt: "Six markers that help you recognize the assignment on your life." },
  { title: "Raising Kingdom Kids", cat: "Parenting", date: "May 29, 2026", excerpt: "Practical, spirit-led parenting for the peculiar mother." },
  { title: "Praying Bold, Believing Big", cat: "Prayer", date: "May 12, 2026", excerpt: "Move from timid prayers to heaven-shaking intercession." },
  { title: "Leading Like Deborah", cat: "Leadership", date: "Apr 30, 2026", excerpt: "Feminine, fierce, and full of the fear of the Lord." },
];

function Blog() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Blog" title="Words for the Peculiar Woman" subtitle="Inspiration, teaching, and reflection to feed your faith and your walk." />
      <Section>
        <div className="container-app grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden hover:shadow-elegant transition">
              <div className="h-44 bg-royal relative">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_30%,var(--gold)_0,transparent_60%)]" />
                <div className="absolute bottom-4 left-4 text-[--gold] font-display text-4xl">{p.title[0]}</div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary/20 text-primary px-3 py-1 font-medium">{p.cat}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" />{p.date}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-primary group-hover:text-accent transition">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                <Link to="/blog" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">Read more <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
