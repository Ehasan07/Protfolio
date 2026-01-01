import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import SectionWrapper from "../components/SectionWrapper";
import profileImg from "../assets/profile.jpg";

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="flex-1">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-primary font-medium tracking-wider uppercase mb-2">
                        {t.about.intro}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        {t.about.overview}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                        {t.about.bio}
                    </p>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-2 text-white">{t.about.frontendTitle}</h3>
                        <p className="text-gray-400 text-sm">
                            {t.about.frontendDesc}
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/30 transition-colors backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-2 text-white">{t.about.backendTitle}</h3>
                        <p className="text-gray-400 text-sm">
                            {t.about.backendDesc}
                        </p>
                    </div>
                </div>
            </div>


            <div className="w-full max-w-sm mx-auto md:w-1/3 p-4 relative group order-first md:order-last">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl animate-pulse-slow z-0" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors"
                >
                    <img
                        src={profileImg}
                        alt="Profile"
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper(About, "about");
