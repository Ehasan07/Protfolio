import { motion } from "framer-motion";
import { SiOdoo } from "react-icons/si";
import { Layers, Monitor, Plug, ServerCog } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import SpotlightCard from "../components/ui/SpotlightCard";
import Reveal from "../components/ui/Reveal";
import TechIcon from "../components/ui/TechIcon";
import { odooCapabilities, skillGroups } from "../data/skills";
import { useSettings } from "../context/SettingsContext";

const GROUP_ICONS = { backend: Layers, frontend: Monitor, devops: ServerCog, integrations: Plug };

function SkillPills({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((name, i) => (
        <motion.li
          key={name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 * i, duration: 0.4 }}
          className="group/pill flex items-center gap-2 rounded-xl border border-line/10 bg-surface/60 px-3 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.07]"
        >
          <TechIcon name={name} colored className="h-4 w-4 transition-transform duration-300 group-hover/pill:scale-125" />
          {name}
        </motion.li>
      ))}
    </ul>
  );
}

export default function Skills() {
  const { t, tr } = useSettings();
  const [odoo, ...rest] = skillGroups;

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="04" eyebrow={t.skills.eyebrow} title={t.skills.title} lead={t.skills.lead} />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="md:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-odoo/15 text-odoo">
                  <SiOdoo className="h-7 w-7" />
                </span>
                <h3 className="font-display text-xl font-semibold">{tr(odoo.title)}</h3>
              </div>
              <p className="mb-6 mt-4 max-w-md text-sm leading-relaxed text-muted">{tr(odoo.blurb)}</p>
              <div className="mt-auto">
                <SkillPills items={odoo.items} />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-2">
            <SpotlightCard className="h-full p-6 sm:p-8">
              <h3 className="eyebrow mb-4">{t.skills.odoo}</h3>
              <dl className="grid gap-x-6 sm:grid-cols-2">
                {odooCapabilities.map((c) => (
                  <div key={c.area.en} className="border-t border-line/10 py-3">
                    <dt className="text-sm font-medium text-odoo">{tr(c.area)}</dt>
                    <dd className="mt-1 text-[13px] leading-relaxed text-muted">{tr(c.detail)}</dd>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          </Reveal>

          {rest.map((g, i) => {
            const Icon = GROUP_ICONS[g.id];
            return (
              <Reveal key={g.id} delay={0.08 * i}>
                <SpotlightCard className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line/10 bg-surface/70 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold leading-tight">{tr(g.title)}</h3>
                  </div>
                  <p className="mb-6 mt-3 text-sm leading-relaxed text-muted">{tr(g.blurb)}</p>
                  <div className="mt-auto">
                    <SkillPills items={g.items} />
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
