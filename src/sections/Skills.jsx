import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import SectionWrapper from "../components/SectionWrapper";
import { useLanguage } from "../context/LanguageContext";

import TagCloud from "../components/TagCloud";

const Skills = () => {
    const { t } = useLanguage();

    // Flatten all skills for the cloud
    const cloudTags = skills.flatMap(group => group.items.map(s => s.name));

    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-14 text-center"
            >
                <p className="text-primary font-medium tracking-wider uppercase mb-2">{t.skills.intro}</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold">{t.skills.title}</h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">

                {/* 3D Cloud - Visually imposing feature */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full flex justify-center order-1 lg:order-2"
                >
                    <TagCloud tags={cloudTags} />
                </motion.div>

                {/* Skills Grid - Detailed Information */}
                <div className="grid grid-cols-1 gap-8 flex-[1.5] w-full order-2 lg:order-1">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    <skillGroup.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold">{skillGroup.category === "Backend" ? t.skills.backend : skillGroup.category === "Frontend" ? t.skills.frontend : t.skills.tools}</h3>
                            </div>

                            <div className="space-y-4">
                                {skillGroup.items.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                                            <span className="text-gray-500 text-xs">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Skills, "skills");
