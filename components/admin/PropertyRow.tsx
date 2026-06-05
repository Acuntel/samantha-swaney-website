"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Star,
  ImagePlus,
  X,
  Link as LinkIcon,
} from "lucide-react";
import type { Listing, ListingStatus } from "@/lib/samantha-data";
import { sanitizeFilename } from "@/lib/download";

const STATUSES: ListingStatus[] = [
  "For Sale",
  "Pending",
  "Sold",
  "Coming Soon",
  "Off Market",
];

const field =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-teal";
const label = "block text-[10px] uppercase tracking-[0.18em] text-mute mb-1.5";

export default function PropertyRow({
  listing,
  index,
  total,
  onPatch,
  onRemove,
  onMove,
  onFile,
}: {
  listing: Listing;
  index: number;
  total: number;
  onPatch: (p: Partial<Listing>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onFile: (path: string, file: File) => void;
}) {
  const [urlInput, setUrlInput] = useState("");
  // local object-URL previews for freshly uploaded files
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const num = (v: string): number | null => (v === "" ? null : Number(v));

  const addPhotoFile = (file: File) => {
    const path = `/images/listings/${listing.id}-${Date.now()}-${sanitizeFilename(
      file.name,
    )}`;
    onFile(path, file);
    setPreviews((p) => ({ ...p, [path]: URL.createObjectURL(file) }));
    onPatch({ photos: [...listing.photos, path] });
  };

  const addPhotoUrl = () => {
    const u = urlInput.trim();
    if (!u) return;
    onPatch({ photos: [...listing.photos, u] });
    setUrlInput("");
  };

  const removePhoto = (i: number) =>
    onPatch({ photos: listing.photos.filter((_, idx) => idx !== i) });

  const movePhoto = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= listing.photos.length) return;
    const copy = [...listing.photos];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onPatch({ photos: copy });
  };

  const title =
    listing.address || listing.city
      ? `${listing.address || "New listing"}${listing.city ? `, ${listing.city}` : ""}`
      : "New listing";

  return (
    <div className="card p-5 sm:p-6">
      {/* Card header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="chip shrink-0">{listing.status}</span>
          <span className="font-serif text-[17px] text-navy truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onPatch({ featured: !listing.featured })}
            title={
              listing.featured ? "Featured (shows on home)" : "Mark featured"
            }
            className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
              listing.featured
                ? "bg-teal text-white border-teal"
                : "border-line text-mute hover:border-teal"
            }`}
          >
            <Star size={15} fill={listing.featured ? "currentColor" : "none"} />
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

      {/* Address row */}
      <div className="grid sm:grid-cols-[2fr_1fr_auto_auto] gap-3">
        <div>
          <label className={label}>Address</label>
          <input
            className={field}
            value={listing.address}
            placeholder="123 Main St"
            onChange={(e) => onPatch({ address: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>City</label>
          <input
            className={field}
            value={listing.city}
            placeholder="Elmhurst"
            onChange={(e) => onPatch({ city: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>State</label>
          <input
            className={`${field} w-20`}
            value={listing.state}
            onChange={(e) => onPatch({ state: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>ZIP</label>
          <input
            className={`${field} w-28`}
            value={listing.zip ?? ""}
            onChange={(e) => onPatch({ zip: e.target.value })}
          />
        </div>
      </div>

      {/* Specs row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
        <div>
          <label className={label}>Price ($)</label>
          <input
            className={field}
            type="number"
            value={listing.price || ""}
            placeholder="450000"
            onChange={(e) => onPatch({ price: Number(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className={label}>Beds</label>
          <input
            className={field}
            type="number"
            value={listing.beds ?? ""}
            onChange={(e) => onPatch({ beds: num(e.target.value) })}
          />
        </div>
        <div>
          <label className={label}>Baths</label>
          <input
            className={field}
            type="number"
            step="0.5"
            value={listing.baths ?? ""}
            onChange={(e) => onPatch({ baths: num(e.target.value) })}
          />
        </div>
        <div>
          <label className={label}>Sqft</label>
          <input
            className={field}
            type="number"
            value={listing.sqft ?? ""}
            onChange={(e) => onPatch({ sqft: num(e.target.value) })}
          />
        </div>
        <div>
          <label className={label}>Status</label>
          <select
            className={field}
            value={listing.status}
            onChange={(e) =>
              onPatch({ status: e.target.value as ListingStatus })
            }
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className={label}>Description</label>
        <textarea
          className={`${field} min-h-[90px] resize-y`}
          value={listing.description ?? ""}
          placeholder="Beautifully updated home walking distance to…"
          onChange={(e) => onPatch({ description: e.target.value })}
        />
      </div>

      {/* Optional links */}
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div>
          <label className={label}>MLS # (optional)</label>
          <input
            className={field}
            value={listing.mls_number ?? ""}
            onChange={(e) => onPatch({ mls_number: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Listing URL (optional)</label>
          <input
            className={field}
            value={listing.listing_url ?? ""}
            placeholder="https://www.gcrealtysells.com/…"
            onChange={(e) => onPatch({ listing_url: e.target.value })}
          />
        </div>
      </div>

      {/* Photos */}
      <div className="mt-5">
        <label className={label}>Photos (first is the cover)</label>
        <div className="flex flex-wrap gap-3">
          {listing.photos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-24 w-32 rounded-lg overflow-hidden border border-line bg-cream-200 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previews[src] ?? src}
                alt={`Photo ${i + 1}`}
                className="h-full w-full object-cover"
              />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[9px] uppercase tracking-wider bg-navy/80 text-cream-50 px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-navy/70 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => movePhoto(i, -1)}
                  className="text-cream-50 px-1.5 py-0.5 text-xs disabled:opacity-30"
                  disabled={i === 0}
                >
                  ←
                </button>
                <button
                  onClick={() => removePhoto(i)}
                  className="text-cream-50 px-1.5 py-0.5"
                >
                  <X size={12} />
                </button>
                <button
                  onClick={() => movePhoto(i, 1)}
                  className="text-cream-50 px-1.5 py-0.5 text-xs disabled:opacity-30"
                  disabled={i === listing.photos.length - 1}
                >
                  →
                </button>
              </div>
            </div>
          ))}

          <label className="h-24 w-32 rounded-lg border border-dashed border-line grid place-items-center text-mute hover:border-teal hover:text-teal cursor-pointer transition">
            <div className="flex flex-col items-center gap-1 text-[11px]">
              <ImagePlus size={18} />
              Upload
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                Array.from(e.target.files ?? []).forEach(addPhotoFile);
                e.target.value = "";
              }}
            />
          </label>
        </div>

        {/* Add by URL */}
        <div className="mt-3 flex gap-2 max-w-xl">
          <div className="relative flex-1">
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
                  addPhotoUrl();
                }
              }}
            />
          </div>
          <button onClick={addPhotoUrl} className="btn-ghost !py-2 !px-4">
            Add URL
          </button>
        </div>
      </div>
    </div>
  );
}
