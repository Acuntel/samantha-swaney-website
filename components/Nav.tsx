"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SAMANTHA } from "@/lib/samantha-data";

const LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/#neighborhoods", label: "Neighborhoods" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <div className="relative grid h-10 w-10 place-items-center rounded-full border border-teal/40 bg-cream-50">
            <span className="font-serif italic text-navy text-[15px] -mt-0.5">
              SS
            </span>
            <span className="absolute inset-0 rounded-full border border-teal/15" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-serif text-[17px] text-navy tracking-tightish">
              {SAMANTHA.name}
            </div>
            <div className="text-[9.5px] text-mute tracking-[0.22em] uppercase mt-0.5">
              {SAMANTHA.title}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-[0.16em] text-navy/75 hover:text-teal-700 transition"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SAMANTHA.phoneHref}
            className="flex items-center gap-1.5 text-[13px] font-medium text-navy"
          >
            <Phone size={13} /> {SAMANTHA.phone}
          </a>
          <Link
            href="/contact?intent=valuation"
            className="btn-navy !py-2.5 !px-5 !text-[12px]"
          >
            Home Valuation
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-navy"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-cream-50">
          <div className="container-x py-5 flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[13px] font-medium uppercase tracking-[0.16em] text-navy"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={SAMANTHA.phoneHref}
              className="py-2 text-base font-medium text-navy flex items-center gap-2"
            >
              <Phone size={16} /> {SAMANTHA.phone}
            </a>
            <Link
              href="/contact?intent=valuation"
              onClick={() => setOpen(false)}
              className="btn-navy"
            >
              Home Valuation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
