import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";
import SectionWrapper from "../components/SectionWrapper";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col md:flex-row gap-12 justify-between items-center md:items-start">
            <div className="flex-1">
                <p className="text-primary font-medium tracking-wider uppercase mb-2">{t.contact.intro}</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">{t.contact.title}</h2>

                <p className="text-gray-400 text-lg max-w-lg mb-10">
                    {t.contact.desc}
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-3 bg-white/5 rounded-full text-primary">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t.contact.labels.email}</p>
                            <a href={`mailto:${personalInfo.email} `} className="text-lg font-medium hover:text-primary transition-colors">
                                {personalInfo.email}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-3 bg-white/5 rounded-full text-primary">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t.contact.labels.phone}</p>
                            <p className="text-lg font-medium">{personalInfo.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-3 bg-white/5 rounded-full text-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t.contact.labels.location}</p>
                            <p className="text-lg font-medium">{personalInfo.location}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 mt-12">
                    {personalInfo.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-primary/20 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300"
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contact.labels.name}</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contact.labels.email}</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contact.labels.message}</label>
                    <textarea
                        rows={4}
                        placeholder="What do you want to say?"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-transform active:scale-95"
                >
                    {t.contact.labels.send}
                </button>
            </motion.form>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
