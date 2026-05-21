import { unstable_cache } from "next/cache";

async function getCurrentTime(): Promise<number> {
  return Date.now();
}

const getCachedTime = unstable_cache(
  async () => Date.now(),
  ["cache-demo-time"],
  { revalidate: 60 },
);

export default async function CachePage() {
  const t1 = await getCurrentTime();
  await new Promise((r) => setTimeout(r, 5));
  const t2 = await getCurrentTime();
  await new Promise((r) => setTimeout(r, 5));
  const t3 = await getCurrentTime();

  const cachedTime = await getCachedTime();
  const cachedTimeAgain = await getCachedTime();

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Cache Tier Visualizer
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Next.js 16 has four cache tiers, each solving a different
          duplication problem. This page demonstrates two of them with
          live values; the other two are described below.
        </p>
      </section>

      <section className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">
          1 · REQUEST MEMOIZATION
        </h2>
        <p className="text-xs leading-relaxed text-zinc-500">
          Within a single server render, identical <code>fetch()</code>{" "}
          calls are deduplicated automatically. Below, a plain function
          (not <code>fetch</code>) is called three times — the three
          values differ because plain functions aren&apos;t memoized.
          If these were <code>fetch()</code> calls to the same URL,
          all three would return the same data.
        </p>
        <div className="space-y-1 font-mono text-xs">
          <div className="flex justify-between border-b border-zinc-100 py-1 dark:border-zinc-900">
            <span className="text-zinc-500">getCurrentTime() call 1</span>
            <span className="text-zinc-900 dark:text-zinc-100">{t1}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 py-1 dark:border-zinc-900">
            <span className="text-zinc-500">getCurrentTime() call 2</span>
            <span className="text-zinc-900 dark:text-zinc-100">{t2}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-zinc-500">getCurrentTime() call 3</span>
            <span className="text-zinc-900 dark:text-zinc-100">{t3}</span>
          </div>
        </div>
      </section>

      <section className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">
          2 · DATA CACHE
        </h2>
        <p className="text-xs leading-relaxed text-zinc-500">
          Persistent server-side cache across requests. The timestamp
          below is wrapped in <code>unstable_cache</code> with a
          60-second revalidation window. Refresh this page within 60
          seconds — the value stays the same. After 60 seconds, Next
          regenerates it on the next request.
        </p>
        <div className="space-y-1 font-mono text-xs">
          <div className="flex justify-between border-b border-zinc-100 py-1 dark:border-zinc-900">
            <span className="text-zinc-500">getCachedTime() call 1</span>
            <span className="text-zinc-900 dark:text-zinc-100">
              {cachedTime}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-zinc-500">getCachedTime() call 2</span>
            <span className="text-zinc-900 dark:text-zinc-100">
              {cachedTimeAgain}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">
          3 · FULL ROUTE CACHE
        </h2>
        <p className="text-xs leading-relaxed text-zinc-500">
          Next caches the full HTML and React Server Components payload
          for statically generated routes at build time. Subsequent
          requests get the cached output directly, bypassing server
          rendering entirely. Visible in production only
          (<code>next build &amp;&amp; next start</code>); dev mode
          regenerates every request.
        </p>
      </section>

      <section className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">
          4 · ROUTER CACHE
        </h2>
        <p className="text-xs leading-relaxed text-zinc-500">
          Client-side in-memory cache of React Server Components payloads
          for visited routes. Navigate to /ssr, then back to this page —
          Next serves the cached payload without a server roundtrip.
          Open DevTools → Network to see the difference: the first
          visit fetches; the back-nav doesn&apos;t. Cleared on hard
          refresh.
        </p>
      </section>
    </main>
  );
}
