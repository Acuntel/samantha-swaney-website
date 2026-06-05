import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/samantha-data";
import { BedDouble, Bath, Square, MapPin } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  "For Sale": "bg-teal text-cream-50",
  Pending: "bg-cream-300 text-navy",
  Sold: "bg-navy text-cream-50",
  "Coming Soon": "bg-teal-50 text-teal-700 border border-teal/30",
  "Off Market": "bg-cream-200 text-mute",
};

export default function PropertyCard({ listing }: { listing: Listing }) {
  const price =
    listing.price > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(listing.price)
      : "Contact for price";

  const photo = listing.photos?.[0];

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="card-lift overflow-hidden group block"
    >
      <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={`${listing.address}, ${listing.city}`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover group-hover:scale-[1.04] transition duration-[900ms]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-mute text-sm font-serif italic">
            Photo coming soon
          </div>
        )}
        <div
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${
            STATUS_COLORS[listing.status] || STATUS_COLORS["For Sale"]
          }`}
        >
          {listing.status}
        </div>
        {listing.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-cream-50/95 backdrop-blur-sm px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-teal-700 border border-teal/30">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="font-serif text-[26px] tracking-tighter2 text-navy">
          {price}
        </div>
        <div className="mt-1.5 text-[15px] font-medium text-ink">
          {listing.address}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-mute mt-1">
          <MapPin size={12} />
          {listing.city}, {listing.state} {listing.zip || ""}
        </div>

        <div className="mt-5 pt-5 border-t border-line flex items-center gap-5 text-sm text-navy/80">
          {listing.beds != null && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} /> {listing.beds} bd
            </span>
          )}
          {listing.baths != null && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} /> {listing.baths} ba
            </span>
          )}
          {listing.sqft != null && (
            <span className="flex items-center gap-1.5">
              <Square size={14} /> {listing.sqft.toLocaleString()} sqft
            </span>
          )}
        </div>

        <div className="mt-4 text-[10px] text-mute uppercase tracking-[0.2em]">
          Listed by Samantha Swaney · GC Realty
        </div>
      </div>
    </Link>
  );
}
