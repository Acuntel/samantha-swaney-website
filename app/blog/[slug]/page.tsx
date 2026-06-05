import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Phone, Mail, Calendar } from "lucide-react";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/blog";
import { SAMANTHA } from "@/lib/samantha-data";
import { Markdown } from "@/lib/markdown";
import { formatPostDate } from "@/lib/date";
import BlogCard from "@/components/BlogCard";
import {
  JsonLd,
  canonical,
  blogPostingSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article not found" };
  const url = canonical(`/blog/${post.id}`);
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || SAMANTHA.name],
      section: post.category,
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) notFound();
  const related = getRelatedPosts(post.id, 3);

  return (
    <article className="bg-cream-50">
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.id}` },
        ])}
      />

      {/* Header */}
      <div className="container-x pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-mute hover:text-navy"
        >
          <ArrowLeft size={12} /> All articles
        </Link>
      </div>

      <header className="container-x pt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-mute">
          <span className="chip">{post.category}</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} /> {formatPostDate(post.date)}
          </span>
          {post.readMinutes ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> {post.readMinutes} min read
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 font-serif text-[34px] sm:text-[46px] text-navy tracking-tighter2 leading-[1.08]">
          {post.title}
        </h1>
        <p className="lede mt-5">{post.excerpt}</p>

        <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
          <Image
            src={SAMANTHA.headshot}
            alt={SAMANTHA.name}
            width={48}
            height={48}
            className="rounded-full ring-1 ring-teal/40"
          />
          <div>
            <div className="font-serif text-[16px] text-navy">{SAMANTHA.name}</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-mute mt-0.5">
              {SAMANTHA.title}
            </div>
          </div>
        </div>
      </header>

      {/* Cover */}
      {post.coverImage && (
        <div className="container-x mt-10">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-cream-200 shadow-card">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width:1024px) 1000px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body + aside */}
      <div className="container-x py-12 lg:py-16 grid gap-12 lg:grid-cols-[1.7fr_1fr]">
        <div className="max-w-2xl">
          <Markdown source={post.body} />

          {post.tags?.length ? (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((t) => (
                <span key={t} className="chip-outline">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card p-7 bg-cream-50">
            <div className="h-eyebrow">Thinking about a move?</div>
            <p className="mt-3 text-[14.5px] text-ink/75 leading-relaxed font-light">
              Whether you are buying, selling, or just weighing your options,
              Samantha is happy to talk it through. No pressure, just straight
              answers.
            </p>
            <div className="my-5 h-px w-full bg-line" />
            <div className="space-y-2.5">
              <a href={SAMANTHA.phoneHref} className="btn-navy w-full">
                <Phone size={15} /> Call {SAMANTHA.phone}
              </a>
              <Link
                href="/contact?intent=valuation"
                className="btn-ghost w-full"
              >
                <Mail size={15} /> Free home valuation
              </Link>
              <Link
                href="/listings"
                className="block text-center text-[11px] uppercase tracking-[0.22em] text-mute hover:text-navy pt-3"
              >
                Browse current listings →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream-100 border-t border-line">
          <div className="container-x py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-teal" />
              <div className="h-eyebrow">Keep reading</div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
