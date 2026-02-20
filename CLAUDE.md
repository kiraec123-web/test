# NYC Coffee

## Project Overview

NYC Coffee is an AI-powered coffee shop ordering assistant built as a Next.js web application. Customers interact through a chat interface to place orders.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Fonts**: DM Sans (body), DM Serif Display (wordmark/headings)

## Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  app/
    layout.tsx          - Root layout with fonts and global CSS
    page.tsx            - Redirects to /customer
    globals.css         - Tailwind imports, theme overrides, animations
    customer/
      page.tsx          - Customer chat page
  components/
    chat/
      ChatInterface.tsx - Main chat shell (header, messages, input)
      MessageBubble.tsx - Cashier/customer message bubbles + typing indicator
      ChatInput.tsx     - Sticky input bar with voice, text, send buttons
```

## Design Tokens

- **Primary accent**: amber-800 (#92400E)
- **Backgrounds**: stone-50 (chat bg), stone-100 (button bg), white (bubbles/header)
- **Borders**: stone-200, stone-300
- **Body font**: DM Sans 14px
- **Wordmark font**: DM Serif Display

## Build Status

| Epic | Ticket | Status |
|------|--------|--------|
| E2 - Customer Chat Interface | E2-T1 - Chat UI Shell | Complete |
