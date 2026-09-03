/**
 * JSON-LD builders.
 *
 * Every node derives from the existing data modules (profile/projects/
 * automations) so the structured data can never drift from what the page
 * renders. Nodes are emitted in a single `@graph` per page and cross-reference
 * each other by `@id`, so the Person is described once and linked everywhere.
 */
import { absolute, SITE_URL } from "@/lib/site";
import { profile, experience, toolGroups, currentLearning, faq } from "@/lib/profile";
import { projects, type Project } from "@/lib/projects";
import { automations } from "@/lib/automations";

/** Stable node identifiers, so `@graph` entries can reference one another. */
export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
  profilePage: `${SITE_URL}/#profilepage`,
  faq: `${SITE_URL}/#faq`,
  project: (slug: string) => `${SITE_URL}/projects/${slug}#project`,
} as const;

type Json = Record<string, unknown>;

/** "Nava Naroda, Ahmedabad, India" -> a PostalAddress. */
function buildAddress(): Json {
  const parts = profile.location.split(",").map((s) => s.trim());
  const [locality, region, country] = [parts[0], parts[1] ?? parts[0], parts[parts.length - 1]];
  return {
    "@type": "PostalAddress",
    streetAddress: locality,
    addressLocality: region,
    addressRegion: "Gujarat",
    addressCountry: country,
  };
}

function buildEmployer(): Json | undefined {
  const current = experience[0];
  if (!current) return undefined;
  return {
    "@type": "Organization",
    "@id": ID.organization,
    name: current.org,
    ...(current.orgUrl ? { url: current.orgUrl } : {}),
  };
}

/**
 * The identity anchor. `knowsAbout` is the field that makes the full stack
 * machine-readable - including tools that only ever lived behind a UI tab.
 */
export function buildPerson(): Json {
  const skills = toolGroups.flatMap((g) => g.items);
  const employer = buildEmployer();

  return {
    "@type": "Person",
    "@id": ID.person,
    name: profile.name,
    givenName: profile.name.split(" ")[0],
    familyName: profile.name.split(" ").slice(1).join(" "),
    jobTitle: profile.title,
    description: profile.summary,
    disambiguatingDescription: profile.identity,
    email: `mailto:${profile.email}`,
    url: SITE_URL,
    image: absolute(profile.avatar),
    address: buildAddress(),
    nationality: { "@type": "Country", name: "India" },
    sameAs: [profile.linkedin, profile.github, profile.twitter].filter(Boolean),
    ...(employer ? { worksFor: employer } : {}),
    knowsAbout: [...new Set([...skills, ...currentLearning])],
    knowsLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Hindi" },
      { "@type": "Language", name: "Gujarati" },
    ],
    seeks: profile.targetRoles.map((role) => ({
      "@type": "Demand",
      name: role,
      description: profile.careerGoal,
    })),
    hasOccupation: {
      "@type": "Occupation",
      name: profile.title,
      description: profile.identity,
      skills: skills.join(", "),
      occupationalCategory: "15-1252.00",
    },
  };
}

export function buildWebSite(): Json {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE_URL,
    name: `${profile.name} - ${profile.title}`,
    description: profile.summary,
    inLanguage: "en",
    publisher: { "@id": ID.person },
    author: { "@id": ID.person },
  };
}

export function buildProfilePage(): Json {
  return {
    "@type": "ProfilePage",
    "@id": ID.profilePage,
    url: SITE_URL,
    name: `${profile.name} - ${profile.title}`,
    description: profile.summary,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.person },
    mainEntity: { "@id": ID.person },
    inLanguage: "en",
    significantLink: projects.map((p) => absolute(`/projects/${p.slug}`)),
  };
}

/**
 * Not emitted on the page - the Q&A is not rendered in the UI, and Google
 * requires structured data to reflect visible content. Kept for the agent
 * endpoints, which have no such constraint.
 */
export function buildFAQ(): Json {
  return {
    "@type": "FAQPage",
    "@id": ID.faq,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** A case study as a SoftwareApplication authored by the Person. */
export function buildProjectSchema(p: Project): Json {
  return {
    "@type": ["SoftwareApplication", "CreativeWork"],
    "@id": ID.project(p.slug),
    name: p.title,
    url: absolute(`/projects/${p.slug}`),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: p.category,
    description: p.elevatorPitch,
    abstract: p.oneLiner,
    text: `${p.problem}\n\n${p.solution}`,
    author: { "@id": ID.person },
    creator: { "@id": ID.person },
    dateCreated: p.year,
    creativeWorkStatus: p.status,
    inLanguage: "en",
    keywords: p.tools.join(", "),
    featureList: p.proves,
    ...(p.thumbnailSrc ? { screenshot: absolute(p.thumbnailSrc) } : {}),
    ...(p.videoSrc ? { video: absolute(p.videoSrc) } : {}),
    isPartOf: { "@id": ID.website },
  };
}

export function buildBreadcrumbs(p: Project): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absolute("/#projects"),
      },
      { "@type": "ListItem", position: 3, name: p.title },
    ],
  };
}

/** All case studies and automations as one ordered list on the home page. */
export function buildWorkList(): Json {
  return {
    "@type": "ItemList",
    name: `Production systems built by ${profile.name}`,
    numberOfItems: projects.length + automations.length,
    itemListElement: [
      ...projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        description: p.oneLiner,
        url: absolute(`/projects/${p.slug}`),
      })),
      ...automations.map((a, i) => ({
        "@type": "ListItem",
        position: projects.length + i + 1,
        name: a.title,
        description: a.description,
      })),
    ],
  };
}

/** Wrap nodes in a JSON-LD document ready for a <script> tag. */
export function graph(...nodes: Json[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
