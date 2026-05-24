export function Footer() {
  return (
    <footer className="mt-16 pb-10 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-subtle-foreground">
        <p>© {new Date().getFullYear()} Meet Korat</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-foreground transition-colors" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-foreground transition-colors" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-foreground transition-colors" href="mailto:meet@example.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
