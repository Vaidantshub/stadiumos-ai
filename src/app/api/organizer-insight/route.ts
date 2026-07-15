import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel, ORGANIZER_ASSISTANT_SYSTEM_PROMPT } from "@/lib/gemini/client";
import { deepSeekChat, isDeepSeekConfigured } from "@/lib/deepseek/client";
import { groqChat, isGroqConfigured } from "@/lib/groq/client";

export const runtime = "nodejs";

interface RequestBody {
  zones: Array<{ name: string; occupancyPercent: number; status: string }>;
  activeIncidents: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { zones, activeIncidents } = body;

    const dataSummary = zones
      .map((z) => `${z.name}: ${z.occupancyPercent}% (${z.status})`)
      .join("; ");

    const userPrompt = `Current zone occupancy data: ${dataSummary}\nActive incidents: ${activeIncidents}\n\nGive 3-4 short, prioritized operational recommendations for stadium staff right now.`;

    // ── 1. Groq (fastest, free) ───────────────────────────────────────
    if (isGroqConfigured()) {
      try {
        const insight = await groqChat(
          [
            { role: "system", content: ORGANIZER_ASSISTANT_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          { maxTokens: 600, temperature: 0.5 }
        );
        return NextResponse.json({ insight, provider: "groq" });
      } catch (err) {
        console.error("Groq organizer error, trying next provider:", err);
      }
    }

    // ── 2. DeepSeek fallback ──────────────────────────────────────────
    if (isDeepSeekConfigured()) {
      try {
        const insight = await deepSeekChat(
          [
            { role: "system", content: ORGANIZER_ASSISTANT_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          { maxTokens: 600, temperature: 0.5 }
        );
        return NextResponse.json({ insight, provider: "deepseek" });
      } catch (err) {
        console.error("DeepSeek organizer error, trying Gemini:", err);
      }
    }

    // ── 3. Gemini final fallback ──────────────────────────────────────
    if (process.env.GEMINI_API_KEY?.trim()) {
      try {
        const model = getGeminiModel(ORGANIZER_ASSISTANT_SYSTEM_PROMPT);
        const result = await model.generateContent(userPrompt);
        const insight = result.response.text();
        return NextResponse.json({ insight, provider: "gemini" });
      } catch (err) {
        console.error("Gemini organizer error:", err);
      }
    }

    // ── No API key configured ─────────────────────────────────────────
    return NextResponse.json({
      insight:
        "Demo mode: Consider opening auxiliary gates at zones above 85% capacity and dispatching staff to trending concourses. Add GROQ_API_KEY for live AI insights.",
    });
  } catch (err) {
    console.error("Organizer insight API error:", err);
    return NextResponse.json({ error: "Failed to generate insight." }, { status: 500 });
  }
}
