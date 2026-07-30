import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function PixelCursor() {
  const isMobile = useIsMobile();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-opacity duration-150"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
        transform: `translate(${pressed ? 1 : 0}px, ${pressed ? 1 : 0}px)`,
      }}
      aria-hidden
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        className="text-foreground drop-shadow-[1px_1px_0_rgba(255,255,255,0.4)] dark:drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
        style={{ imageRendering: "pixelated" }}
      >
        {/* 8-bit pointer */}
        <rect x="0" y="0" width="2" height="2" fill="currentColor" />
        <rect x="0" y="2" width="2" height="2" fill="currentColor" />
        <rect x="0" y="4" width="2" height="2" fill="currentColor" />
        <rect x="0" y="6" width="2" height="2" fill="currentColor" />
        <rect x="0" y="8" width="2" height="2" fill="currentColor" />
        <rect x="2" y="2" width="2" height="2" fill="currentColor" />
        <rect x="4" y="4" width="2" height="2" fill="currentColor" />
        <rect x="6" y="6" width="2" height="2" fill="currentColor" />
        <rect x="8" y="8" width="2" height="2" fill="currentColor" />
        <rect x="2" y="8" width="2" height="2" fill="currentColor" />
        <rect x="4" y="8" width="2" height="2" fill="currentColor" />
        <rect x="2" y="6" width="2" height="2" fill="currentColor" />
        <rect x="2" y="4" width="2" height="2" fill="currentColor" />
      </svg>
    </div>
  );
}
