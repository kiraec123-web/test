"use client";

import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  return (
    <div className="flex items-center gap-2 border-t border-brand-border bg-brand-bg-card p-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder="Type your order..."
        disabled={disabled}
        className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder:text-stone-400"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
