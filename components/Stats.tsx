import { SAMANTHA, STATS } from "@/lib/samantha-data";

export default function Stats() {
  return (
    <section id="stats" className="band-oxblood relative overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none opacity-60" />
      <div className="relative container-x py-14 lg:py-16">
        <div className="flex items-center gap-3 mb-9">
          <div className="h-px w-10 bg-teal-400" />
          <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-teal-300">
            {SAMANTHA.brokerage}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-9 gap-x-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`min-w-0 ${
                i > 0 ? "lg:border-l lg:border-cream-50/15 lg:pl-6" : ""
              }`}
            >
              <div className="font-serif text-[23px] sm:text-[27px] lg:text-[30px] font-normal text-cream-50 tracking-tighter2 leading-[1.12] break-words">
                {s.value}
              </div>
              <div className="mt-2.5 text-[10.5px] uppercase tracking-[0.2em] text-cream-50/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
