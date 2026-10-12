import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import { ArrowUpRight, Lock, Maximize2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import SpotlightCard from "../components/ui/SpotlightCard";
import ProductCard from "../components/work/ProductCard";
import StackChips from "../components/work/StackChips";
import { SiOdoo } from "react-icons/si";
import { moreProjects, odooModules, products, projectFilters } from "../data/projects";
import { profile } from "../data/profile";
import { useSettings } from "../context/SettingsContext";
import { useUI } from "../context/UIContext";
import useMediaQuery from "../hooks/useMediaQuery";

function ProductStack() {
  const ref = useRef(null);
  const stack = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative mt-14">
      {products.map((p, i) => (
        <ProductCard key={p.id} project={p} index={i} total={products.length} progress={scrollYProgress} stack={stack} />
      ))}
    </div>
  );
}

function OdooModules() {
  const { t, tr } = useSettings();
  const { openProject } = useUI();

  return (
    <div className="mt-28">
      <div className="grid items-end gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-odoo">
            <SiOdoo className="h-5 w-5" /> {t.work.odooEyebrow}
          </p>
          <h3 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">{t.work.odooTitle}</h3>
        </Reveal>
        <Reveal delay={0.1} className="flex gap-3 rounded-2xl border border-odoo/20 bg-odoo/[0.06] p-4 text-sm text-muted">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-odoo" />
          {t.work.odooNote}
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {odooModules.map((m, i) => (
          <Reveal key={m.id} delay={(i % 3) * 0.08}>
            <SpotlightCard
              as="button"
              onClick={() => openProject({ ...m, kind: "odoo" })}
              className="group flex h-full w-full flex-col overflow-hidden p-0 text-left"
            >
              <div className="relative overflow-hidden border-b border-line/10">
                <img
                  src={m.image}
                  alt={`${m.title} — Odoo module`}
                  loading="lazy"
                  width="1280"
                  height="640"
                  className="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-display text-lg font-semibold">
                  <span className="mr-2 font-mono text-xs text-odoo">0{i + 1}</span>
                  {m.title}
                </h4>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{tr(m.summary)}</p>
                <StackChips items={m.stack} className="mt-auto pt-4" />
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ProjectTile({ project }) {
  const { t, tr } = useSettings();
  const { openProject } = useUI();
  const shots = project.gallery?.length ?? 1;
  return (
    <SpotlightCard className="group flex h-full flex-col overflow-hidden p-0">
      <button
        onClick={() => openProject(project)}
        className="relative block overflow-hidden border-b border-line/10 text-left"
        aria-label={`${t.work.caseStudy}: ${project.title}`}
      >
        <img
          src={project.image}
          alt={`${project.title} — preview`}
          loading="lazy"
          width="1280"
          height="640"
          className="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
          {shots > 1 ? shots : t.work.openImage}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-base font-semibold">{project.title}</h4>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{tr(project.summary)}</p>
        <StackChips items={project.stack} className="mt-4" />
        <div className="mt-auto flex items-center gap-2 pt-3 text-sm">
          {project.code && (
            <a href={project.code} target="_blank" rel="noreferrer" className="-ml-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-2 text-fg/80 hover:text-primary">
              <FaGithub className="h-4 w-4" /> {t.work.viewCode}
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center gap-1 rounded-full px-2 text-fg/80 hover:text-primary">
              {t.work.live} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

function MoreProjects() {
  const { t, tr } = useSettings();
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? moreProjects : moreProjects.filter((p) => p.category === filter);

  return (
    <div className="mt-28">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> {t.work.moreEyebrow}
          </p>
          <h3 className="font-display text-3xl font-semibold sm:text-4xl">{t.work.moreTitle}</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <LayoutGroup id="filters">
            <div role="tablist" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-full border border-line/10 bg-elev/60 p-1">
              {projectFilters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                    filter === f.id ? "text-on-primary" : "text-muted hover:text-fg"
                  }`}
                >
                  {filter === f.id && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{tr(f.label)}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>
      </div>

      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectTile project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-12 flex justify-center">
        <a href={profile.github + "?tab=repositories"} target="_blank" rel="noreferrer" className="btn-ghost group px-6 py-3.5">
          <FaGithub className="h-4 w-4" />
          {t.work.viewGithub}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </div>
  );
}

export default function Work() {
  const { t } = useSettings();
  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="03" eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead} />
        <ProductStack />
        <OdooModules />
        <MoreProjects />
      </div>
    </section>
  );
}
