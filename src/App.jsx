import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CanvasLoader from "./components/CanvasLoader";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import ThemeSettings from "./components/ThemeSettings";

import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-background flex items-center justify-center">
        <CanvasLoader />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="bg-background min-h-screen text-white relative overflow-x-hidden">
        {/* Scroll Progress Bar */}
        <div style={{ scaleX: scrollProgress }} className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 shadow-[0_0_10px_var(--primary)]" />

        <Navbar />

        <Hero />

        <div className="space-y-24 pb-24">
          <About />
          <Services />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <Contact />
        </div>

        <Footer />
        <ChatWidget />
        <ThemeSettings />
      </div>
    </LanguageProvider>
  );
}

export default App;
