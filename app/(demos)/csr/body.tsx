"use client";

import CodeBlock from "@/components/CodeBlock";
import DemoContent from "@/components/demos/DemoContent";

export default function Body() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Client-Side Rendering
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Client-side rendering. The server emits a near-empty shell;
          JavaScript downloads, executes, then renders the demo content
          below. Expect late First Contentful Paint and Largest Contentful
          Paint relative to Server-Side Rendering — the page is blank
          below the layout header until JavaScript arrives. Hydration is
          closer to a fresh mount than reconciliation, since there&apos;s
          no server-rendered tree to hydrate against.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">IN NEXT.JS</h2>
        <CodeBlock filename="app/(demos)/csr/page.tsx">
          {`'use client'

import dynamic from 'next/dynamic'

const Body = dynamic(() => import('./body'), {
  ssr: false,
  loading: () => null,
})

export default function CSRPage() {
  return <Body />
}`}
        </CodeBlock>
        <p className="text-xs leading-relaxed text-zinc-500">
          App Router server-renders everything by default. The escape hatch
          is <code>next/dynamic</code> with <code>ssr: false</code>: Next
          skips server rendering for the imported module and instead emits
          a placeholder. The browser receives near-empty HTML for this
          route, downloads the bundle, then renders the body component
          fresh on the client.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">WHEN TO USE</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Internal tools and admin dashboards.
            </span>{" "}
            Search engine indexing doesn&apos;t matter; users are
            authenticated; a brief loading state is acceptable.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Highly interactive apps with little static content.
            </span>{" "}
            Whiteboards, design tools, editors — where the entire
            experience IS the JavaScript bundle.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Bandwidth- or compute-constrained server environments.
            </span>{" "}
            Push render cost to the client instead of paying for it on
            every request.
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
              Search engine indexing matters.
            </span>{" "}
            Crawlers see an empty body until they execute JavaScript,
            which most do unreliably or not at all.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Largest Contentful Paint matters.
            </span>{" "}
            The user stares at a blank screen until JavaScript arrives,
            parses, executes, and renders.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              The audience is on slow devices or networks.
            </span>{" "}
            Client rendering punishes the bottom of the device curve
            the hardest.
          </li>
        </ul>
      </section>

      <DemoContent />
    </main>
  );
}
