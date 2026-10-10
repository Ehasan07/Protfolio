import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useSettings } from "../../context/SettingsContext";
import { localDigits } from "../../lib/digits";

// Counts up from zero the first time it scrolls into view.
export default function CountUp({ value, suffix = "", duration = 1.6, staticValue = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { reducedMotion, lang } = useSettings();
  const [count, setCount] = useState(0);
  const animated = !staticValue && !reducedMotion;

  useEffect(() => {
    if (!inView || !animated) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, animated, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {localDigits(animated ? count : value, lang)}
      {suffix}
    </span>
  );
}
