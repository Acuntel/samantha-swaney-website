"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const INTENTS = [
  { value: "buy", label: "Buying a home" },
  { value: "sell", label: "Selling a home" },
  { value: "valuation", label: "Home valuation" },
  { value: "tour", label: "Request a tour" },
  { value: "other", label: "Other / general question" },
];

export default function ContactForm({
  initialIntent,
  initialAddress,
}: {
  initialIntent?: string;
  initialAddress?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to send. Try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="mx-auto text-teal" size={48} />
        <h3 className="mt-4 text-xl font-semibold text-navy">Message sent</h3>
        <p className="mt-2 text-mute">
          Samantha will personally get back to you shortly. For urgent matters,
          call (630) 532-8747.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label="Your name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="phone" label="Phone (optional)" />
        <div>
          <label className="block text-xs uppercase tracking-wider text-mute mb-1.5">
            I'm interested in
          </label>
          <select
            name="intent"
            defaultValue={initialIntent || "buy"}
            className="w-full rounded-xl border border-line bg-cream-50 px-4 py-3 text-sm focus:outline-none focus:border-teal"
          >
            {INTENTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {initialAddress && (
        <Field name="address" label="Property" defaultValue={initialAddress} />
      )}
      <div>
        <label className="block text-xs uppercase tracking-wider text-mute mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell Samantha what you're looking for, your timeline, or any questions..."
          className="w-full rounded-xl border border-line bg-cream-50 px-4 py-3 text-sm focus:outline-none focus:border-teal"
        />
      </div>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-60"
      >
        {submitting ? (
          "Sending..."
        ) : (
          <>
            <Send size={16} /> Send to Samantha
          </>
        )}
      </button>
      <p className="text-[11px] text-mute leading-relaxed">
        By submitting, you consent to Samantha Swaney and her GC Realty team
        contacting you about your real estate inquiry. No spam, ever.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-mute mb-1.5">
        {label} {required && <span className="text-teal">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-line bg-cream-50 px-4 py-3 text-sm focus:outline-none focus:border-teal"
      />
    </div>
  );
}
