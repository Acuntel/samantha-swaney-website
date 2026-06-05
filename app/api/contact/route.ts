import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, intent, address, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email." },
        { status: 400 },
      );
    }

    const to = process.env.LEAD_TO_EMAIL || "samanthas@gcrealtyinc.com";
    const from =
      process.env.LEAD_FROM_EMAIL ||
      "Samantha Swaney Website <onboarding@resend.dev>";

    const subject = `New Website Inquiry: ${name} (${intent || "General"})`;
    const text = [
      `New inquiry from samantha-swaney-website.vercel.app`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      intent ? `Interest: ${intent}` : null,
      address ? `Property: ${address}` : null,
      ``,
      `Message:`,
      message,
      ``,
      `Source IP: ${ip}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (!process.env.RESEND_API_KEY) {
      console.log("=== Contact form (Resend not configured) ===");
      console.log(text);
      return NextResponse.json({ success: true, dev: true });
    }

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (!r.ok) {
      console.error("Resend error:", await r.text());
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
