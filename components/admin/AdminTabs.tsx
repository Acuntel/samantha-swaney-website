"use client";

import { useEffect, useState } from "react";
import { Home, Newspaper } from "lucide-react";
import type { Listing, BlogPost } from "@/lib/samantha-data";
import PropertyEditor from "./PropertyEditor";
import BlogEditor from "./BlogEditor";

type Tab = "listings" | "blog";

export default function AdminTabs() {
  const [tab, setTab] = useState<Tab>("listings");
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    fetch("/data/properties.json")
      .then((r) => r.json())
      .then((rows: Listing[]) => setListings(rows))
      .catch(() => setListings([]));
    fetch("/data/blog.json")
      .then((r) => r.json())
      .then((rows: BlogPost[]) => setPosts(rows))
      .catch(() => setPosts([]));
  }, []);

  const logout = () => {
    sessionStorage.removeItem("ss-admin");
    location.href = "/";
  };

  return (
    <div className="bg-sand">
      <div className="container-x pt-8">
        <div className="inline-flex rounded-full border border-line bg-white p-1 shadow-soft">
          <TabButton
            active={tab === "listings"}
            onClick={() => setTab("listings")}
            icon={<Home size={15} />}
            label="Listings"
          />
          <TabButton
            active={tab === "blog"}
            onClick={() => setTab("blog")}
            icon={<Newspaper size={15} />}
            label="Blog"
          />
        </div>
      </div>

      {tab === "listings" ? (
        listings === null ? (
          <Loading what="listings" />
        ) : (
          <PropertyEditor initialListings={listings} />
        )
      ) : posts === null ? (
        <Loading what="posts" />
      ) : (
        <BlogEditor initialPosts={posts} onLogout={logout} />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium uppercase tracking-[0.12em] transition ${
        active ? "bg-navy text-cream-50" : "text-navy/60 hover:text-navy"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Loading({ what }: { what: string }) {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <p className="text-sm text-mute">Loading your {what}…</p>
    </div>
  );
}
