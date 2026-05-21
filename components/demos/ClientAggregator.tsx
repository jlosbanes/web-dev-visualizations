"use client";

const RECORDS = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  category: ["ALPHA", "BETA", "GAMMA", "DELTA"][i % 4],
  value: Math.round((Math.sin(i * 0.37) * 0.5 + 0.5) * 1000) / 10,
}));

export default function ClientAggregator() {
  const aggregated: Record<string, number> = {};
  for (const r of RECORDS) {
    aggregated[r.category] = (aggregated[r.category] || 0) + r.value;
  }

  return (
    <div className="space-y-1 font-mono text-xs">
      {Object.entries(aggregated).map(([cat, sum]) => (
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
  );
}
