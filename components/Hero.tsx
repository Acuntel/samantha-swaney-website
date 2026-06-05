"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Home, ArrowRight } from "lucide-react";
import { SAMANTHA } from "@/lib/samantha-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blush-50">
      <div className="grain absolute inset-0 pointer-events-none" />
      {/* warm crimson + wine glows so the hero reads colorful, not white */}
      <div className="absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full bg-teal/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-44 h-[460px] w-[460px] rounded-full bg-navy/10 blur-3xl pointer-events-none" />
      <div className="relative container-x pt-16 pb-24 lg:pt-24 lg:pb-32 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT: copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/[0.07] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Elmhurst &amp; Cook County &middot; GC Realty
          </div>
          <h1 className="h-display text-balance mt-6">
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
            <Link href="/listings" className="btn-crimson">
              <Search size={15} /> Browse Homes
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

        {/* RIGHT: portrait on a bold oxblood panel with a crimson offset block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 1.3 }}
          className="relative max-w-[440px] mx-auto w-full"
        >
          {/* crimson block peeking out behind the panel */}
          <div className="band-crimson absolute -bottom-5 -left-5 h-44 w-44 rounded-[30px] opacity-90 shadow-cardHover" />
          {/* thin crimson keyline echo, top-right */}
          <div className="absolute -top-3 -right-3 h-24 w-24 rounded-[26px] border-2 border-teal/40" />

          <div className="band-oxblood relative rounded-[30px] p-3.5 shadow-cardHover">
            <div className="grain absolute inset-0 rounded-[30px] pointer-events-none opacity-50" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] ring-1 ring-cream-50/15">
              <Image
                src={SAMANTHA.headshot}
                alt={SAMANTHA.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
              />
            </div>

            {/* credential plate, cream on oxblood */}
            <div className="relative px-3 pt-5 pb-2 text-center">
              <div className="font-serif text-[22px] tracking-tighter2 text-cream-50">
                {SAMANTHA.name}
              </div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-teal-400/70" />
                <div className="text-[9.5px] uppercase tracking-[0.28em] text-cream-50/55">
                  Real Estate Broker
                </div>
                <div className="h-px w-8 bg-teal-400/70" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <Stat top="Elmhurst" bottom="& Cook County" />
                <Stat top="Buyers" bottom="& Sellers" mid />
                <Stat top="Est. 2003" bottom="GC Realty" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Link
        href="#stats"
        className="relative block text-center pb-6 text-[10px] uppercase tracking-[0.28em] text-mute hover:text-teal-700"
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
    <div className={`py-1.5 ${mid ? "border-x border-cream-50/15" : ""}`}>
      <div className="font-serif text-[16px] text-cream-50 leading-none tracking-tighter2">
        {top}
      </div>
      <div className="mt-1.5 text-[8.5px] uppercase tracking-[0.16em] text-cream-50/55">
        {bottom}
      </div>
    </div>
  );
}
