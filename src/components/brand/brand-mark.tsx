import Image from "next/image";

import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative size-9 shrink-0", className)}
    >
      <Image
        src="/swastik-logo.png"
        alt=""
        fill
        sizes="56px"
        className="object-contain"
      />
    </div>
  );
}
