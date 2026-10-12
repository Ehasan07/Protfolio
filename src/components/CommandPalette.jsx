import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Copy,
  CornerDownLeft,
  Download,
  FolderGit2,
  Hash,
  Languages,
  Search,
  SlidersHorizontal,
  SunMoon,
} from "lucide-react";
import { SiOdoo } from "react-icons/si";
import SocialIcon from "./ui/SocialIcon";
import { useSettings } from "../context/SettingsContext";
import { useUI } from "../context/UIContext";
import { NAV_SECTIONS } from "../data/nav";
import { moreProjects, odooModules, products, projectFilters } from "../data/projects";
import { profile, socials } from "../data/profile";
import { lockScroll, scrollToId, unlockScroll } from "../lib/scroll";

// ⌘K / Ctrl+K: jump to any section or project, or run a quick action.
// The dialog mounts fresh on every open, so the query and selection start clean.
function PaletteDialog({ close }) {
  const ui = useUI();
  const { t, tr, toggleTheme, toggleLang } = useSettings();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const groups = useMemo(() => {
    const p = t.palette;
    return [
      {
        title: p.navigate,
        items: NAV_SECTIONS.map((id) => ({
          id: `nav-${id}`,
          label: t.nav[id],
          icon: Hash,
          run: () => scrollToId(id),
        })),
      },
      {
        title: p.projects,
        items: [
          ...products.map((pr) => ({
            id: `p-${pr.id}`,
            label: pr.title,
            hint: tr(pr.kicker),
            icon: FolderGit2,
            run: () => ui.openProject(pr),
          })),
          ...odooModules.map((m) => ({
            id: `o-${m.id}`,
            label: m.title,
            hint: "Odoo 12",
            icon: SiOdoo,
            run: () => ui.openProject({ ...m, kind: "odoo" }),
          })),
          ...moreProjects.map((m) => ({
            id: `m-${m.id}`,
            label: m.title,
            hint: tr(projectFilters.find((f) => f.id === m.category)?.label),
            icon: FolderGit2,
            run: () => ui.openProject(m),
          })),
        ],
      },
      {
        title: p.actions,
        items: [
          {
            id: "a-email",
            label: p.copyEmail,
            hint: profile.email,
            icon: Copy,
            run: () => navigator.clipboard?.writeText(profile.email).then(() => ui.notify(t.contact.copied)),
          },
          {
            id: "a-cv",
            label: p.downloadCv,
            icon: Download,
            run: () => {
              const a = document.createElement("a");
              a.href = profile.resume;
              a.download = "S-M-Ehasanul-Haque-CV.pdf";
              a.click();
            },
          },
          { id: "a-chat", label: p.openChat, icon: Bot, run: () => ui.setChatOpen(true) },
          { id: "a-theme", label: p.toggleTheme, icon: SunMoon, run: toggleTheme },
          { id: "a-lang", label: p.toggleLang, icon: Languages, run: toggleLang },
          { id: "a-settings", label: p.openSettings, icon: SlidersHorizontal, run: () => ui.setSettingsOpen(true) },
        ],
      },
      {
        title: p.links,
        items: socials.map((s) => ({
          id: `l-${s.id}`,
          label: s.label,
          hint: s.handle,
          icon: (props) => <SocialIcon id={s.id} {...props} />,
          run: () => window.open(s.href, "_blank", "noopener"),
        })),
      },
    ];
  }, [t, tr, ui, toggleTheme, toggleLang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => `${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length);
  }, [groups, query]);

  const flat = filtered.flatMap((g) => g.items);

  useEffect(() => {
    lockScroll();
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(id);
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item) => {
    close();
    // Let the palette close (and unlock scrolling) before acting.
    setTimeout(item.run, 120);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      run(flat[active]);
    } else if (e.key === "Escape") {
      close();
    }
  };

  let index = -1;

  return (
    <motion.div
      key="palette"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-[85] flex items-start justify-center bg-black/55 px-3 pt-[12vh] backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.search}
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-line/10 bg-elev/95 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 border-b border-line/10 px-5">
          <Search className="h-5 w-5 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t.palette.placeholder}
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted/70"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={flat[active] ? `pal-${flat[active].id}` : undefined}
          />
          <kbd className="rounded-md border border-line/15 px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
        </div>

        <div
          ref={listRef}
          id="palette-list"
          role="listbox"
          data-lenis-prevent
          className="max-h-[55vh] overflow-y-auto p-2"
        >
          {flat.length === 0 && <p className="px-4 py-10 text-center text-sm text-muted">{t.palette.empty}</p>}
          {filtered.map((g) => (
            <div key={g.title} className="mb-1">
              <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{g.title}</p>
              {g.items.map((item) => {
                index += 1;
                const i = index;
                const Icon = item.icon;
                const selected = i === active;
                return (
                  <button
                    key={item.id}
                    id={`pal-${item.id}`}
                    role="option"
                    aria-selected={selected}
                    data-index={i}
                    onMouseMove={() => setActive(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      selected ? "text-fg" : "text-fg/80"
                    }`}
                    style={selected ? { backgroundColor: "rgb(var(--primary) / 0.12)" } : undefined}
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg ${selected ? "bg-primary text-on-primary" : "bg-surface text-muted"}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.hint && <span className="truncate text-xs text-muted">{item.hint}</span>}
                    {selected && <CornerDownLeft className="h-3.5 w-3.5 text-muted" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line/10 px-5 py-3 font-mono text-[10px] text-muted">
          <span>↑ ↓ · ↵</span>
          <span>⌘K / Ctrl K {t.palette.hint}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useUI();
  return (
    <AnimatePresence>
      {paletteOpen && <PaletteDialog key="palette" close={() => setPaletteOpen(false)} />}
    </AnimatePresence>
  );
}
