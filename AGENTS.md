# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A single-page software engineering portfolio built to secure a junior software engineering internship. The entire site lives on one scrolling route (`/`) with a sticky anchor-link navigation bar. There are no other pages — do not add new routes unless explicitly asked.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (dark slate "engineering-first" theme) |
| Icons | lucide-react |
| Fonts | Inter (body), JetBrains Mono (code/stats/badges) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public/
│   └── favicon.ico
├── src
│   ├── components/ui/       # Radix-based primitives (Badge, Card, Checkbox, HoverCard, Separator) — currently unused by the single-page layout but kept for future use
│   ├── lib/utils.ts          # cn() class-merging helper
│   ├── routes
│   │   ├── __root.tsx        # Root HTML shell, fonts, page title/meta
│   │   └── index.tsx         # The entire portfolio page — all sections live here
│   ├── router.tsx            # TanStack Router setup
│   └── styles.css            # Tailwind import, font-family rules, CSS variable theme tokens
├── netlify.toml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Concepts

### Single-page architecture

`src/routes/index.tsx` renders every section of the site (hero, featured project, tech stack, about, engineering statement/proof, contact) as sibling `<section>` elements, each with an `id` matching the nav's anchor links (`#hero`, `#featured-project`, `#tech-stack`, `#about`, `#contact`). The nav bar (`SiteNav`) is `position: sticky` at the top.

When editing copy or sections, keep this single-page structure — do not split sections into separate routes.

### Theming

- Dark mode is forced via `className="dark"` on the root `<html>` element in `__root.tsx`.
- Color tokens are CSS variables defined in `styles.css` under `:root` / `.dark` and mapped into Tailwind via `@theme inline`. Adjust colors there, not with hardcoded hex values in components.
- `font-mono` (JetBrains Mono) is used deliberately for stats, badges, and code-styled elements to reinforce the "engineering-first" aesthetic. Body copy uses the default sans (Inter).

### Component Architecture

**UI Primitives** (`src/components/ui/`): Radix UI-based, Tailwind-styled — Card, Badge, Checkbox, Separator, HoverCard. Not currently wired into the page; available if new sections need them.

**Page sections** (`src/routes/index.tsx`): `SiteNav`, `HeroSection`, `FeaturedProjectSection`, `TechStackSection`, `AboutSection`, `ProofSection`, `ContactSection`, `SiteFooter` — all defined as local components in the same file since the page is small and content is static.

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `styles.css` | Tailwind import + CSS custom properties (oklch colors) + font-family rules |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes only — no separate CSS files per component
- `cn()` helper (`src/lib/utils.ts`) for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Type-only imports with `type` keyword

### Content
The hero, project, tech stack, about, engineering statement, and contact copy is treated as fixed content supplied by the site owner — don't paraphrase or invent additional copy/sections when editing. The `mailto:` address in `ContactSection` (`CONTACT_EMAIL` constant in `src/routes/index.tsx`) is a placeholder and should be replaced with the real contact email.

## Environment Variables

None required for the current build — the page is fully static (no server functions, database, or forms wired up).
