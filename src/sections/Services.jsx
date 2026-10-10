import { motion } from "framer-motion";
import { Boxes, Building2, Check, Layers, PenTool, Server, Wallet } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import SpotlightCard from "../components/ui/SpotlightCard";
import Reveal from "../components/ui/Reveal";
import { process, services } from "../data/services";
import { useSettings } from "../context/SettingsContext";

const ICONS = { boxes: Boxes, building: Building2, layers: Layers, wallet: Wallet, pen: PenTool, server: Server };

export default function Services() {
  const { t, tr } = useSettings();

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="02" eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={(i % 4) * 0.07} className={s.featured ? "lg:col-span-2" : ""}>
                <SpotlightCard className={`group flex h-full flex-col p-6 sm:p-7 ${s.featured ? "lg:min-h-[300px]" : ""}`}>
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid place-items-center rounded-2xl transition-all duration-500 group-hover:scale-105 ${
                        s.featured
                          ? "h-14 w-14 bg-primary text-on-primary shadow-glow"
                          : "h-12 w-12 border border-line/10 bg-surface/70 text-primary"
                      }`}
                    >
                      <Icon className={s.featured ? "h-7 w-7" : "h-6 w-6"} />
                    </span>
                    <span className="font-mono text-xs text-muted">/0{i + 1}</span>
                  </div>
                  <h3 className={`mt-8 font-display font-semibold ${s.featured ? "text-2xl sm:text-[1.7rem]" : "text-lg"}`}>
                    {tr(s.title)}
                  </h3>
                  <p className={`mt-3 leading-relaxed text-muted ${s.featured ? "max-w-md" : "text-sm"}`}>{tr(s.text)}</p>
                  {s.points && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                      {s.points.map((p) => (
                        <li key={p.en} className="chip">
                          <Check className="h-3 w-3 text-primary" />
                          {tr(p)}
                        </li>
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-24 flex items-center gap-4">
          <h3 className="font-display text-xl font-semibold sm:text-2xl">{t.services.process}</h3>
          <span className="h-px flex-1 bg-gradient-to-r from-line/20 to-transparent" />
        </Reveal>

        <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-primary via-accent to-primary/0 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={0.2 + i * 0.15} className="relative">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-bg font-mono text-sm text-primary shadow-[0_0_0_6px_rgb(var(--bg))]">
                {p.step}
              </span>
              <h4 className="mt-5 font-display text-lg font-semibold">{tr(p.title)}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(p.text)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
