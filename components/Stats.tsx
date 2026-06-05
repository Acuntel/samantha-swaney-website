import { STATS } from "@/lib/samantha-data";

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative border-y border-line/60 bg-cream-100"
    >
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="relative container-x py-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`text-center md:text-left ${
              i > 0 ? "md:border-l md:border-line md:pl-6" : ""
            }`}
          >
            <div className="font-serif text-[40px] sm:text-[48px] font-normal text-navy tracking-tighter2 leading-none">
              {s.value}
            </div>
            <div className="mt-3 text-[10.5px] uppercase tracking-[0.22em] text-mute">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
