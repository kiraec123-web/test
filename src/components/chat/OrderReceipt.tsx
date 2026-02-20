"use client";

import { Clock, Flame, Snowflake } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrderItem {
  name: string;
  size?: string;
  temperature?: "hot" | "iced" | string;
  milk?: string;
  mods?: string[];
  price: number;
}

export interface Order {
  customer_name?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface OrderReceiptProps {
  order: Order;
  orderNumber?: string;
  isLoading: boolean;
  error?: string;
  onRetry: () => void;
  onNewOrder: () => void;
  onOrderAgain: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}

function padOrderNumber(raw?: string) {
  if (!raw) return "#---";
  const digits = raw.replace(/\D/g, "");
  return `#${digits.padStart(3, "0")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderReceipt({
  order,
  orderNumber,
  isLoading,
  error,
  onRetry,
  onNewOrder,
  onOrderAgain,
}: OrderReceiptProps) {
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(44,24,16,0.08)",
        overflow: "hidden",
        opacity: isLoading ? 0.6 : 1,
        pointerEvents: isLoading ? "none" : undefined,
      }}
    >
      {/* ── Header band ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--accent)",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            color: "#fff",
            fontWeight: 400,
          }}
        >
          Order Confirmed
        </span>

        {/* Order number pill */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "rgba(255,255,255,0.9)",
            background: "rgba(255,255,255,0.18)",
            borderRadius: 999,
            padding: "2px 10px",
            animation: orderNumber ? undefined : "pulse 1.5s ease-in-out infinite",
          }}
        >
          {orderNumber ? padOrderNumber(orderNumber) : "#---"}
        </span>
      </div>

      {/* ── Customer name ────────────────────────────────────────────────── */}
      {order.customer_name && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--text2)",
            padding: "12px 18px 0",
          }}
        >
          {order.customer_name}
        </div>
      )}

      {/* ── Item rows ────────────────────────────────────────────────────── */}
      {order.items.map((item, i) => {
        const isIced = item.temperature === "iced";
        const isHot = item.temperature === "hot";
        const mods: string[] = [];
        if (item.milk) mods.push(item.milk);
        if (item.mods) mods.push(...item.mods);

        return (
          <div
            key={i}
            style={{
              padding: "10px 18px",
              borderBottom:
                i < order.items.length - 1
                  ? "1px solid var(--border)"
                  : undefined,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            {/* Left: name + mods */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {item.name}
                </span>
                {isIced && (
                  <Snowflake
                    size={13}
                    style={{ color: "#3b82f6", flexShrink: 0 }}
                  />
                )}
                {isHot && (
                  <Flame
                    size={13}
                    style={{ color: "#f59e0b", flexShrink: 0 }}
                  />
                )}
                {item.size && (
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--text3)",
                    }}
                  >
                    {item.size}
                  </span>
                )}
              </div>
              {mods.length > 0 && (
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    color: "var(--text3)",
                    marginTop: 2,
                  }}
                >
                  {mods.join(" · ")}
                </div>
              )}
            </div>

            {/* Right: price */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text)",
                flexShrink: 0,
              }}
            >
              {fmt(item.price)}
            </span>
          </div>
        );
      })}

      {/* ── Totals ───────────────────────────────────────────────────────── */}
      <div style={{ padding: "12px 18px" }}>
        {/* Subtotal */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--text2)",
            }}
          >
            Subtotal
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text2)",
            }}
          >
            {fmt(order.subtotal)}
          </span>
        </div>

        {/* Tax */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--text2)",
            }}
          >
            Tax 8.875%
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text2)",
            }}
          >
            {fmt(order.tax)}
          </span>
        </div>

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "2px solid var(--text)",
            paddingTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            Total
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 16,
              fontWeight: 500,
              color: "var(--text)",
            }}
          >
            {fmt(order.total)}
          </span>
        </div>
      </div>

      {/* ── Status row ───────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "12px 18px",
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} style={{ color: "#f59e0b", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "var(--text2)",
              }}
            >
              Order received
            </span>
          </div>

          {/* Error retry */}
          {error && (
            <button
              onClick={onRetry}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 500,
                color: "#dc2626",
                padding: 0,
              }}
            >
              Failed to submit — Retry
            </button>
          )}
        </div>
      </div>

      {/* ── Post-order buttons ───────────────────────────────────────────── */}
      <div
        style={{
          padding: "12px 18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <button
          onClick={onNewOrder}
          style={{
            height: 48,
            width: "100%",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          New order
        </button>
        <button
          onClick={onOrderAgain}
          style={{
            height: 48,
            width: "100%",
            background: "transparent",
            color: "var(--accent)",
            border: "1.5px solid var(--accent)",
            borderRadius: 10,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Order again
        </button>
      </div>

      {/* Pulse keyframe (inline for no-tailwind compat) */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
