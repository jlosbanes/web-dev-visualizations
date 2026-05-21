"use client";

import { useEffect, useState } from "react";

const ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${String(i + 1).padStart(3, "0")}`,
  category: ["ALPHA", "BETA", "GAMMA", "DELTA"][i % 4],
  value: Math.round((Math.sin(i * 0.37) * 0.5 + 0.5) * 1000) / 10,
}));

export default function DemoContent() {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (performance.getEntriesByName("perf:demo-mounted", "mark").length === 0) {
      performance.mark("perf:demo-mounted");
    }
  }, []);

  const q = filter.trim().toLowerCase();
  const rows = q
    ? ITEMS.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q),
      )
    : ITEMS;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">
          DATA TABLE · 100 ROWS
        </h2>
        <input
          type="text"
          placeholder="filter…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-zinc-200 bg-transparent px-2 py-1 font-mono text-xs focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:focus:border-zinc-100"
        />
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-zinc-500">
            <th className="w-24 pb-2 text-left font-normal tracking-widest">
              NAME
            </th>
            <th className="w-32 pb-2 text-left font-normal tracking-widest">
              CATEGORY
            </th>
            <th className="pb-2 text-right font-normal tracking-widest">
              VALUE
            </th>
          </tr>
        </thead>
        <tbody className="text-zinc-700 dark:text-zinc-300">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-zinc-100 dark:border-zinc-900"
            >
              <td className="py-1.5">{row.name}</td>
              <td className="py-1.5 text-zinc-500">{row.category}</td>
              <td className="py-1.5 text-right tabular-nums">
                {row.value.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="py-4 text-xs text-zinc-500">No matches.</p>
      )}
    </div>
  );
}
