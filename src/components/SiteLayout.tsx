import { Link, useLocation } from "@tanstack/react-router";
import { siteConfig } from "@/config/sites";
import { useState, type ReactNode } from "react";
import { Menu, X, Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import psfLogoAsset from "@/assets/PSF_LOGO.jpeg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ministries", label: "Ministries" },
  { to: "/events", label: "Events" },
  { to: "/sermons", label: "Sermons" },
  { to: "/testimonies", label: "Testimonies" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  whatsapp: MessageCircle,
};

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src={psfLogoAsset}
        alt="Peculiar Sisters Fellowship Logo"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover shadow-gold ring-1 ring-[--gold]/50"
      />
      <div className="leading-tight">
        <div className="font-display text-lg font-bold text-primary">Peculiar Sisters</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Fellowship</div>
      </div>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Keep section links active while visiting nested routes, such as event details.
  const isNavActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    // Top-level navigation shell used across every page.
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      {/* Desktop navigation links and CTA */}
      <div className="container-app flex h-20 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={[
              "px-3 py-2 text-sm font-medium transition-colors",
              isNavActive(item.to)
                ? "text-primary underline decoration-[var(--gold)] underline-offset-[10px] decoration-2"
                : "text-foreground/80 underline decoration-transparent underline-offset-[10px] decoration-2 hover:text-primary hover:decoration-[var(--gold)]",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/prayer-request"
            className="inline-flex items-center rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white shadow-gold ring-1 ring-[--gold]/40 hover:opacity-90 transition"
          >
            Prayer Request
          </Link>
        </div>
        <button
          className="lg:hidden grid h-10 w-10 place-items-center rounded-full bg-royal text-white shadow-gold ring-1 ring-[--gold]/40"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu shown on smaller screens */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-app py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={[
                  "py-2 text-base font-medium transition-colors",
                  isNavActive(item.to)
                    ? "text-primary underline decoration-[var(--gold)] underline-offset-[8px] decoration-2"
                    : "text-foreground/85 underline decoration-transparent underline-offset-[8px] decoration-2 hover:text-primary hover:decoration-[var(--gold)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/prayer-request"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-full bg-royal px-5 py-3 text-sm font-semibold text-white"
            >
              Prayer Request
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    // Shared footer with brand, quick links, and contact details.
    <footer className="mt-24 bg-royal text-primary-foreground">
      {/* Footer content columns */}
      <div className="container-app py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={psfLogoAsset}
              alt="Peculiar Sisters Fellowship Logo"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-[--gold]/50"
            />
            <div>
              <div className="font-display text-lg text-[--gold]">Peculiar Sisters</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Fellowship</div>
            </div>
          </div>
          <p className="mt-5 text-sm opacity-80 italic font-display">
            "We Are Peculiar. We Are Virtuous."
          </p>

        <div className="mt-6 flex gap-3">
          {siteConfig.socialLinks.map((social) => {
            const iconName = social.name.toLowerCase();
            const Icon = socialIcons[iconName as keyof typeof socialIcons];

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-[--gold]/20 transition"
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
              </a>
            );
          })}
        </div>

        </div>

        <div>
          <h4 className="font-display text-lg text-[--gold]">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {NAV.slice(1, 7).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[--gold] transition">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-[--gold]">Get Involved</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li><Link to="/prayer-request" className="hover:text-[--gold]">Prayer Request</Link></li>
            <li><Link to="/give" className="hover:text-[--gold]">Give / Partner</Link></li>
            <li><Link to="/volunteer" className="hover:text-[--gold]">Volunteer</Link></li>
            <li><Link to="/testimonies" className="hover:text-[--gold]">Share Testimony</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-[--gold]">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[--gold]" /> Abuja, Nigeria</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 mt-0.5 text-[--gold]" /> info@peculiarsistersfellowship.org</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 mt-0.5 text-[--gold]" /> +234 813 371 5979</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-app py-5 text-xs opacity-70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Peculiar Sisters Fellowship. All rights reserved.</span>
          <span>Raising virtuous women fulfilling God's purpose.</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    // Shared page shell: header, content area, footer, and sticky WhatsApp CTA.
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp contact button for quick outreach */}
      <a href={siteConfig.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-elegant transition hover:brightness-110 hover:scale-[1.03]">
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm font-semibold">WhatsApp</span>
      </a>
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    // Reusable page hero used across ministry, event, and resource pages.
    <section className="relative overflow-hidden bg-royal text-primary-foreground">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,var(--gold)_0,transparent_40%),radial-gradient(circle_at_80%_80%,var(--orange)_0,transparent_40%)]" />
      <div className="container-app relative py-20 md:py-28 text-center">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.35em] text-[--gold] mb-4">{eyebrow}</div>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg opacity-85">{subtitle}</p>
        )}
        <div className="mt-8 mx-auto h-px w-24 bg-[--gold]/60" />
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Generic content section wrapper that keeps spacing consistent across pages.
  return <section className={`py-16 md:py-24 ${className}`}>{children}</section>;
}
