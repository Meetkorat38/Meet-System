import { Link } from "@tanstack/react-router";
import {
  Copy,
  Check,
  FileDown,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#automations", label: "Automations" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [copied, setCopied] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const closeNav = () => setNavOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-surface/80 backdrop-blur-xl">
      <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-3 px-5 sm:px-8 py-3.5">
        <div className="flex min-w-0 flex-nowrap items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5 group"
            onClick={closeNav}
          >
            <img
              src={profile.avatar}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg border border-border object-cover shadow-[2px_2px_0_oklch(0_0_0/0.06)] [image-rendering:pixelated]"
            />
            <span className="hidden lg:block text-sm font-medium group-hover:text-foreground transition-colors truncate max-w-[140px] xl:max-w-none">
              {profile.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-1">
            {NAV.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1.5 text-xs font-medium text-subtle-foreground hover:text-foreground rounded-full hover:bg-pill-hover transition-colors whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            aria-expanded={navOpen}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            className="inline-flex lg:hidden shrink-0 items-center justify-center h-8 w-8 rounded-full border border-border bg-card hover:bg-pill-hover transition-colors"
          >
            {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex shrink-0 flex-nowrap items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border bg-card hover:bg-pill-hover transition-colors"
          >
            <span className="relative inline-flex h-4 w-4">
              <Sun
                className={cn(
                  "absolute h-4 w-4 transition-[transform,opacity] duration-300 motion-reduce:transition-none",
                  theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0",
                )}
              />
              <Moon
                className={cn(
                  "absolute h-4 w-4 transition-[transform,opacity] duration-300 motion-reduce:transition-none",
                  theme === "dark"
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
              />
            </span>
          </button>
          <button
            onClick={copy}
            aria-label="Copy email"
            className="hidden lg:inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-border bg-card hover:bg-pill-hover text-xs font-mono transition-colors whitespace-nowrap"
          >
            {profile.email}
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-full border border-border bg-card hover:bg-pill-hover text-xs transition-colors font-mono"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline md:hidden lg:inline">CV</span>
          </a>
          {[
            { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
            { href: profile.github, label: "GitHub", icon: Github },
            ...(profile.twitter
              ? [{ href: profile.twitter, label: "X", icon: Twitter }]
              : []),
          ].map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full text-subtle-foreground hover:text-foreground hover:bg-pill-hover transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-foreground/50"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div
        className={cn(
          "lg:hidden border-t border-border/60 bg-surface/95 overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          navOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0 border-t-transparent",
        )}
      >
        <nav className="flex flex-col gap-0.5 px-5 sm:px-8 py-3 md:py-4">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeNav}
              className="px-3 py-2.5 text-sm font-medium text-subtle-foreground hover:text-foreground rounded-lg hover:bg-pill-hover transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
