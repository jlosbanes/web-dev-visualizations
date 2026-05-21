import DemoContent from "@/components/demos/DemoContent";

export default function SSRPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest">
          Server-Side Rendering
        </h1>
        <p className="text-xs leading-relaxed text-zinc-500">
          Server-side rendering. The server renders the full HTML and ships
          it. The browser paints content immediately. JS then hydrates the
          React tree — that&apos;s the hydration cost in the overlay. The JS
          bundle is roughly the same as CSR; only the timing differs.
        </p>
      </section>
      <DemoContent />
    </main>
  );
}
