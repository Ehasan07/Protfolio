import { motion } from "framer-motion";
import { education } from "../data/portfolio";
import SectionWrapper from "../components/SectionWrapper";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Education = () => {
    const { t, language } = useLanguage();
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-14"
            >
                <p className="text-primary font-medium tracking-wider uppercase mb-2">{t.education.intro}</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold">{t.education.title}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden group hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all"
                    >
                        {/* Decorative Top Border */}
                        <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary" />

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <span className="py-1 px-4 rounded-full bg-white/5 text-sm font-mono text-primary border border-primary/20">
                                    {edu.period}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {language === 'bn' && edu.degree_bn ? edu.degree_bn : edu.degree}
                            </h3>
                            <p className="text-gray-400 font-medium mb-1">
                                {language === 'bn' && edu.major_bn ? edu.major_bn : edu.major}
                            </p>
                            <p className="text-gray-500 text-sm mb-6 border-b border-white/10 pb-6">
                                {language === 'bn' && edu.institution_bn ? edu.institution_bn : edu.institution}
                            </p>

                            <p className="text-gray-300 leading-relaxed mb-6">
                                {language === 'bn' && edu.description_bn ? edu.description_bn : edu.description}
                            </p>

                            {/* Coursework Tags */}
                            {(edu.courses || edu.courses_bn) && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                                        {language === 'bn' ? "প্রধান কোর্সসমূহ" : "Key Coursework"}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(language === 'bn' && edu.courses_bn ? edu.courses_bn : edu.courses).map((course, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-3 py-1 bg-white/5 rounded-md text-gray-300 border border-white/5 hover:border-primary/30 transition-colors"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Education, "education");
