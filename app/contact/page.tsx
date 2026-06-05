import ContactForm from "./ContactForm";
import { SAMANTHA } from "@/lib/samantha-data";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Samantha Swaney",
  description:
    "Reach Samantha directly. He responds to every inquiry personally, usually within the hour.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { intent?: string; address?: string };
}) {
  return (
    <section className="bg-cream-100">
      <div className="container-x py-16 lg:py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="h-eyebrow">Get in touch</div>
          <h1 className="h-display mt-2 text-balance">
            Let's <span className="italic-emph text-teal">talk.</span>
          </h1>
          <p className="lede mt-4 max-w-md">
            Buying, selling, refinancing, or just exploring? Send Samantha a
            message and she'll personally get back to you, usually within the
            hour during business hours.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <a href={SAMANTHA.phoneHref} className="flex items-center gap-3 group">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-50 text-teal shadow-card">
                <Phone size={16} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-mute">
                  Phone
                </span>
                <span className="font-semibold text-navy group-hover:text-teal">
                  {SAMANTHA.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${SAMANTHA.email}`}
              className="flex items-center gap-3 group"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-50 text-teal shadow-card">
                <Mail size={16} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-mute">
                  Email
                </span>
                <span className="font-semibold text-navy group-hover:text-teal">
                  {SAMANTHA.email}
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-50 text-teal shadow-card">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-mute">
                  Office
                </span>
                <span className="text-navy text-sm">{SAMANTHA.office}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <ContactForm
            initialIntent={searchParams?.intent}
            initialAddress={searchParams?.address}
          />
        </div>
      </div>
    </section>
  );
}
