import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ProjectCard = ({ project, index }) => {
    const { language } = useLanguage();
    const Icon = project.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] h-full flex flex-col"
        >
            {/* Gradient Header with Icon */}
            <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.color || 'from-primary/20 to-secondary/20'} flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}>
                <div className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-[2px]" />

                <div className="relative z-10 p-6 rounded-full bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </div>

                {/* Overlay Icons on Hover */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/10 rounded-full hover:bg-primary hover:text-black text-white transition-all transform hover:scale-110"
                            title="View Code"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/10 rounded-full hover:bg-primary hover:text-black text-white transition-all transform hover:scale-110"
                            title="Live Demo"
                        >
                            <ExternalLink className="w-6 h-6" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-[#0a0a0a]">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {language === 'bn' && project.title_bn ? project.title_bn : project.title}
                </h3>

                <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed text-sm flex-grow">
                    {language === 'bn' && project.description_bn ? project.description_bn : project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/5 hover:border-primary/30 hover:text-primary transition-colors"
                        >
                            #{tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
