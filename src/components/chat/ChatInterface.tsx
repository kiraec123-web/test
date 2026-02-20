"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Coffee, Menu } from "lucide-react";
import MessageBubble, { TypingIndicator } from "./MessageBubble";
import ChatInput from "./ChatInput";
import OrderReceipt from "./OrderReceipt";
import type { Message } from "./MessageBubble";
import type { Order } from "./OrderReceipt";

// Regex: matches ```order_json ... ``` (with optional whitespace after the tag)
const ORDER_JSON_RE = /```order_json\s*([\s\S]*?)```/m;

const WELCOME: Message = {
  id: "welcome",
  role: "cashier",
  content: "Welcome to NYC Coffee! What can I get started for you today?",
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [isStreaming, setIsStreaming] = useState(false);

  // Order receipt state
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | undefined>();
  const [isPosting, setIsPosting] = useState(false);
  const [receiptError, setReceiptError] = useState<string | undefined>();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, currentOrder]);

  // ── POST /api/orders ──────────────────────────────────────────────────────

  const postOrder = useCallback(async (order: Order) => {
    setIsPosting(true);
    setReceiptError(undefined);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Normalise: API may return id or orderNumber
      const num: string =
        data.orderNumber != null
          ? String(data.orderNumber)
          : data.id != null
          ? String(data.id)
          : "";
      setOrderNumber(num);
    } catch {
      setReceiptError("Failed to submit order.");
    } finally {
      setIsPosting(false);
    }
  }, []);

  // ── Stream one Claude turn ────────────────────────────────────────────────

  const streamTurn = useCallback(
    async (history: Message[]) => {
      setIsStreaming(true);

      // Append a placeholder assistant message that we stream into
      const aiId = `ai-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: aiId, role: "cashier", content: "" },
      ]);

      // Build API payload: only non-empty prior messages (exclude the placeholder)
      const apiMessages = history
        .filter((m) => m.content !== "")
        .map((m) => ({
          role: m.role === "cashier" ? "assistant" : "user",
          content: m.content,
        }));

      let fullText = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // Process complete SSE lines
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? ""; // keep partial line

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") break;
            try {
              const frame = JSON.parse(raw);
              if (frame.text) {
                fullText += frame.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiId ? { ...m, content: fullText } : m
                  )
                );
              }
            } catch {
              // ignore malformed SSE frames
            }
          }
        }

        // ── End of stream: detect order_json ─────────────────────────────

        const match = ORDER_JSON_RE.exec(fullText);
        if (match) {
          const jsonStr = match[1].trim();
          try {
            const order = JSON.parse(jsonStr) as Order;

            // Strip the code block from the displayed message
            const stripped = fullText.replace(ORDER_JSON_RE, "").trim();
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId ? { ...m, content: stripped } : m
              )
            );

            setCurrentOrder(order);
            await postOrder(order);
          } catch {
            // JSON parse failed — show apology and resend last user message
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId
                  ? {
                      ...m,
                      content:
                        "I had trouble with that order. Let me try again.",
                    }
                  : m
              )
            );

            // history already contains the last user message; resend it
            await streamTurn(history);
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId
              ? {
                  ...m,
                  content: "Sorry, something went wrong. Please try again.",
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [postOrder]
  );

  // ── User sends a message ──────────────────────────────────────────────────

  async function handleSend(content: string) {
    if (isStreaming) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "customer",
      content,
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    await streamTurn(updated);
  }

  // ── Receipt actions ───────────────────────────────────────────────────────

  function handleRetry() {
    if (currentOrder) postOrder(currentOrder);
  }

  function handleNewOrder() {
    setCurrentOrder(null);
    setOrderNumber(undefined);
    setReceiptError(undefined);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "cashier",
        content: "Welcome back! What can I get started for you today?",
      },
    ]);
  }

  async function handleOrderAgain() {
    if (!currentOrder) return;
    setCurrentOrder(null);
    setOrderNumber(undefined);
    setReceiptError(undefined);

    const welcome: Message = {
      id: `welcome-${Date.now()}`,
      role: "cashier",
      content: "Welcome back! What can I get started for you today?",
    };
    const repeat: Message = {
      id: `u-${Date.now()}`,
      role: "customer",
      content: "I'd like to order the same thing again.",
    };
    const next = [welcome, repeat];
    setMessages(next);
    await streamTurn(next);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  // Show typing indicator only while streaming AND the placeholder is still empty
  const lastMsg = messages[messages.length - 1];
  const showTyping =
    isStreaming && lastMsg?.role === "cashier" && lastMsg?.content === "";

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-stone-50">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-amber-800" />
          <span className="font-serif text-xl text-stone-900">NYC Coffee</span>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
          <Menu className="h-4 w-4" />
          View Menu
        </button>
      </header>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <TypingIndicator visible={showTyping} />

          {/* Order receipt — below messages, above input */}
          {currentOrder && (
            <div className="mt-2">
              <OrderReceipt
                order={currentOrder}
                orderNumber={orderNumber}
                isLoading={isPosting}
                error={receiptError}
                onRetry={handleRetry}
                onNewOrder={handleNewOrder}
                onOrderAgain={handleOrderAgain}
              />
            </div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
