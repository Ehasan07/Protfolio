import { motion } from "framer-motion";
import Reveal from "./Reveal";

// "01 — Eyebrow" label, a heading that rises in word by word, and an optional lead.
export default function SectionHeader({ index, eyebrow, title, lead, align = "left", className = "" }) {
  const centered = align === "center";
  const words = title.split(" ");

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {index && <span className="font-mono text-xs text-primary">{index}</span>}
        <span className="h-px w-8 bg-primary/50" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <h2 className="text-balance font-display text-[2.1rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {i < words.length - 1 && " "}
            </motion.span>
          </span>
        ))}
      </h2>

      {lead && (
        <Reveal delay={0.15} className={`mt-5 text-pretty text-base text-muted sm:text-lg ${centered ? "mx-auto" : ""} max-w-2xl`}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}
