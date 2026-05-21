# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (a `pnpm-lock.yaml` is checked in — do not switch to npm/yarn).

- `pnpm dev` — start the Next.js dev server on http://localhost:3000
- `pnpm build` — production build (`next build`)
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (flat-config, `eslint.config.mjs`)

There is no test runner configured.

## Stack & architecture

- **Next.js 16** App Router with **React 19**. Routes live under [app/](app/); the root layout is [app/layout.tsx](app/layout.tsx) and the home page is [app/page.tsx](app/page.tsx). No `src/` directory — `app/` sits at the repo root.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (see [postcss.config.mjs](postcss.config.mjs)). Styles are loaded with `@import "tailwindcss"` in [app/globals.css](app/globals.css), and design tokens are declared inline with `@theme inline { ... }`. There is no `tailwind.config.{js,ts}` — extend the theme in `globals.css`, not a JS config.
- **Fonts**: Geist Sans and Geist Mono are loaded via `next/font/google` in `app/layout.tsx` and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono` (referenced by `--font-sans` / `--font-mono` in the `@theme` block).
- **TypeScript** is strict. The path alias `@/*` resolves to the repo root (see [tsconfig.json](tsconfig.json)) — so `@/app/foo` and `@/public/...` work; there is no `@/src` prefix.
- **ESLint 9** flat config extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. The config also re-declares `globalIgnores` because it overrides the package's defaults — if you want to ignore additional paths, add them there.

## Project status

The repo is the unmodified `create-next-app` scaffold (intended for web-dev visualizations, per the package name). When adding features, prefer editing the existing `app/` files over introducing a new directory layout.
