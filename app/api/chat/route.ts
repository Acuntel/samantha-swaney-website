import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { checkRateLimit } from "@/lib/rate-limit";
import { ChatLocale, LANGUAGE_INSTRUCTION } from "@/lib/chat-translations";
import { buildSystemPrompt } from "@/lib/chatbot-system-prompt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`chat:${ip}`, 12, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 },
      );
    }

    const { messages, leadInfo, locale } = await req.json();
    const chatLocale: ChatLocale =
      locale === "en" || locale === "es" || locale === "pl" || locale === "auto"
        ? locale
        : "auto";

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 },
      );
    }
    for (const m of messages) {
      if (typeof m.content === "string" && m.content.length > 5000) {
        return NextResponse.json(
          { error: "Message too long (max 5000 chars)." },
          { status: 400 },
        );
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat is not configured." },
        { status: 500 },
      );
    }

    let system = buildSystemPrompt();
    system += `\n\n# LANGUAGE\n${LANGUAGE_INSTRUCTION[chatLocale]}`;

    if (leadInfo) {
      system += `\n\n# CURRENT VISITOR\n- Name: ${leadInfo.name}\n- Email: ${leadInfo.email}`;
      if (leadInfo.phone) system += `\n- Phone: ${leadInfo.phone}`;
      if (leadInfo.intent) system += `\n- Interest: ${leadInfo.intent}`;
      system += `\nAddress them by first name. Tailor responses to their stated interest.`;
    }

    const trimmed = messages
      .slice(-20)
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const client = new Anthropic({ apiKey });
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const s = await client.messages.stream({
            model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929",
            max_tokens: 600,
            system,
            messages: trimmed,
          });
          for await (const event of s) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("Anthropic stream error:", err);
          controller.enqueue(
            encoder.encode(
              "\n\n(I hit a snag connecting just now. Please call Samantha directly at (630) 532-8747 or refresh and try me again.)",
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
