import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { Heart, HandHeart, BookOpen, Sparkles, Users, Award, ShieldCheck, HeartHandshake, MessageCircle } from "lucide-react";
import convenerImg from "@/assets/convener.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Peculiar Sisters Fellowship" },
      { name: "description", content: "Our story, vision, mission, and the convener behind Peculiar Sisters Fellowship." },
      { property: "og:title", content: "About Peculiar Sisters Fellowship" },
      { property: "og:description", content: "Discover the vision behind PSF and meet Evang. Francisca Francis-Nwaoha." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Heart, name: "Faith", desc: "Rooted in Christ, walking by faith and not by sight." },
  { icon: HandHeart, name: "Love", desc: "Loving God wholly and our sisters as ourselves." },
  { icon: Sparkles, name: "Prayer", desc: "A ministry born and sustained on the altar of prayer." },
  { icon: Award, name: "Excellence", desc: "Offering our best in worship, service, and calling." },
  { icon: Users, name: "Sisterhood", desc: "Doing life together — the strength of covenant relationships." },
  { icon: HeartHandshake, name: "Friendship", desc: "Cultivating genuine, Christ-centered bonds that last a lifetime." },
  { icon: ShieldCheck, name: "Integrity", desc: "Whole-hearted living that reflects the character of Christ." },
  { icon: BookOpen, name: "Service", desc: "Serving God by serving people with joy and humility." },
];

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About PSF" title="Our Story, Vision & Mission" subtitle="A movement of virtuous women called to shine God's light in every sphere." />

      <Section>
        {/* Vision & Mission */}
        <div className="container-app">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Vision */}
            <div className="relative overflow-hidden rounded-3xl bg-royal p-8 text-primary-foreground shadow-elegant ring-1 ring-[--gold]/40">
              <div className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-[--gold]/25 blur-3xl" />

              <div className="relative text-xs uppercase tracking-[0.35em] text-[--gold]">
                Vision
              </div>

              <p className="relative mt-3 font-display text-lg leading-relaxed text-justify hyphens-auto">
                To raise a generation of godly, purpose-driven, spiritually empowered,
                and transformational women who passionately love God, live by His
                Word, influence society with integrity, and fulfill their God-ordained
                destinies while advancing the Kingdom of God across generations and
                nations.
              </p>
            </div>

            {/* Mission */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange to-purple p-8 text-primary-foreground shadow-elegant ring-1 ring-[--gold]/40">
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[--gold]/25 blur-3xl" />

              <div className="relative text-xs uppercase tracking-[0.35em] text-[--gold]">
                Mission
              </div>

              <p className="relative mt-3 font-display text-lg leading-relaxed text-justify hyphens-auto">
                The Peculiar Sisters Fellowship exists to disciple, equip, inspire,
                and empower women through the uncompromising teaching of God's Word,
                fervent prayer, worship, mentorship, leadership development, and
                compassionate service, enabling them to discover their divine
                purpose, develop their God-given gifts, build Christ-centered
                families, excel in every sphere of life, and become positive agents
                of transformation in their communities and the world.
              </p>
            </div>
          </div>

          {/* Our Story */}
          <div className="mx-auto mt-16 max-w-4xl text-center">
            <div className="mb-3 text-xs uppercase tracking-[0.35em] text-accent">
              Our Story
            </div>

            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
              From a Small Circle to a Global Sisterhood
            </h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Peculiar Sisters Fellowship began as a small gathering of women
                hungry for a deeper walk with Jesus. What started as intimate prayer
                nights has grown into a global fellowship reaching women across
                denominations, cultures, and continents.
              </p>

              <p>
                We are a spiritual home for the searching, the wounded, the
                awakening, and the burning — a place where every woman is celebrated
                as God's peculiar treasure and equipped to walk in her purpose.
              </p>

              <p>
                Rooted in scripture and led by the Holy Spirit, PSF exists to raise
                women who love God fiercely, know who they are, and change the world
                from the inside out.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.35em] text-accent mb-2">Core Values</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">What Guides Every Sister</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-royal text-white"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-xl text-primary">{name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Convener */}
      <Section className="pt-0">
        <div className="container-app grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative">
            <img src={convenerImg} alt="Evang. Francisca Francis-Nwaoha" width={1000} height={1200} loading="lazy" className="rounded-3xl shadow-elegant object-cover w-full aspect-[4/5]" />
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-[--gold] text-[--purple] px-5 py-3 shadow-gold font-display">
              Convener & Visionary
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-accent mb-3">Meet the Convener</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">Evang. Francisca Francis-Nwaoha</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A passionate evangelist, teacher, and mentor, Evang. Francisca has given her life to raising women who love God and live boldly for Him. Called into ministry at a young age, she carries a burden for the healing, empowerment, and awakening of women across nations.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Through prayer, scripture, and prophetic mentorship, she has walked with thousands of women into freedom and purpose. Her heart's cry: <em className="text-primary">that no daughter of Zion be left behind.</em>
            </p>
            <blockquote className="mt-8 border-l-2 border-[--gold] pl-5 italic text-primary font-display text-lg">
              "You were not made ordinary. God set you apart — peculiar, precious, virtuous. Arise, sister. The world is waiting for the woman you were designed to be."
            </blockquote>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
