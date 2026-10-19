import { MessageCircleIcon, PhoneIcon } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Official clinic contact (see Knowledge.md → ENTITY: CLINIC).
const CLINIC_PHONE = "+918882162151";

export function SiteHeader() {
  return (
    <header className="bg-background/85 supports-backdrop-filter:bg-background/70 sticky top-0 z-20 shrink-0 border-b pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-3 px-4 sm:h-16 sm:px-6">
        <BrandMark className="sm:size-10" />
        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-foreground truncate text-[15px] leading-tight font-semibold sm:text-base">
            Swastik Clinic Assistant
          </h1>
          <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 truncate text-xs">
            <span className="relative flex size-2 shrink-0">
              <span className="bg-success/60 absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:hidden" />
              <span className="bg-success relative inline-flex size-2 rounded-full" />
            </span>
            <span className="font-mono text-[10.5px] font-medium tracking-wider uppercase">
              Online
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="hidden truncate sm:inline">
              Comprehensive Medical Care
            </span>
          </p>
        </div>
        <nav aria-label="Contact the clinic" className="flex items-center gap-2">
          <a
            href={`https://wa.me/${CLINIC_PHONE.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with the clinic on WhatsApp"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "bg-card size-9 rounded-full px-0 sm:w-auto sm:px-3.5",
            )}
          >
            <MessageCircleIcon />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href={`tel:${CLINIC_PHONE}`}
            aria-label="Call the clinic"
            className={cn(
              buttonVariants({ size: "lg" }),
              "size-9 rounded-full px-0 shadow-sm sm:w-auto sm:px-3.5",
            )}
          >
            <PhoneIcon />
            <span className="hidden sm:inline">Call clinic</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
