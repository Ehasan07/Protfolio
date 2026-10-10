import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

// Which overlay is open (command palette, settings, chat, case study) plus a
// tiny toast — shared so any button on the page can open any of them.
const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      paletteOpen,
      setPaletteOpen,
      settingsOpen,
      setSettingsOpen,
      chatOpen,
      setChatOpen,
      activeProject,
      openProject: setActiveProject,
      closeProject: () => setActiveProject(null),
      toast,
      notify,
    }),
    [paletteOpen, settingsOpen, chatOpen, activeProject, toast, notify],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => useContext(UIContext);
