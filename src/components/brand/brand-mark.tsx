import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-950 bg-linear-to-b from-zinc-800 to-zinc-950 text-teal-400 shadow-sm ring-1 ring-black/10 ring-inset dark:from-zinc-800 dark:to-zinc-900 dark:ring-white/10",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-[55%]"
      >
        <path d="M10 3.5h4a1 1 0 0 1 1 1V9h4.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H15v4.5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V15H4.5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1H9V4.5a1 1 0 0 1 1-1Z" />
      </svg>
    </div>
  );
}
