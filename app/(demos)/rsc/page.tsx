import CodeBlock from "@/components/CodeBlock";
import ServerTable from "@/components/demos/ServerTable";

export default function RSCPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          React Server Components
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          The table below is a Server Component — its render code never
          ships to the browser. There&apos;s no <code>&apos;use
          client&apos;</code> directive on it and no hydration for the
          subtree. Compare JavaScript Weight in the overlay against Server-Side
          Rendering: the same visual table, but this version ships less
          JavaScript because the table&apos;s code stays on the server.
        </p>
        <p className="text-xs leading-relaxed text-zinc-500">
          No filter input on this demo — filtering a server-rendered
          table requires URL-based navigation through searchParams (the
          filter would be a tiny client &quot;island&quot; that updates
          the URL, triggering a server re-render). The focus here is
          bundle weight; the islands pattern is a separate concern.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">IN NEXT.JS</h2>
        <CodeBlock filename="components/demos/ServerTable.tsx">
          {`// No 'use client' directive — Server Component by default.

const ITEMS = [/* 100 rows */]

export default function ServerTable() {
  return (
    <table>
      {ITEMS.map((row) => (
        <tr key={row.id}>{/* ... */}</tr>
      ))}
    </table>
  )
}`}
        </CodeBlock>
        <p className="text-xs leading-relaxed text-zinc-500">
          The absence of <code>&apos;use client&apos;</code> is the whole
          mechanism. Next renders this component on the server and
          serializes the output (HTML and React Server Components
          payload) to the browser; the source code, the{" "}
          <code>ITEMS</code> array, and any imports stay on the server.
          To add an interactive piece (e.g., a filter input), wrap just
          that subtree in a Client Component &quot;island&quot; — the
          rest of the tree remains server-only.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">WHEN TO USE</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Data-heavy components that don&apos;t need interactivity.
            </span>{" "}
            Lists, tables, prose, formatted output — anywhere the
            display is the whole job.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Components with large server-only dependencies.
            </span>{" "}
            Markdown parsers, ORMs, sensitive API clients — they never
            touch the client bundle, so size and security don&apos;t
            matter the same way.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Anywhere you want zero client JavaScript by default.
            </span>{" "}
            Opting into interactivity (a Client Component island) makes
            the cost explicit at the boundary.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Any new App Router project.
            </span>{" "}
            Server Components are the default; Client Components are the
            exception.
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
              The component needs state, effects, or browser APIs.
            </span>{" "}
            <code>useState</code>, <code>useEffect</code>, refs,{" "}
            <code>window</code>, <code>document</code> — all
            client-only. Mark it <code>&apos;use client&apos;</code>.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              The component subscribes to client-side events.
            </span>{" "}
            Input handlers, scroll listeners, keyboard shortcuts — all
            need a Client Component.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              But you can mix freely.
            </span>{" "}
            Wrap just the interactive piece in a Client Component
            island; the surrounding tree stays server-only.
          </li>
        </ul>
      </section>

      <ServerTable />
    </main>
  );
}
