# ProbashiBondhu — Admin Dashboard

A from-scratch React recreation of the ProbashiBondhu insurance Admin Dashboard, built for
better UI/UX and full responsiveness (phone -> tablet -> desktop). UI language is Bangla.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7
- lucide-react icons
- Self-hosted fonts: Hind Siliguri (Bangla) + Inter (numerals/currency), via `@fontsource`

## Getting started

```bash
npm install
npm run dev       # starts local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## What's included (this milestone)

- **Dashboard** (`/`) - date-range filter, grouped stat cards: policy summary
  (enrolled/draft/self-enroll/agent-enroll), financial summary (collected premium,
  partner service fee), claims summary (submitted/settled/paid/pending/regretted).
- **Reports** (`/reports`) - searchable, paginated Enrolled Policies table with
  status badges and a "download Excel" action (UI only for now).
- **Agent Panel** (`/agents`) - searchable, paginated agent list + a "Create Agent"
  modal form.
- Responsive sidebar navigation that collapses into a mobile drawer under `lg` (1024px).
- Mock data lives in `src/data/mock.ts` - swap this out once real API endpoints are
  available.

## Project structure

```
src/
  components/
    layout/       Sidebar, Topbar, DashboardLayout (shell used by every page)
    ui/            Reusable pieces: StatCard, Badge, SearchInput, Pagination, Modal
  pages/           Dashboard.tsx, Reports.tsx, Agents.tsx
  data/mock.ts      Placeholder data - replace with real API calls
  types/index.ts    Shared TypeScript types
  index.css         Tailwind entry + design tokens (brand colors, fonts)
```

## Design tokens

Brand color and type scale live in `src/index.css` under `@theme`. The brand palette
(`--color-brand-*`) is the ProbashiBondhu magenta/pink; `--color-ink-*` is the neutral
text/background scale. Change these in one place to re-theme the whole app.

## Known placeholders / next steps

- All data is mocked (`src/data/mock.ts`). Wire up real endpoints when available.
- "Download Excel" and "See Details" actions are UI-only stubs.
- Auth/login is not part of this milestone - this is the authenticated admin shell only.
- Next planned milestone: the customer-facing Enrollment & Claim flow (web + mobile),
  including the health-declaration Yes/No block driven by an API to be provided.
