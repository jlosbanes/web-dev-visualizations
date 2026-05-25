import ClientAggregator from "@/components/demos/ClientAggregator";

const RECORDS = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  category: ["ALPHA", "BETA", "GAMMA", "DELTA"][i % 4],
  value: Math.round((Math.sin(i * 0.37) * 0.5 + 0.5) * 1000) / 10,
}));

function aggregateOnServer() {
  const byCategory: Record<string, number> = {};
  for (const r of RECORDS) {
    byCategory[r.category] = (byCategory[r.category] || 0) + r.value;
  }
  return byCategory;
}

export default function AntiPatternsPage() {
  const goodAggregation = aggregateOnServer();

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Anti-Pattern Museum
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Side-by-side bad-pattern vs. good-pattern, with measured
          deltas. Each exhibit shows the same feature implemented two
          ways and names who pays the cost.
        </p>
      </section>

      <section className="space-y-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">
          AGGREGATING 1,000 RECORDS
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-xs tracking-widest text-zinc-700 dark:text-zinc-300">
              ✗ BAD · CLIENT-SIDE
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              All 1,000 records embedded in the client bundle. The
              browser receives them as JavaScript and iterates through
              every row to compute category totals on the main thread.
              Bundle weight grows linearly with dataset size.
            </p>
            <ClientAggregator />
          </div>

          <div className="space-y-2">
            <h3 className="text-xs tracking-widest text-zinc-700 dark:text-zinc-300">
              ✓ GOOD · SERVER-SIDE
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Totals computed on the server. Only the four final
              numbers are sent to the browser. Bundle stays small
              regardless of dataset size; the client renders instantly.
            </p>
            <div className="space-y-1 font-mono text-xs">
              {Object.entries(goodAggregation).map(([cat, sum]) => (
                <div
                  key={cat}
                  className="flex justify-between border-b border-zinc-100 py-1 dark:border-zinc-900"
                >
                  <span className="text-zinc-500">{cat}</span>
                  <span className="tabular-nums text-zinc-900 dark:text-zinc-100">
                    {sum.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">VERDICT</h2>
        <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          Identical numbers in both columns. The bad pattern ships ~50
          KB of JSON to compute four small sums; the good pattern ships
          four numbers. Apply this whenever the client doesn&apos;t
          need the raw data, only the result.
        </p>
        <p className="text-xs leading-relaxed text-zinc-500">
          JavaScript Weight in the metrics overlay reflects the combined cost
          of both columns on this page. To measure each in isolation,
          open DevTools → Sources and find the route&apos;s chunk for
          ClientAggregator.
        </p>
      </section>
    </main>
  );
}
