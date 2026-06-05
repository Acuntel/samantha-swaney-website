"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Home, ArrowRight } from "lucide-react";
import { SAMANTHA } from "@/lib/samantha-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50">
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100/60 pointer-events-none" />
      <div className="relative container-x pt-16 pb-24 lg:pt-28 lg:pb-32 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT: copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-teal" />
            <div className="h-eyebrow">{SAMANTHA.market}</div>
          </div>
          <h1 className="h-display text-balance">
            Your move,{" "}
            <span className="italic-emph text-teal-600">
              handled with care.
            </span>
            <br className="hidden sm:block" />
            <span className="text-navy">Elmhurst and the</span>{" "}
            <span className="text-navy/70 italic-emph">near-west suburbs.</span>
          </h1>
          <p className="lede mt-7 max-w-xl">
            Samantha Swaney is a real estate broker with GC Realty &amp;
            Development, helping buyers, sellers, and investors across Elmhurst,
            the near-west Cook County suburbs, and the northwest suburbs she
            calls home. Local, honest, and hands-on from the first showing to
            closing day.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/listings" className="btn-navy">
              <Search size={15} /> Search Homes
            </Link>
            <Link href="/contact?intent=valuation" className="btn-ghost">
              <Home size={15} /> What Is My Home Worth?
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-teal/10 text-teal">
              <Home size={18} />
            </div>
            <div className="text-sm">
              <div className="font-medium text-navy">
                GC Realty &amp; Development
              </div>
              <div className="text-mute text-xs">
                Full-service brokerage and property management since 2003
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: portrait + credential plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 1.3 }}
          className="relative max-w-[420px] mx-auto w-full"
        >
          {/* Decorative brass corners */}
          <Corner className="-top-2 -left-2" rotation={0} />
          <Corner className="-top-2 -right-2" rotation={90} />
          <Corner className="-bottom-2 -left-2" rotation={-90} />
          <Corner className="-bottom-2 -right-2" rotation={180} />

          {/* Portrait with clean white mat + thin brass keyline */}
          <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-cream-50 p-3 shadow-cardHover">
            <div className="relative h-full w-full overflow-hidden rounded-[2px] ring-1 ring-teal/35">
              <Image
                src={SAMANTHA.headshot}
                alt={SAMANTHA.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
              />
            </div>
          </div>

          {/* Credential plate, sits under portrait like a gallery label */}
          <div className="mt-6 mx-auto max-w-[360px] text-center">
            <div className="font-serif text-[22px] tracking-tighter2 text-navy">
              {SAMANTHA.name}
            </div>
            <div className="mt-2 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-teal/60" />
              <div className="text-[9.5px] uppercase tracking-[0.28em] text-mute">
                Real Estate Broker
              </div>
              <div className="h-px w-8 bg-teal/60" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat top="Elmhurst" bottom="& Cook County" />
              <Stat top="Buyers" bottom="& Sellers" mid />
              <Stat top="Est. 2003" bottom="GC Realty" />
            </div>
          </div>
        </motion.div>
      </div>

      <Link
        href="#stats"
        className="relative block text-center pb-6 text-[10px] uppercase tracking-[0.28em] text-mute hover:text-navy"
      >
        <ArrowRight
          size={12}
          className="rotate-90 inline-block mr-1.5 -mt-0.5"
        />{" "}
        Continue
      </Link>
    </section>
  );
}

function Corner({
  className,
  rotation,
}: {
  className: string;
  rotation: number;
}) {
  return (
    <svg
      className={`absolute h-5 w-5 text-teal/70 pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path d="M0 1 L0 0 L1 0" stroke="currentColor" strokeWidth="1.2" />
      <path d="M0 6 L0 0 L6 0" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

function Stat({
  top,
  bottom,
  mid,
}: {
  top: string;
  bottom: string;
  mid?: boolean;
}) {
  return (
    <div className={`py-1.5 ${mid ? "border-x border-line" : ""}`}>
      <div className="font-serif text-[19px] text-navy leading-none tracking-tighter2">
        {top}
      </div>
      <div className="mt-1.5 text-[9px] uppercase tracking-[0.18em] text-mute">
        {bottom}
      </div>
    </div>
  );
}
