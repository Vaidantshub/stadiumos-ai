import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel, FAN_ASSISTANT_SYSTEM_PROMPT } from "@/lib/gemini/client";
import { deepSeekChat, isDeepSeekConfigured } from "@/lib/deepseek/client";
import { groqChat, isGroqConfigured } from "@/lib/groq/client";

export const runtime = "nodejs";

interface RequestBody {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { message, history = [], language = "en" } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const systemPrompt = `${FAN_ASSISTANT_SYSTEM_PROMPT}\n\nRespond in this language code: ${language}.`;

    // ── 1. Groq (fastest, free) ───────────────────────────────────────
    if (isGroqConfigured()) {
      try {
        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...history.map((h) => ({
            role: h.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: h.content,
          })),
          { role: "user" as const, content: message },
        ];
        const reply = await groqChat(messages, { maxTokens: 800, temperature: 0.7 });
        return NextResponse.json({ reply, provider: "groq" });
      } catch (err) {
        console.error("Groq assistant error, trying next provider:", err);
      }
    }

    // ── 2. DeepSeek fallback ──────────────────────────────────────────
    if (isDeepSeekConfigured()) {
      try {
        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...history.map((h) => ({
            role: h.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: h.content,
          })),
          { role: "user" as const, content: message },
        ];
        const reply = await deepSeekChat(messages, { maxTokens: 800, temperature: 0.7 });
        return NextResponse.json({ reply, provider: "deepseek" });
      } catch (err) {
        console.error("DeepSeek assistant error, trying Gemini:", err);
      }
    }

    // ── 3. Gemini final fallback ──────────────────────────────────────
    if (process.env.GEMINI_API_KEY?.trim()) {
      try {
        const model = getGeminiModel(systemPrompt);
        const chat = model.startChat({
          history: history.map((h) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }],
          })),
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        });
        const result = await chat.sendMessage(message);
        const reply = result.response.text();
        return NextResponse.json({ reply, provider: "gemini" });
      } catch (err) {
        console.error("Gemini assistant error:", err);
      }
    }

    // ── No API key configured ─────────────────────────────────────────
    return NextResponse.json(
      {
        reply:
          "Demo mode: No AI API key is configured. Add GROQ_API_KEY (free & fast!) to your .env.local to enable live AI responses.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Assistant request parsing error:", err);
    return NextResponse.json({ error: "Something went wrong parsing the request." }, { status: 400 });
  }
}
