export default function CodeBlock({
  filename,
  children,
}: {
  filename?: string;
  children: string;
}) {
  return (
    <div className="overflow-hidden border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      {filename && (
        <div className="border-b border-zinc-200 px-3 py-1.5 text-[10px] tracking-widest text-zinc-500 dark:border-zinc-800">
          {filename}
        </div>
      )}
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </pre>
    </div>
  );
}
