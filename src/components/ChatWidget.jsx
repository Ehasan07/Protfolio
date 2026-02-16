import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, ChevronDown, Phone, User as UserIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { generateResponse, getMemory, updateMemory } from "../utils/chatLogic";

// Common Country Codes
const COUNTRIES = [
    { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
    { code: "+1", flag: "🇺🇸", name: "USA" },
    { code: "+44", flag: "🇬🇧", name: "UK" },
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+1", flag: "🇨🇦", name: "Canada" },
    { code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "+971", flag: "🇦🇪", name: "UAE" },
    { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
    { code: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+39", flag: "🇮🇹", name: "Italy" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+92", flag: "🇵🇰", name: "Pakistan" },
    { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
    { code: "+977", flag: "🇳🇵", name: "Nepal" },
    { code: "+31", flag: "🇳🇱", name: "Netherlands" },
    { code: "+46", flag: "🇸🇪", name: "Sweden" },
    { code: "+41", flag: "🇨🇭", name: "Switzerland" },
    { code: "+27", flag: "🇿🇦", name: "South Africa" },
    { code: "+55", flag: "🇧🇷", name: "Brazil" },
    { code: "+20", flag: "🇪🇬", name: "Egypt" },
    { code: "+90", flag: "🇹🇷", name: "Turkey" },
    { code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "+62", flag: "🇮🇩", name: "Indonesia" },
    { code: "+63", flag: "🇵🇭", name: "Philippines" },
    { code: "+84", flag: "🇻🇳", name: "Vietnam" },
    { code: "+66", flag: "🇹🇭", name: "Thailand" },
];

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Auth State
    const [isRegistered, setIsRegistered] = useState(false);
    const [userData, setUserData] = useState({ name: "", phone: "", countryCode: "+880" });
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    // Chat State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const { t, language } = useLanguage();

    // Load Registration from Session
    useEffect(() => {
        const storedUser = sessionStorage.getItem("fabrito_user");
        if (storedUser) {
            setIsRegistered(true);
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    // Initial Greeting & Memory (Only after registration)
    useEffect(() => {
        if (!isRegistered) return;

        const memory = getMemory();
        // Check if we should show greeting (on load)
        const timer = setTimeout(() => {
            if (!sessionStorage.getItem("chat_greeted")) {
                // If it's a fresh session but registered, greet
                const userName = userData.name.split(" ")[0] || "there";
                const greeting = `Welcome back, ${userName}! I remember you were interested in ${memory.topics[0] || "my work"}.`;

                // Avoid duplicate greeting if handleRegister already added it
                if (messages.length === 0) {
                    addMessage({ role: "assistant", content: greeting });
                }
                sessionStorage.setItem("chat_greeted", "true");
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [isRegistered]); // Removed userData.name deps to avoid double triggers

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const addMessage = (msg) => {
        setMessages((prev) => [...prev, msg]);
    };

    const getAIResponse = async (input) => {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 800));
        const response = generateResponse(input, language);
        setIsTyping(false);
        return response;
    };

    const handleSend = async (text = inputValue) => {
        if (!text.trim()) return;

        const userMsg = { role: "user", content: text };
        addMessage(userMsg);
        setInputValue("");

        const aiResponseText = await getAIResponse(text);
        addMessage({ role: "assistant", content: aiResponseText });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (userData.name && userData.phone) {
            sessionStorage.setItem("fabrito_user", JSON.stringify(userData));
            setIsRegistered(true);
            updateMemory({ name: userData.name }); // Save name to memory

            // Immediate Welcome Message
            const userName = userData.name.split(" ")[0];
            const welcomeMsg = `Welcome, ${userName}! I'm Fabrito. I know everything about Ehasanul's portfolio. How can I help you?`;

            addMessage({ role: "assistant", content: welcomeMsg });
            sessionStorage.setItem("chat_greeted", "true");
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[550px] bg-[#1a1a2e] border border-primary/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex justify-between items-center shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="relative bg-white/20 p-2 rounded-full">
                                    <Bot className="w-6 h-6 text-white" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></span>
                                </div>
                                <div className="text-white">
                                    <h3 className="font-bold text-base">Fabrito</h3>
                                    <p className="text-[10px] text-white/80 uppercase tracking-wider">Online & Ready</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => {
                                        sessionStorage.removeItem("fabrito_user");
                                        sessionStorage.removeItem("chat_greeted");
                                        setIsRegistered(false);
                                        setMessages([]);
                                        setUserData({ name: "", phone: "", countryCode: "+880" });
                                    }}
                                    className="text-white/60 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full"
                                    title="Reset Chat"
                                >
                                    <Sparkles className="w-4 h-4" />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* CONTENT AREA */}
                        {!isRegistered ? (
                            // --- REGISTRATION FORM ---
                            <div className="flex-1 p-6 flex flex-col justify-center items-center bg-[#1a1a2e] text-white relative">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <Bot className="w-8 h-8 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold mb-2">Welcome to Fabrito AI</h2>
                                    <p className="text-gray-400 text-sm">Please introduce yourself to start chatting.</p>
                                </div>

                                <form onSubmit={handleRegister} className="w-full space-y-4">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            className="w-full bg-[#2a2a40] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-all"
                                            value={userData.name}
                                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                                        />
                                    </div>

                                    {/* Phone Model */}
                                    <div className="flex gap-2">
                                        {/* Country Code Dropdown */}
                                        <div className="relative w-1/3">
                                            <button
                                                type="button"
                                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                className="w-full h-full bg-[#2a2a40] border border-white/10 rounded-xl flex items-center justify-between px-3 text-white focus:border-primary transition-all"
                                            >
                                                <span className="text-lg mr-1">{COUNTRIES.find(c => c.code === userData.countryCode)?.flag}</span>
                                                <span className="text-sm">{userData.countryCode}</span>
                                                <ChevronDown className="w-3 h-3 text-gray-400" />
                                            </button>

                                            {showCountryDropdown && (
                                                <div className="absolute bottom-full left-0 w-[200px] mb-2 bg-[#2a2a40] border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50">
                                                    {COUNTRIES.map((c) => (
                                                        <button
                                                            key={c.name}
                                                            type="button"
                                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                                                            onClick={() => {
                                                                setUserData({ ...userData, countryCode: c.code });
                                                                setShowCountryDropdown(false);
                                                            }}
                                                        >
                                                            <span className="text-lg">{c.flag}</span>
                                                            <span className="text-gray-300 text-sm flex-1">{c.name}</span>
                                                            <span className="text-primary text-xs">{c.code}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone Input */}
                                        <div className="relative flex-1">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Mobile Number"
                                                className="w-full bg-[#2a2a40] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-all"
                                                value={userData.phone}
                                                onChange={e => setUserData({ ...userData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Start Chatting <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            // --- CHAT INTERFACE ---
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a2e] scrollbar-thin scrollbar-thumb-white/10">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                                    ? "bg-primary text-black rounded-br-none"
                                                    : "bg-[#2a2a40] text-gray-100 rounded-bl-none border border-white/5"
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-[#2a2a40] p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center h-12">
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-[#1a1a2e] border-t border-white/5">
                                    <div className="flex items-center gap-2 bg-[#2a2a40] rounded-full px-4 py-2 border border-white/10 focus-within:border-primary transition-colors shadow-inner">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                            placeholder="Type your question..."
                                            className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-gray-500"
                                        />

                                        <button
                                            onClick={() => handleSend()}
                                            disabled={!inputValue.trim()}
                                            className="p-2 bg-primary text-black rounded-full hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform active:scale-95"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="text-[10px] text-gray-600">Powered by Fabrito AI</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 group">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg mb-2 relative"
                        >
                            Ask Fabrito
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-0 w-14 h-14 bg-primary rounded-full shadow-[0_4px_20px_rgba(var(--primary),0.4)] flex items-center justify-center overflow-hidden"
                >
                    {isOpen ? <X className="text-black w-6 h-6" /> : <Bot className="text-black w-7 h-7" />}
                </motion.button>
            </div>
        </>
    );
};

export default ChatWidget;
