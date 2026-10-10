import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Lock, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import StatusBadge from "./StatusBadge";
import StackChips from "./StackChips";
import { useSettings } from "../../context/SettingsContext";
import { useUI } from "../../context/UIContext";
import { lockScroll, unlockScroll } from "../../lib/scroll";
import { localDigits } from "../../lib/digits";

// Case study for a product or Odoo module: gallery, summary, highlights, stack, links.
function ModalBody({ project, onClose }) {
  const { t, tr, lang } = useSettings();
  const gallery = project.gallery ?? [project.image].filter(Boolean);
  const [shot, setShot] = useState(0);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto my-6 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-line/10 bg-elev shadow-2xl sm:my-12"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
        aria-label={t.work.close}
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative bg-surface">
        <AnimatePresence mode="wait">
          <motion.img
            key={gallery[shot]}
            src={gallery[shot]}
            alt={`${project.title} — screenshot ${shot + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[60vh] w-full object-contain"
          />
        </AnimatePresence>
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-line/10 bg-surface/50 p-3">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setShot(i)}
              className={`h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === shot ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`Screenshot ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            {project.kind === "odoo" ? (
              <span className="eyebrow text-odoo">Odoo 12 · DUPNO</span>
            ) : (
              project.kicker && <span className="eyebrow">{tr(project.kicker)} · {localDigits(project.year, lang)}</span>
            )}
            {project.status && <StatusBadge status={project.status} />}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{project.title}</h2>
          {project.tagline && <p className="mt-1 font-display text-lg text-accent">{project.tagline}</p>}
          <p className="mt-4 text-pretty leading-relaxed text-muted">{tr(project.summary)}</p>

          {project.highlights && (
            <>
              <h3 className="eyebrow mb-4 mt-8">{t.work.highlights}</h3>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h.en} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {tr(h)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="space-y-6">
          <div>
            <h3 className="eyebrow mb-3">{t.work.stack}</h3>
            <StackChips items={project.stack} />
          </div>
          <div className="flex flex-col gap-2.5">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary">
                {t.work.visit} <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noreferrer" className="btn-ghost">
                <FaGithub className="h-4 w-4" /> {t.work.source}
              </a>
            )}
          </div>
          {(project.note || project.kind === "odoo") && (
            <p className="flex gap-2 rounded-2xl border border-line/10 bg-surface/50 p-4 text-xs leading-relaxed text-muted">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {project.note ? tr(project.note) : t.work.odooNote}
            </p>
          )}
        </aside>
      </div>
    </motion.div>
  );
}

export default function ProjectModal() {
  const { activeProject, closeProject } = useUI();

  useEffect(() => {
    if (!activeProject) return;
    lockScroll();
    const onKey = (e) => e.key === "Escape" && closeProject();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProject, closeProject]);

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProject}
          data-lenis-prevent
          className="fixed inset-0 z-[80] overflow-y-auto bg-black/70 px-3 backdrop-blur-md sm:px-6"
        >
          <ModalBody key={activeProject.id} project={activeProject} onClose={closeProject} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
