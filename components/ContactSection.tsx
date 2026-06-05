import Link from "next/link";
import { SAMANTHA } from "@/lib/samantha-data";
import { Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="band-crimson relative overflow-hidden text-cream-50">
      <div className="grain absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative container-x py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-teal-300" />
              <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-teal-200">
                Ready when you are
              </div>
            </div>
            <h2 className="mt-5 font-serif text-[34px] sm:text-[42px] lg:text-[52px] font-normal tracking-tighter2 leading-[1.05] text-balance text-cream-50">
              Buying, selling, or curious what your home is worth?{" "}
              <span className="italic-emph text-blush-200">
                Let&apos;s talk.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-cream-50/80 leading-relaxed font-light text-[16.5px]">
              No pressure, no spam, no hard sell. Samantha personally responds
              to every inquiry, usually the same day.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={SAMANTHA.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 px-6 py-3 text-sm font-semibold text-navy shadow-card transition hover:bg-blush-100 active:scale-[0.98]"
              >
                <Phone size={15} /> Call {SAMANTHA.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/35 px-6 py-3 text-sm font-medium text-cream-50 transition hover:bg-cream-50/10"
              >
                <Mail size={15} /> Send a message <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <ContactRow
              icon={<MessageSquare size={16} />}
              title="Chat anytime"
              body="Multilingual AI assistant, bottom-right of every page"
            />
            <ContactRow
              icon={<Phone size={16} />}
              title="Call or text"
              body={SAMANTHA.phone}
            />
            <ContactRow
              icon={<Mail size={16} />}
              title="Email"
              body={SAMANTHA.email}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-cream-50/8 border border-cream-50/15 backdrop-blur-sm transition hover:bg-cream-50/12">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 text-teal-200 border border-cream-50/15">
        {icon}
      </div>
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-cream-50/55">
          {title}
        </div>
        <div className="text-[15px] font-medium text-cream-50 mt-0.5">
          {body}
        </div>
      </div>
    </div>
  );
}
