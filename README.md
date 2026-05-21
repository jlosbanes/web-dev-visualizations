# web-dev-visualizations

Interactive visualizations of the modern web rendering spectrum — CSR, SSR, SSG, ISR, Streaming SSR, RSC — with live performance metrics.

> **Status:** Early development. Landing page and framing in place; no demos built yet.

## What this is

Every modern rendering strategy is solving the same problem — fast HTML, real interactivity, minimal JS — with different tradeoff curves. There's no "best." Only "what tradeoff am I making, and who pays the cost: server, network, or client?"

This project will make those tradeoffs visible: the same page rendered N ways, side by side, with an in-page overlay surfacing TTFB, FCP, LCP, INP, CLS, hydration time, and the JS each route actually ships to the browser.

It is a learning project. I'm working through SSR, RSC, streaming, and the Next.js App Router by building, not by reading.

## Demos

Rendering strategies, positioned on the spectrum by `(JS shipped to client, when HTML is generated)`:

| Demo            | Tradeoff                                              | Status  |
| --------------- | ----------------------------------------------------- | ------- |
| CSR             | Client pays. Empty shell, JS does everything.         | Planned |
| Streaming SSR   | HTML chunks arrive as data resolves on the server.    | Planned |
| SSR             | Fresh HTML per request, then full hydration.          | Planned |
| RSC             | Server components ship ~0 JS to the client.           | Planned |
| ISR             | SSG with stale-while-revalidate at the edge.          | Diagram |
| SSG             | Free at request time, stale until rebuild.            | Diagram |

Deep dives, cross-cutting demos:

| Demo                  | Tradeoff                                                                                  | Status  |
| --------------------- | ----------------------------------------------------------------------------------------- | ------- |
| Hydration visualizer  | The gap between "rendered" and "interactive", and how RSC closes it.                      | Planned |
| Cache tier visualizer | Request memoization, data cache, full route cache, router cache — live hit/miss.          | Planned |
| Anti-pattern museum   | Bad pattern next to good pattern, measured deltas.                                        | Planned |

`Diagram` = explained statically inside another demo, not a separate interactive page.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3000>.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- TypeScript (strict)
- ESLint 9
