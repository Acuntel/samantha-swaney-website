"use client";

import { useState } from "react";
import { Plus, Download, LogOut, Check } from "lucide-react";
import type { Listing, ListingStatus } from "@/lib/samantha-data";
import PropertyRow from "./PropertyRow";
import { downloadText, downloadFile, slugify } from "@/lib/download";

export default function PropertyEditor({
  initialListings,
}: {
  initialListings: Listing[];
}) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  // photo path -> File (only for newly uploaded images)
  const [files, setFiles] = useState<Record<string, File>>({});
  const [done, setDone] = useState(false);

  const patch = (id: string, p: Partial<Listing>) =>
    setListings((ls) => ls.map((l) => (l.id === id ? { ...l, ...p } : l)));

  const addProperty = () => {
    const created = new Date().toISOString();
    const next: Listing = {
      id: `p-${Date.now()}`,
      address: "",
      city: "",
      state: "IL",
      zip: "",
      price: 0,
      beds: null,
      baths: null,
      sqft: null,
      status: "For Sale" as ListingStatus,
      featured: false,
      description: "",
      photos: [],
      listing_url: null,
      listing_type: "Listing",
      mls_number: null,
      created_at: created,
    };
    setListings((ls) => [next, ...ls]);
    setDone(false);
  };

  const removeProperty = (id: string) => {
    if (
      !confirm("Delete this listing? This can't be undone after you publish.")
    )
      return;
    setListings((ls) => ls.filter((l) => l.id !== id));
    setDone(false);
  };

  const move = (id: string, dir: -1 | 1) =>
    setListings((ls) => {
      const i = ls.findIndex((l) => l.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= ls.length) return ls;
      const copy = [...ls];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const registerFile = (path: string, file: File) =>
    setFiles((f) => ({ ...f, [path]: file }));

  // Give new listings clean slug IDs (nice URLs + SEO) and guarantee uniqueness.
  function finalizeIds(rows: Listing[]): Listing[] {
    const seen = new Set<string>();
    return rows.map((l) => {
      let id = l.id;
      if (id.startsWith("p-") || !id) {
        id = slugify(l.address, l.city);
      }
      let unique = id;
      let n = 2;
      while (seen.has(unique)) unique = `${id}-${n++}`;
      seen.add(unique);
      return { ...l, id: unique };
    });
  }

  const exportAll = () => {
    const cleaned = finalizeIds(listings).map((l) => ({
      ...l,
      address: l.address.trim(),
      city: l.city.trim(),
      price: Number(l.price) || 0,
      zip: l.zip ? String(l.zip).trim() : null,
      description: l.description?.trim() || null,
      listing_url: l.listing_url?.trim() || null,
      mls_number: l.mls_number?.trim() || null,
    }));
    downloadText("properties.json", JSON.stringify(cleaned, null, 2));
    // Download any newly uploaded photos so they can be dropped into the repo.
    Object.entries(files).forEach(([path, file]) => {
      downloadFile(path.split("/").pop() as string, file);
    });
    setDone(true);
  };

  const logout = () => {
    sessionStorage.removeItem("ss-admin");
    location.href = "/";
  };

  const newFileCount = Object.keys(files).length;

  return (
    <div className="bg-sand min-h-screen pt-10 pb-24">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="h-eyebrow">Samantha Swaney</div>
            <h1 className="font-serif text-3xl text-navy mt-1">
              Manage listings
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={addProperty} className="btn-ghost !py-2.5 !px-4">
              <Plus size={16} /> Add a house
            </button>
            <button onClick={exportAll} className="btn-navy !py-2.5 !px-4">
              <Download size={16} /> Save &amp; send to Brady
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 text-sm text-mute hover:text-navy"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Simple, no-jargon directions for Samantha */}
        <div className="mt-6 rounded-2xl border border-teal/30 bg-teal-50/60 p-6 text-[14px] text-ink/85 leading-relaxed">
          <strong className="text-navy text-[15px]">
            How to add or change a home
          </strong>
          <ol className="mt-3 space-y-2.5 list-none">
            <li className="flex gap-3">
              <Step n={1} />
              <span>
                Click <span className="font-semibold">“Add a house”</span> and
                type in the details — the address, price, beds, baths, and a
                short description.
              </span>
            </li>
            <li className="flex gap-3">
              <Step n={2} />
              <span>
                Add photos: click the{" "}
                <span className="font-semibold">Upload</span> box and pick
                pictures from your computer. The{" "}
                <span className="font-semibold">first photo</span> is the big
                one people see — choose a nice photo of the house itself (not a
                floor plan).
              </span>
            </li>
            <li className="flex gap-3">
              <Step n={3} />
              <span>
                To remove a home you’ve sold, click the{" "}
                <span className="font-semibold">trash can</span> on its card.
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
                    (and your {newFileCount} photo
                    {newFileCount > 1 ? "s" : ""})
                  </>
                )}{" "}
                will download to your computer.{" "}
                <span className="font-semibold">Email it to Brady</span> and
                he’ll put it on the website — usually live within a few minutes.
              </span>
            </li>
          </ol>
          <p className="mt-4 text-[13px] text-mute">
            That’s it. Nothing you do here changes the live website until Brady
            puts the file up, so feel free to look around. Stuck? Just call or
            text Brady.
          </p>
          {done && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-teal-700 font-medium">
              <Check size={16} /> Done! The file downloaded — now email it to
              Brady.
            </div>
          )}
        </div>

        {/* Listings */}
        <div className="mt-8 space-y-5">
          {listings.length === 0 && (
            <div className="card p-10 text-center text-mute text-sm">
              No homes yet. Click{" "}
              <span className="font-medium">“Add a house”</span> up top to add
              your first one.
            </div>
          )}
          {listings.map((l, i) => (
            <PropertyRow
              key={l.id}
              listing={l}
              index={i}
              total={listings.length}
              onPatch={(p) => patch(l.id, p)}
              onRemove={() => removeProperty(l.id)}
              onMove={(dir) => move(l.id, dir)}
              onFile={registerFile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Small numbered step badge for the directions list.
function Step({ n }: { n: number }) {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-cream-50 text-[12px] font-semibold">
      {n}
    </span>
  );
}
