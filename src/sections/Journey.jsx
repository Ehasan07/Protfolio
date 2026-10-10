import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Briefcase, CheckCircle2, GraduationCap, MapPin } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import StackChips from "../components/work/StackChips";
import { education, experience, timeline } from "../data/journey";
import { useSettings } from "../context/SettingsContext";

function Timeline() {
  const { tr } = useSettings();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-2 space-y-10 pl-9">
      <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-line/15" />
      <motion.span
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-primary via-accent to-primary"
      />
      {timeline.map((item, i) => (
        <Reveal as="li" key={i} delay={0.05} className="relative">
          <span className="absolute -left-9 top-1 grid h-[18px] w-[18px] -translate-x-1/2 place-items-center rounded-full border border-primary/50 bg-bg">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{tr(item.when)}</p>
          <h4 className="mt-1.5 font-display text-lg font-semibold">{tr(item.title)}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{tr(item.text)}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export default function Journey() {
  const { t, tr } = useSettings();
  const job = experience[0];
  const school = education[0];

  return (
    <section id="journey" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="05" eyebrow={t.journey.eyebrow} title={t.journey.title} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div className="space-y-5">
            <Reveal className="eyebrow flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" /> {t.journey.experience}
            </Reveal>
            <Reveal className="card overflow-hidden p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
                style={{ background: "radial-gradient(closest-side, rgb(var(--primary) / 0.12), transparent)" }}
              />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold">{tr(job.role)}</h3>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    {job.company} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="text-right">
                  <span className="chip border-primary/30 bg-primary/10 text-primary">{tr(job.period)}</span>
                  <p className="mt-2 flex items-center justify-end gap-1 text-xs text-muted">
                    <MapPin className="h-3 w-3" /> {tr(job.location)}
                  </p>
                </div>
              </div>
              <p className="relative mt-5 leading-relaxed text-muted">{tr(job.summary)}</p>
              <ul className="relative mt-6 space-y-3.5">
                {job.points.map((p) => (
                  <li key={p.en} className="flex gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-fg/85">{tr(p)}</span>
                  </li>
                ))}
              </ul>
              <StackChips items={job.stack} className="relative mt-7" />
            </Reveal>

            <Reveal className="eyebrow flex items-center gap-2 pt-6">
              <GraduationCap className="h-4 w-4 text-primary" /> {t.journey.education}
            </Reveal>
            <Reveal className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
                <GraduationCap className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold">{tr(school.degree)}</h3>
                <p className="text-sm text-muted">
                  {tr(school.school)} · {tr(school.period)}
                </p>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  <span className="sr-only">{t.journey.courses}:</span>
                  {school.courses.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal className="eyebrow mb-8">{t.journey.timeline}</Reveal>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
}
