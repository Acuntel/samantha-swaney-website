import type { MetadataRoute } from "next";
import { canonical } from "@/lib/seo";
import { getProperties } from "@/lib/properties";
import { getPosts } from "@/lib/blog";
import { NEIGHBORHOODS } from "@/lib/samantha-data";

// Dynamic sitemap — every listing added in /admin shows up here automatically
// on the next build, so Google can discover and index it. This is the piece
// that makes added properties actually rank.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: canonical("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: canonical("/listings"), changeFrequency: "daily", priority: 0.9 },
    { url: canonical("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: canonical("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: canonical("/contact"), changeFrequency: "monthly", priority: 0.8 },
  ];

  const neighborhoodPages: MetadataRoute.Sitemap = NEIGHBORHOODS.map((n) => ({
    url: canonical(`/neighborhoods/${n.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const listingPages: MetadataRoute.Sitemap = getProperties({}).map((l) => ({
    url: canonical(`/listings/${l.id}`),
    lastModified: l.created_at ? new Date(l.created_at) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getPosts().map((p) => ({
    url: canonical(`/blog/${p.id}`),
    lastModified: p.date
      ? new Date(`${p.date.slice(0, 10)}T12:00:00Z`)
      : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...neighborhoodPages, ...listingPages, ...blogPages];
}
