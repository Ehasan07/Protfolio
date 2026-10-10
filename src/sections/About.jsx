import { motion } from "framer-motion";
import { Briefcase, Coins, GraduationCap, Handshake, Languages, MapPin, Rocket, ShieldCheck } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import SpotlightCard from "../components/ui/SpotlightCard";
import Reveal from "../components/ui/Reveal";
import { profile } from "../data/profile";
import { useSettings } from "../context/SettingsContext";

const FACT_ICONS = { base: MapPin, work: Briefcase, study: GraduationCap, lang: Languages, open: Handshake };
const RULE_ICONS = { languages: Languages, coins: Coins, shield: ShieldCheck, rocket: Rocket };

export default function About() {
  const { t, tr } = useSettings();

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="01" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="card overflow-hidden p-7 sm:p-10">
            <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
              {tr(profile.headline)
                .split(" ")
                .map((w, i, arr) => (
                  <span key={i} className={i >= arr.length - 2 ? "text-primary" : ""}>
                    {w}{" "}
                  </span>
                ))}
            </p>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted">
              {profile.bio.map((p, i) => (
                <p key={i}>{tr(p)}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-accent/70 pl-4 font-display text-lg italic text-fg/85">
              “{tr(profile.quote)}”
            </blockquote>
          </Reveal>

          <Reveal delay={0.1} className="card p-7 sm:p-8">
            <h3 className="eyebrow mb-5">{t.about.facts}</h3>
            <ul className="divide-y divide-line/10">
              {profile.facts.map((f, i) => {
                const Icon = FACT_ICONS[f.key];
                return (
                  <motion.li
                    key={f.key}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 py-3.5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/10 bg-surface/70 text-primary">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-sm sm:text-[15px]">{tr(f)}</span>
                  </motion.li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mb-6 mt-20 flex items-center gap-4">
          <h3 className="font-display text-xl font-semibold sm:text-2xl">{t.about.rules}</h3>
          <span className="h-px flex-1 bg-gradient-to-r from-line/20 to-transparent" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.principles.map((rule, i) => {
            const Icon = RULE_ICONS[rule.icon];
            return (
              <Reveal key={rule.icon} delay={i * 0.08}>
                <SpotlightCard className="group h-full p-6">
                  <div className="mb-10 flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h4 className="font-display text-lg font-semibold">{tr(rule.title)}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tr(rule.text)}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
