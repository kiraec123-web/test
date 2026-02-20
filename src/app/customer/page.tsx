"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import MenuDrawer from "@/components/chat/MenuDrawer";

interface ChatMessage {
  id: string;
  text: string;
  sender: "customer" | "shop";
  timestamp: Date;
}

export default function CustomerPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Welcome! Take a look at our menu and let us know what you'd like to order.",
      sender: "shop",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-dismiss drawer when customer types
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      if (val.length > 0 && menuOpen) {
        setMenuOpen(false);
      }
    },
    [menuOpen]
  );

  const handleSendMessage = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Close drawer on send
    setMenuOpen(false);

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: trimmed,
      sender: "customer",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleSelectItem = useCallback((itemName: string) => {
    setInputValue(itemName);
    // Focus input after a tick so the drawer animation completes
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <div
      className="flex flex-col h-dvh"
      style={{ background: "var(--bg)", maxWidth: "100vw" }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="relative flex-shrink-0"
        style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--border)",
          zIndex: 50,
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "12px 16px" }}
        >
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "18px",
              color: "var(--text)",
              margin: 0,
              fontWeight: "normal",
            }}
          >
            Cafe Chat
          </h1>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-1 cursor-pointer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text)",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "6px 12px",
            }}
          >
            Menu
            {menuOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {/* Menu Drawer — positioned relative to header */}
        <MenuDrawer
          isOpen={menuOpen}
          onClose={handleCloseMenu}
          onSelectItem={handleSelectItem}
        />
      </div>

      {/* Chat messages area */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: "16px" }}
      >
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "customer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius:
                    msg.sender === "customer"
                      ? "14px 14px 4px 14px"
                      : "14px 14px 14px 4px",
                  background:
                    msg.sender === "customer"
                      ? "var(--accent)"
                      : "var(--white)",
                  color:
                    msg.sender === "customer"
                      ? "var(--white)"
                      : "var(--text)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  boxShadow:
                    msg.sender === "shop"
                      ? "0 1px 3px rgba(44,24,16,0.06)"
                      : "none",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div
        className="flex-shrink-0"
        style={{
          padding: "12px 16px",
          background: "var(--white)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          className="flex items-center gap-2 max-w-2xl mx-auto"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your order..."
            style={{
              flex: 1,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              padding: "10px 14px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--bg)",
              color: "var(--text)",
              outline: "none",
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="flex items-center justify-center cursor-pointer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "none",
              background: inputValue.trim()
                ? "var(--accent)"
                : "var(--bg2)",
              color: inputValue.trim()
                ? "var(--white)"
                : "var(--text3)",
              transition: "background 150ms, color 150ms",
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
import ChatInterface from "@/components/chat/ChatInterface";

export default function CustomerPage() {
  return <ChatInterface />;
}
