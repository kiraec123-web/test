# Architecture

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react for icons

## Directory Structure
```
src/
  app/
    layout.tsx          # Root layout with font imports
    page.tsx            # Redirects to /customer
    globals.css         # Tailwind imports + CSS variables
    customer/
      page.tsx          # Customer chat view with menu toggle
  components/
    chat/
      MenuDrawer.tsx    # Collapsible menu drawer component
  lib/
    menu.ts             # Menu data and helpers
```

## Design Tokens (CSS Custom Properties)
- `--text`: Primary text (#2c1810)
- `--text2`: Secondary text (#5c3d2e)
- `--text3`: Muted text (#8b7355)
- `--border`: Border color (#e8ddd4)
- `--bg`: Page background (#faf7f4)
- `--bg2`: Secondary background (#f0ebe5)
- `--accent`: Accent color (#c4956a)
- `--accent-light`: Light accent (#f5ebe0)
- `--white`: White (#ffffff)

## Fonts
- DM Sans: body text
- DM Serif Display: headings
- JetBrains Mono: prices/monospace

## Build
```bash
npm run build    # Production build
npm run dev      # Development server
npm run lint     # ESLint
```
