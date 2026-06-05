import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { getPosts } from "@/lib/blog";

export default function BlogPreview() {
  const posts = getPosts({ limit: 3 });
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-cream-100 border-t border-line">
      <div className="container-x py-24 lg:py-32">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-teal" />
              <div className="h-eyebrow">From the blog</div>
            </div>
            <h2 className="h-section mt-4 max-w-2xl">
              Local <span className="italic-emph text-teal-600">insight</span>,
              from someone who lives it
            </h2>
            <p className="lede mt-4 max-w-xl">
              Honest guides on buying, selling, and settling into the western
              Chicago suburbs. No fluff, just what actually matters.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-teal-600 border-b border-teal/40 pb-0.5"
          >
            Read the blog <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/blog" className="btn-ghost">
            Read the blog <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
