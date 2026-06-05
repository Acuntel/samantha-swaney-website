"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/samantha-data";
import BlogCard from "@/components/BlogCard";

export default function BlogIndexClient({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...categories];

  const filtered = useMemo(
    () =>
      active === "All" ? posts : posts.filter((p) => p.category === active),
    [posts, active],
  );

  const showFeatured = active === "All" && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div className="container-x pb-24">
      {tabs.length > 1 && (
        <div className="flex flex-wrap gap-2 border-b border-line pb-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition ${
                active === t
                  ? "bg-navy text-cream-50"
                  : "border border-line text-navy/70 hover:border-teal hover:text-teal-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {featured && (
        <div className="mt-8">
          <BlogCard post={featured} featured />
        </div>
      )}

      {rest.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        !featured && (
          <div className="mt-10 card p-12 text-center text-mute">
            No posts in this category yet.
          </div>
        )
      )}
    </div>
  );
}
