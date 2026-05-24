import { Link } from "@tanstack/react-router";
import { Copy, Check, FileDown, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const EMAIL = "meet@example.com";

export function SiteHeader() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 pt-5 sm:pt-6">
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Link to="/" className="font-mono text-subtle-foreground hover:text-foreground transition-colors">
          {EMAIL}
        </Link>
        <button
          onClick={copy}
          aria-label="Copy email"
          className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-border bg-card hover:bg-pill-hover transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <a
          href="/cv.pdf"
          className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-border bg-card hover:bg-pill-hover text-xs transition-colors font-mono"
        >
          <FileDown className="h-3.5 w-3.5" />
          CV
        </a>
      </div>
      <nav className="flex items-center gap-1">
        {[
          { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
          { href: "https://github.com", label: "GitHub", icon: Github },
          { href: "https://x.com", label: "X", icon: Twitter },
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
      </nav>
    </header>
  );
}
