import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById, getAllPropertyIds } from "@/lib/properties";
import { SAMANTHA } from "@/lib/samantha-data";
import {
  JsonLd,
  canonical,
  realEstateListingSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";

export function generateStaticParams() {
  return getAllPropertyIds().map((id) => ({ id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const listing = getPropertyById(params.id);
  if (!listing) return { title: "Listing not found" };
  const priceStr =
    listing.price > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(listing.price)
      : "Contact for price";
  const specs = [
    listing.beds != null ? `${listing.beds} bed` : null,
    listing.baths != null ? `${listing.baths} bath` : null,
    listing.sqft != null ? `${listing.sqft.toLocaleString()} sqft` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const title = `${listing.address}, ${listing.city} ${listing.state}`;
  const description =
    listing.description ??
    `${priceStr}${specs ? ` — ${specs}` : ""} in ${listing.city}, ${listing.state}. Listed by Samantha Swaney, GC Realty broker. Request a tour today.`;
  const url = canonical(`/listings/${listing.id}`);
  return {
    title: `${title} — ${priceStr}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${priceStr}`,
      description,
      url,
      type: "website",
      images: listing.photos?.length ? listing.photos : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${priceStr}`,
      description,
      images: listing.photos?.length ? [listing.photos[0]] : undefined,
    },
  };
}

export default function ListingDetail({ params }: { params: { id: string } }) {
  const listing = getPropertyById(params.id);
  if (!listing) notFound();

  const price =
    listing.price > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(listing.price)
      : "Contact for price";

  const photos = listing.photos?.length ? listing.photos : [];

  return (
    <article className="bg-cream-50">
      <JsonLd data={realEstateListingSchema(listing)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Listings", path: "/listings" },
          {
            name: `${listing.address}, ${listing.city}`,
            path: `/listings/${listing.id}`,
          },
        ])}
      />
      <div className="container-x pt-8">
        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-mute hover:text-navy"
        >
          <ArrowLeft size={12} /> All listings
        </Link>
      </div>

      <div className="container-x mt-6">
        <Gallery photos={photos} address={listing.address} />
      </div>

      <div className="container-x py-12 lg:py-16 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip">{listing.status}</span>
            {listing.listing_type && (
              <span className="text-[10px] text-mute uppercase tracking-[0.22em]">
                {listing.listing_type}
              </span>
            )}
          </div>
          <h1 className="mt-5 font-serif text-[44px] sm:text-[56px] text-navy tracking-tighter2 leading-none">
            {price}
          </h1>
          <div className="mt-3 text-xl text-ink">{listing.address}</div>
          <div className="flex items-center gap-1.5 text-mute mt-1">
            <MapPin size={13} />
            {listing.city}, {listing.state} {listing.zip || ""}
          </div>

          <div className="mt-8 pt-8 border-t border-line flex flex-wrap items-center gap-8 text-navy">
            {listing.beds != null && (
              <SpecInline
                icon={<BedDouble size={18} />}
                value={String(listing.beds)}
                label="Beds"
              />
            )}
            {listing.baths != null && (
              <SpecInline
                icon={<Bath size={18} />}
                value={String(listing.baths)}
                label="Baths"
              />
            )}
            {listing.sqft != null && (
              <SpecInline
                icon={<Square size={18} />}
                value={listing.sqft.toLocaleString()}
                label="Sqft"
              />
            )}
          </div>

          {listing.description && (
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-teal" />
                <div className="h-eyebrow">About this home</div>
              </div>
              <p className="text-[16.5px] text-ink/80 leading-[1.8] font-light whitespace-pre-line">
                {listing.description}
              </p>
            </div>
          )}

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {listing.mls_number && (
              <SpecCard label="MLS #" value={listing.mls_number} />
            )}
            <SpecCard label="City" value={listing.city} />
            <SpecCard label="State" value={listing.state} />
            {listing.zip && <SpecCard label="ZIP" value={listing.zip} />}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card p-7 bg-cream-50">
            <div className="flex items-center gap-3">
              <Image
                src={SAMANTHA.headshot}
                alt={SAMANTHA.name}
                width={56}
                height={56}
                className="rounded-full ring-1 ring-teal/40"
              />
              <div>
                <div className="font-serif text-[17px] text-navy">
                  {SAMANTHA.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-mute mt-0.5">
                  {SAMANTHA.title}
                </div>
              </div>
            </div>
            <div className="my-5 h-px w-full bg-line" />
            <div className="space-y-2.5">
              <a href={SAMANTHA.phoneHref} className="btn-navy w-full">
                <Phone size={15} /> Call {SAMANTHA.phone}
              </a>
              <Link
                href={`/contact?intent=tour&address=${encodeURIComponent(
                  `${listing.address}, ${listing.city}`,
                )}`}
                className="btn-ghost w-full"
              >
                <Mail size={15} /> Request a tour
              </Link>
              {listing.listing_url && (
                <a
                  href={listing.listing_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-[11px] uppercase tracking-[0.22em] text-mute hover:text-navy pt-3"
                >
                  View listing →
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Gallery({ photos, address }: { photos: string[]; address: string }) {
  if (photos.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-2xl bg-cream-200 grid place-items-center text-mute">
        <div className="font-serif italic">Photo coming soon</div>
      </div>
    );
  }

  if (photos.length === 1) {
    return (
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-cream-200 shadow-card">
        <Image
          src={photos[0]}
          alt={address}
          fill
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl overflow-hidden">
        {photos.slice(0, 2).map((p, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] bg-cream-200 overflow-hidden"
          >
            <Image
              src={p}
              alt={`${address} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    );
  }

  // 3+ photos: hero + 2-column side stack
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
      <div className="relative aspect-[4/3] sm:aspect-[4/5] sm:col-span-2 bg-cream-200 overflow-hidden">
        <Image
          src={photos[0]}
          alt={address}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 grid-rows-2 gap-2">
        {photos.slice(1, 5).map((p, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] bg-cream-200 overflow-hidden"
          >
            <Image
              src={p}
              alt={`${address} ${i + 2}`}
              fill
              sizes="(min-width: 1024px) 400px, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecInline({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-teal-700">{icon}</span>
      <div>
        <div className="font-serif text-[22px] text-navy leading-none">
          {value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-mute mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream-100 border border-line/60 p-4">
      <div className="text-[10px] text-mute uppercase tracking-[0.22em]">
        {label}
      </div>
      <div className="font-serif text-[15px] text-navy mt-1.5">{value}</div>
    </div>
  );
}
