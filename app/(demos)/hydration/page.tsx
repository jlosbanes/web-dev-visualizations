"use client";

import { useState, useSyncExternalStore } from "react";

if (typeof window !== "undefined") {
  const start = performance.now();
  while (performance.now() - start < 2500) {
    // intentional main-thread block to delay hydration
  }
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function HydrationPage() {
  const hydrated = useHydrated();
  const [clicks, setClicks] = useState(0);

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Hydration Visualizer
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          The page is rendered immediately — you can read this — but the
          JS thread is artificially blocked for 2.5 seconds before React
          finishes hydration. Click the button below before the
          INTERACTIVE marker flips: nothing happens, because the button
          has no event handler yet. After hydration completes, clicks
          register. This is the gap every modern rendering innovation
          since 2020 has been attacking.
        </p>
      </section>

      <section className="space-y-2 border-y border-zinc-200 py-4 dark:border-zinc-800">
        <div className="flex items-baseline justify-between text-xs">
          <span className="tracking-widest text-zinc-500">HTML RENDERED</span>
          <span className="text-zinc-900 dark:text-zinc-100">
            ✓ visible immediately
          </span>
        </div>
        <div className="flex items-baseline justify-between text-xs">
          <span className="tracking-widest text-zinc-500">INTERACTIVE</span>
          <span
            className={
              hydrated
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 dark:text-zinc-600"
            }
          >
            {hydrated ? "✓ hydration complete" : "✗ waiting for JS"}
          </span>
        </div>
      </section>

      <button
        onClick={() => setClicks((c) => c + 1)}
        className="border border-zinc-200 px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
      >
        Try clicking · {clicks}
      </button>

      <p className="text-xs leading-relaxed text-zinc-500">
        Each successful click increments the counter. Before hydration,
        the button is just HTML — onClick isn&apos;t wired up. After
        hydration, React attaches the handler. The 2.5-second block above
        is module-level code that runs once when the client bundle
        evaluates, before React starts hydrating.
      </p>
    </main>
  );
}
