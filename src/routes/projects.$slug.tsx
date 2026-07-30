import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { ToolPill } from "@/components/site/ToolPill";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getProject, projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: p
        ? [
            { title: `${p.title} — Meet Korat` },
            { name: "description", content: p.elevatorPitch },
            { property: "og:title", content: `${p.title} — Meet Korat` },
            { property: "og:description", content: p.elevatorPitch },
          ]
        : [{ title: "Case Study — Meet Korat" }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <p className="font-mono text-xs text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-medium">Case study not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-xl font-medium">Something went wrong</h1>
        <button onClick={reset} className="mt-4 text-sm underline">
          Try again
        </button>
      </div>
    </div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="min-h-screen px-3 sm:px-6 py-4 sm:py-6">
      <div className="paper mx-auto max-w-4xl rounded-3xl border border-border overflow-hidden">
        <SiteHeader />

        <article className="px-6 sm:px-12 py-12 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to projects
          </Link>

          <header className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {p.category}
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-tight">
              {p.title}
            </h1>
            <p className="mt-4 text-lg text-subtle-foreground leading-relaxed max-w-2xl">
              {p.elevatorPitch}
            </p>

            <dl className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Role
                </dt>
                <dd className="mt-1">{p.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1">{p.status}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Year
                </dt>
                <dd className="mt-1">{p.year}</dd>
              </div>
            </dl>
          </header>

          <div className="mt-10">
            <ProjectVisual
              label={p.title}
              variant="video"
              videoSrc={p.videoSrc}
              videoControls={Boolean(p.videoSrc)}
            />
          </div>

          <Section title="Metrics">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {p.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border bg-card px-4 py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-base font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Stack">
            <div className="flex flex-wrap gap-1.5">
              {p.tools.map((t) => (
                <ToolPill key={t}>{t}</ToolPill>
              ))}
            </div>
          </Section>

          <Section title="Problem">
            <p className="text-subtle-foreground leading-relaxed">{p.problem}</p>
          </Section>

          <Section title="Solution">
            <p className="text-subtle-foreground leading-relaxed">{p.solution}</p>
          </Section>

          <Section title="Architecture">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 overflow-x-auto">
              <div className="flex flex-wrap items-center gap-2">
                {p.flow.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg border border-border bg-subtle font-mono text-xs">
                      {s}
                    </div>
                    {i < p.flow.length - 1 && (
                      <span className="text-muted-foreground/60">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Key Engineering Decisions">
            <ul className="space-y-5">
              {p.keyDecisions.map((d) => (
                <li
                  key={d.title}
                  className="rounded-xl border border-border bg-card px-5 py-4"
                >
                  <p className="text-sm font-medium">{d.title}</p>
                  <p className="mt-1.5 text-sm text-subtle-foreground leading-relaxed">
                    {d.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Build Notes">
            <ul className="space-y-2.5">
              {p.buildNotes.map((b) => (
                <li key={b} className="flex gap-3 text-subtle-foreground">
                  <span className="text-muted-foreground/60 mt-2 h-1 w-1 rounded-full bg-current shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Results">
            <ul className="space-y-2.5">
              {p.result.map((b) => (
                <li key={b} className="flex gap-3 text-subtle-foreground">
                  <span className="text-muted-foreground/60 mt-2 h-1 w-1 rounded-full bg-current shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Why this matters">
            <ul className="space-y-2.5">
              {p.recruiterHighlights.map((b) => (
                <li key={b} className="flex gap-3 text-subtle-foreground">
                  <span className="text-muted-foreground/60 mt-2 h-1 w-1 rounded-full bg-current shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Gallery">
            <div className="grid sm:grid-cols-2 gap-4">
              <ProjectVisual label={`${p.title} 1`} variant="tools" />
              <ProjectVisual label={`${p.title} 2`} variant="content" />
            </div>
          </Section>

          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <Link
              to="/"
              className="font-mono text-xs text-subtle-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All projects
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              <span className="text-right">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Next case study
                </span>
                {next.title}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
