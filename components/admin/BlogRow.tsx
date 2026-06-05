"use client";

import { useState } from "react";
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  ImagePlus,
  X,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Settings2,
} from "lucide-react";
import type { BlogPost } from "@/lib/samantha-data";
import { BLOG_CATEGORIES } from "@/lib/samantha-data";
import { sanitizeFilename } from "@/lib/download";

const field =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-teal";
const label = "block text-[10px] uppercase tracking-[0.18em] text-mute mb-1.5";

export default function BlogRow({
  post,
  index,
  total,
  onPatch,
  onRemove,
  onMove,
  onFile,
}: {
  post: BlogPost;
  index: number;
  total: number;
  onPatch: (p: Partial<BlogPost>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onFile: (path: string, file: File) => void;
}) {
  const [urlInput, setUrlInput] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showSeo, setShowSeo] = useState(false);

  const setCoverFile = (file: File) => {
    const path = `/images/blog/${post.id}-${Date.now()}-${sanitizeFilename(
      file.name,
    )}`;
    onFile(path, file);
    setPreview(URL.createObjectURL(file));
    onPatch({ coverImage: path });
  };

  const setCoverUrl = () => {
    const u = urlInput.trim();
    if (!u) return;
    onPatch({ coverImage: u });
    setPreview(null);
    setUrlInput("");
  };

  const clearCover = () => {
    onPatch({ coverImage: null });
    setPreview(null);
  };

  const wordCount = (post.body || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const estMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="card p-5 sm:p-6">
      {/* Card header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="chip shrink-0">
            {post.category || "Uncategorized"}
          </span>
          <span className="font-serif text-[17px] text-navy truncate">
            {post.title || "Untitled post"}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onPatch({ published: !post.published })}
            title={
              post.published ? "Published (visible on site)" : "Draft (hidden)"
            }
            className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
              post.published
                ? "bg-teal text-white border-teal"
                : "border-line text-mute hover:border-teal"
            }`}
          >
            {post.published ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>
          <button
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-mute hover:border-teal disabled:opacity-30"
          >
            <ChevronUp size={15} />
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-mute hover:border-teal disabled:opacity-30"
          >
            <ChevronDown size={15} />
          </button>
          <button
            onClick={onRemove}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-red-500 hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Title + meta */}
      <div className="grid sm:grid-cols-[2fr_1fr_auto] gap-3">
        <div>
          <label className={label}>Title</label>
          <input
            className={field}
            value={post.title}
            placeholder="Moving to Elmhurst: A Local Guide"
            onChange={(e) => onPatch({ title: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <select
            className={field}
            value={post.category}
            onChange={(e) => onPatch({ category: e.target.value })}
          >
            {!BLOG_CATEGORIES.includes(post.category as never) && (
              <option value={post.category}>
                {post.category || "Choose..."}
              </option>
            )}
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Publish date</label>
          <input
            type="date"
            className={`${field} w-44`}
            value={(post.date || "").slice(0, 10)}
            onChange={(e) => onPatch({ date: e.target.value })}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="mt-4">
        <label className={label}>
          Short summary (shows on cards &amp; in Google results)
        </label>
        <textarea
          className={`${field} min-h-[60px] resize-y`}
          value={post.excerpt}
          placeholder="One or two sentences that make someone want to click."
          onChange={(e) => onPatch({ excerpt: e.target.value })}
        />
      </div>

      {/* Body */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label className={label}>Article</label>
          <span className="text-[11px] text-mute">
            {wordCount} words · ~{estMinutes} min read
          </span>
        </div>
        <textarea
          className={`${field} min-h-[280px] resize-y font-mono text-[13px] leading-relaxed`}
          value={post.body}
          placeholder={
            "Write your article here.\n\nLeave a blank line between paragraphs.\n\n## Use two hashes for a section heading\n### Three hashes for a smaller heading\n\n- Start a line with a dash for a bullet\n1. Or a number for a numbered list\n\n**Wrap text in two stars to make it bold.**\n\n[Link text](/listings) links to a page on the site."
          }
          onChange={(e) => onPatch({ body: e.target.value })}
        />
        <p className="mt-2 text-[12px] text-mute leading-relaxed">
          Formatting: blank line = new paragraph · <code>## Heading</code> ·{" "}
          <code>- bullet</code> · <code>1. numbered</code> ·{" "}
          <code>**bold**</code> · <code>[text](/listings)</code> for links.
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4">
        <label className={label}>Tags (comma separated, optional)</label>
        <input
          className={field}
          value={(post.tags || []).join(", ")}
          placeholder="Elmhurst, First-time buyers, Schools"
          onChange={(e) =>
            onPatch({
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      {/* Cover image */}
      <div className="mt-5">
        <label className={label}>Cover image (optional)</label>
        <div className="flex flex-wrap items-start gap-3">
          {post.coverImage ? (
            <div className="relative h-28 w-44 rounded-lg overflow-hidden border border-line bg-cream-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview ?? post.coverImage}
                alt="Cover"
                className="h-full w-full object-cover"
              />
              <button
                onClick={clearCover}
                className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-navy/70 text-cream-50 opacity-0 group-hover:opacity-100 transition"
                title="Remove cover"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="h-28 w-44 rounded-lg border border-dashed border-line grid place-items-center text-mute hover:border-teal hover:text-teal cursor-pointer transition">
              <div className="flex flex-col items-center gap-1 text-[11px]">
                <ImagePlus size={18} />
                Upload cover
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setCoverFile(f);
                  e.target.value = "";
                }}
              />
            </label>
          )}

          <div className="flex-1 min-w-[220px]">
            <div className="relative">
              <LinkIcon
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-mute"
              />
              <input
                className={`${field} pl-8`}
                value={urlInput}
                placeholder="…or paste an image URL"
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setCoverUrl();
                  }
                }}
              />
            </div>
            <button
              onClick={setCoverUrl}
              className="btn-ghost !py-2 !px-4 mt-2 text-xs"
            >
              Use this URL
            </button>
          </div>
        </div>
      </div>

      {/* Advanced SEO (optional) */}
      <div className="mt-5">
        <button
          onClick={() => setShowSeo((s) => !s)}
          className="inline-flex items-center gap-2 text-[12px] font-medium text-navy/70 hover:text-navy"
        >
          <Settings2 size={14} />
          {showSeo ? "Hide" : "Show"} advanced SEO (optional)
        </button>
        {showSeo && (
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div>
              <label className={label}>Custom Google title (≤ 60 chars)</label>
              <input
                className={field}
                value={post.metaTitle ?? ""}
                placeholder="Leave blank to use the post title"
                onChange={(e) => onPatch({ metaTitle: e.target.value })}
              />
            </div>
            <div>
              <label className={label}>Custom meta description (≤ 160)</label>
              <input
                className={field}
                value={post.metaDescription ?? ""}
                placeholder="Leave blank to use the summary above"
                onChange={(e) => onPatch({ metaDescription: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
