"use client";

import DemoContent from "@/components/demos/DemoContent";

export default function Body() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Client-Side Rendering
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Client-side rendering. The server emits a near-empty shell; JS
          downloads, executes, then renders the demo content below. Expect
          late FCP/LCP relative to SSR — the page is blank below the layout
          header until JS arrives. Hydration is closer to a fresh mount than
          reconciliation, since there&apos;s no server-rendered tree to
          hydrate against.
        </p>
      </section>
      <DemoContent />
    </main>
  );
}
