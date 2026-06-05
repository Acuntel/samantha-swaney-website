"use client";

import { useState } from "react";
import { FAQS } from "@/lib/samantha-data";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-blush-50">
      <div className="container-x py-24 lg:py-32 grid lg:grid-cols-[1fr_1.5fr] gap-14 lg:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-teal" />
            <div className="h-eyebrow">Common Questions</div>
          </div>
          <h2 className="h-section mt-4">
            Answers, <span className="italic-emph text-teal-600">upfront.</span>
          </h2>
          <p className="lede mt-4">
            The questions Samantha hears the most, answered straight. Don't see
            yours? Call or text {`(630) 532-8747`}.
          </p>
        </div>

        <div className="divide-y divide-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left py-5 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[18px] text-navy pr-6 group-hover:text-teal-700 transition">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full border shrink-0 transition ${
                      isOpen
                        ? "bg-teal border-teal text-cream-50"
                        : "border-line text-navy group-hover:border-teal"
                    }`}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-12 text-[15.5px] text-ink/80 leading-[1.7] font-light">
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
