import { personalInfo, skills, projects, experience } from "../data/portfolio";

// --- KNOWLEDGE BASE ---
const KNOWLEDGE = {
    identity: {
        name: "Ehasanul's Assistant",
        role: "Intelligent Digital Representative",
        purpose: "To assist visitors, showcase Ehasanul's work, and facilitate professional connections.",
        capabilities: ["Answer questions", "Show projects", "Explain skills", "Guide to contact"],
    },
    owner: {
        name: "S M Ehasanul Haque",
        role: "Junior Full-Stack Web Developer",
        experience: "2+ years",
        stack: "Python (Django/DRF) & React (Vite/Next.js)",
        keyProjects: ["MY-Card", "normERP"],
        traits: ["Problem Solver", "Creative", "Production-Focused", "Security-Conscious"],
        availability: "Open for new opportunities",
    },
};

// --- MEMORY SYSTEM ---
const MEMORY_KEY = "ehasan_chat_memory";

export const getMemory = () => {
    try {
        const stored = localStorage.getItem(MEMORY_KEY);
        return stored ? JSON.parse(stored) : {
            visits: 0,
            lastVisit: Date.now(),
            topics: [],
            name: null
        };
    } catch {
        return { visits: 0, lastVisit: Date.now(), topics: [], name: null };
    }
};

export const updateMemory = (data) => {
    const current = getMemory();
    const updated = { ...current, ...data, lastVisit: Date.now() };
    if (data.topic && !current.topics.includes(data.topic)) {
        updated.topics = [...current.topics, data.topic];
    }
    // Increment visits only if it's been more than 1 hour since last distinct visit logic (simplified here to just update)
    localStorage.setItem(MEMORY_KEY, JSON.stringify(updated));
    return updated;
};

// --- LANGUAGE PATTERNS ---
const PATTERNS = {
    greetings: ["hi", "hello", "hey", "greetings", "nomoshkar", "assalamu", "hola", "bonjour", "namaste", "halo"],
    intro: ["who are you", "what is this", "your name", "bot", "ai", "identity"],

    // Intents
    skills: ["skill", "stack", "tech", "react", "python", "django", "javascript", "backend", "frontend", "database", "know", "can do", "expert"],
    projects: ["project", "work", "portfolio", "built", "make", "create", "demo", "sample", "github", "my-card", "normerp", "card", "erp"],
    experience: ["experience", "job", "company", "dupno", "history", "years", "background"],
    contact: ["contact", "email", "phone", "call", "hire", "job", "freelance", "opportunity", "connect", "message", "touch", "reach"],
    price: ["price", "cost", "salary", "rate", "charge", "pay", "money", "quote"],
    resume: ["cv", "resume", "download", "pdf", "bio-data"],

    // Banlish/Bangla Specifics
    bangla_greetings: ["kemon", "aso", "valo", "khobor"],
    bangla_intents: {
        projects: ["kaj", "project", "dekhabo", "korso", "banako", "dekh"],
        contact: ["jogajog", "kotha", "number", "mail", "thako", "bash", "thikana"],
    }
};

// --- RESPONSE GENERATOR ---
export const generateResponse = (input, language = "en") => {
    const lowerInput = input.toLowerCase();

    // Detect Language Nuances (Simple Heuristic for context switching)
    const isBanglaScript = /[\u0980-\u09FF]/.test(input);
    const isBanlish = PATTERNS.bangla_greetings.some(w => lowerInput.includes(w)) ||
        Object.values(PATTERNS.bangla_intents).flat().some(w => lowerInput.includes(w));

    const activeLang = isBanglaScript || isBanlish ? "bn" : "en"; // Prioritize detected intent language over app state for chat

    // 1. GREETINGS & MEMORY
    if (PATTERNS.greetings.some(w => lowerInput.includes(w))) {
        const mem = getMemory(); // Check memory to greet back
        if (mem.visits > 1 && mem.topics.length > 0) {
            return activeLang === "bn"
                ? `স্বাগতম আবার! শেষবার আপনি ${mem.topics[0]} নিয়ে জানতে চেয়েছিলেন। আজ কীভাবে সাহায্য করতে পারি?`
                : `Welcome back! Last time you were interested in ${mem.topics[0]}. How can I help you today?`;
        }
        return activeLang === "bn"
            ? "হ্যালো! এহসানুল হকের পার্সোনাল অ্যাসিস্ট্যান্ট বলছি। আমি আপনাকে প্রজেক্ট, স্কিল বা হায়ার করার ব্যাপারে সাহায্য করতে পারি।"
            : "Hello! I'm Ehasanul's intelligent assistant. I can help you explore his projects, skills, or get in touch regarding opportunities.";
    }

    //update memory based on topic detection
    let currentTopic = null;

    // 2. SKILLS
    if (PATTERNS.skills.some(w => lowerInput.includes(w))) {
        currentTopic = "skills";
        updateMemory({ topic: "skills" });
        return activeLang === "bn"
            ? "এহসান একজন ফুল-স্ট্যাক ডেভেলপার। তিনি ব্যাকএন্ডে **Python (Django)** এবং ফ্রন্টএন্ডে **React** ব্যবহারে এক্সপার্ট। এছাড়াও তিনি PostgreSQL, Docker এবং Linux সার্ভার ম্যানেজমেন্টে দক্ষ।"
            : "Ehasanul is a specialist in **Python (Django/DRF)** key backend architecture and **React** for fluid frontends. He focuses on secure, scalable, and high-performance solutions.";
    }

    // 3. PROJECTS
    if (PATTERNS.projects.some(w => lowerInput.includes(w))) {
        currentTopic = "projects";
        updateMemory({ topic: "projects" });
        return activeLang === "bn"
            ? "তার সেরা কাজগুলোর মধ্যে রয়েছে **MY-Card** (ডিজিটাল আইডেন্টিটি প্ল্যাটফর্ম) এবং **normERP** (বিজনেজ ম্যানেজমেন্ট সিস্টেম)। আপনি প্রজেক্ট সেকশনে গিয়ে লাইভ ডেমো দেখতে পারেন!"
            : "He has built impressive production-grade applications. Notable ones include **MY-Card** (a SaaS for digital cards) and **normERP**. You can interact with them in the Projects section above!";
    }

    // 4. EXPERIENCE
    if (PATTERNS.experience.some(w => lowerInput.includes(w))) {
        currentTopic = "experience";
        updateMemory({ topic: "experience" });
        return activeLang === "bn"
            ? "তার ২ বছরের বেশি প্রফেশনাল অভিজ্ঞতা রয়েছে। বর্তমানে তিনি Dupno Limited-এ জুনিয়র এক্সিকিউটিভ (ওয়েব ডেভেলপার) হিসেবে কর্মরত।"
            : "Ehasanul has over **2 years of professional experience**. He is currently a Junior Full-Stack Developer at Dupno Limited, where he led the development of their core digital product.";
    }

    // 5. CONTACT & HIRING
    if (PATTERNS.contact.some(w => lowerInput.includes(w)) || PATTERNS.price.some(w => lowerInput.includes(w))) {
        currentTopic = "contact";
        updateMemory({ topic: "hiring" });
        return activeLang === "bn"
            ? `আপনি কি কোলাবরেশন বা হায়ার করতে আগ্রহী? সরাসরি যোগাযোগ করুন: **${personalInfo.email}**। আমি কি তার লিঙ্কডইন প্রোফাইল দিব?`
            : `Are you looking to hire or collaborate? Direct communication is best! You can reach him at **${personalInfo.email}**. Would you like me to connect you via LinkedIn?`;
    }

    // 6. RESUME
    if (PATTERNS.resume.some(w => lowerInput.includes(w))) {
        return activeLang === "bn"
            ? "আপনি উপরের হিরো সেকশন থেকে সিভি ডাউনলোড করতে পারবেন।"
            : "You can download his official CV directly from the 'Download CV' button in the Hero section at the top.";
    }

    // 7. IDENTITY
    if (PATTERNS.intro.some(w => lowerInput.includes(w))) {
        return activeLang === "bn"
            ? "আমি এহসান লাইভ ওয়েবসাইটের স্মার্ট অ্যাসিস্ট্যান্ট। আমার কাজ হলো এহসান সম্পর্কে আপনাকে তথ্য দেওয়া এবং যোগাযোগে সাহায্য করা।"
            : "I am the intelligent digital representative of Ehasanul Haque. My purpose is to help you navigate his portfolio and facilitate professional connections.";
    }

    // FALLBACK
    return activeLang === "bn"
        ? "আমি ঠিক বুঝতে পারছি না, তবে এহসানুল এ বিষয়ে ভালো বলতে পারবেন। আপনি কি তার সাথে যোগাযোগ করতে চান?"
        : "I'm focusing purely on Ehasanul's professional background. For specific inquiries, I recommend sending him a direct message!";
};
