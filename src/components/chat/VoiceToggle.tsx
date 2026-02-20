"use client";

import { Mic, Keyboard } from "lucide-react";

interface VoiceToggleProps {
  isVoice: boolean;
  onToggle: () => void;
}

export default function VoiceToggle({ isVoice, onToggle }: VoiceToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-brand-text-muted hover:bg-stone-100 transition-colors"
    >
      {isVoice ? (
        <>
          <Keyboard size={16} strokeWidth={1.5} />
          <span>Text</span>
        </>
      ) : (
        <>
          <Mic size={16} strokeWidth={1.5} />
          <span>Voice</span>
        </>
      )}
    </button>
  );
}
