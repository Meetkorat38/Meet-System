/**
 * Canonical site identity. Every absolute URL in metadata, structured data,
 * the sitemap, and the agent endpoints derives from here - so the domain is
 * declared exactly once.
 */
export const SITE_URL = "https://koratmeet.in";

/** Resolve a site-relative path (`/cv.pdf`) to an absolute URL. */
export const absolute = (path: string): string => new URL(path, SITE_URL).toString();
