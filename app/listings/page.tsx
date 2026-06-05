import type { Metadata } from "next";
import { getProperties } from "@/lib/properties";
import ListingsClient from "./ListingsClient";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Active Listings",
  description:
    "Browse Samantha Swaney's current listings across Elmhurst and the near-west Chicago suburbs — Elmhurst, Oak Park, La Grange, Berwyn and more.",
  alternates: { canonical: canonical("/listings") },
  openGraph: {
    title: "Active Listings | Samantha Swaney",
    description:
      "Current homes for sale across Elmhurst and the near-west Chicago suburbs, listed by GC Realty broker Samantha Swaney.",
    url: canonical("/listings"),
    type: "website",
  },
};

export default function ListingsPage() {
  const listings = getProperties({});
  return (
    <div className="bg-cream-100">
      <div className="container-x pt-14 pb-8 lg:pt-20">
        <div className="h-eyebrow">Active Inventory</div>
        <h1 className="h-display mt-2">
          All <span className="italic-emph text-teal">Listings</span>
        </h1>
        <p className="lede mt-3 max-w-2xl">
          Filter by status, price, or beds. New listings are added the moment
          they hit the market. Check back often, or call {`(630) 532-8747`} for
          off-market opportunities.
        </p>
      </div>
      <ListingsClient initialListings={listings} />
    </div>
  );
}
