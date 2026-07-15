"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./chat-bubble";
import { TypingIndicator } from "./typing-indicator";
import { ChatMessage } from "@/lib/types";
import { useAppStore } from "@/lib/store/app-store";
import { toast } from "sonner";

const SUGGESTIONS = [
  "Where's the nearest restroom to Gate A?",
  "What time does the USA vs Mexico match start?",
  "How do I get to my seat in Section 112?",
  "What food options are near the North Stand?",
  "How do I get to the stadium via public transport?",
];

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ChatWindow() {
  const language = useAppStore((s) => s.language);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "⚽ Welcome to StadiumOS AI! I'm your Fan Assistant for the FIFA World Cup 2026. Ask me about seating, gates, food, transport, or match schedules — I'm here to help you have the best matchday experience.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language,
          history: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to get response");

      const assistantMsg: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      toast.error("Couldn't reach the assistant. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[820px] rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-pitch-500/10 to-transparent">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pitch-500 to-pitch-700 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold leading-tight">Fan Assistant</h2>
          <p className="text-xs text-muted-foreground">Powered by Gemini 2.5 Flash</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-pitch-500">
          <span className="h-2 w-2 rounded-full bg-pitch-500 animate-pulse" /> Online
        </span>
      </div>

      <ScrollArea className="flex-1 px-5 py-5">
        <div className="space-y-5">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {messages.length <= 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 border-t border-border flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Ask about seating, gates, food, transport..."
          className="min-h-[46px] max-h-32 resize-none"
          rows={1}
        />
        <Button
          size="icon"
          variant="gradient"
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="shrink-0 h-[46px] w-[46px]"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
