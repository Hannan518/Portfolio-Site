# Software Engineering Portfolio

A single-page developer portfolio designed for a junior software engineering internship search. The site presents an "engineering-first" reading experience — proof (a featured project, tech stack, and a direct engineering statement) ahead of pitch — inspired by the visual language of Vercel, Stripe Docs, and Linear.

## Tech Stack

- **React 19** + **TanStack Start** (file-based routing via TanStack Router)
- **Tailwind CSS 4** for styling, with a deep slate dark theme
- **lucide-react** for icons
- **Inter** (body text) and **JetBrains Mono** (stats, badges, code accents) via Google Fonts
- **Vite 7** for the build
- Deployed on **Netlify**

## Structure

The whole page lives in `src/routes/index.tsx` as one scrolling document with a sticky top nav (`src/routes/index.tsx` → `SiteNav`). Anchor links jump to: Hero (`#hero`), Featured Project (`#featured-project`), Tech Stack (`#tech-stack`), About (`#about`), and Contact (`#contact`).

See `AGENTS.md` for a fuller breakdown of the project layout and conventions.

## Running locally

```bash
npm install
npm run dev
```

The dev server starts on the port configured in `netlify.toml`/Vite config. For production builds:

```bash
npm run build
```

## Customizing

- Replace the placeholder email in `CONTACT_EMAIL` (`src/routes/index.tsx`) with a real contact address.
- Fill in the "Featured Project" section's repository link (currently a placeholder `href="#"`) once source code is public.
- Swap fonts, colors, and spacing via `src/styles.css` (CSS variable theme tokens) if the visual system needs to change.
