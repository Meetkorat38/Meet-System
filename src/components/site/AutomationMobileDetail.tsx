import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { AutomationDetailPanel } from "@/components/site/AutomationDetailPanel";
import type { Automation } from "@/lib/automations";
import { cn } from "@/lib/utils";

type Props = {
  automation: Automation;
  onBack: () => void;
  className?: string;
};

export function AutomationMobileDetail({ automation, onBack, className }: Props) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.removeProperty("overflow");
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      body.style.removeProperty("width");
      window.scrollTo(0, scrollY);
    };
  }, []);

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex min-h-0 flex-col bg-background",
        "animate-in slide-in-from-right duration-300 fade-in-0",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={automation.title}
    >
      <header className="sticky top-0 z-10 shrink-0 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All workflows
          </button>
        </div>
      </header>

      <div className="scrollbar-minimal touch-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-6xl px-4 py-4 pb-8">
          <AutomationDetailPanel automation={automation} fullscreen />
        </div>
      </div>
    </div>,
    document.body,
  );
}
