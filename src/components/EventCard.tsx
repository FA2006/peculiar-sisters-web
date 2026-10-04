import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  link: string;
};

export default function EventCard({ title, date, location, link }: EventCardProps) {
  return (
    <div
      style={{ backgroundColor: "#4A148C" }}
      className="rounded-2xl border border-[#D4AF37]/25 p-5 text-white shadow-elegant ring-1 ring-[#D4AF37]/25"
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">Upcoming Event</div>
      <h3 className="mt-3 font-display text-2xl leading-tight text-white">{title}</h3>
      <p className="mt-3 text-sm text-white/80">{date}</p>
      <p className="mt-2 text-sm text-white/75">{location}</p>
      <Link
        to={link}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition hover:text-white"
      >
        Learn more <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
