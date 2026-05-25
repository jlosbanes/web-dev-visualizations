# web-dev-visualizations

Interactive visualizations of the modern web rendering spectrum — Client-Side Rendering, Server-Side Rendering, Static Site Generation, Incremental Static Regeneration, Streaming Server-Side Rendering, React Server Components — with live performance metrics.

> **Status:** All demos and diagrams built. Iterating on copy and instrumentation.

## What this is

Every modern rendering strategy is solving the same problem — fast HTML, real interactivity, minimal JS — with different tradeoff curves. There's no "best." Only "what tradeoff am I making, and who pays the cost: server, network, or client?"

This project will make those tradeoffs visible: the same page rendered N ways, side by side, with an in-page overlay surfacing Time to First Byte, First Contentful Paint, Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint, hydration time, and the JavaScript each route actually ships to the browser.

It is a learning project. I'm working through Server-Side Rendering, React Server Components, streaming, and the Next.js App Router by building, not by reading.

## Demos

Rendering strategies, positioned on the spectrum by `(JS shipped to client, when HTML is generated)`:

| Demo                              | Tradeoff                                                            | Status  |
| --------------------------------- | ------------------------------------------------------------------- | ------- |
| Client-Side Rendering             | Client pays. Empty shell, JavaScript does everything.               | Built   |
| Streaming Server-Side Rendering   | HTML chunks arrive as data resolves on the server.                  | Built   |
| Server-Side Rendering             | Fresh HTML per request, then full hydration.                        | Built   |
| React Server Components           | Server components ship ~0 JavaScript to the client.                 | Built   |
| Incremental Static Regeneration   | Static Site Generation with stale-while-revalidate at the edge.     | Diagram |
| Static Site Generation            | Free at request time, stale until rebuild.                          | Diagram |

Deep dives, cross-cutting demos:

| Demo                  | Tradeoff                                                                                                       | Status |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| Hydration visualizer  | The gap between "rendered" and "interactive", and how React Server Components close it.                        | Built  |
| Cache tier visualizer | Request memoization, data cache, full route cache, router cache — live hit/miss.                               | Built  |
| Anti-pattern museum   | Bad pattern next to good pattern, measured deltas.                                                             | Built  |

`Diagram` = static explanation page (timeline + Next.js code + when to use), not an interactive demo.

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
