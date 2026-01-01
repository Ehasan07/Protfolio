import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";
import SectionWrapper from "../components/SectionWrapper";
import { Mail, MapPin, Phone, Smartphone, Loader2, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const { t } = useLanguage();
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS SERVICE/TEMPLATE/PUBLIC KEY
        // You can find these in your EmailJS dashboard: https://dashboard.emailjs.com/
        const SERVICE_ID = "YOUR_SERVICE_ID";
        const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                setLoading(false);
                setSuccess(true);
                e.target.reset();
                setTimeout(() => setSuccess(false), 5000);
            }, (error) => {
                setLoading(false);
                setError(true);
                console.error(error.text);
                setTimeout(() => setError(false), 5000);
            });
    };

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

                <div className="flex flex-col gap-4 mt-8">
                    <a
                        href={personalInfo.digitalCard}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-background font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all transform hover:-translate-y-1"
                    >
                        <Smartphone className="w-5 h-5" />
                        Save Contact Info
                    </a>

                    <div className="flex gap-4 flex-wrap">
                        {personalInfo.socials.filter(s => s.name !== "Digital Card").map((social) => (
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
            </div>

            <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden"
            >
                {success && (
                    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                        <button onClick={() => setSuccess(false)} className="mt-6 text-primary hover:underline">
                            Send another message
                        </button>
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contact.labels.name}</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contact.labels.email}</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contact.labels.message}</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="What do you want to say?"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        t.contact.labels.send
                    )}
                </button>
            </motion.form>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
