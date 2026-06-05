// Blog data layer — no database. Posts live in public/data/blog.json,
// committed to the repo and edited from /admin (the Blog tab). Same model as
// listings: edit in the browser, "Save & send to Brady", drop the file in,
// push, Vercel rebuilds. See lib/properties.ts for the sibling listings layer.
import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "./samantha-data";

const FILE = path.join(process.cwd(), "public", "data", "blog.json");

function readAll(): BlogPost[] {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    const rows = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(rows)) return [];
    return rows;
  } catch (e) {
    // Missing file just means "no posts yet" — fail soft so the build is fine.
    if ((e as NodeJS.ErrnoException)?.code !== "ENOENT") {
      console.error("Could not read blog.json:", e);
    }
    return [];
  }
}

// Newest first.
function sortPosts(rows: BlogPost[]): BlogPost[] {
  return [...rows].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getPosts(opts?: {
  includeUnpublished?: boolean;
  limit?: number;
  category?: string;
}): BlogPost[] {
  let rows = sortPosts(readAll());
  if (!opts?.includeUnpublished) rows = rows.filter((p) => p.published);
  if (opts?.category) rows = rows.filter((p) => p.category === opts.category);
  if (opts?.limit != null) rows = rows.slice(0, opts.limit);
  return rows;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return readAll().find((p) => p.id === slug) ?? null;
}

export function getAllPostSlugs(): string[] {
  return readAll()
    .filter((p) => p.published)
    .map((p) => p.id);
}

export function getCategories(): string[] {
  const set = new Set(
    getPosts()
      .map((p) => p.category)
      .filter(Boolean),
  );
  return Array.from(set);
}

// Other published posts, newest first, excluding the given slug.
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  const others = getPosts().filter((p) => p.id !== slug);
  if (!current) return others.slice(0, limit);
  // Prefer same-category posts, then fill with the newest of the rest.
  const sameCat = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
