import Link from "next/link";
import { MapPin, BadgeCheck, Building2, Handshake } from "lucide-react";
import { SAMANTHA } from "@/lib/samantha-data";

// Samantha has no published client reviews yet, so this section presents her
// honest value and approach instead of fabricated testimonials. When real
// reviews come in, they can replace this block.
const PILLARS = [
  {
    icon: MapPin,
    title: "Local, block by block",
    body: "Elmhurst and the near-west Cook County suburbs are my focus. I know the commutes, the school boundaries, and what a block can do to value.",
  },
  {
    icon: BadgeCheck,
    title: "Honest pricing",
    body: "A real comparative market analysis, not an inflated number to win a listing. You get a defensible range and a straight prep plan.",
  },
  {
    icon: Building2,
    title: "A full brokerage behind me",
    body: "GC Realty & Development has served Chicagoland since 2003, with marketing, transaction, and property-management support on every deal.",
  },
  {
    icon: Handshake,
    title: "Buyers, sellers, investors",
    body: "First-time buyers, move-up sellers, and landlords. With GC Realty's property-management arm, I can help you buy smart and keep it running.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy-900 text-cream-50 relative overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 pointer-events-none" />
      <div className="relative container-x py-24 lg:py-32 grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-teal-400" />
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-teal-400">
              Why work with Samantha
            </div>
          </div>
          <h2 className="mt-5 font-serif text-[36px] lg:text-[48px] font-normal tracking-tighter2 leading-[1.05] text-balance">
            Straight answers,{" "}
            <span className="italic-emph text-teal-400">start to finish.</span>
          </h2>
          <p className="mt-6 text-cream-50/75 leading-relaxed font-light">
            No inflated numbers, no pressure. Just a local broker who tells you
            the truth about price and timing, and does the homework so you are
            never guessing.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-cream-50 border-b border-teal-400/40 pb-0.5"
          >
            Start a conversation &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-teal-400/15 text-teal-400">
                <p.icon size={18} />
              </div>
              <div className="mt-4 font-serif text-[20px] tracking-tighter2 text-cream-50">
                {p.title}
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-cream-50/70 font-light">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-cream-50/10">
        <div className="container-x py-6 text-center text-[12px] text-cream-50/55">
          Backed by {SAMANTHA.brokerage}. {SAMANTHA.tagline}.
        </div>
      </div>
    </section>
  );
}
