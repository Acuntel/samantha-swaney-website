// Centralized SEO helpers: canonical URLs + schema.org JSON-LD generators.
// Every listing/neighborhood page renders the relevant blocks so Google and
// AI answer engines (ChatGPT, Claude, Perplexity, Gemini) can read the site.
import {
  SAMANTHA,
  OFFICE_ADDRESS,
  SERVICE_GEO,
  ALL_AREAS_SERVED,
  BIO,
  type Listing,
  type BlogPost,
} from "./samantha-data";
import { stripMarkdown } from "./markdown";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://samantha-swaney-website.vercel.app"
).replace(/\/$/, "");

export function canonical(path = "/"): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** Server component that injects a JSON-LD <script> block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; escape the closing-tag edge case.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const AGENT_ID = `${SITE_URL}/#agent`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: OFFICE_ADDRESS.streetAddress,
  addressLocality: OFFICE_ADDRESS.addressLocality,
  addressRegion: OFFICE_ADDRESS.addressRegion,
  postalCode: OFFICE_ADDRESS.postalCode,
  addressCountry: OFFICE_ADDRESS.addressCountry,
};

/** Site-wide agent identity. Rendered once in the root layout. */
export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": AGENT_ID,
    name: SAMANTHA.name,
    description: BIO.short,
    url: SITE_URL,
    image: SAMANTHA.headshot.startsWith("http")
      ? SAMANTHA.headshot
      : canonical(SAMANTHA.headshot),
    logo: SAMANTHA.headshot.startsWith("http")
      ? SAMANTHA.headshot
      : canonical(SAMANTHA.headshot),
    telephone: SAMANTHA.phone,
    email: SAMANTHA.email,
    priceRange: "$$",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SERVICE_GEO.latitude,
      longitude: SERVICE_GEO.longitude,
    },
    areaServed: ALL_AREAS_SERVED.map((city) => ({
      "@type": "City",
      name: `${city}, IL`,
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: SERVICE_GEO.latitude,
        longitude: SERVICE_GEO.longitude,
      },
      geoRadius: SERVICE_GEO.radiusMeters,
    },
    knowsAbout: [
      "Residential real estate",
      "Home buying",
      "Home selling",
      "Listing pricing and comparative market analysis",
      "Elmhurst housing market",
      "Near-west Cook County suburbs real estate",
      "Investment property and rental management",
    ],
    memberOf: { "@type": "Organization", name: SAMANTHA.brokerage },
    worksFor: { "@type": "Organization", name: SAMANTHA.brokerage },
    hasCredential: `${SAMANTHA.licenseState} ${SAMANTHA.licenseTitle}`,
    sameAs: SAMANTHA.sameAs,
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${SAMANTHA.name} — ${SAMANTHA.title}`,
    publisher: { "@id": AGENT_ID },
  };
}

const STATUS_TO_AVAILABILITY: Record<string, string> = {
  "For Sale": "https://schema.org/InStock",
  "Coming Soon": "https://schema.org/PreOrder",
  Pending: "https://schema.org/LimitedAvailability",
  Sold: "https://schema.org/SoldOut",
  "Off Market": "https://schema.org/Discontinued",
};

/** Per-listing structured data — this is what earns added properties rich results. */
export function realEstateListingSchema(listing: Listing) {
  const url = canonical(`/listings/${listing.id}`);
  const name = `${listing.address}, ${listing.city}, ${listing.state}`;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    url,
    name,
    datePosted: listing.created_at,
    ...(listing.description ? { description: listing.description } : {}),
    ...(listing.photos?.length ? { image: listing.photos } : {}),
    ...(listing.price > 0
      ? {
          offers: {
            "@type": "Offer",
            price: listing.price,
            priceCurrency: "USD",
            availability:
              STATUS_TO_AVAILABILITY[listing.status] ??
              "https://schema.org/InStock",
            seller: { "@id": AGENT_ID },
          },
        }
      : {}),
    about: {
      "@type": "SingleFamilyResidence",
      name,
      address: {
        "@type": "PostalAddress",
        streetAddress: listing.address,
        addressLocality: listing.city,
        addressRegion: listing.state,
        ...(listing.zip ? { postalCode: listing.zip } : {}),
        addressCountry: "US",
      },
      ...(listing.beds != null ? { numberOfBedrooms: listing.beds } : {}),
      ...(listing.baths != null
        ? { numberOfBathroomsTotal: listing.baths }
        : {}),
      ...(listing.sqft != null
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: listing.sqft,
              unitCode: "FTK",
            },
          }
        : {}),
    },
    broker: { "@id": AGENT_ID },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

/** Per-post structured data — earns blog posts rich results + AI-answer citation. */
export function blogPostingSchema(post: BlogPost) {
  const url = canonical(`/blog/${post.id}`);
  const plain = stripMarkdown(post.body);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    ...(post.coverImage ? { image: canonical(post.coverImage) } : {}),
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    ...(plain
      ? { wordCount: plain.split(/\s+/).length, articleBody: plain }
      : {}),
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      "@id": AGENT_ID,
      name: post.author || SAMANTHA.name,
      url: SITE_URL,
    },
    publisher: { "@id": AGENT_ID },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
  };
}

/** The blog index as a schema.org Blog, listing its posts. */
export function blogSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: canonical("/blog"),
    name: `${SAMANTHA.name} Blog — Elmhurst & Chicago Suburbs Real Estate`,
    description:
      "Local market insight, buying and selling guides, and neighborhood deep-dives for Elmhurst and the near-west Cook County suburbs, from broker Samantha Swaney of GC Realty & Development.",
    publisher: { "@id": AGENT_ID },
    author: { "@id": AGENT_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: canonical(`/blog/${p.id}`),
      datePublished: p.date,
      articleSection: p.category,
      ...(p.coverImage ? { image: canonical(p.coverImage) } : {}),
      author: { "@id": AGENT_ID },
    })),
  };
}
