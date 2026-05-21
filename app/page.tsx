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
    name: "CSR",
    tradeoff: "Client pays. Empty shell, JS does everything.",
    x: 85,
    y: 12,
    status: "planned",
  },
  {
    id: "streaming",
    name: "Streaming SSR",
    tradeoff: "HTML chunks arrive as data resolves on the server.",
    x: 50,
    y: 35,
    status: "planned",
  },
  {
    id: "ssr",
    name: "SSR",
    tradeoff: "Fresh HTML per request, then full hydration.",
    x: 50,
    y: 55,
    status: "planned",
  },
  {
    id: "rsc",
    name: "RSC",
    tradeoff: "Server components ship ~0 JS to the client.",
    x: 20,
    y: 50,
    status: "planned",
  },
  {
    id: "isr",
    name: "ISR",
    tradeoff: "SSG with stale-while-revalidate at the edge.",
    x: 50,
    y: 75,
    status: "diagram",
  },
  {
    id: "ssg",
    name: "SSG",
    tradeoff: "Free at request time, stale until rebuild.",
    x: 50,
    y: 90,
    status: "diagram",
  },
];

const deepDives: Demo[] = [
  {
    id: "hydration",
    name: "Hydration visualizer",
    tradeoff:
      "The gap between 'rendered' and 'interactive', and how RSC closes it.",
    x: 0,
    y: 0,
    status: "planned",
  },
  {
    id: "cache",
    name: "Cache tier visualizer",
    tradeoff:
      "Request memoization, data cache, full route cache, router cache — live hit/miss.",
    x: 0,
    y: 0,
    status: "planned",
  },
  {
    id: "anti-patterns",
    name: "Anti-pattern museum",
    tradeoff: "Bad pattern next to good pattern, measured deltas.",
    x: 0,
    y: 0,
    status: "planned",
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

  const dotCls = filled
    ? "bg-zinc-900 dark:bg-zinc-100"
    : dimmed
      ? "border border-zinc-400 dark:border-zinc-600"
      : "border border-zinc-900 dark:border-zinc-100";

  const labelCls = dimmed
    ? "text-zinc-400 dark:text-zinc-600"
    : "text-zinc-900 dark:text-zinc-100";

  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
      style={{ left: `${demo.x}%`, top: `${demo.y}%` }}
      title={demo.tradeoff}
    >
      <span className={`block h-2.5 w-2.5 ${dotCls}`} />
      <span className={`text-xs ${labelCls}`}>{demo.name}</span>
    </div>
  );
}

function DemoRow({ demo, idWidth }: { demo: Demo; idWidth: string }) {
  return (
    <li className="flex items-baseline gap-4">
      <span
        className={`${idWidth} shrink-0 text-zinc-900 dark:text-zinc-100`}
      >
        {demo.name}
      </span>
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

          <div className="relative h-[420px] border border-zinc-200 dark:border-zinc-800">
            <span className="absolute left-3 top-2 text-[10px] tracking-widest text-zinc-500">
              ↑ NO SERVER WORK
            </span>
            <span className="absolute bottom-2 left-3 text-[10px] tracking-widest text-zinc-500">
              ↓ BUILD-TIME WORK
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
            X axis: how much JS the strategy ships to the client. Y axis: when
            the HTML is generated — build time (bottom) through request time
            (middle) to never on the server (top, CSR).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs tracking-widest text-zinc-500">
            RENDERING STRATEGIES
          </h2>
          <ul className="space-y-3 text-xs">
            {demos.map((d) => (
              <DemoRow key={d.id} demo={d} idWidth="w-32" />
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
