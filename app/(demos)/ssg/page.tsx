import CodeBlock from "@/components/CodeBlock";

export default function SSGPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Static Site Generation
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          HTML generated at build time. Once built, every request gets
          the same static file from a CDN — no server work, no database
          queries, no runtime cost. The fastest possible serve. The
          tradeoff: the page is frozen until you rebuild and redeploy.
        </p>
      </section>

      <section className="space-y-3 border-y border-zinc-200 py-4 dark:border-zinc-800">
        <h2 className="text-xs tracking-widest text-zinc-500">TIMELINE</h2>
        <div className="space-y-1 font-mono text-xs text-zinc-700 dark:text-zinc-300">
          <div>BUILD TIME  │ HTML generated, written to disk</div>
          <div>DEPLOY      │ HTML uploaded to CDN</div>
          <div>REQUEST 1   │ CDN serves cached HTML (no server hit)</div>
          <div>REQUEST N   │ CDN serves the same cached HTML</div>
          <div>REBUILD     │ New HTML generated, replaces old</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">IN NEXT.JS</h2>
        <CodeBlock filename="app/blog/[slug]/page.tsx">
          {`export async function generateStaticParams() {
  const posts = await fetchAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Post({ params }) {
  const post = await fetchPost(params.slug)
  return <Article post={post} />
}`}
        </CodeBlock>
        <p className="text-xs leading-relaxed text-zinc-500">
          By default, App Router routes are statically generated at
          build time if they don&apos;t read dynamic data per request.
          Static generation is the default — you opt out by reading
          request headers, cookies, or searchParams.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">WHEN TO USE</h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Marketing pages, docs, blog posts.
            </span>{" "}
            Content that changes on a deploy cadence, not per request.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Anywhere you need maximum speed and minimum cost.
            </span>{" "}
            Static files from a CDN cost ~nothing to serve.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs tracking-widest text-zinc-500">
          DON&apos;T USE WHEN
        </h2>
        <ul className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Content changes frequently.
            </span>{" "}
            Rebuilding the world on every content edit is expensive at
            scale — see Incremental Static Regeneration instead.
          </li>
          <li>
            <span className="text-zinc-900 dark:text-zinc-100">
              Content is user-specific.
            </span>{" "}
            Static Site Generation ships the same HTML to everyone —
            personalize via client hydration or pick a different
            strategy.
          </li>
        </ul>
      </section>
    </main>
  );
}
