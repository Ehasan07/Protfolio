import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { personalInfo } from "../data/portfolio";
import HeroBackground from "../components/HeroBackground";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-scroll";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i === text.length) clearInterval(timer);
            }, 50); // Speed of typing
            return () => clearInterval(timer);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <span className="text-primary font-semibold">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-1"
            />
        </span>
    );
};

const Hero = () => {
    const { t, language } = useLanguage();

    return (
        <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <HeroBackground />

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-0" />

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-6">

                {/* Animated Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md"
                >
                    <span className="text-primary font-medium tracking-wide text-sm md:text-base">
                        {t.hero.available}
                    </span>
                </motion.div>

                {/* Name with Glitch/Gradient Effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight"
                >
                    <span className="text-white block mb-2">{t.hero.greeting}</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x bg-300%">
                        {language === 'bn' ? 'এস এম এহসানুল হক' : personalInfo.name}
                    </span>
                </motion.h1>

                {/* Role & Bio */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light"
                >
                    <TypewriterText text={t.hero.role} delay={1.5} />
                    <br className="hidden md:block" />
                    <span className="text-gray-400 text-base md:text-xl mt-2 block">
                        {t.hero.tagline}
                    </span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                    <Link
                        to="projects"
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className="px-8 py-3.5 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
                    >
                        {t.hero.viewProjects}
                    </Link>
                    <Link
                        to="contact"
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 backdrop-blur-md transition-all hover:border-primary/50 cursor-pointer"
                    >
                        {t.hero.contactMe}
                    </Link>
                    <a
                        href={personalInfo.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 backdrop-blur-md transition-all hover:border-secondary/50 cursor-pointer flex items-center gap-2"
                    >
                        {t.hero.downloadCV}
                    </a>
                </motion.div>

                {/* Social Links Row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex gap-6 mt-8"
                >
                    {personalInfo.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200"
                            aria-label={social.name}
                        >
                            <social.icon className="w-6 h-6" />
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-gray-500 uppercase tracking-widest">{t.hero.scroll}</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="text-primary w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
