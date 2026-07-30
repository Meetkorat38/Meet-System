import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="mt-16 pb-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-subtle-foreground">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex items-center gap-4">
          <a
            className="hover:text-foreground transition-colors"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="hover:text-foreground transition-colors"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-foreground transition-colors"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
