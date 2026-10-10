import { useEffect } from "react";
import Lenis from "lenis";
import { useSettings } from "../../context/SettingsContext";
import { setLenis } from "../../lib/scroll";

// Inertial scrolling, off when the visitor prefers reduced motion.
export default function SmoothScroll() {
  const { reducedMotion } = useSettings();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 1 });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return null;
}
