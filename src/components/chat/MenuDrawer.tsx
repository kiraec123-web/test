"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  menuData,
  formatPrice,
  getItemDisplayTemp,
  type MenuDisplayItem,
} from "@/lib/menu";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (itemName: string) => void;
}

export default function MenuDrawer({
  isOpen,
  onClose,
  onSelectItem,
}: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const tappedRef = useRef<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleItemTap = useCallback(
    (item: MenuDisplayItem) => {
      // Build the display name for the input
      let displayName = item.name;
      if (item.temps.length === 1 && item.temps[0] === "Iced") {
        displayName = `Iced ${item.name}`;
      }

      // Flash feedback
      tappedRef.current = item.name;
      // Force re-render for flash
      const el = document.querySelector(
        `[data-item="${item.name}"]`
      ) as HTMLElement;
      if (el) {
        el.style.background = "var(--accent-light)";
        setTimeout(() => {
          el.style.background = "";
        }, 150);
      }

      setTimeout(() => {
        onSelectItem(displayName);
        onClose();
      }, 150);
    },
    [onClose, onSelectItem]
  );

  const hasSizes = (
    prices: MenuDisplayItem["prices"]
  ): prices is { sm: number; lg: number } => {
    return "sm" in prices;
  };

  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        className={`fixed inset-0 z-30 transition-opacity md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.08)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        data-menu-drawer
        className="absolute left-0 right-0 z-40 overflow-hidden"
        style={{
          maxHeight: isOpen ? "60vh" : "0",
          transition: isOpen
            ? "max-height 300ms ease-out"
            : "max-height 200ms ease-in",
          boxShadow: isOpen
            ? "0 8px 24px rgba(44,24,16,0.12)"
            : "none",
          background: "var(--white)",
        }}
      >
        <div
          data-menu-scroll
          className="overflow-y-auto"
          style={{
            maxHeight: "60vh",
            WebkitOverflowScrolling: "touch",
            padding: "0 16px",
          }}
        >
          {/* Large screen max-height override */}
          <style>{`
            @media (min-width: 1024px) {
              [data-menu-drawer] {
                max-height: ${isOpen ? "50vh" : "0"} !important;
              }
              [data-menu-scroll] {
                max-height: 50vh !important;
              }
            }
          `}</style>

          {menuData.sections.map((section, sIdx) => (
            <div
              key={section.title}
              style={{
                paddingTop: "16px",
                paddingBottom: "16px",
                borderBottom:
                  sIdx < menuData.sections.length - 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "15px",
                  color: "var(--text)",
                  marginBottom: "8px",
                  marginTop: 0,
                  fontWeight: "normal",
                }}
              >
                {section.title}
              </h3>

              {section.items.map((item) => (
                <div
                  key={item.name}
                  data-item={item.name}
                  onClick={() => handleItemTap(item)}
                  className="flex items-start justify-between cursor-pointer"
                  style={{
                    padding: "8px 0",
                    transition: "background 150ms",
                    borderRadius: "4px",
                    marginLeft: "-4px",
                    marginRight: "-4px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {item.name}
                    </div>
                    {item.temps.length > 0 && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text3)",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {getItemDisplayTemp(item.temps)}
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {hasSizes(item.prices) ? (
                      <>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--text3)",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          sm / lg
                        </div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "13px",
                            color: "var(--text)",
                          }}
                        >
                          {formatPrice(item.prices.sm)} /{" "}
                          {formatPrice(item.prices.lg)}
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "13px",
                          color: "var(--text)",
                        }}
                      >
                        {formatPrice(item.prices.single)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Add-ons */}
          <div style={{ paddingTop: "16px", paddingBottom: "16px" }}>
            <h3
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "15px",
                color: "var(--text)",
                marginBottom: "8px",
                marginTop: 0,
                fontWeight: "normal",
              }}
            >
              Add-ons
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
              }}
            >
              {menuData.addOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="flex items-center justify-between"
                  style={{
                    fontSize: "12px",
                    padding: "6px 0",
                    paddingRight: "12px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {addOn.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--text)",
                    }}
                  >
                    {formatPrice(addOn.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customizations */}
          <div
            style={{
              paddingBottom: "16px",
              borderTop: "1px solid var(--border)",
              paddingTop: "16px",
            }}
          >
            {menuData.customizations.map((custom) => (
              <div
                key={custom.label}
                style={{
                  fontSize: "12px",
                  color: "var(--text3)",
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "2px 0",
                }}
              >
                {custom.label}: {custom.options.join(" \u00B7 ")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
