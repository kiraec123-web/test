# Menu Drawer (E2-T2)

## Overview
Collapsible menu panel for the customer chat view. Slides down from below the header, overlays chat messages.

## Behavior
- "Menu" button in header toggles drawer open/closed
- ChevronDown/ChevronUp icons indicate state
- Button label is always "Menu" (no "Hide Menu"/"Show Menu")
- CSS max-height transition: 300ms ease-out open, 200ms ease-in close
- Overlays chat (z-index: 40), does not push content
- Box-shadow: 0 8px 24px rgba(44,24,16,0.12)
- Mobile backdrop (rgba(0,0,0,0.08)) below 768px, tapping closes drawer

## Layout
- Max-height: 60vh mobile, 50vh desktop (lg+)
- Internally scrollable (-webkit-overflow-scrolling: touch)
- Three sections: Coffee, Tea, Pastries
- Section headings: DM Serif Display, 15px
- Sections separated by 1px border, 16px vertical padding
- Item rows: flexbox, 8px vertical padding
- Prices: JetBrains Mono 13px, right-aligned
- Add-ons: 2-column grid, 12px text
- Customizations: single line each

## Quick-tap Ordering
- Tapping item closes drawer, populates chat input (does NOT auto-send)
- Brief background flash (accent-light, 150ms) as feedback

## Auto-dismiss
- Closes when customer types in input
- Closes when message is sent
- Closes on click-outside (backdrop)
- Closes on Escape key

## Data Source
All data from src/lib/menu.ts — no hardcoded strings.
