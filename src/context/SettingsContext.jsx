import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { strings } from "../i18n/strings";

// Theme, accent, language and motion — persisted per device. index.html applies
// the same key before first paint, so keep STORAGE_KEY in sync with it.
const STORAGE_KEY = "ehasan:settings";
const DEFAULTS = { theme: "dark", accent: "emerald", lang: "en", motion: "full" };

// eslint-disable-next-line react-refresh/only-export-components
export const ACCENTS = [
  { id: "emerald", label: "Emerald", swatch: "#34c9ac" },
  { id: "gold", label: "Gold", swatch: "#e9b652" },
  { id: "ocean", label: "Ocean", swatch: "#60baff" },
  { id: "violet", label: "Violet", swatch: "#ac92fc" },
  { id: "rose", label: "Rose", swatch: "#fb788c" },
];

const readSaved = () => {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return DEFAULTS;
  }
};

const prefersLight = () => window.matchMedia?.("(prefers-color-scheme: light)").matches;
const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(readSaved);
  const [systemLight, setSystemLight] = useState(prefersLight);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq) return;
    const onChange = (e) => setSystemLight(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = settings.theme === "system" ? (systemLight ? "light" : "dark") : settings.theme;
  const reducedMotion = settings.motion === "reduced" || prefersReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.accent = settings.accent;
    root.dataset.motion = reducedMotion ? "reduced" : "full";
    root.lang = settings.lang;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* private mode — settings just won't persist */
    }
  }, [settings, resolvedTheme, reducedMotion]);

  const update = useCallback((patch) => setSettings((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setSettings(DEFAULTS), []);
  const toggleTheme = useCallback(
    () => setSettings((s) => ({ ...s, theme: resolvedTheme === "dark" ? "light" : "dark" })),
    [resolvedTheme],
  );
  const toggleLang = useCallback(() => setSettings((s) => ({ ...s, lang: s.lang === "en" ? "bn" : "en" })), []);

  const value = useMemo(() => {
    const { lang } = settings;
    // Pick the right language from a { en, bn } pair; plain strings pass through.
    const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.en : v);
    return {
      ...settings,
      resolvedTheme,
      reducedMotion,
      t: strings[lang],
      tr,
      update,
      reset,
      toggleTheme,
      toggleLang,
    };
  }, [settings, resolvedTheme, reducedMotion, update, reset, toggleTheme, toggleLang]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
