import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { getProperties } from "@/lib/properties";
import { ArrowRight } from "lucide-react";

export default function FeaturedListings() {
  // Show listings flagged featured in /admin; fall back to newest if none are.
  const featured = getProperties({ featured: true, limit: 6 });
  const listings = featured.length ? featured : getProperties({ limit: 6 });

  return (
    <section id="listings" className="bg-cream-50">
      <div className="container-x py-24 lg:py-32">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-teal" />
              <div className="h-eyebrow">Active Inventory</div>
            </div>
            <h2 className="h-section mt-4 max-w-2xl">
              Featured{" "}
              <span className="italic-emph text-teal-600">Listings</span>
            </h2>
            <p className="lede mt-4 max-w-xl">
              A curated look at Samantha's current and recent inventory across
              Elmhurst and the near-west Cook County suburbs.
            </p>
          </div>
          <Link
            href="/listings"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-teal-600 border-b border-teal/40 pb-0.5"
          >
            View all listings <ArrowRight size={14} />
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="card p-10 text-center">
            <div className="text-mute text-sm">
              New listings hitting the market soon. Call {`(630) 532-8747`} for
              off-market opportunities.
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <PropertyCard key={l.id} listing={l} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link href="/listings" className="btn-ghost">
            View all listings <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
