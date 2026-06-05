"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    const t2 = setTimeout(() => setHidden(true), 2400);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-cream-50 transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="grain absolute inset-0" />
      <div className="relative flex flex-col items-center">
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 sm:h-28 sm:w-28"
          aria-hidden
        >
          <defs>
            <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2B0A14" />
              <stop offset="55%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#EC8F9C" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="url(#brass)"
            strokeWidth="1"
            opacity="0.9"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#brass)"
            strokeWidth="0.5"
            opacity="0.55"
          />
          <text
            x="60"
            y="74"
            textAnchor="middle"
            fontFamily="var(--font-fraunces), Georgia, serif"
            fontSize="44"
            fontStyle="italic"
            fontWeight="500"
            fill="#2B0A14"
          >
            SS
          </text>
        </svg>
        <div className="mt-5 text-[10px] uppercase tracking-[0.32em] text-navy/70 font-medium">
          Samantha Swaney
        </div>
        <div className="mt-2 h-px w-16 bg-teal/60" />
        <div className="mt-2 text-[9.5px] uppercase tracking-[0.28em] text-mute">
          Chicagoland Real Estate
        </div>
      </div>
    </div>
  );
}
