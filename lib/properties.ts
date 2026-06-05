// Property data layer — no database. Listings live in public/data/properties.json,
// committed to the repo and edited from /admin (Ed Shpritz model: edit in the
// browser, "Export to publish", drop the new file in, push, Vercel rebuilds).
import fs from "node:fs";
import path from "node:path";
import type { Listing } from "./samantha-data";

const FILE = path.join(process.cwd(), "public", "data", "properties.json");

function readAll(): Listing[] {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    const rows = JSON.parse(raw) as Listing[];
    if (!Array.isArray(rows)) return [];
    return rows;
  } catch (e) {
    console.error("Could not read properties.json:", e);
    return [];
  }
}

// Featured first, then newest. Mirrors the old Supabase ordering.
function sortListings(rows: Listing[]): Listing[] {
  return [...rows].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (b.created_at || "").localeCompare(a.created_at || "");
  });
}

export function getProperties(opts?: {
  featured?: boolean;
  limit?: number;
}): Listing[] {
  let rows = sortListings(readAll());
  if (opts?.featured) rows = rows.filter((r) => r.featured);
  if (opts?.limit != null) rows = rows.slice(0, opts.limit);
  return rows;
}

export function getPropertyById(id: string): Listing | null {
  return readAll().find((l) => l.id === id) ?? null;
}

// Loose city match so "Elmhurst" matches a listing in "Elmhurst, IL"
export function getPropertiesByCity(city: string): Listing[] {
  const target = city.trim().toLowerCase();
  return sortListings(readAll()).filter(
    (l) => l.city.trim().toLowerCase() === target,
  );
}

export function getAllPropertyIds(): string[] {
  return readAll().map((l) => l.id);
}
