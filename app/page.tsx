import Link from "next/link";

type Status = "planned" | "built" | "diagram";

type Demo = {
  id: string;
  name: string;
  tradeoff: string;
  x: number;
  y: number;
  status: Status;
  href?: string;
};

const demos: Demo[] = [
  {
    id: "csr",
    name: "Client-Side Rendering",
    tradeoff: "Client pays. Empty shell, JS does everything.",
    x: 85,
    y: 88,
    status: "built",
    href: "/csr",
  },
  {
    id: "streaming",
    name: "Streaming Server-Side Rendering",
    tradeoff: "HTML chunks arrive as data resolves on the server.",
    x: 50,
    y: 65,
    status: "built",
    href: "/streaming",
  },
  {
    id: "ssr",
    name: "Server-Side Rendering",
    tradeoff: "Fresh HTML per request, then full hydration.",
    x: 50,
    y: 50,
    status: "built",
    href: "/ssr",
  },
  {
    id: "rsc",
    name: "React Server Components",
    tradeoff: "Server components ship ~0 JS to the client.",
    x: 20,
    y: 50,
    status: "built",
    href: "/rsc",
  },
  {
    id: "isr",
    name: "Incremental Static Regeneration",
    tradeoff:
      "Static Site Generation with stale-while-revalidate at the edge.",
    x: 50,
    y: 25,
    status: "diagram",
    href: "/isr",
  },
  {
    id: "ssg",
    name: "Static Site Generation",
    tradeoff: "Free at request time, stale until rebuild.",
    x: 50,
    y: 10,
    status: "diagram",
    href: "/ssg",
  },
];

const deepDives: Demo[] = [
  {
    id: "hydration",
    name: "Hydration visualizer",
    tradeoff:
      "The gap between 'rendered' and 'interactive', and how React Server Components close it.",
    x: 0,
    y: 0,
    status: "built",
    href: "/hydration",
  },
  {
    id: "cache",
    name: "Cache tier visualizer",
    tradeoff:
      "Request memoization, data cache, full route cache, router cache — live hit/miss.",
    x: 0,
    y: 0,
    status: "built",
    href: "/cache",
  },
  {
    id: "anti-patterns",
    name: "Anti-pattern museum",
    tradeoff: "Bad pattern next to good pattern, measured deltas.",
    x: 0,
    y: 0,
    status: "built",
    href: "/anti-patterns",
  },
];

function StatusBadge({ status }: { status: Status }) {
  const cls =
    status === "built"
      ? "text-zinc-900 dark:text-zinc-100"
      : status === "planned"
        ? "text-zinc-500 dark:text-zinc-400"
        : "text-zinc-400 dark:text-zinc-600";
  return (
    <span className={`text-[10px] tracking-widest ${cls}`}>
      {status.toUpperCase()}
    </span>
  );
}

function Dot({ demo }: { demo: Demo }) {
  const filled = demo.status === "built";
  const dimmed = demo.status === "diagram";
  const labelOnLeft = demo.x > 60;

  const dotCls = filled
    ? "bg-zinc-900 dark:bg-zinc-100"
    : dimmed
      ? "border border-zinc-400 dark:border-zinc-600"
      : "border border-zinc-900 dark:border-zinc-100";

  const labelCls = dimmed
    ? "text-zinc-400 dark:text-zinc-600"
    : "text-zinc-900 dark:text-zinc-100";

  const style: React.CSSProperties = {
    left: `${demo.x}%`,
    top: `${demo.y}%`,
    transform: labelOnLeft
      ? "translateY(-50%) translateX(calc(-100% + 5px))"
      : "translateY(-50%) translateX(-5px)",
  };

  const inner = (
    <div
      className={`flex items-center gap-2 ${labelOnLeft ? "flex-row-reverse" : ""}`}
    >
      <span className={`block h-2.5 w-2.5 shrink-0 ${dotCls}`} />
      <span className={`whitespace-nowrap text-xs ${labelCls}`}>
        {demo.name}
      </span>
    </div>
  );

  if (demo.href) {
    return (
      <Link
        href={demo.href}
        className="absolute hover:underline"
        style={style}
        title={demo.tradeoff}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className="absolute" style={style} title={demo.tradeoff}>
      {inner}
    </div>
  );
}

function DemoRow({ demo, idWidth }: { demo: Demo; idWidth: string }) {
  const name = demo.href ? (
    <Link
      href={demo.href}
      className={`${idWidth} shrink-0 text-zinc-900 hover:underline dark:text-zinc-100`}
    >
      {demo.name}
    </Link>
  ) : (
    <span className={`${idWidth} shrink-0 text-zinc-900 dark:text-zinc-100`}>
      {demo.name}
    </span>
  );

  return (
    <li className="flex items-baseline gap-4">
      {name}
      <span className="flex-1 leading-relaxed text-zinc-600 dark:text-zinc-400">
        {demo.tradeoff}
      </span>
      <StatusBadge status={demo.status} />
    </li>
  );
}

export default function Home() {
  return (
    <div className="min-h-full bg-white font-mono text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
        <header className="flex items-baseline justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h1 className="text-sm tracking-widest">WEB-DEV-VISUALIZATIONS</h1>
          <span className="text-xs text-zinc-500">v0.1.0</span>
        </header>

        <section>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Every modern rendering strategy is solving the same problem — fast
            HTML, real interactivity, minimal JS — with different tradeoff
            curves. Each demo here measures what it costs and who pays:
            server, network, or client.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs tracking-widest text-zinc-500">
            THE SPECTRUM
          </h2>

          <div className="relative h-105 border border-zinc-200 dark:border-zinc-800">
            <span className="absolute left-3 top-2 text-[10px] tracking-widest text-zinc-500">
              ↑ MORE SERVER WORK
            </span>
            <span className="absolute bottom-2 left-3 text-[10px] tracking-widest text-zinc-500">
              ↓ LESS SERVER WORK
            </span>
            <span className="absolute right-3 top-2 text-[10px] tracking-widest text-zinc-500">
              ← LESS JS
            </span>
            <span className="absolute bottom-2 right-3 text-[10px] tracking-widest text-zinc-500">
              MORE JS →
            </span>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 right-0 top-1/2 border-t border-dotted border-zinc-200 dark:border-zinc-800" />
              <div className="absolute bottom-0 left-1/2 top-0 border-l border-dotted border-zinc-200 dark:border-zinc-800" />
            </div>

            {demos.map((d) => (
              <Dot key={d.id} demo={d} />
            ))}
          </div>

          <p className="text-xs leading-relaxed text-zinc-500">
            X axis: how much JS the strategy ships to the client. Y axis: how
            much rendering the server does — none at the bottom (an empty
            shell, all work on the client), request-time rendering in the
            middle, fully built in advance at the top.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs tracking-widest text-zinc-500">
            HOW TO COMPARE
          </h2>
          <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            Click a{" "}
            <span className="text-zinc-900 dark:text-zinc-100">Built</span>{" "}
            strategy below to open its demo. A metrics overlay in the
            bottom-right reports TTFB, FCP, LCP, CLS, INP, hydration time,
            and JS weight. Most rendering-strategy demos use a shared
            100-row data table so their deltas are directly comparable; the
            deep dives focus on cross-cutting concepts.
          </p>
          <ul className="space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                Hard-refresh each demo.
              </span>{" "}
              Client-side navigation reuses the original navigation entry, so
              hydration and load timings won&apos;t reset between routes.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                Disable cache in DevTools
              </span>{" "}
              and throttle network (e.g., Slow 4G) to make differences visible
              on localhost.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                Production deltas are larger than dev.
              </span>{" "}
              Dev mode ships unminified JS with HMR overhead — JS weight will
              be 5–10× a production build.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs tracking-widest text-zinc-500">
            DEMO-SPECIFIC CAVEATS
          </h2>
          <ul className="space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                Hydration visualizer.
              </span>{" "}
              The 2.5-second block is module-level code in a{" "}
              <code>&apos;use client&apos;</code> file — it runs once when
              the client bundle evaluates, before React hydrates. After
              editing the file, hard-refresh to evaluate the module from
              scratch.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                Cache tier visualizer.
              </span>{" "}
              Request Memoization is shown with a plain function (three
              different values) to make the contrast obvious — swapping in{" "}
              <code>fetch()</code> would dedupe to a single value. Full
              Route Cache requires a production build (
              <code>next build &amp;&amp; next start</code>); dev mode
              regenerates every request.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                Anti-pattern museum.
              </span>{" "}
              JS WEIGHT reflects both columns combined on the page. To
              isolate the bad column&apos;s bundle cost, open DevTools →
              Sources and find the <code>ClientAggregator</code> chunk.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-100">
                React Server Components.
              </span>{" "}
              The JS WEIGHT delta vs. Server-Side Rendering is real but
              modest — the filter input is the only client JS being
              removed. The lesson is conceptual (this table&apos;s render
              code never reaches the client), not a dramatic number.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs tracking-widest text-zinc-500">
            RENDERING STRATEGIES
          </h2>
          <ul className="space-y-3 text-xs">
            {demos.map((d) => (
              <DemoRow key={d.id} demo={d} idWidth="w-72" />
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs tracking-widest text-zinc-500">
            DEEP DIVES
          </h2>
          <ul className="space-y-3 text-xs">
            {deepDives.map((d) => (
              <DemoRow key={d.id} demo={d} idWidth="w-44" />
            ))}
          </ul>
        </section>

        <footer className="flex justify-between border-t border-zinc-200 pt-4 text-[10px] tracking-widest text-zinc-500 dark:border-zinc-800">
          <span>NEXT.JS 16 · REACT 19 · TAILWIND V4</span>
          <span>JGLOSBANES</span>
        </footer>
      </div>
    </div>
  );
}
