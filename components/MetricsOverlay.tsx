"use client";

import { useEffect, useState } from "react";

type Metrics = {
  ttfb?: number;
  fcp?: number;
  lcp?: number;
  cls?: number;
  inp?: number;
  hydration?: number;
  jsWeight?: number;
};

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export default function MetricsOverlay() {
  const [metrics, setMetrics] = useState<Metrics>({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const set = (key: keyof Metrics, value: number) =>
      setMetrics((m) => ({ ...m, [key]: value }));

    const observers: PerformanceObserver[] = [];

    const navEntries = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    if (navEntries[0]) {
      set("ttfb", navEntries[0].responseStart - navEntries[0].requestStart);
    }

    try {
      const o = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === "first-contentful-paint") set("fcp", e.startTime);
        }
      });
      o.observe({ type: "paint", buffered: true });
      observers.push(o);
    } catch {}

    try {
      const o = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) set("lcp", last.startTime);
      });
      o.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(o);
    } catch {}

    let cls = 0;
    try {
      const o = new PerformanceObserver((list) => {
        for (const e of list.getEntries() as LayoutShiftEntry[]) {
          if (!e.hadRecentInput) {
            cls += e.value;
            set("cls", cls);
          }
        }
      });
      o.observe({ type: "layout-shift", buffered: true });
      observers.push(o);
    } catch {}

    let worstInp = 0;
    try {
      const o = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.duration > worstInp) {
            worstInp = e.duration;
            set("inp", worstInp);
          }
        }
      });
      o.observe({
        type: "event",
        buffered: true,
        durationThreshold: 16,
      } as PerformanceObserverInit & { durationThreshold: number });
      observers.push(o);
    } catch {}

    try {
      const o = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === "perf:demo-mounted") {
            const nav = performance.getEntriesByType(
              "navigation",
            )[0] as PerformanceNavigationTiming | undefined;
            if (nav) set("hydration", e.startTime - nav.responseEnd);
          }
        }
      });
      o.observe({ type: "mark", buffered: true });
      observers.push(o);
    } catch {}

    const computeJsWeight = () => {
      const entries = performance.getEntriesByType(
        "resource",
      ) as PerformanceResourceTiming[];
      const total = entries
        .filter(
          (e) =>
            /\.(m?js)(\?|$)/.test(e.name) || e.initiatorType === "script",
        )
        .reduce(
          (sum, e) => sum + (e.encodedBodySize || e.transferSize || 0),
          0,
        );
      set("jsWeight", total);
    };
    if (document.readyState === "complete") {
      computeJsWeight();
    } else {
      window.addEventListener("load", computeJsWeight, { once: true });
    }
    const t = setTimeout(computeJsWeight, 2500);

    return () => {
      observers.forEach((o) => o.disconnect());
      clearTimeout(t);
    };
  }, []);

  const fmtMs = (v?: number) => (v === undefined ? "—" : `${Math.round(v)} ms`);
  const fmtCls = (v?: number) => (v === undefined ? "—" : v.toFixed(3));
  const fmtKb = (v?: number) =>
    v === undefined ? "—" : `${(v / 1024).toFixed(1)} kB`;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 border border-zinc-200 bg-white font-mono text-xs dark:border-zinc-800 dark:bg-black">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between border-b border-zinc-200 px-3 py-2 tracking-widest text-zinc-500 hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-zinc-100"
      >
        <span>METRICS</span>
        <span>{collapsed ? "+" : "−"}</span>
      </button>
      {!collapsed && (
        <dl>
          <Row label="TTFB" value={fmtMs(metrics.ttfb)} />
          <Row label="FCP" value={fmtMs(metrics.fcp)} />
          <Row label="LCP" value={fmtMs(metrics.lcp)} />
          <Row label="CLS" value={fmtCls(metrics.cls)} />
          <Row label="INP" value={fmtMs(metrics.inp)} />
          <Row label="HYDRATION" value={fmtMs(metrics.hydration)} />
          <Row label="JS WEIGHT" value={fmtKb(metrics.jsWeight)} />
        </dl>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-zinc-100 px-3 py-1 first:border-t-0 dark:border-zinc-900">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-zinc-900 dark:text-zinc-100">{value}</dd>
    </div>
  );
}
