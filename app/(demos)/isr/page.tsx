export default function ISRPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Incremental Static Regeneration
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Static Site Generation with stale-while-revalidate. The page
          is pre-rendered like Static Site Generation, but Next can mark
          it stale on a schedule (or on demand) and regenerate it in the
          background. The first request after invalidation gets the
          stale version instantly; the server regenerates in the
          background; subsequent requests get the fresh version. No
          user ever waits for a rebuild.
        </p>
      </section>

      <section className="space-y-3 border-y border-zinc-200 py-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">TIMELINE</h2>
        <div className="space-y-1 font-mono text-xs text-zinc-700 dark:text-zinc-300">
          <div>BUILD TIME    │ HTML pre-generated</div>
          <div>REQUEST t=0s  │ Served stale (instant)</div>
          <div>REQUEST t=30s │ Served stale; regenerate in background</div>
          <div>REQUEST t=31s │ Served fresh HTML</div>
          <div>REQUEST t=60s │ Stale again; regenerate; loop</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">IN NEXT.JS</h2>
        <pre className="overflow-x-auto border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-950">
          {`// app/article/[slug]/page.tsx

// Revalidate every 60 seconds.
export const revalidate = 60

export default async function Article({ params }) {
  const article = await fetchArticle(params.slug)
  return <ArticleBody article={article} />
}

// Or on-demand, from a webhook:
// import { revalidatePath } from 'next/cache'
// revalidatePath('/article/' + slug)`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">WHEN TO USE</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              High-traffic pages with content that updates periodically.
            </span>{" "}
            News articles, product pages, leaderboards.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Content that should never make the user wait for a rebuild.
            </span>{" "}
            Incremental Static Regeneration gets you fresh content
            without on-demand rendering cost.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">TRADEOFFS</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              First request after invalidation is stale.
            </span>{" "}
            Acceptable for most content; not acceptable for strongly
            consistent reads (e.g., post-purchase confirmations).
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Requires CDN or server cooperation.
            </span>{" "}
            Works on Vercel, AWS, etc.; self-hosting requires your CDN
            to respect cache headers and on-demand invalidation.
          </li>
        </ul>
      </section>
    </main>
  );
}
