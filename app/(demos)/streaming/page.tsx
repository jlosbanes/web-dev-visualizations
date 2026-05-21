import { Suspense } from "react";
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
          The server starts sending HTML before all data is ready. The header
          and this description ship in the initial chunk; the table below is
          wrapped in a Suspense boundary with a 1.5-second simulated fetch
          and arrives in a later chunk. Watch TTFB stay low (first byte
          arrives fast) but LCP wait for the table to stream in. Hydration
          happens selectively, after the table chunk arrives.
        </p>
      </section>
      <Suspense fallback={<TableSkeleton />}>
        <DelayedDemo />
      </Suspense>
    </main>
  );
}
