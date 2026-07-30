import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ToolPill } from "@/components/site/ToolPill";
import {
  AutomationAssetPreview,
  AutomationAssetStrip,
} from "@/components/site/AutomationAssetPreview";
import type { Automation } from "@/lib/automations";
import { cn } from "@/lib/utils";

type Props = {
  automation: Automation;
  className?: string;
  /** Removes card chrome — used in full-screen mobile detail */
  fullscreen?: boolean;
};

export function AutomationDetailPanel({
  automation,
  className,
  fullscreen = false,
}: Props) {
  const [assetId, setAssetId] = useState<string>("");

  useEffect(() => {
    if (automation.assets[0]) {
      setAssetId(automation.assets[0].id);
    } else {
      setAssetId("");
    }
  }, [automation.id]);

  const active =
    automation.assets.find((a) => a.id === assetId) ?? automation.assets[0];
  const selectedId = assetId || (automation.assets[0]?.id ?? "");
  const isMediaAsset =
    active?.type === "video" || active?.type === "audio";
  const isPortraitVideo =
    active?.type === "video" && active.aspect === "portrait";

  const total = automation.assets.length;
  const activeIndex = Math.max(
    0,
    automation.assets.findIndex((a) => a.id === selectedId),
  );
  const goTo = (i: number) => {
    const next = automation.assets[((i % total) + total) % total];
    if (next) setAssetId(next.id);
  };

  return (
    <article
      key={automation.id}
      className={cn(
        "animate-fade-in",
        !fullscreen && "rounded-2xl border border-border bg-card overflow-hidden",
        className,
      )}
    >
      <div className={cn("flex flex-col", fullscreen ? "px-0 py-0" : "p-5 sm:p-6 lg:p-8")}>
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <span className="section-label">{automation.category}</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {automation.metric}
            </span>
          </div>

          <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
            {automation.title}
          </h3>
          <p className="mt-2 text-sm text-subtle-foreground leading-relaxed max-w-2xl">
            {automation.description}
          </p>
        </header>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          {automation.flow.map((step, i) => (
            <span key={`${step}-${i}`} className="flex items-center gap-1.5">
              <span className="px-2 py-1 rounded-md border border-border bg-card">
                {step}
              </span>
              {i < automation.flow.length - 1 && <span>→</span>}
            </span>
          ))}
        </div>

        {active && (
          <section className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <p className="section-label">Example outputs</p>
              {total > 1 && (
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                  {activeIndex + 1} / {total}
                </span>
              )}
            </div>
            <div
              className={cn(
                "relative mt-3 w-full",
                isPortraitVideo
                  ? "max-w-[260px] mx-auto"
                  : isMediaAsset
                    ? "max-w-lg mx-auto"
                    : "max-w-2xl mx-auto",
              )}
            >
              <div
                className={cn(
                  isPortraitVideo
                    ? "overflow-hidden rounded-xl"
                    : isMediaAsset && "max-h-[240px] overflow-hidden rounded-xl",
                )}
              >
                <AutomationAssetPreview asset={active} />
              </div>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label="Previous output"
                    className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md ring-1 ring-border backdrop-blur transition-transform hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    aria-label="Next output"
                    className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md ring-1 ring-border backdrop-blur transition-transform hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
            {total > 1 && (
              <div className="mt-4">
                <AutomationAssetStrip
                  assets={automation.assets}
                  selectedId={selectedId}
                  onSelect={setAssetId}
                />
              </div>
            )}
          </section>
        )}

        <div className="mt-8 space-y-4 text-sm">
          <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
            <p className="section-label">Problem</p>
            <p className="mt-1.5 text-subtle-foreground leading-relaxed">
              {automation.problem}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
            <p className="section-label">Workflow</p>
            <p className="mt-1.5 text-subtle-foreground leading-relaxed">
              {automation.workflow}
            </p>
          </div>
          {automation.architecture && automation.architecture.length > 0 && (
            <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
              <p className="section-label">Architecture</p>
              <ol className="mt-2.5 space-y-2.5">
                {automation.architecture.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3 leading-relaxed text-subtle-foreground"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-[10px] tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="rounded-xl border border-border bg-foreground text-background px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider opacity-70">
              Outcome
            </p>
            <p className="mt-1.5 leading-relaxed">{automation.outcome}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {automation.tags.map((t) => (
            <ToolPill key={t}>{t}</ToolPill>
          ))}
        </div>

        {automation.links && automation.links.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {automation.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  l.primary
                    ? "border border-foreground bg-foreground text-background shadow-sm hover:opacity-90"
                    : "border border-border bg-card hover:bg-pill-hover",
                )}
              >
                {l.primary && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-background" />
                  </span>
                )}
                <ExternalLink className="h-3.5 w-3.5" />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
