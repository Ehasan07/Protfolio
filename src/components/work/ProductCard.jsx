import { motion, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Maximize2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import BrowserFrame from "./BrowserFrame";
import StatusBadge from "./StatusBadge";
import StackChips from "./StackChips";
import { useSettings } from "../../context/SettingsContext";
import { useUI } from "../../context/UIContext";
import { localDigits } from "../../lib/digits";

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// One featured product. On desktop the cards stick and stack: each one shrinks
// slightly as the next slides over it (progress comes from the parent).
export default function ProductCard({ project, index, total, progress, stack }) {
  const { t, tr, lang } = useSettings();
  const { openProject } = useUI();
  // Under the cover: up to two wide screenshots, plus a phone-shaped tile for a mobile one.
  const extras = project.gallery.slice(1);
  const phone = extras.find((src) => src.includes("-mobile"));
  const wide = extras.filter((src) => src !== phone).slice(0, phone ? 1 : 2);
  const scale = useTransform(progress, [index / total, 1], [1, stack ? 1 - (total - index - 1) * 0.045 : 1]);

  return (
    <div className="md:sticky" style={{ top: `calc(6.5rem + ${index * 22}px)` }}>
      <motion.article
        style={{ scale }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 origin-top overflow-hidden rounded-[2rem] border border-line/10 bg-elev shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(var(--primary) / 0.14), transparent)" }}
        />
        <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:p-10">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <span className="eyebrow">
                {tr(project.kicker)} · {localDigits(project.year, lang)}
              </span>
              <StatusBadge status={project.status} />
            </div>

            <h3 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h3>
            <p lang={/[ঀ-৿]/.test(project.tagline) ? "bn" : undefined} className="mt-2 font-display text-lg text-accent">
              {project.tagline}
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{tr(project.summary)}</p>

            <ul className="mt-6 space-y-2.5">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h.en} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-fg/85">{tr(h)}</span>
                </li>
              ))}
            </ul>

            <StackChips items={project.stack} className="mt-6" />

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-8">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary group">
                  {t.work.visit}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noreferrer" className="btn-ghost">
                  <FaGithub className="h-4 w-4" />
                  {t.work.source}
                </a>
              )}
              <button onClick={() => openProject(project)} className="btn-ghost">
                <Maximize2 className="h-4 w-4" />
                {t.work.caseStudy}
              </button>
            </div>
            {project.note && <p className="mt-3 font-mono text-[11px] text-muted">{tr(project.note)}</p>}
          </div>

          <button
            onClick={() => openProject(project)}
            className="group/img order-first self-center text-left lg:order-none"
            aria-label={`${t.work.caseStudy}: ${project.title}`}
          >
            <BrowserFrame url={project.live ? host(project.live) : tr(project.note) ?? project.title}>
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} — screenshot`}
                  loading="lazy"
                  width="1280"
                  height="640"
                  className="aspect-[2/1] w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-all duration-500 group-hover/img:bg-black/30 group-hover/img:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                    <Maximize2 className="h-4 w-4" /> {t.work.caseStudy}
                  </span>
                </div>
              </div>
            </BrowserFrame>
            {(wide.length > 0 || phone) && (
              <div className="mt-3 flex h-28 gap-3 sm:h-32">
                {wide.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full min-w-0 flex-1 rounded-xl border border-line/10 object-cover object-top"
                  />
                ))}
                {phone && (
                  <img
                    src={phone}
                    alt=""
                    loading="lazy"
                    className="h-full w-16 shrink-0 rounded-xl border border-line/10 object-cover object-top sm:w-[4.5rem]"
                  />
                )}
              </div>
            )}
          </button>
        </div>
      </motion.article>
    </div>
  );
}
