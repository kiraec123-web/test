import type { ChatMessage } from "@/lib/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
          isUser
            ? "bg-brand-primary text-white rounded-br-sm"
            : "bg-white border border-brand-border text-brand-text rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
