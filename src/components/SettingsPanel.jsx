import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Monitor, Moon, RotateCcw, Sun, X } from "lucide-react";
import { ACCENTS, useSettings } from "../context/SettingsContext";
import { useUI } from "../context/UIContext";
import { lockScroll, unlockScroll } from "../lib/scroll";

function Segmented({ value, options, onChange, layoutId }) {
  return (
    <div className="grid rounded-2xl border border-line/10 bg-surface/50 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`relative flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
            value === o.value ? "text-fg" : "text-muted hover:text-fg"
          }`}
        >
          {value === o.value && (
            <motion.span layoutId={layoutId} className="absolute inset-0 rounded-xl border border-line/10 bg-elev shadow-card" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className="relative flex items-center gap-2">
            {o.icon && <o.icon className="h-4 w-4" />}
            {o.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function SettingsPanel() {
  const { settingsOpen, setSettingsOpen } = useUI();
  const { t, theme, accent, lang, motion: motionPref, update, reset } = useSettings();
  const close = () => setSettingsOpen(false);

  useEffect(() => {
    if (!settingsOpen) return;
    lockScroll();
    const onKey = (e) => e.key === "Escape" && setSettingsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [settingsOpen, setSettingsOpen]);

  const s = t.settings;

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          <motion.div
            key="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            key="settings-panel"
            role="dialog"
            aria-modal="true"
            aria-label={s.title}
            data-lenis-prevent
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed bottom-3 right-3 top-3 z-[81] flex w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-[1.75rem] border border-line/10 bg-elev/95 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <button onClick={close} className="icon-btn" aria-label={t.nav.close}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <h3 className="eyebrow mb-3">{s.appearance}</h3>
                <Segmented
                  layoutId="seg-theme"
                  value={theme}
                  onChange={(v) => update({ theme: v })}
                  options={[
                    { value: "dark", label: s.dark, icon: Moon },
                    { value: "light", label: s.light, icon: Sun },
                    { value: "system", label: s.system, icon: Monitor },
                  ]}
                />
              </section>

              <section>
                <h3 className="eyebrow mb-3">{s.accent}</h3>
                <div className="flex flex-wrap gap-3">
                  {ACCENTS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => update({ accent: a.id })}
                      aria-pressed={accent === a.id}
                      title={a.label}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 ${
                          accent === a.id ? "scale-105 ring-2 ring-fg/80 ring-offset-2 ring-offset-elev" : "group-hover:scale-105"
                        }`}
                        style={{ background: `linear-gradient(135deg, ${a.swatch}, ${a.swatch}99)` }}
                      >
                        {accent === a.id && <Check className="h-5 w-5 text-black/80" strokeWidth={3} />}
                      </span>
                      <span className="text-[11px] text-muted">{a.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="eyebrow mb-3">{s.language}</h3>
                <Segmented
                  layoutId="seg-lang"
                  value={lang}
                  onChange={(v) => update({ lang: v })}
                  options={[
                    { value: "en", label: "English" },
                    { value: "bn", label: "বাংলা" },
                  ]}
                />
              </section>

              <section>
                <h3 className="eyebrow mb-3">{s.motion}</h3>
                <Segmented
                  layoutId="seg-motion"
                  value={motionPref}
                  onChange={(v) => update({ motion: v })}
                  options={[
                    { value: "full", label: s.motionFull },
                    { value: "reduced", label: s.motionReduced },
                  ]}
                />
              </section>

              {/* live preview of the current palette */}
              <section className="overflow-hidden rounded-2xl border border-line/10">
                <div className="flex h-2">
                  <span className="flex-1 bg-primary" />
                  <span className="flex-1 bg-accent" />
                  <span className="flex-1 bg-odoo" />
                  <span className="flex-1 bg-surface" />
                </div>
                <div className="flex items-center justify-between gap-3 bg-surface/40 p-4">
                  <div>
                    <p className="font-display font-semibold">
                      Aa <span className="text-primary">Primary</span> <span className="text-accent">Accent</span>
                    </p>
                    <p className="text-xs text-muted">{s.note}</p>
                  </div>
                  <span className="btn-primary pointer-events-none px-4 py-2 text-xs">{t.nav.hire}</span>
                </div>
              </section>
            </div>

            <div className="mt-auto pt-8">
              <button onClick={reset} className="btn-ghost w-full">
                <RotateCcw className="h-4 w-4" /> {s.reset}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
