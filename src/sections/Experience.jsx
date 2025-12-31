import { motion } from "framer-motion";
import { experience } from "../data/portfolio";
import SectionWrapper from "../components/SectionWrapper";
import { Briefcase } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Experience = () => {
    const { t, language } = useLanguage();
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-14"
            >
                <p className="text-primary font-medium tracking-wider uppercase mb-2">{t.experience.intro}</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold">{t.experience.title}</h2>
            </motion.div>

            <div className="relative ml-4 md:ml-10 space-y-12">
                {/* Gradient Line */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />

                {experience.map((job, index) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="relative pl-8 md:pl-12 group"
                    >
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[5px] top-0 w-3 h-3 rounded-full border-2 border-background 
                            ${index === 0 ? "bg-primary animate-pulse shadow-[0_0_10px_#00e5ff]" : "bg-gray-600 group-hover:bg-secondary transition-colors"}`}
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-2xl font-bold text-white">
                                {language === 'bn' && job.role_bn ? job.role_bn : job.role}
                            </h3>
                            <span className="text-primary font-mono text-sm">{job.period}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-gray-400">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-lg font-medium">
                                {language === 'bn' && job.company_bn ? job.company_bn : job.company}
                            </span>
                        </div>

                        <p className="text-gray-300 mb-4 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">
                            {language === 'bn' && job.description_bn ? job.description_bn : job.description}
                        </p>

                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                            {(language === 'bn' && job.achievements_bn ? job.achievements_bn : job.achievements).map((achievement, i) => (
                                <li key={i} className="pl-2">
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Experience, "experience");
