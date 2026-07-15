import { ChatWindow } from "@/components/assistant/chat-window";

export default function FanAssistantPage() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Fan Assistant</h1>
        <p className="text-muted-foreground mt-1">Your personal guide for everything matchday.</p>
      </div>
      <ChatWindow />
    </div>
  );
}
