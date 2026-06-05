import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/samantha-data";
import { formatPostDate } from "@/lib/date";

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className={`card-lift overflow-hidden group block ${
        featured ? "sm:grid sm:grid-cols-2 sm:items-stretch" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-cream-200 ${
          featured
            ? "aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-[300px]"
            : "aspect-[16/10]"
        }`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes={
              featured
                ? "(min-width:640px) 50vw, 100vw"
                : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            }
            className="object-cover group-hover:scale-[1.04] transition duration-[900ms]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-navy text-cream-50/80">
            <span className="font-serif italic text-lg px-6 text-center">
              {post.title}
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4 chip bg-cream-50/95 backdrop-blur-sm">
          {post.category}
        </div>
      </div>

      <div
        className={`p-6 ${featured ? "sm:p-8 sm:flex sm:flex-col sm:justify-center" : ""}`}
      >
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-mute">
          <span>{formatPostDate(post.date)}</span>
          {post.readMinutes ? (
            <>
              <span className="text-line">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={11} /> {post.readMinutes} min read
              </span>
            </>
          ) : null}
        </div>

        <h3
          className={`mt-3 font-serif text-navy tracking-tighter2 leading-tight group-hover:text-teal-700 transition ${
            featured ? "text-[26px] sm:text-[32px]" : "text-[21px]"
          }`}
        >
          {post.title}
        </h3>

        <p className="mt-3 text-[15px] text-ink/70 leading-[1.7] font-light line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-navy group-hover:text-teal-700 transition">
          Read article
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
          />
        </div>
      </div>
    </Link>
  );
}
