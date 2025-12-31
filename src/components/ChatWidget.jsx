import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { generateResponse, getMemory } from "../utils/chatLogic";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const messagesEndRef = useRef(null);
    const synthesisRef = useRef(window.speechSynthesis);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ("webkitSpeechRecognition" in window || "speechRecognition" in window) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.speechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputValue(transcript);
                handleSend(transcript);
            };

            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    // Initial Greeting & Memory
    useEffect(() => {
        const memory = getMemory();
        const timer = setTimeout(() => {
            // Only greet automatically if it's the first visit or if the chat hasn't been opened in this session
            if (!sessionStorage.getItem("chat_greeted")) {
                let greeting = "";
                if (memory.visits > 0 && memory.topics.length > 0) {
                    greeting = language === "bn"
                        ? `স্বাগতম আবার! শেষবার আমরা ${memory.topics[0]} নিয়ে কথা বলেছিলাম।`
                        : `Welcome back! I remember you were interested in ${memory.topics[0]}.`;
                } else {
                    greeting = language === "bn"
                        ? "হাই! আমি এহসানুল হকের পার্সোনাল এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
                        : "Hi there! 👋 I'm Ehasan's intelligent assistant. Ask me anything about his projects or skills!";
                }

                addMessage({ role: "assistant", content: greeting });
                sessionStorage.setItem("chat_greeted", "true");
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const { t, language } = useLanguage();

    const addMessage = (msg) => {
        setMessages((prev) => [...prev, msg]);
        if (msg.role === "assistant" && !isSpeaking) {
            speak(msg.content);
        }
    };

    const speak = (text) => {
        if (synthesisRef.current.speaking) synthesisRef.current.cancel();

        // Simple language detection for voice
        const isBanglaText = /[\u0980-\u09FF]/.test(text);
        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find a good voice
        const voices = synthesisRef.current.getVoices();
        const preferredVoice = voices.find(v => isBanglaText ? v.lang.includes("bn") : v.name.includes("Google US English") || v.lang.includes("en-US"));

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onstart = () => setIsSpeaking(true);

        synthesisRef.current.speak(utterance);
    };

    const stopSpeaking = () => {
        if (synthesisRef.current.speaking) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const handleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const getAIResponse = async (input) => {
        setIsTyping(true);

        // Simulate thinking time based on complexity (randomized)
        await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

        // Delegate to the "Brain"
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

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Assistant</h3>
                                    <p className="text-xs text-primary animate-pulse">Online & Ready</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={isSpeaking ? stopSpeaking : () => { }} className="text-gray-400 hover:text-white transition-colors">
                                    {isSpeaking ? <VolumeX className="w-4 h-4 text-primary" /> : <Volume2 className="w-4 h-4" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-primary text-black rounded-br-none font-medium"
                                            : "bg-white/10 text-gray-200 rounded-bl-none border border-white/5"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center h-10">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="flex items-center gap-2 bg-black/40 rounded-full px-4 py-2 border border-white/10 focus-within:border-primary/50 transition-colors">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-gray-500"
                                />

                                <button
                                    onClick={handleVoiceInput}
                                    className={`p-2 rounded-full transition-all ${isListening ? "bg-red-500/20 text-red-500 animate-pulse" : "text-gray-400 hover:text-white"}`}
                                >
                                    <Mic className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim()}
                                    className="p-2 bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 p-4 bg-primary text-black rounded-full shadow-[0_0_30px_rgba(0,229,255,0.4)] z-50 group transition-all"
            >
                <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </motion.button>
        </>
    );
};

export default ChatWidget;
