import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { useState } from "react";
import hero from "@/assets/hero-worship.jpg";
import prayer from "@/assets/prayer.jpg";
import fellowship from "@/assets/fellowship.jpg";
import conf from "@/assets/conference.jpg";
import mummyPeculiar from "@/assets/MUMMY_PECULIAR.jpeg";
import psfMumf from "@/assets/PSF_MUMF.jpeg";
import psfCong2 from "@/assets/PSF_CONG2.jpeg";
import psfMum4 from "@/assets/PSF_MUM_4.jpeg";
import psfCake2 from "@/assets/PSF_CAKE2.jpeg";
import psfAnniversary from "@/assets/PSF_ANNIVERSARY.jpeg";
import psfGifting from "@/assets/PSF_GIFTING.jpeg";
import confDeliverance from "@/assets/PSF_CONF_DELIVERANCE_SESSION.jpeg";
import confDiscussion from "@/assets/PSF_CONF_DISCUSSION.jpeg";
import confImpartation from "@/assets/PSF_CONFERENCE_IMPATATION.jpeg";
import psfMummy from "@/assets/PSF_MUMMY.jpeg";
import confParticipants from "@/assets/PSF_WM_CONF_PARTICIPANTS.jpeg";
import wePeculiar from "@/assets/WE_ARE_PECULIAR_SISTERS.jpeg";
import sistersInChrist from "@/assets/WE_ARE_SISTERS_IN_CHRIST.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Peculiar Sisters Fellowship" },
      { name: "description", content: "Moments from conferences, prayer nights, outreach and fellowship gatherings." },
    ],
  }),
  component: Gallery,
});

const CATS = ["All", "Conferences", "Prayer Nights", "Outreach", "Bible Studies", "Programmes", "Anniversary"] as const;

const IMAGES = [
  { src: psfMummy, cat: "Conferences", title: "Mummy Peculiar Leading Worship" },
  { src: confDeliverance, cat: "Conferences", title: "Deliverance Session" },
  { src: confImpartation, cat: "Conferences", title: "Impartation & Prayer" },
  { src: confDiscussion, cat: "Conferences", title: "Panel Discussion" },
  { src: confParticipants, cat: "Conferences", title: "Conference Participants" },
  { src: wePeculiar, cat: "Programmes", title: "We Are Peculiar Sisters" },
  { src: sistersInChrist, cat: "Programmes", title: "Sisters In Christ" },
  { src: mummyPeculiar, cat: "Programmes", title: "Mummy Peculiar Ministering" },
  { src: psfMumf, cat: "Prayer Nights", title: "June Prayer Meeting" },
  { src: psfAnniversary, cat: "Anniversary", title: "PSF Anniversary Celebration" },
  { src: psfCake2, cat: "Anniversary", title: "Anniversary Cake Cutting" },
  { src: psfGifting, cat: "Programmes", title: "Honouring the Sisters" },
  { src: psfCong2, cat: "Prayer Nights", title: "Worship & Intercession" },
  { src: psfMum4, cat: "Programmes", title: "The Word Went Forth" },
  { src: hero, cat: "Conferences", title: "Arise 2025" },
  { src: prayer, cat: "Prayer Nights", title: "Midnight Watch" },
  { src: fellowship, cat: "Programmes", title: "Sisters United" },
  { src: conf, cat: "Conferences", title: "Worship Night" },
  { src: hero, cat: "Bible Studies", title: "Virtuous Woman Study" },
  { src: fellowship, cat: "Outreach", title: "Widows Outreach" },
];


function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const shown = IMAGES.filter((i) => cat === "All" || i.cat === cat);

  return (
    <SiteLayout>
      <PageHero eyebrow="Gallery" title="Moments of Grace" subtitle="A glimpse of the glory of God among the sisters." />
      <Section>
        <div className="container-app">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition ${cat === c ? "bg-royal text-white border-transparent shadow-gold" : "bg-card border-border text-foreground/80 hover:border-secondary"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((img, i) => (
              <button key={i} onClick={() => setOpen(img.src)} className="group relative overflow-hidden rounded-3xl">
                <img src={img.src} alt={img.title} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[--purple]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-primary-foreground text-left">
                  <div className="text-[10px] uppercase tracking-widest text-[--gold]">{img.cat}</div>
                  <div className="font-display text-lg">{img.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 bg-[--purple]/95 backdrop-blur-sm grid place-items-center p-4">
          <img src={open} alt="" className="max-h-[90vh] max-w-6xl rounded-3xl shadow-elegant" />
        </div>
      )}
    </SiteLayout>
  );
}
