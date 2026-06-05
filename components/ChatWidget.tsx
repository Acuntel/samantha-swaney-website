"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Phone } from "lucide-react";
import { CHAT_LOCALES, STR, type ChatLocale } from "@/lib/chat-translations";
import { SAMANTHA } from "@/lib/samantha-data";

type Msg = { role: "user" | "assistant"; content: string };
type LeadInfo = {
  name: string;
  email: string;
  phone?: string;
  intent?: string;
};

const STORAGE_KEY = "dh_chat_session_v1";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<ChatLocale>("auto");
  const [lead, setLead] = useState<LeadInfo | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const transcriptSentRef = useRef(false);
  const t = STR[locale];

  // Restore lead from storage (so multi-page nav doesn't re-prompt)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.lead) setLead(data.lead);
        if (data.messages) setMessages(data.messages);
        if (data.locale) setLocale(data.locale);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lead, messages, locale }),
      );
    } catch {}
  }, [lead, messages, locale]);

  // Proactive bubble after 12s
  useEffect(() => {
    const dismissed = sessionStorage.getItem("dh_bubble_dismissed");
    if (dismissed || open) return;
    const t = setTimeout(() => setShowBubble(true), 12_000);
    return () => clearTimeout(t);
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  // Send full transcript to Samantha when conversation has 4+ messages and tab closes/blurs
  useEffect(() => {
    if (!lead || messages.length < 4) return;
    const send = () => {
      if (transcriptSentRef.current) return;
      transcriptSentRef.current = true;
      const data = {
        ...lead,
        locale,
        transcript: messages,
      };
      try {
        const blob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/chat/lead", blob);
      } catch {
        fetch("/api/chat/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(() => {});
      }
    };
    window.addEventListener("beforeunload", send);
    window.addEventListener("pagehide", send);
    return () => {
      window.removeEventListener("beforeunload", send);
      window.removeEventListener("pagehide", send);
    };
  }, [lead, messages, locale]);

  async function startChat(form: FormData) {
    const newLead: LeadInfo = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim() || undefined,
      intent: String(form.get("intent") || "").trim() || undefined,
    };
    if (!newLead.name) return alert(t.nameRequired);
    if (!newLead.email) return alert(t.emailRequired);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newLead.email))
      return alert(t.emailInvalid);

    setLead(newLead);
    transcriptSentRef.current = false;

    const greeting: Msg = {
      role: "assistant",
      content: t.greeting(newLead.name.split(" ")[0], newLead.intent ?? null),
    };
    setMessages([greeting]);

    // Fire and forget: notify Samantha a chat started
    fetch("/api/chat/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newLead, locale, transcript: [] }),
    }).catch(() => {});
  }

  async function send() {
    const text = input.trim();
    if (!text || sending || !lead) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    transcriptSentRef.current = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, leadInfo: lead, locale }),
      });
      if (!res.ok || !res.body) throw new Error("Chat failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...next, { role: "assistant", content: t.error }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => {
          setOpen(true);
          setShowBubble(false);
          sessionStorage.setItem("dh_bubble_dismissed", "1");
        }}
        className={`fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-navy text-cream-50 shadow-cardHover hover:bg-navy-700 transition border-2 border-teal/30 ${
          open ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label={t.openChat}
      >
        <MessageSquare size={22} />
      </button>

      {/* Proactive bubble */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-5 z-50 max-w-[280px] card p-4 pr-8"
          >
            <button
              onClick={() => {
                setShowBubble(false);
                sessionStorage.setItem("dh_bubble_dismissed", "1");
              }}
              aria-label={t.dismiss}
              className="absolute top-1.5 right-1.5 p-1 text-mute hover:text-navy"
            >
              <X size={14} />
            </button>
            <div className="text-sm text-navy">{t.proactiveBubble}</div>
            <button
              onClick={() => {
                setOpen(true);
                setShowBubble(false);
              }}
              className="mt-2 text-xs font-medium text-teal-700 hover:text-teal-600"
            >
              {t.openChat} →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 z-50 w-[min(96vw,400px)] h-[min(82vh,640px)] bg-cream-50 rounded-2xl shadow-cardHover flex flex-col overflow-hidden border border-line"
          >
            {/* Header */}
            <div className="bg-navy text-cream-50 px-5 py-4 flex items-center justify-between border-b border-teal/20">
              <div>
                <div className="font-serif text-[17px] tracking-tightish">
                  {t.headerTitle}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream-50/70 mt-0.5">
                  {t.headerSubtitle}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as ChatLocale)}
                  className="bg-cream-50/10 text-cream-50 text-xs rounded-md px-2 py-1 border border-cream-50/15"
                  aria-label={t.languageLabel}
                >
                  {CHAT_LOCALES.map((l) => (
                    <option key={l.code} value={l.code} className="text-navy">
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-cream-50/80 hover:text-cream-50"
                  aria-label={t.closeChat}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!lead ? (
              <LeadForm onSubmit={startChat} t={t} locale={locale} />
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-cream-100"
                >
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                          m.role === "user"
                            ? "bg-navy text-cream-50 rounded-br-md"
                            : "bg-cream-50 text-ink rounded-bl-md shadow-card border border-line/60"
                        }`}
                      >
                        {m.content || (sending && <Typing />)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line bg-cream-50 p-3 flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    placeholder={t.inputPlaceholder}
                    className="flex-1 resize-none rounded-2xl border border-line bg-cream-100 px-3 py-2.5 text-sm focus:outline-none focus:border-teal max-h-32"
                  />
                  <button
                    onClick={send}
                    disabled={sending || !input.trim()}
                    aria-label={t.send}
                    className="h-10 w-10 grid place-items-center rounded-full bg-teal text-cream-50 disabled:opacity-40 hover:bg-teal-600 transition"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function LeadForm({
    onSubmit,
    t,
    locale,
  }: {
    onSubmit: (fd: FormData) => void;
    t: (typeof STR)[ChatLocale];
    locale: ChatLocale;
  }) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(new FormData(e.currentTarget));
        }}
        className="flex-1 overflow-y-auto p-6 bg-cream-100"
      >
        <div className="font-serif text-[16px] text-navy mb-5 leading-snug">
          {t.leadIntro}
        </div>
        <div className="space-y-2.5">
          <input
            name="name"
            placeholder={t.namePlaceholder}
            className="w-full rounded-xl border border-line bg-cream-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          <input
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            className="w-full rounded-xl border border-line bg-cream-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          <input
            name="phone"
            placeholder={t.phonePlaceholder}
            className="w-full rounded-xl border border-line bg-cream-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          <select
            name="intent"
            defaultValue=""
            className="w-full rounded-xl border border-line bg-cream-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          >
            <option value="">{t.intentPlaceholder}</option>
            {t.intentOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-navy w-full mt-4">
          {t.start}
        </button>
        <a
          href={SAMANTHA.phoneHref}
          className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mute hover:text-navy"
        >
          <Phone size={12} /> {t.preferToCall(SAMANTHA.phone)}
        </a>
        <p className="mt-3 text-[10px] text-mute leading-relaxed text-center">
          {locale === "es"
            ? "Al iniciar el chat, aceptas que Samantha Swaney te contacte sobre tu consulta inmobiliaria."
            : locale === "pl"
              ? "Rozpoczynając czat, wyrażasz zgodę na kontakt ze strony Samanthy Swaney."
              : "By starting chat, you consent to Samantha Swaney contacting you about your real estate inquiry."}
        </p>
      </form>
    );
  }
}

function Typing() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-mute animate-bounce" />
      <span
        className="h-1.5 w-1.5 rounded-full bg-mute animate-bounce"
        style={{ animationDelay: "0.15s" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-mute animate-bounce"
        style={{ animationDelay: "0.3s" }}
      />
    </span>
  );
}
