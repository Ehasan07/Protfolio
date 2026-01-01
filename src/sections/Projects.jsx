import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import SectionWrapper from "../components/SectionWrapper";
import ProjectCard from "../components/ProjectCard";
import { useLanguage } from "../context/LanguageContext";

const Projects = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("all");

    const categories = [
        { id: "all", label: "All Work" },
        { id: "fullstack", label: "Full Stack" },
        { id: "frontend", label: "Frontend" },
        { id: "experimental", label: "Experimental" },
    ];

    const filteredProjects = projects.filter(project => {
        if (filter === "all") return true;
        const techStack = project.tech.join(" ").toLowerCase();
        if (filter === "fullstack") return techStack.includes("node") || techStack.includes("django") || techStack.includes("mongodb");
        if (filter === "frontend") return (techStack.includes("react") || techStack.includes("html")) && !techStack.includes("node") && !techStack.includes("django");
        if (filter === "experimental") return techStack.includes("canvas") || techStack.includes("dom") || techStack.includes("animation");
        return true;
    });

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-14 text-center md:text-left"
            >
                <p className="text-primary font-medium tracking-wider uppercase mb-2">{t.projects.intro}</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t.projects.title}</h2>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat.id
                                ? "bg-primary text-background font-bold shadow-lg scale-105"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <div className="mt-12 text-center">
                <a
                    href="https://github.com/Ehasan07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors border-b border-primary/30 hover:border-white pb-0.5"
                >
                    {t.projects.viewAll}
                </a>
            </div>
        </>
    );
};

export default SectionWrapper(Projects, "projects");
