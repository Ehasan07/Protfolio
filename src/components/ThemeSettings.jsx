import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Palette, Check } from "lucide-react";

const themes = [
    { name: "Cyan", primary: "0 229 255", secondary: "124 77 255" },     // Default
    { name: "Green", primary: "34 197 94", secondary: "16 185 129" },    // Matrix Green
    { name: "Purple", primary: "168 85 247", secondary: "217 70 239" },  // Cyber Punk
    { name: "Orange", primary: "249 115 22", secondary: "234 88 12" },   // Sunset
    { name: "Red", primary: "239 68 68", secondary: "185 28 28" },   // Crimson
];

const ThemeSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState("Cyan");

    const changeTheme = (theme) => {
        document.documentElement.style.setProperty("--primary", theme.primary);
        document.documentElement.style.setProperty("--secondary", theme.secondary);
        setActiveTheme(theme.name);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed top-1/2 right-0 z-50 p-3 bg-white/5 backdrop-blur-md border-l border-t border-b border-white/10 rounded-l-xl hover:bg-white/10 transition-colors shadow-2xl"
                whileHover={{ x: -2 }}
            >
                <Settings className="w-6 h-6 text-primary animate-spin-slow" />
            </motion.button>

            {/* Settings Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 20 }}
                            className="fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 p-6 z-50 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <Palette className="w-5 h-5 text-primary" />
                                    <h3 className="font-bold text-xl text-white">Settings</h3>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Color Theme */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Accent Color</h4>
                                    <div className="grid grid-cols-5 gap-3">
                                        {themes.map((theme) => (
                                            <button
                                                key={theme.name}
                                                onClick={() => changeTheme(theme)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${activeTheme === theme.name ? "border-white scale-110" : "border-transparent hover:scale-105"
                                                    }`}
                                                style={{ backgroundColor: `rgb(${theme.primary.replace(/ /g, ',')})` }}
                                                title={theme.name}
                                            >
                                                {activeTheme === theme.name && <Check className="w-5 h-5 text-black" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Customize the site's look to match your vibe. Changes happen instantly across the entire portfolio.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThemeSettings;
