export function ToolPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill pill-hover hover:-translate-y-px hover:border-foreground/30 motion-reduce:transform-none">
      {children}
    </span>
  );
}
