import { Suspense } from "react";
import CodeBlock from "@/components/CodeBlock";
import DemoContent from "@/components/demos/DemoContent";

async function DelayedDemo() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return <DemoContent />;
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">FETCHING…</h2>
      </div>
      <p className="text-xs text-zinc-500">
        Streaming: 1.5-second simulated fetch.
      </p>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Streaming Server-Side Rendering
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          The server starts sending HTML before all data is ready. The
          header and this description ship in the initial chunk; the
          table below is wrapped in a Suspense boundary with a
          1.5-second simulated fetch and arrives in a later chunk. Watch
          Time to First Byte stay low (first byte arrives fast) but
          Largest Contentful Paint wait for the table to stream in.
          Hydration happens selectively, after the table chunk arrives.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">IN NEXT.JS</h2>
        <CodeBlock filename="app/(demos)/streaming/page.tsx">
          {`import { Suspense } from 'react'
import DemoContent from '@/components/demos/DemoContent'

async function DelayedDemo() {
  await new Promise((r) => setTimeout(r, 1500))
  return <DemoContent />
}

export default function StreamingPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <DelayedDemo />
    </Suspense>
  )
}`}
        </CodeBlock>
        <p className="text-xs leading-relaxed text-zinc-500">
          <code>DelayedDemo</code> is an async Server Component — it can{" "}
          <code>await</code> directly in render. Wrapped in{" "}
          <code>Suspense</code>, Next sends the surrounding HTML
          immediately with the fallback in place, holds the response
          open, then streams the resolved table in a later chunk when
          the Promise settles. Real apps swap the artificial{" "}
          <code>setTimeout</code> for a real <code>fetch()</code> or
          database call.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">WHEN TO USE</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Pages where some data is slow but the shell can render
              fast.
            </span>{" "}
            The slow data resolves into a Suspense boundary; the user
            sees structure immediately and the slow part fills in.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              News feeds, social timelines, multi-source dashboards.
            </span>{" "}
            Stream the layout, navigation, and sidebar first; let the
            feed resolve in a later chunk.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Any Server-Side Rendering page where Time to First Byte
              matters
            </span>{" "}
            and at least one data source is on the critical path —
            streaming gets the shell to the browser without waiting on
            the slowest dependency.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">
          DON&apos;T USE WHEN
        </h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              All your data is fast.
            </span>{" "}
            The added complexity (Suspense boundaries, fallback
            components, streaming edge cases) buys nothing.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              The slow data IS the page.
            </span>{" "}
            If the only thing the user wants is the slow content,
            streaming the chrome around it doesn&apos;t help.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              You need a single fully-formed response.
            </span>{" "}
            For caching layers or downstream proxies that can&apos;t
            handle chunked transfer encoding.
          </li>
        </ul>
      </section>

      <Suspense fallback={<TableSkeleton />}>
        <DelayedDemo />
      </Suspense>
    </main>
  );
}
