import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { AutomationDetailPanel } from "@/components/site/AutomationDetailPanel";
import { AutomationMobileDetail } from "@/components/site/AutomationMobileDetail";
import { automations, automationStats, type Automation } from "@/lib/automations";
import { cn } from "@/lib/utils";

function AutomationListItem({
  a,
  selected,
  onSelect,
}: {
  a: Automation;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "group flex w-full flex-col gap-2 px-4 py-3.5 text-left transition-colors duration-200",
        "border-l-2",
        selected
          ? "border-l-foreground bg-foreground/[0.06]"
          : "border-l-transparent hover:bg-pill-hover",
      )}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <span
          className={cn(
            "font-medium text-sm leading-snug transition-transform duration-200",
            selected && "lg:translate-x-0.5",
          )}
        >
          {a.title}
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground tabular-nums">
          {a.metric}
        </span>
      </div>
      <span className="self-start font-mono text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-md border border-border bg-card">
        {a.category}
      </span>
    </button>
  );
}

export function AutomationGallery() {
  const [selectedId, setSelectedId] = useState(automations[0].id);
  const [mobileDetailId, setMobileDetailId] = useState<string | null>(null);

  const selected =
    automations.find((a) => a.id === selectedId) ?? automations[0];
  const mobileDetail =
    mobileDetailId != null
      ? (automations.find((a) => a.id === mobileDetailId) ?? null)
      : null;

  return (
    <section
      id="automations"
      className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <p className="section-label">03 — Automation Gallery</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Production workflows at scale.
            </h2>
            <p className="mt-3 text-subtle-foreground text-base leading-relaxed">
              Select a workflow to read the case study — problem, pipeline, and
              example outputs from each automation.
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            {automationStats.map((s) => (
              <div key={s.label} className="text-center sm:text-right">
                <p className="text-xl sm:text-2xl font-semibold tabular-nums">
                  {s.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        {/* Desktop: sidebar + detail panel */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(280px,320px)_minmax(0,1fr)] lg:gap-6 lg:items-start">
          <aside className="sticky top-[4.5rem] self-start max-h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-border bg-card">
            <div className="scrollbar-sidebar overflow-y-auto max-h-[calc(100vh-6rem)] divide-y divide-border">
              {automations.map((a) => (
                <AutomationListItem
                  key={a.id}
                  a={a}
                  selected={selectedId === a.id}
                  onSelect={() => setSelectedId(a.id)}
                />
              ))}
            </div>
          </aside>

          {/*
            All eight detail panels are rendered server-side and toggled with the
            `hidden` attribute instead of swapping one panel in and out. The
            visible result is identical, but the full problem/workflow/outcome
            text for every automation now reaches the HTML, where crawlers and
            LLMs can read it.
          */}
          <div>
            {automations.map((a) => (
              <div key={a.id} hidden={a.id !== selected.id}>
                <AutomationDetailPanel automation={a} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: list only; detail opens full-screen overlay */}
        <div className="lg:hidden rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {automations.map((a) => (
            <AutomationListItem
              key={a.id}
              a={a}
              selected={mobileDetailId === a.id}
              onSelect={() => setMobileDetailId(a.id)}
            />
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground text-center">
          Additional private client workflows available upon request.
        </p>
      </Reveal>

      {mobileDetail && (
        <AutomationMobileDetail
          automation={mobileDetail}
          onBack={() => setMobileDetailId(null)}
        />
      )}
    </section>
  );
}
