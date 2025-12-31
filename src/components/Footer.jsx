import { personalInfo } from "../data/portfolio";
import { Code2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-black py-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-heading font-bold tracking-tight text-white">
                        Ehasan<span className="text-primary">live</span>
                    </span>
                </div>

                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} S M Ehasanul Haque. {t.footer.rights}
                </p>

                <div className="flex gap-4">
                    {personalInfo.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            <social.icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
