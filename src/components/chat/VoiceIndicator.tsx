"use client";

import { Mic } from "lucide-react";

export default function VoiceIndicator({ isListening }: { isListening: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white ${
          isListening ? "animate-pulse" : ""
        }`}
      >
        <Mic size={32} strokeWidth={1} />
      </div>
      <p className="text-sm text-brand-text-muted">
        {isListening ? "Listening..." : "Tap to speak"}
      </p>
    </div>
  );
}
