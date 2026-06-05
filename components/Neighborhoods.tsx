import Image from "next/image";
import Link from "next/link";
import { NEIGHBORHOODS } from "@/lib/samantha-data";

export default function Neighborhoods() {
  return (
    <section
      id="neighborhoods"
      className="relative bg-cream-200 border-y border-line/60"
    >
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="relative container-x py-24 lg:py-32">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-teal" />
            <div className="h-eyebrow">Where Samantha Works</div>
          </div>
          <h2 className="h-section mt-4">
            Featured{" "}
            <span className="italic-emph text-teal-600">Neighborhoods</span>
          </h2>
          <p className="lede mt-4">
            Samantha has closed transactions in every corner of the western
            suburbs. Here are the markets she knows block by block.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] block shadow-card hover:shadow-cardHover transition"
            >
              <Image
                src={n.image}
                alt={n.name}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover group-hover:scale-[1.06] transition duration-[1000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute inset-0 border-[6px] border-cream-50/0 group-hover:border-cream-50/20 transition" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="text-cream-50 text-2xl font-serif tracking-tighter2">
                  {n.name}
                </div>
                <div className="mt-1 h-px w-10 bg-teal-400" />
                <p className="mt-3 text-cream-50/85 text-[13.5px] leading-relaxed line-clamp-3 font-light">
                  {n.blurb}
                </p>
                <div className="mt-4 text-[10px] text-teal-400 font-medium uppercase tracking-[0.22em]">
                  View homes →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
