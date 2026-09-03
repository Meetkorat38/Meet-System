import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { ToolPill } from "@/components/site/ToolPill";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
  variant: "video" | "tools" | "content" | "screenshot";
};

export function ProjectCard({ project: p, index, variant }: Props) {
  const flip = index % 2 === 1;

  return (
    <article className="interactive-card rounded-2xl border border-border bg-card overflow-hidden">
      <div className="grid lg:grid-cols-2 lg:items-center">
        {/* Visual - constrained height so text column balances */}
        <div
          className={`p-4 sm:p-5 lg:p-6 ${flip ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="overflow-hidden rounded-xl">
            <ProjectVisual
              label={p.title}
              variant={variant}
              imageSrc={p.thumbnailSrc}
              animation={p.animation}
              videoSrc={p.videoSrc}
              videoControls={Boolean(p.videoSrc)}
              preferAnimation
              className="!aspect-[16/9]"
            />
          </div>
        </div>

        {/* Text - trimmed content */}
        <div
          className={`flex flex-col justify-center px-5 sm:px-6 pb-6 lg:py-8 lg:px-8 ${
            flip ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <p className="section-label">
            {String(index + 1).padStart(2, "0")} · {p.category}
          </p>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
            {p.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-subtle-foreground leading-relaxed">
            {p.oneLiner}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {p.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <p className="text-sm font-medium mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tools.slice(0, 4).map((t) => (
              <ToolPill key={t}>{t}</ToolPill>
            ))}
          </div>

          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="mt-5 self-start w-fit inline-flex items-center gap-2 h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/88 transition-all duration-200 group/btn hover:gap-2.5"
          >
            Case study
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
