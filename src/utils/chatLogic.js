import { personalInfo, skills, projects, experience, education, services } from "../data/portfolio";

// --- KNOWLEDGE BASE HELPER ---
// Helper function to find data from arrays
const findInArray = (array, keyword, keys = ['title', 'role', 'name', 'company']) => {
    return array.find(item =>
        keys.some(key => item[key] && item[key].toLowerCase().includes(keyword.toLowerCase()))
    );
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
    education: ["education", "study", "university", "degree", "college", "school", "daffodil"],
    services: ["service", "offer", "provide", "help", "freelance"],
    contact: ["contact", "email", "phone", "call", "hire", "job", "freelance", "opportunity", "connect", "message", "touch", "reach", "number", "whatsapp", "linkedin", "social"],
    price: ["price", "cost", "salary", "rate", "charge", "pay", "money", "quote"],
    resume: ["cv", "resume", "download", "pdf", "bio-data"],

    // Banlish/Bangla Specifics
    bangla_greetings: ["kemon", "aso", "valo", "khobor"],
    bangla_intents: {
        projects: ["kaj", "project", "dekhabo", "korso", "banako", "dekh"],
        contact: ["jogajog", "kotha", "number", "mail", "thako", "bash", "thikana", "phone"],
    }
};

// --- RESPONSE GENERATOR ---
// --- RESPONSE GENERATOR ---
export const generateResponse = (input, language = "en") => {
    const lowerInput = input.toLowerCase();

    // 0. SPECIFIC PROJECT QUERY (Search for specific project names first)
    const matchedProject = projects.find(p => lowerInput.includes(p.title.toLowerCase()));
    if (matchedProject) {
        updateMemory({ topic: "projects" });
        return `**${matchedProject.title}**: ${matchedProject.description} Tech Stack: ${matchedProject.tech.join(", ")}. It's one of his key projects!`;
    }

    // 1. GREETINGS & MEMORY
    if (PATTERNS.greetings.some(w => lowerInput.includes(w))) {
        const mem = getMemory();
        if (mem.visits > 1 && mem.topics.length > 0) {
            return `Welcome back! Last time you were interested in ${mem.topics[0]}. How can I help you today?`;
        }
        return "Hello! I'm Fabrito, Ehasan's intelligent assistant. I can give you detailed info about his projects, experience, or help you contact him directly.";
    }

    //update memory based on topic detection
    let currentTopic = null;

    // 2. CONTACT (High Priority) - STRICT DATA
    if (PATTERNS.contact.some(w => lowerInput.includes(w)) || PATTERNS.price.some(w => lowerInput.includes(w))) {
        currentTopic = "contact";
        updateMemory({ topic: "hiring" });

        // Check for specific contact types
        if (lowerInput.includes("email") || lowerInput.includes("mail")) {
            return `You can email him directly at: **${personalInfo.email}**`;
        }
        if (lowerInput.includes("phone") || lowerInput.includes("mobile") || lowerInput.includes("number") || lowerInput.includes("whatsapp")) {
            return `Here is his direct contact number (works on WhatsApp): **${personalInfo.phone}**`;
        }
        if (lowerInput.includes("linkedin")) {
            const linkedin = personalInfo.socials.find(s => s.name === "LinkedIn");
            return `LinkedIn Profile: ${linkedin ? linkedin.url : "Check the footer links!"}`;
        }

        // General contact response
        return `Are you looking to hire or collaborate? Direct communication is best!\n\n📧 Email: **${personalInfo.email}**\n📞 Phone/WhatsApp: **${personalInfo.phone}**\n\nWould you like his LinkedIn or Digital Card?`;
    }

    // 3. SKILLS
    if (PATTERNS.skills.some(w => lowerInput.includes(w))) {
        currentTopic = "skills";
        updateMemory({ topic: "skills" });

        // Aggregate skills for display
        const frontend = skills.find(s => s.category === "Frontend")?.items.map(i => i.name).join(", ");
        const backend = skills.find(s => s.category === "Backend")?.items.map(i => i.name).join(", ");

        return `Ehasanul is a Full-Stack specialist.\n\n🎨 **Frontend**: ${frontend}\n⚙️ **Backend**: ${backend}\n\nHe excels at architecting secure backends with Django and fluid frontends with React.`;
    }

    // 4. PROJECTS (General)
    if (PATTERNS.projects.some(w => lowerInput.includes(w))) {
        currentTopic = "projects";
        updateMemory({ topic: "projects" });
        const projectNames = projects.map(p => p.title).join(", ");
        return `He has built impressive production-grade applications. Key projects include: **${projectNames}**.\n\nAsk me about a specific one, like "What is MY-Card?" or "Tell me about normERP".`;
    }

    // 5. EXPERIENCE
    if (PATTERNS.experience.some(w => lowerInput.includes(w))) {
        currentTopic = "experience";
        updateMemory({ topic: "experience" });
        const latest = experience[0];
        return `Ehasanul has over **2 years of professional experience**. Currently, he is a **${latest.role}** at **${latest.company}**, leading the development of digital identity solutions like 'mycard'.`;
    }

    // 6. EDUCATION
    if (PATTERNS.education.some(w => lowerInput.includes(w))) {
        currentTopic = "education";
        updateMemory({ topic: "education" });
        const latestEd = education[0];
        return `He is currently pursuing his **${latestEd.degree}** in **${latestEd.major}** at **${latestEd.institution}**.`;
    }

    // 7. SERVICES
    if (PATTERNS.services.some(w => lowerInput.includes(w))) {
        currentTopic = "services";
        const serviceList = services.map(s => s.title).join(", ");
        return `Services offered: **${serviceList}**. Whether you need a complex Backend Architecture or a sleek Frontend, he can deliver.`;
    }

    // 8. RESUME
    if (PATTERNS.resume.some(w => lowerInput.includes(w))) {
        return "You can download his official CV directly from the 'Download CV' button in the Hero section at the top.";
    }

    // 9. IDENTITY
    if (PATTERNS.intro.some(w => lowerInput.includes(w))) {
        return "I am Fabrito, the intelligent digital representative of Ehasanul Haque. I'm here to answer questions about his work, experience, and help you connect with him.";
    }

    // FALLBACK
    return "I'm focusing purely on Ehasanul's professional background. You can ask about his **Projects**, **Skills**, **Experience**, or how to **Contact** him directly.";
};
