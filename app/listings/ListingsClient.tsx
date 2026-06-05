"use client";

import { useMemo, useState } from "react";
import type { Listing } from "@/lib/samantha-data";
import PropertyCard from "@/components/PropertyCard";

const STATUSES = ["All", "For Sale", "Pending", "Sold", "Coming Soon"] as const;
const BEDS = ["Any", "1+", "2+", "3+", "4+"] as const;
const PRICES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $300K", min: 0, max: 300_000 },
  { label: "$300K – $500K", min: 300_000, max: 500_000 },
  { label: "$500K – $750K", min: 500_000, max: 750_000 },
  { label: "$750K – $1M", min: 750_000, max: 1_000_000 },
  { label: "$1M+", min: 1_000_000, max: Infinity },
];

export default function ListingsClient({
  initialListings,
}: {
  initialListings: Listing[];
}) {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [beds, setBeds] = useState<(typeof BEDS)[number]>("Any");
  const [priceIdx, setPriceIdx] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const minBeds = beds === "Any" ? 0 : Number(beds.replace("+", ""));
    const p = PRICES[priceIdx];
    const q = query.trim().toLowerCase();
    return initialListings.filter((l) => {
      if (status !== "All" && l.status !== status) return false;
      if ((l.beds ?? 0) < minBeds) return false;
      if (l.price < p.min || l.price > p.max) return false;
      if (
        q &&
        ![l.address, l.city, l.state, l.zip ?? "", l.description ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [initialListings, status, beds, priceIdx, query]);

  return (
    <div className="container-x pb-24">
      <div className="card p-4 sm:p-5 sticky top-16 z-10 backdrop-blur bg-cream-50/95 flex flex-col lg:flex-row gap-3 lg:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by address, city, or ZIP"
          className="flex-1 rounded-full border border-line bg-cream-100 px-4 py-2.5 text-sm focus:outline-none focus:border-teal"
        />
        <Select
          value={status}
          onChange={(v) => setStatus(v as (typeof STATUSES)[number])}
          options={STATUSES as unknown as string[]}
          label="Status"
        />
        <Select
          value={beds}
          onChange={(v) => setBeds(v as (typeof BEDS)[number])}
          options={BEDS as unknown as string[]}
          label="Beds"
        />
        <Select
          value={PRICES[priceIdx].label}
          onChange={(v) => setPriceIdx(PRICES.findIndex((p) => p.label === v))}
          options={PRICES.map((p) => p.label)}
          label="Price"
        />
      </div>

      <div className="mt-6 text-sm text-mute">
        Showing{" "}
        <span className="text-navy font-semibold">{filtered.length}</span> of{" "}
        {initialListings.length} listings
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 card p-12 text-center">
          <div className="text-mute">
            No listings match those filters. Try widening your search, or call{" "}
            <a href="tel:+16305328747" className="text-teal font-semibold">
              (630) 532-8747
            </a>{" "}
            for off-market options.
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <PropertyCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-mute text-xs uppercase tracking-wider">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-line bg-cream-50 px-3 py-2 text-sm focus:outline-none focus:border-teal"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
