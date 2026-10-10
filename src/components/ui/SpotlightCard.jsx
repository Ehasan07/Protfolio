import { useRef } from "react";

// A card whose glow and hairline border follow the pointer (see .spotlight / .ring-gradient).
export default function SpotlightCard({ as = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onPointerMove} className={`card spotlight ring-gradient ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
