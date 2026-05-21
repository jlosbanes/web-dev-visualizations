import Link from "next/link";
import MetricsOverlay from "@/components/MetricsOverlay";

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex-1 bg-white font-mono text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="flex items-baseline justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <Link
            href="/"
            className="text-xs tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            ← BACK TO SPECTRUM
          </Link>
          <span className="text-xs text-zinc-500">v0.1.0</span>
        </header>
        {children}
      </div>
      <MetricsOverlay />
    </div>
  );
}
