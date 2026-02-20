"use client";

import { useRef, useEffect, useState } from "react";
import { Coffee, Menu } from "lucide-react";
import MessageBubble, { TypingIndicator } from "./MessageBubble";
import ChatInput from "./ChatInput";
import type { Message } from "./MessageBubble";

const FAKE_MESSAGES: Message[] = [
  {
    id: "1",
    role: "cashier",
    content:
      "Welcome to NYC Coffee! What can I get started for you today?",
  },
  {
    id: "2",
    role: "customer",
    content: "Hi! Can I get a large oat milk latte?",
  },
  {
    id: "3",
    role: "cashier",
    content:
      "Of course! One large oat milk latte. Would you like that hot or iced?",
  },
  {
    id: "4",
    role: "customer",
    content: "Iced, please. And can I add a vanilla shot?",
  },
  {
    id: "5",
    role: "cashier",
    content:
      "Absolutely! One large iced oat milk vanilla latte. Anything else I can get for you?",
  },
  {
    id: "6",
    role: "customer",
    content: "That's all, thanks!",
  },
  {
    id: "7",
    role: "cashier",
    content:
      "Great choice! Your total is $6.75. We'll have that ready for you shortly.",
  },
];

interface ChatInterfaceProps {
  showTyping?: boolean;
}

export default function ChatInterface({
  showTyping = false,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(FAKE_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  function handleSend(content: string) {
    const newMessage: Message = {
      id: String(Date.now()),
      role: "customer",
      content,
    };
    setMessages((prev) => [...prev, newMessage]);
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-stone-50">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-amber-800" />
          <span className="font-serif text-xl text-stone-900">
            NYC Coffee
          </span>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
          <Menu className="h-4 w-4" />
          View Menu
        </button>
      </header>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <TypingIndicator visible={showTyping} />
        </div>
      </div>

      {/* Input bar */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
