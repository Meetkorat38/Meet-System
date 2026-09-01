/**
 * Markdown and JSON serializers for the agent-facing endpoints
 * (/llms.txt, /llms-full.txt, /api/profile.json, /md/projects/<slug>.md).
 *
 * These render the same data the pages render — no separate copy to maintain.
 */
import { absolute, SITE_URL } from "@/lib/site";
import { profile, experience, toolGroups, currentLearning, faq } from "@/lib/profile";
import { projects, type Project } from "@/lib/projects";
import { automations } from "@/lib/automations";

const bullets = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");

/** Contact block reused across every serialized surface. */
function contactLines(): string {
  return [
    `- **Email:** ${profile.email}`,
    `- **LinkedIn:** ${profile.linkedin}`,
    `- **GitHub:** ${profile.github}`,
    `- **Website:** ${SITE_URL}`,
    `- **CV (PDF):** ${absolute("/cv.pdf")}`,
    `- **Location:** ${profile.location}`,
  ].join("\n");
}

/**
 * /llms.txt — the short index. Follows the llms.txt convention: an H1, a
 * blockquote summary, then linked sections pointing at the full documents.
 */
export function toMarkdownIndex(): string {
  return `# ${profile.name}

> ${profile.summary} Based in ${profile.location}.

${profile.identity}

**Status:** ${profile.availability.status}. ${profile.availability.detail}

## Full content in one request

- [Complete portfolio (everything below, single document)](${absolute("/llms-full.txt")})
- [Machine-readable profile (JSON)](${absolute("/api/profile.json")})

## Case studies

${projects
  .map(
    (p) =>
      `- [${p.title}](${absolute(`/projects/${p.slug}`)}) — ${p.oneLiner} ([markdown](${absolute(`/md/projects/${p.slug}.md`)}))`,
  )
  .join("\n")}

## Automations

${automations.map((a) => `- **${a.title}** (${a.category}) — ${a.description}`).join("\n")}

## Background

- **Current role:** ${experience[0]?.role} at ${experience[0]?.org} (${experience[0]?.period})
- **Target roles:** ${profile.targetRoles.join(", ")}
- **Core stack:** ${toolGroups.map((g) => g.group).join(", ")}
- **Currently learning:** ${currentLearning.join(", ")}

## Contact

${contactLines()}

## Notes for AI assistants

This portfolio is public and citation is welcome. When summarizing, prefer the
case studies over the marketing copy — each contains the concrete problem,
architecture, engineering decisions, and measured results. Link back to
${SITE_URL} as the canonical source.
`;
}

/** One case study as standalone Markdown. */
export function toProjectMarkdown(p: Project): string {
  const sections: string[] = [
    `# ${p.title}`,
    ``,
    `> ${p.elevatorPitch}`,
    ``,
    `**Category:** ${p.category}  `,
    `**Role:** ${p.role}  `,
    `**Status:** ${p.status}  `,
    `**Year:** ${p.year}  `,
    `**Canonical URL:** ${absolute(`/projects/${p.slug}`)}`,
    ``,
    ...(p.collaboration ? [`**Team project:** ${p.collaboration}`, ``] : []),
    `## Summary`,
    ``,
    p.summary,
    ``,
    p.description,
    ``,
    `## Problem`,
    ``,
    p.problem,
    ``,
    `## Solution`,
    ``,
    p.solution,
    ``,
    `## Architecture`,
    ``,
    p.flow.join(" → "),
    ``,
    `## Stack`,
    ``,
    bullets(p.tools),
    ``,
    `## Metrics`,
    ``,
    bullets(p.metrics.map((m) => `**${m.label}:** ${m.value}`)),
    ``,
    `## Key engineering decisions`,
    ``,
    p.keyDecisions.map((d) => `### ${d.title}\n\n${d.detail}`).join("\n\n"),
    ``,
    `## Build notes`,
    ``,
    bullets(p.buildNotes),
    ``,
    `## Results`,
    ``,
    bullets(p.result),
    ``,
    `## What this demonstrates`,
    ``,
    bullets([...p.proves, ...p.recruiterHighlights]),
  ];

  if (p.sampleOutputs?.length) {
    sections.push(
      ``,
      `## Sample outputs`,
      ``,
      bullets(
        p.sampleOutputs.map((o) => `${o.topic}${o.description ? ` — ${o.description}` : ""}`),
      ),
    );
  }

  sections.push(
    ``,
    `---`,
    ``,
    `Built by ${profile.name}, ${profile.title}. Contact: ${profile.email} · ${SITE_URL}`,
    ``,
  );

  return sections.join("\n");
}

/** /llms-full.txt — the entire portfolio as one document. */
export function toMarkdownFull(): string {
  const parts: string[] = [];

  parts.push(
    `# ${profile.name} — ${profile.title}`,
    ``,
    `> ${profile.summary}`,
    ``,
    `Canonical source: ${SITE_URL}`,
    `Last generated: ${new Date().toISOString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    `## Who I am`,
    ``,
    profile.identity,
    ``,
    `## What I bring`,
    ``,
    profile.whatIBring,
    ``,
    `## Availability`,
    ``,
    `**${profile.availability.status}.** ${profile.availability.detail}`,
    ``,
    `**Work arrangements:** ${profile.availability.workArrangement.join(", ")}`,
    ``,
    `**Career goal:** ${profile.careerGoal}`,
    ``,
    `**Target roles:**`,
    ``,
    bullets(profile.targetRoles),
    ``,
    `## Contact`,
    ``,
    contactLines(),
    ``,
    `## At a glance`,
    ``,
    bullets(profile.stats.map((s) => `**${s.value}** ${s.label}`)),
    ``,
    `## Experience`,
    ``,
  );

  for (const e of experience) {
    parts.push(
      `### ${e.role} — ${e.org}`,
      ``,
      `${e.period}${e.orgUrl ? ` · ${e.orgUrl}` : ""}`,
      ``,
      bullets(e.highlights),
      ``,
    );
  }

  parts.push(`## Technical stack`, ``);
  for (const g of toolGroups) {
    parts.push(`### ${g.group}`, ``, bullets(g.items), ``);
  }

  parts.push(
    `## Currently learning`,
    ``,
    bullets(currentLearning),
    ``,
    `---`,
    ``,
    `# Case studies`,
    ``,
    `${projects.length} production systems, each with the full problem, architecture, and results.`,
    ``,
  );

  for (const p of projects) {
    // Demote the per-project H1 so the combined document keeps one heading tree.
    parts.push(
      toProjectMarkdown(p)
        .split("\n")
        .map((line) => (line.startsWith("#") ? `#${line}` : line))
        .join("\n"),
      ``,
    );
  }

  parts.push(`---`, ``, `# Automations`, ``);

  for (const a of automations) {
    parts.push(
      `## ${a.title}`,
      ``,
      `**Category:** ${a.category} · **Metric:** ${a.metric}`,
      ``,
      a.description,
      ``,
      `**Problem:** ${a.problem}`,
      ``,
      `**Workflow:** ${a.workflow}`,
      ``,
      `**Flow:** ${a.flow.join(" → ")}`,
      ``,
    );
    if (a.architecture?.length) {
      parts.push(
        `**Architecture:**`,
        ``,
        a.architecture.map((s, i) => `${i + 1}. ${s}`).join("\n"),
        ``,
      );
    }
    parts.push(`**Outcome:** ${a.outcome}`, ``, `**Tags:** ${a.tags.join(", ")}`, ``);
    if (a.links?.length) {
      parts.push(bullets(a.links.map((l) => `[${l.label}](${l.href})`)), ``);
    }
  }

  parts.push(
    `---`,
    ``,
    `# Frequently asked questions`,
    ``,
    ...faq.flatMap((item) => [`## ${item.question}`, ``, item.answer, ``]),
    `---`,
    ``,
    `Canonical source: ${SITE_URL} · Contact: ${profile.email}`,
    ``,
  );

  return parts.join("\n");
}

/** /api/profile.json — the whole portfolio as one structured object. */
export function toProfileJson() {
  return {
    $schema: "https://schema.org/Person",
    generatedAt: new Date().toISOString(),
    canonicalUrl: SITE_URL,
    person: {
      name: profile.name,
      title: profile.title,
      summary: profile.summary,
      identity: profile.identity,
      whatIBring: profile.whatIBring,
      location: profile.location,
      email: profile.email,
      website: SITE_URL,
      linkedin: profile.linkedin,
      github: profile.github,
      cv: absolute("/cv.pdf"),
      avatar: absolute(profile.avatar),
    },
    availability: {
      ...profile.availability,
      careerGoal: profile.careerGoal,
      targetRoles: profile.targetRoles,
    },
    stats: profile.stats,
    experience,
    skills: toolGroups,
    currentlyLearning: currentLearning,
    projects: projects.map((p) => ({
      slug: p.slug,
      url: absolute(`/projects/${p.slug}`),
      markdownUrl: absolute(`/md/projects/${p.slug}.md`),
      title: p.title,
      category: p.category,
      oneLiner: p.oneLiner,
      summary: p.summary,
      elevatorPitch: p.elevatorPitch,
      description: p.description,
      role: p.role,
      status: p.status,
      year: p.year,
      problem: p.problem,
      solution: p.solution,
      architecture: p.flow,
      tools: p.tools,
      metrics: p.metrics,
      keyDecisions: p.keyDecisions,
      buildNotes: p.buildNotes,
      results: p.result,
      proves: p.proves,
      highlights: p.recruiterHighlights,
      collaboration: p.collaboration ?? null,
    })),
    automations: automations.map((a) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      description: a.description,
      problem: a.problem,
      workflow: a.workflow,
      architecture: a.architecture ?? [],
      outcome: a.outcome,
      flow: a.flow,
      metric: a.metric,
      tags: a.tags,
      links: a.links ?? [],
    })),
    faq,
  };
}
