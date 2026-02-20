"use client";

export type MessageRole = "cashier" | "customer";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isCashier = message.role === "cashier";

  return (
    <div
      className={`flex ${isCashier ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
          isCashier
            ? "rounded-[18px] rounded-tl-[4px] border border-stone-200 bg-white text-stone-900 shadow-sm"
            : "rounded-[18px] rounded-tr-[4px] bg-amber-800 text-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

interface TypingIndicatorProps {
  visible: boolean;
}

export function TypingIndicator({ visible }: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-[18px] rounded-tl-[4px] border border-stone-200 bg-white px-4 py-3 shadow-sm">
        <span
          className="inline-block h-2 w-2 rounded-full bg-stone-400"
          style={{
            animation: "bounce-dot 1.4s infinite ease-in-out both",
            animationDelay: "0ms",
          }}
        />
        <span
          className="inline-block h-2 w-2 rounded-full bg-stone-400"
          style={{
            animation: "bounce-dot 1.4s infinite ease-in-out both",
            animationDelay: "150ms",
          }}
        />
        <span
          className="inline-block h-2 w-2 rounded-full bg-stone-400"
          style={{
            animation: "bounce-dot 1.4s infinite ease-in-out both",
            animationDelay: "300ms",
          }}
        />
      </div>
    </div>
  );
}
