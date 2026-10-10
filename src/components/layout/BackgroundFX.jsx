import { useEffect, useRef } from "react";
import { useSettings } from "../../context/SettingsContext";

// Fixed backdrop: dot grid, two slow aurora glows and a soft light that follows
// the pointer. Gradients instead of CSS blur keep it cheap to paint.
export default function BackgroundFX() {
  const glowRef = useRef(null);
  const { reducedMotion } = useSettings();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (glowRef.current) glowRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="dot-grid absolute inset-0"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />
      <div
        className="absolute -left-[20%] -top-[25%] h-[75vmax] w-[75vmax] animate-aurora rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(var(--primary) / 0.16), transparent)" }}
      />
      <div
        className="absolute -right-[25%] top-[30%] h-[65vmax] w-[65vmax] animate-aurora rounded-full [animation-delay:-8s]"
        style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.08), transparent)" }}
      />
      <div
        ref={glowRef}
        className="absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full md:block"
        style={{
          background: "radial-gradient(closest-side, rgb(var(--primary) / 0.07), transparent)",
          transform: "translate3d(-999px,-999px,0)",
        }}
      />
      <div className="grain" />
    </div>
  );
}
