import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ToolPill } from "@/components/site/ToolPill";
import { Reveal } from "@/components/site/Reveal";
import {
  experience,
  toolGroups,
  currentLearning,
  profile,
} from "@/lib/profile";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "learning", label: "Learning" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AboutSection() {
  const [tab, setTab] = useState<TabId>("experience");
  const [expanded, setExpanded] = useState(false);

  const allSkills = toolGroups.flatMap((g) => g.items);

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32">
      <Reveal>
        <div className="max-w-2xl">
          <p className="section-label">02 — Background</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Experience &amp; Stack
          </h2>
          <p className="mt-3 text-subtle-foreground text-base leading-relaxed">
            {profile.identity.split(".").slice(0, 2).join(".")}.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-border">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex-1 sm:flex-none px-5 py-3.5 text-sm font-medium transition-colors relative",
                  tab === id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
                {tab === id && (
                  <span className="absolute bottom-0 left-4 right-4 sm:left-5 sm:right-5 h-0.5 bg-foreground rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-8">
            {tab === "experience" && experience.map((e) => (
              <div key={e.role}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-subtle-foreground">
                  {e.orgUrl ? (
                    <a
                      href={e.orgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
                    >
                      {e.org}
                    </a>
                  ) : (
                    e.org
                  )}
                </p>
                <p className="mt-4 text-sm text-subtle-foreground leading-relaxed">
                  Building production AI apps, workflow automation, content
                  systems, Voice AI, and cloud deployments across the full stack.
                </p>
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {expanded ? "Hide details" : "View responsibilities"}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      expanded && "rotate-180",
                    )}
                  />
                </button>
                <ul
                  className={cn(
                    "mt-3 space-y-2 text-sm text-subtle-foreground overflow-hidden transition-all duration-300",
                    expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-2 pl-1">
                      <span className="text-muted-foreground">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {tab === "skills" && (
              <div>
                <p className="text-sm text-subtle-foreground mb-5">
                  {allSkills.length} tools across orchestration, voice AI, cloud,
                  and product engineering.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {allSkills.map((skill) => (
                    <ToolPill key={skill}>{skill}</ToolPill>
                  ))}
                </div>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {toolGroups.map((g) => (
                    <div
                      key={g.group}
                      className="rounded-xl border border-border bg-subtle/50 px-4 py-3"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {g.group}
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {g.items.length} tools
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "learning" && (
              <div>
                <p className="text-sm text-subtle-foreground mb-5">
                  Actively deepening cloud AI infrastructure and serverless
                  patterns.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentLearning.map((item) => (
                    <ToolPill key={item}>{item}</ToolPill>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
