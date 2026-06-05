import type { Metadata } from "next";
import { getPosts, getCategories } from "@/lib/blog";
import { canonical, JsonLd, blogSchema, breadcrumbSchema } from "@/lib/seo";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog — Elmhurst & Cook County Real Estate Insights",
  description:
    "Local market insight, buying and selling guides, and neighborhood deep-dives for Elmhurst and the near-west Cook County suburbs, from GC Realty broker Samantha Swaney.",
  alternates: { canonical: canonical("/blog") },
  openGraph: {
    title: "Samantha Swaney Blog — Elmhurst & Cook County Real Estate",
    description:
      "Honest, local guidance on buying, selling, and living in Elmhurst and the near-west Cook County suburbs. Settle In With Swaney.",
    url: canonical("/blog"),
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getPosts();
  const categories = getCategories();

  return (
    <div className="bg-cream-100 min-h-[70vh]">
      <JsonLd data={blogSchema(posts)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <div className="container-x pt-14 pb-8 lg:pt-20">
        <div className="h-eyebrow">Settle In With Swaney</div>
        <h1 className="h-display mt-2">
          The <span className="italic-emph text-teal">Blog</span>
        </h1>
        <p className="lede mt-3 max-w-2xl">
          Straight, local guidance on buying, selling, and living in Elmhurst
          and the near-west Cook County suburbs. Real numbers, real
          neighborhoods, written by Samantha herself.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="container-x pb-24">
          <div className="card p-12 text-center">
            <div className="font-serif text-2xl text-navy">
              New articles are on the way.
            </div>
            <p className="text-mute mt-3 max-w-md mx-auto">
              Samantha is writing her first posts right now. In the meantime,
              browse{" "}
              <a href="/listings" className="text-teal-700 font-medium">
                current listings
              </a>{" "}
              or call{" "}
              <a href="tel:+16305328747" className="text-teal-700 font-medium">
                (630) 532-8747
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <BlogIndexClient posts={posts} categories={categories} />
      )}
    </div>
  );
}
