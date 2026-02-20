"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div
      className="sticky bottom-0 border-t border-stone-200 bg-white px-4 pt-3"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-stone-300 bg-stone-100"
          aria-label="Voice input"
        >
          <Mic className="h-5 w-5 text-stone-600" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message..."
          className="h-[44px] flex-1 rounded-full border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-amber-800"
        />
        <button
          type="submit"
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] bg-amber-800 text-white"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
