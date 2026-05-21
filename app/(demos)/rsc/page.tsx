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
          subtree. Compare JS WEIGHT in the overlay against Server-Side
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
      <ServerTable />
    </main>
  );
}
