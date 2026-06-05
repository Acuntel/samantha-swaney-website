// Tiny, dependency-free Markdown renderer for blog post bodies. Supports the
// subset Samantha needs from the /admin editor: ## / ### / #### headings, - and *
// bullet lists, 1. numbered lists, > blockquotes, --- rules, **bold**, *italic*,
// `code`, and [text](/path) links. Renders to styled React nodes (no
// dangerouslySetInnerHTML), so post text can never inject markup.
import React from "react";
import Link from "next/link";

type Block =
  | { type: "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "hr" };

const isHeading = (t: string) => /^#{1,4}\s+/.test(t);
const isUl = (t: string) => /^[-*]\s+/.test(t);
const isOl = (t: string) => /^\d+\.\s+/.test(t);
const isQuote = (t: string) => /^>\s?/.test(t);
const isHr = (t: string) => /^---+$/.test(t);
const isSpecial = (t: string) =>
  t === "" || isHeading(t) || isUl(t) || isOl(t) || isQuote(t) || isHr(t);

function parseBlocks(src: string): Block[] {
  const lines = (src || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (trimmed === "") {
      i++;
      continue;
    }
    if (isHr(trimmed)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const mh = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (mh) {
      const level = mh[1].length;
      blocks.push({
        type: level <= 2 ? "h2" : level === 3 ? "h3" : "h4",
        text: mh[2].trim(),
      });
      i++;
      continue;
    }

    if (isUl(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && isUl(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (isOl(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && isOl(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (isQuote(trimmed)) {
      const parts: string[] = [];
      while (i < lines.length && isQuote(lines[i].trim())) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: parts.join(" ") });
      continue;
    }

    // Paragraph: gather consecutive plain lines (soft-wrapped into one).
    const para: string[] = [];
    while (i < lines.length && !isSpecial(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

function renderInline(text: string, key: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  INLINE.lastIndex = 0;

  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;

    if (m[1] != null) {
      const label = m[1];
      const href = m[2].trim();
      if (href.startsWith("/")) {
        nodes.push(
          <Link
            key={k}
            href={href}
            className="text-teal-700 underline underline-offset-2 decoration-teal/40 hover:text-navy transition"
          >
            {label}
          </Link>,
        );
      } else if (
        /^https?:\/\//i.test(href) ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:")
      ) {
        const external = /^https?:\/\//i.test(href);
        nodes.push(
          <a
            key={k}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-teal-700 underline underline-offset-2 decoration-teal/40 hover:text-navy transition"
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(label);
      }
    } else if (m[3] != null) {
      nodes.push(
        <strong key={k} className="font-semibold text-navy">
          {m[3]}
        </strong>,
      );
    } else if (m[4] != null) {
      nodes.push(
        <em key={k} className="italic-emph">
          {m[4]}
        </em>,
      );
    } else if (m[5] != null) {
      nodes.push(
        <code
          key={k}
          className="rounded bg-cream-200 px-1.5 py-0.5 text-[13px] text-navy"
        >
          {m[5]}
        </code>,
      );
    }
    last = INLINE.lastIndex;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderBlock(b: Block, i: number): React.ReactNode {
  const key = `b${i}`;
  switch (b.type) {
    case "h2":
      return (
        <h2
          key={key}
          className="font-serif text-[26px] sm:text-[31px] text-navy tracking-tighter2 leading-tight mt-12 mb-4 scroll-mt-24"
        >
          {renderInline(b.text, key)}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={key}
          className="font-serif text-[20px] sm:text-[23px] text-navy mt-9 mb-3 scroll-mt-24"
        >
          {renderInline(b.text, key)}
        </h3>
      );
    case "h4":
      return (
        <h4
          key={key}
          className="text-[12px] font-medium uppercase tracking-[0.18em] text-teal-700 mt-8 mb-2"
        >
          {renderInline(b.text, key)}
        </h4>
      );
    case "ul":
      return (
        <ul
          key={key}
          className="list-disc pl-5 space-y-2.5 mb-6 marker:text-teal-400"
        >
          {b.items.map((it, j) => (
            <li
              key={`${key}-${j}`}
              className="text-[16.5px] text-ink/80 font-light leading-[1.7]"
            >
              {renderInline(it, `${key}-${j}`)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={key}
          className="list-decimal pl-5 space-y-2.5 mb-6 marker:text-teal-400 marker:font-medium"
        >
          {b.items.map((it, j) => (
            <li
              key={`${key}-${j}`}
              className="text-[16.5px] text-ink/80 font-light leading-[1.7] pl-1"
            >
              {renderInline(it, `${key}-${j}`)}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-2 border-teal pl-5 sm:pl-6 my-8 font-serif italic text-[19px] sm:text-[21px] text-navy/90 leading-relaxed"
        >
          {renderInline(b.text, key)}
        </blockquote>
      );
    case "hr":
      return <hr key={key} className="my-10 h-px border-0 bg-line" />;
  }
}

export function Markdown({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const blocks = parseBlocks(source);
  return <div className={className}>{blocks.map(renderBlock)}</div>;
}

// Plain-text version of a Markdown body, for meta descriptions and JSON-LD.
export function stripMarkdown(src: string): string {
  return (src || "")
    .replace(/\r\n/g, "\n")
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^---+$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
