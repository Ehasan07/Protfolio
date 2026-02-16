import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Globe } from "lucide-react";
import { Link } from "react-scroll";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.about, to: "about" },
        { name: t.nav.services, to: "services" },
        { name: t.nav.skills, to: "skills" },
        { name: t.nav.projects, to: "projects" },
        { name: t.nav.experience, to: "experience" },
        { name: t.nav.education, to: "education" },
        { name: t.nav.contact, to: "contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="hero"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer flex items-center gap-2 group"
                >
                    <div className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-heading font-bold tracking-tight text-white">
                            Ehasan<span className="text-primary">live</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors cursor-pointer relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    <button
                        onClick={toggleLanguage}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-primary flex items-center gap-1"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">{language === "en" ? "BN" : "EN"}</span>
                    </button>

                    <Link
                        to="contact"
                        smooth={true}
                        duration={500}
                        className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 rounded-full text-sm font-medium transition-all hover:scale-105"
                    >
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-lg font-medium text-gray-300 hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
