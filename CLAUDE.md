# NYC Coffee Shop — Claude Build Status

## Project Overview

A Next.js application for an NYC coffee shop with a Claude-powered cashier chatbot.

## Architecture

```
src/
  app/
    api/
      chat/
        route.ts       # POST /api/chat — Claude streaming endpoint
  lib/
    menu.ts            # Single source of truth for all menu items & prices
    system-prompt.ts   # Cashier personality + ordering rules (templates prices from menu.ts)
docs/
  MENU_RULES.md        # Validation rules reference (enforced in system prompt)
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Server-side only. Never exposed to the client bundle. |

Create a `.env.local` file in the project root:
```
ANTHROPIC_API_KEY=sk-ant-...
```

## Session Build Status

| Session | Branch | Ticket | Status |
|---------|--------|--------|--------|
| E2-T3 | `claude/setup-claude-api-chat-bkgNS` | Claude API + System Prompt | ✅ Complete |

## E2-T3 Implementation — Claude API + System Prompt

**Status: ✅ Complete**

### What was built

- `src/lib/menu.ts` — Full menu data (coffee, tea, pastries) with typed interfaces.
  Prices are the single source of truth; system prompt templates from here.
- `src/lib/system-prompt.ts` — Production system prompt with:
  - NYC cashier personality (warm, efficient, no filler)
  - Full ordering flow with priority queue (item → size → temp → milk → add-ons)
  - Smart behaviors: dietary detection, "surprise me", "what's popular?"
  - Validation rules from `docs/MENU_RULES.md`
  - Structured `order_json` output after order confirmation
- `src/app/api/chat/route.ts` — Streaming API route:
  - `POST /api/chat` accepts `{ messages: Array<{role, content}> }`
  - Uses `@anthropic-ai/sdk` with model `claude-sonnet-4-20250514`
  - SSE streaming via `ReadableStream`
  - `ANTHROPIC_API_KEY` from `process.env` only (server-side guard)
  - Returns 400 for invalid/missing/empty messages or non-user last message
  - Returns 500 with plain message on API failure (no stack traces)
  - `max_tokens: 1024`

### Acceptance criteria checklist

- [x] `POST /api/chat` accepts `{ messages: Array<{role, content}> }`
- [x] Uses `@anthropic-ai/sdk` with model `claude-sonnet-4-20250514`
- [x] SSE streaming via manual `ReadableStream`
- [x] `ANTHROPIC_API_KEY` from `process.env` with `typeof window === 'undefined'` guard
- [x] Returns 400 for missing/empty messages or non-user last message
- [x] Returns 500 with plain error (no stack traces, no SDK details)
- [x] `max_tokens: 1024`
- [x] NYC cashier personality (warm, efficient, no filler, no emojis)
- [x] Ordering flow with priority queue; single clarifying question at a time
- [x] Smart behaviors (dietary flags, "surprise me", "what's popular?", off-menu)
- [x] Validation rules enforced (temp limits, shot caps, syrup caps, pastry rules)
- [x] `order_json` output block after confirmation, with tax at 8.875%
- [x] Prices templated from `src/lib/menu.ts` — never hardcoded in system prompt

## How to Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type-check   # TypeScript validation
```

## GitHub Sync

Remote `github` is configured pointing to:
`https://github.com/kiraec123-web/nyc-coffee-shop.git`

To push all session branches to GitHub (requires a personal access token):
```bash
# From any machine with access to this repo:
git remote add github https://github.com/kiraec123-web/nyc-coffee-shop.git

# Push each session branch
git push github claude/setup-claude-api-chat-bkgNS
# ... repeat for other session branches

# Then create PRs on GitHub for each branch → main
```

See the GitHub sync instructions at the bottom of this file for the full 5-session workflow.
