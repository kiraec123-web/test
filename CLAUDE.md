# Cafe Chat

## Build Status
- E2-T2 Collapsible Menu Panel: COMPLETE

## Commands
```bash
npm run build    # Production build
npm run dev      # Development server (port 3000)
npm run lint     # Run ESLint
```

## Architecture
- Next.js 16 App Router + TypeScript + Tailwind CSS 4
- See docs/architecture.md for full details

## Key Files
- `src/lib/menu.ts` — Menu data (single source of truth)
- `src/components/chat/MenuDrawer.tsx` — Collapsible menu drawer
- `src/app/customer/page.tsx` — Customer chat view
- `src/app/globals.css` — Design tokens (CSS custom properties)

## Conventions
- All menu data sourced from src/lib/menu.ts — no hardcoded strings in components
- CSS custom properties for design tokens (--text, --border, --accent, etc.)
- Fonts: DM Sans (body), DM Serif Display (headings), JetBrains Mono (prices)
- No emojis in UI
