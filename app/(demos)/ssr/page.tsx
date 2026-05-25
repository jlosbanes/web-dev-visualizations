import CodeBlock from "@/components/CodeBlock";
import DemoContent from "@/components/demos/DemoContent";

export default function SSRPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Server-Side Rendering
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Server-side rendering. The server renders the full HTML and
          ships it. The browser paints content immediately. JS then
          hydrates the React tree — that&apos;s the hydration cost in
          the overlay. The JS bundle is roughly the same as Client-Side
          Rendering; only the timing differs.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">IN NEXT.JS</h2>
        <CodeBlock filename="app/(demos)/ssr/page.tsx">
          {`import DemoContent from '@/components/demos/DemoContent'

export default function SSRPage() {
  return <DemoContent />
}`}
        </CodeBlock>
        <p className="text-xs leading-relaxed text-zinc-500">
          No special syntax. App Router renders server-side by default.
          Because <code>DemoContent</code> is marked{" "}
          <code>&apos;use client&apos;</code>, its initial HTML is rendered
          on the server and shipped in the response; React then hydrates
          it on the client, wiring up the filter input&apos;s state and
          event handlers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">WHEN TO USE</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Public pages where indexing matters and content varies per
              request.
            </span>{" "}
            E-commerce product pages with personalized recommendations,
            search results, user profiles.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Pages that need fresh data on every load.
            </span>{" "}
            Dashboards, real-time feeds, anything where stale content is
            actively wrong.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Authenticated experiences with server-rendered
              personalization.
            </span>{" "}
            Render the user&apos;s context once on the server, ship the
            HTML, hydrate — fast first paint with personalized content.
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
              Content rarely changes.
            </span>{" "}
            Static Site Generation or Incremental Static Regeneration is
            dramatically cheaper per request.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Server cost matters at scale.
            </span>{" "}
            Every request pays the full render cost; cached static output
            wins on cost-per-request.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              A slow data dependency holds back First Contentful Paint.
            </span>{" "}
            Wrap the slow part in a Suspense boundary and use Streaming
            Server-Side Rendering instead.
          </li>
        </ul>
      </section>

      <DemoContent />
    </main>
  );
}
