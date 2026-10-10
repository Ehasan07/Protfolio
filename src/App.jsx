import { MotionConfig } from "framer-motion";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { UIProvider } from "./context/UIContext";
import BackgroundFX from "./components/layout/BackgroundFX";
import SmoothScroll from "./components/layout/SmoothScroll";
import ScrollProgress from "./components/layout/ScrollProgress";
import Intro from "./components/layout/Intro";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Toast from "./components/layout/Toast";
import CommandPalette from "./components/CommandPalette";
import SettingsPanel from "./components/SettingsPanel";
import ProjectModal from "./components/work/ProjectModal";
import ChatWidget from "./components/chat/ChatWidget";
import Hero from "./sections/Hero";
import TechMarquee from "./sections/TechMarquee";
import About from "./sections/About";
import Services from "./sections/Services";
import Work from "./sections/Work";
import Skills from "./sections/Skills";
import Journey from "./sections/Journey";
import Contact from "./sections/Contact";

function Site() {
  const { reducedMotion, t } = useSettings();

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        {t.skip}
      </a>
      <Intro />
      <SmoothScroll />
      <ScrollProgress />
      <BackgroundFX />
      <Navbar />

      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Work />
        <Skills />
        <Journey />
        <Contact />
      </main>

      <div className="relative z-10 overflow-x-clip">
        <Footer />
      </div>

      <ChatWidget />
      <ProjectModal />
      <SettingsPanel />
      <CommandPalette />
      <Toast />
    </MotionConfig>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <UIProvider>
        <Site />
      </UIProvider>
    </SettingsProvider>
  );
}
