"use client";

import { useState } from "react";
import { Plus, Download, LogOut, Check } from "lucide-react";
import type { BlogPost } from "@/lib/samantha-data";
import BlogRow from "./BlogRow";
import { downloadText, downloadFile, slugify } from "@/lib/download";

// Today as YYYY-MM-DD, for new-post defaults. Client-side only.
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function BlogEditor({
  initialPosts,
  onLogout,
}: {
  initialPosts: BlogPost[];
  onLogout: () => void;
}) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [done, setDone] = useState(false);

  const patch = (id: string, p: Partial<BlogPost>) =>
    setPosts((ls) => ls.map((l) => (l.id === id ? { ...l, ...p } : l)));

  const addPost = () => {
    const next: BlogPost = {
      id: `post-${Date.now()}`,
      title: "",
      excerpt: "",
      category: "Buying",
      tags: [],
      body: "",
      coverImage: null,
      author: "Samantha Swaney",
      date: today(),
      readMinutes: 0,
      published: false,
      metaTitle: null,
      metaDescription: null,
    };
    setPosts((ls) => [next, ...ls]);
    setDone(false);
  };

  const removePost = (id: string) => {
    if (!confirm("Delete this post? This can't be undone after you publish."))
      return;
    setPosts((ls) => ls.filter((l) => l.id !== id));
    setDone(false);
  };

  const move = (id: string, dir: -1 | 1) =>
    setPosts((ls) => {
      const i = ls.findIndex((l) => l.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= ls.length) return ls;
      const copy = [...ls];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const registerFile = (path: string, file: File) =>
    setFiles((f) => ({ ...f, [path]: file }));

  // New posts get a clean slug id from the title (nice URLs + SEO), unique.
  function finalizeIds(rows: BlogPost[]): BlogPost[] {
    const seen = new Set<string>();
    return rows.map((p) => {
      let id = p.id;
      if (!id || id.startsWith("post-")) id = slugify(p.title || "post");
      let unique = id;
      let n = 2;
      while (seen.has(unique)) unique = `${id}-${n++}`;
      seen.add(unique);
      return { ...p, id: unique };
    });
  }

  const exportAll = () => {
    const cleaned = finalizeIds(posts).map((p) => {
      const words = (p.body || "").trim().split(/\s+/).filter(Boolean).length;
      return {
        ...p,
        title: p.title.trim(),
        excerpt: p.excerpt.trim(),
        body: p.body.trim(),
        tags: (p.tags || []).map((t) => t.trim()).filter(Boolean),
        date: (p.date || today()).slice(0, 10),
        readMinutes: p.readMinutes || Math.max(1, Math.round(words / 200)),
        metaTitle: p.metaTitle?.trim() || null,
        metaDescription: p.metaDescription?.trim() || null,
      };
    });
    downloadText("blog.json", JSON.stringify(cleaned, null, 2));
    Object.entries(files).forEach(([path, file]) => {
      downloadFile(path.split("/").pop() as string, file);
    });
    setDone(true);
  };

  const newFileCount = Object.keys(files).length;

  return (
    <div className="bg-sand min-h-screen pt-8 pb-24">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="h-eyebrow">Samantha Swaney</div>
            <h1 className="font-serif text-3xl text-navy mt-1">Manage blog</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={addPost} className="btn-ghost !py-2.5 !px-4">
              <Plus size={16} /> Add a post
            </button>
            <button onClick={exportAll} className="btn-navy !py-2.5 !px-4">
              <Download size={16} /> Save &amp; send to Brady
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-sm text-mute hover:text-navy"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Plain-language directions */}
        <div className="mt-6 rounded-2xl border border-teal/30 bg-teal-50/60 p-6 text-[14px] text-ink/85 leading-relaxed">
          <strong className="text-navy text-[15px]">
            How to write or change a blog post
          </strong>
          <ol className="mt-3 space-y-2.5 list-none">
            <li className="flex gap-3">
              <Step n={1} />
              <span>
                Click <span className="font-semibold">“Add a post”</span> and
                type a title, a one-line summary, and your article. Leave a
                blank line between paragraphs. Use <code>## </code> before a
                line to make it a heading.
              </span>
            </li>
            <li className="flex gap-3">
              <Step n={2} />
              <span>
                Add a <span className="font-semibold">cover image</span> if you
                have one, pick a <span className="font-semibold">category</span>
                , and add a few comma-separated tags.
              </span>
            </li>
            <li className="flex gap-3">
              <Step n={3} />
              <span>
                Use the <span className="font-semibold">eye icon</span> to
                publish a post (green) or keep it hidden as a draft. Trash can
                deletes it.
              </span>
            </li>
            <li className="flex gap-3">
              <Step n={4} />
              <span>
                When it looks right, click{" "}
                <span className="font-semibold">
                  “Save &amp; send to Brady.”
                </span>{" "}
                A file
                {newFileCount > 0 && (
                  <>
                    {" "}
                    (and your {newFileCount} image
                    {newFileCount > 1 ? "s" : ""})
                  </>
                )}{" "}
                downloads to your computer.{" "}
                <span className="font-semibold">Email it to Brady</span> and he
                puts it on the website, usually live within a few minutes.
              </span>
            </li>
          </ol>
          <p className="mt-4 text-[13px] text-mute">
            Nothing here changes the live website until Brady puts the file up,
            so feel free to experiment. Stuck? Just call or text Brady.
          </p>
          {done && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-teal-700 font-medium">
              <Check size={16} /> Done! The file downloaded, now email it to
              Brady.
            </div>
          )}
        </div>

        {/* Posts */}
        <div className="mt-8 space-y-5">
          {posts.length === 0 && (
            <div className="card p-10 text-center text-mute text-sm">
              No posts yet. Click{" "}
              <span className="font-medium">“Add a post”</span> up top to write
              your first one.
            </div>
          )}
          {posts.map((p, i) => (
            <BlogRow
              key={p.id}
              post={p}
              index={i}
              total={posts.length}
              onPatch={(patchObj) => patch(p.id, patchObj)}
              onRemove={() => removePost(p.id)}
              onMove={(dir) => move(p.id, dir)}
              onFile={registerFile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-cream-50 text-[12px] font-semibold">
      {n}
    </span>
  );
}
