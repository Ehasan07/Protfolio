import { motion } from "framer-motion";
import { services } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

const Services = () => {
    const { t, language } = useLanguage();

    return (
        <section id="services" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {language === 'bn' ? 'আমার সেবাসমূহ' : 'My Services'}
                        </span>
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]"
                        >
                            <div className={`p-4 rounded-xl bg-white/5 w-fit mb-6 group-hover:bg-white/10 transition-colors ${service.color}`}>
                                <service.icon className="w-8 h-8" />
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                                {language === 'bn' ? service.title_bn : service.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed">
                                {language === 'bn' ? service.description_bn : service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
