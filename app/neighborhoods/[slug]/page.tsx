import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEIGHBORHOODS, NEIGHBORHOOD_CONTENT, SAMANTHA } from "@/lib/samantha-data";
import { getPropertiesByCity } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import { JsonLd, canonical, faqPageSchema, breadcrumbSchema } from "@/lib/seo";
import { Phone, MapPin, Check, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const n = NEIGHBORHOODS.find((x) => x.slug === params.slug);
  if (!n) return { title: "Neighborhood not found" };
  const title = `${n.name}, IL Real Estate — Homes for Sale & Local Expert`;
  const description = `Buying or selling in ${n.name}, IL? Samantha Swaney is a local GC Realty broker who knows ${n.name} house-by-house. See current listings and get local guidance. Call (630) 532-8747.`;
  const url = canonical(`/neighborhoods/${n.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [n.image],
    },
  };
}

export default function NeighborhoodPage({
  params,
}: {
  params: { slug: string };
}) {
  const n = NEIGHBORHOODS.find((x) => x.slug === params.slug);
  if (!n) notFound();
  const content = NEIGHBORHOOD_CONTENT[n.slug];
  const listings = getPropertiesByCity(n.name);

  return (
    <article className="bg-cream-50">
      {content && <JsonLd data={faqPageSchema(content.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Neighborhoods", path: "/#neighborhoods" },
          { name: n.name, path: `/neighborhoods/${n.slug}` },
        ])}
      />

      {/* Hero */}
      <div className="relative h-[44vh] min-h-[340px] w-full overflow-hidden">
        <Image
          src={n.image}
          alt={`${n.name}, Illinois`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-x pb-10">
            <div className="flex items-center gap-2 text-teal-400 text-[11px] uppercase tracking-[0.22em]">
              <MapPin size={13} />
              {content?.county ?? "Western Chicago Suburbs"}
            </div>
            <h1 className="mt-3 font-serif text-cream-50 text-[40px] sm:text-[56px] leading-none tracking-tighter2">
              {n.name} Real Estate
            </h1>
            <p className="mt-3 max-w-2xl text-cream-50/85 text-[15px] font-light leading-relaxed">
              {n.blurb}
            </p>
          </div>
        </div>
      </div>

      {/* Intro + highlights */}
      <div className="container-x py-16 lg:py-20 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-teal" />
            <div className="h-eyebrow">Living in {n.name}</div>
          </div>
          <p className="mt-5 text-[16.5px] text-ink/80 leading-[1.8] font-light">
            {content?.intro ??
              `Samantha Swaney helps buyers and sellers across ${n.name} and Elmhurst and the near-west Chicago suburbs.`}
          </p>

          {content?.highlights?.length ? (
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {content.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-[14.5px] text-ink/80"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-teal-600" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Agent CTA card */}
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
                  Your {n.name} Agent
                </div>
              </div>
            </div>
            <p className="mt-5 text-[14px] text-ink/75 leading-relaxed font-light">
              Thinking about {n.name}? Get straight answers on pricing, timing,
              and what's coming to market.
            </p>
            <div className="mt-5 space-y-2.5">
              <a href={SAMANTHA.phoneHref} className="btn-navy w-full">
                <Phone size={15} /> Call {SAMANTHA.phone}
              </a>
              <Link
                href={`/contact?intent=valuation&area=${encodeURIComponent(
                  n.name,
                )}`}
                className="btn-ghost w-full"
              >
                Free {n.name} home valuation
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Listings in this city */}
      <div className="bg-cream-100 border-y border-line/60">
        <div className="container-x py-16 lg:py-20">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="h-eyebrow">In {n.name}</div>
              <h2 className="h-section mt-3">
                Current{" "}
                <span className="italic-emph text-teal-600">Listings</span>
              </h2>
            </div>
            <Link
              href="/listings"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-teal-600 border-b border-teal/40 pb-0.5"
            >
              View all listings <ArrowRight size={14} />
            </Link>
          </div>

          {listings.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <PropertyCard key={l.id} listing={l} />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <div className="text-mute text-sm">
                No active {n.name} listings online right now. New inventory hits
                the market constantly — call {SAMANTHA.phone} for {n.name} homes
                before they're public.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Neighborhood FAQ */}
      {content?.faqs?.length ? (
        <div className="container-x py-16 lg:py-20">
          <div className="h-eyebrow">{n.name} Questions</div>
          <h2 className="h-section mt-3 mb-8">
            Good to <span className="italic-emph text-teal-600">know</span>
          </h2>
          <div className="divide-y divide-line max-w-3xl">
            {content.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-serif text-[18px] text-navy">{f.q}</h3>
                <p className="mt-2 text-[15.5px] text-ink/80 leading-[1.7] font-light">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
