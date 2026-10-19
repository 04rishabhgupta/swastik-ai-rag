import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#0a5a73] to-[#063a4c] shadow-sm ring-1 ring-black/5",
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
