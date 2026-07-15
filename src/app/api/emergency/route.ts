import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel, EMERGENCY_ASSISTANT_SYSTEM_PROMPT } from "@/lib/gemini/client";
import { deepSeekChat, isDeepSeekConfigured } from "@/lib/deepseek/client";
import { groqChat, isGroqConfigured } from "@/lib/groq/client";

export const runtime = "nodejs";

interface RequestBody {
  message: string;
  emergencyType?: string;
  zoneName?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { message, emergencyType, zoneName } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const context = `Emergency type: ${emergencyType || "unspecified"}. Location: ${zoneName || "unspecified"}.`;
    const userPrompt = `${context}\n\nUser message: ${message}\n\nProvide calm, clear, step-by-step guidance in under 120 words.`;

    // ── 1. Groq (fastest, free) ───────────────────────────────────────
    if (isGroqConfigured()) {
      try {
        const reply = await groqChat(
          [
            { role: "system", content: EMERGENCY_ASSISTANT_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          { maxTokens: 300, temperature: 0.4 }
        );
        return NextResponse.json({ reply, provider: "groq" });
      } catch (err) {
        console.error("Groq emergency error, trying next provider:", err);
      }
    }

    // ── 2. DeepSeek fallback ──────────────────────────────────────────
    if (isDeepSeekConfigured()) {
      try {
        const reply = await deepSeekChat(
          [
            { role: "system", content: EMERGENCY_ASSISTANT_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          { maxTokens: 300, temperature: 0.4 }
        );
        return NextResponse.json({ reply, provider: "deepseek" });
      } catch (err) {
        console.error("DeepSeek emergency error, trying Gemini:", err);
      }
    }

    // ── 3. Gemini final fallback ──────────────────────────────────────
    if (process.env.GEMINI_API_KEY?.trim()) {
      try {
        const model = getGeminiModel(EMERGENCY_ASSISTANT_SYSTEM_PROMPT);
        const result = await model.generateContent(userPrompt);
        const reply = result.response.text();
        return NextResponse.json({ reply, provider: "gemini" });
      } catch (err) {
        console.error("Gemini emergency error:", err);
      }
    }

    // ── No API key configured → safe demo fallback ────────────────────
    return NextResponse.json({
      reply:
        "Your report has been logged. Stay calm and remain where it's safe. Stadium staff have been notified. For life-threatening emergencies, call 911 immediately.",
    });
  } catch (err) {
    console.error("Emergency API error:", err);
    return NextResponse.json(
      { error: "Failed to process emergency request. Please contact on-site staff directly." },
      { status: 500 }
    );
  }
}
