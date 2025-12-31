import {
    Github,
    Linkedin,
    Mail,
    Facebook,
    Code,
    Database,
    Layout,
    Server,
    Smartphone,
    Globe,
    CreditCard,
    Brain,
    MousePointer,
    FlaskConical,
    ShieldCheck
} from "lucide-react";

export const personalInfo = {
    name: "S M Ehasanul Haque",
    role: "Junior Full-Stack Web Developer",
    tagline: "Building digital products with code & creativity.",
    bio: "A passionate software engineer specialized in building production-grade applications and fluid interactive interfaces. I architect secure backends with Python/Django and craft pixel-perfect frontends using React and Tailwind. My focus is on delivering high-performance, scalable solutions that solve real-world problems.",
    email: "shiplulink2003@gmail.com",
    phone: "+880 1782793008",
    location: "Dhaka, Bangladesh",
    siteUrl: "https://ehasanlive.com",
    resumeUrl: "/resume.pdf",
    socials: [
        {
            name: "GitHub",
            url: "https://github.com/Ehasan07",
            icon: Github,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/ehasan-shiplu-533748317/",
            icon: Linkedin,
        },
        {
            name: "Email",
            url: "mailto:shiplulink2003@gmail.com",
            icon: Mail,
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/ehasan2003",
            icon: Facebook,
        },
    ],
};

export const skills = [
    {
        category: "Frontend",
        icon: Layout,
        items: [
            { name: "React / Vite", level: 90 },
            { name: "Tailwind CSS", level: 95 },
            { name: "JavaScript (ES6+)", level: 90 },
            { name: "HTML5 / CSS3", level: 95 },
            { name: "Framer Motion", level: 80 },
        ],
    },
    {
        category: "Backend",
        icon: Server,
        items: [
            { name: "Python", level: 85 },
            { name: "Django", level: 85 },
            { name: "Django REST Framework", level: 80 },
            { name: "PostgreSQL", level: 75 },
            { name: "MongoDB", level: 70 },
        ],
    },
    {
        category: "Tools & Others",
        icon: Code,
        items: [
            { name: "Git / GitHub", level: 85 },
            { name: "RESTful APIs", level: 90 },
            { name: "Deployment", level: 70 },
            { name: "VS Code", level: 95 },
        ],
    },
];

export const education = [
    {
        id: 1,
        degree: "Bachelor of Science",
        degree_bn: "ব্যাচেলর অফ সায়েন্স (বি.এসসি)",
        major: "Computer Science & Engineering",
        major_bn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
        institution: "Daffodil International Professional Training Institute",
        institution_bn: "ড্যাফোডিল ইন্টারন্যাশনাল প্রফেশনাল ট্রেনিং ইনস্টিটিউট",
        period: "2019 - 2023",
        description: "Built a strong foundation in algorithms, data structures, and software engineering principles.",
        description_bn: "অ্যালগরিদম, ডেটা স্ট্রাকচার এবং সফটওয়্যার ইঞ্জিনিয়ারিং প্রিন্সিপালগুলিতে শক্তিশালী ভিত্তি গড়ে তুলেছি।",
        courses: ["Data Structures", "Algorithms", "OOP", "Database Systems", "Web Engineering"],
        courses_bn: ["ডেটা স্ট্রাকচার", "অ্যালগরিদম", "OOP", "ডাটাবেস সিস্টেম", "ওয়েব ইঞ্জিনিয়ারিং"]
    },
];

export const experience = [
    {
        id: 1,
        role: "Junior Executive / Web Developer",
        role_bn: "জুনিয়র এক্সিকিউটিভ / ওয়েব ডেভেলপার",
        company: "Dupno Limited",
        company_bn: "দুপনো লিমিটেড",
        period: "2023 - Present",
        description: "Leading the development of digital identity solutions and enterprise ERP systems. Spearheaded the creation of 'mycard', a SaaS platform for digital business cards, managing the full lifecycle from system design to deployment.",
        description_bn: "ডিজিটাল আইডেন্টিটি সল্যুশন এবং এন্টারপ্রাইজ ইআরপি সিস্টেম ডেভেলপমেন্টের নেতৃত্বে ছিলাম। 'mycard' (ডিজিটাল বিজনেস কার্ডের জন্য একটি SaaS প্ল্যাটফর্ম) তৈরির মূল দায়িত্ব পালন করেছি, সিস্টেম ডিজাইন থেকে ডেপ্লয়মেন্ট পর্যন্ত।",
        achievements: [
            "Built mycard.dupno.com from scratch using React/Node stack.",
            "Contributed to normERP, a scalable business resource planning tool.",
            "Optimized API response times by 40% through efficient query building in Django.",
        ],
        achievements_bn: [
            "React/Node স্ট্যাক ব্যবহার করে mycard.dupno.com তৈরি করেছি।",
            "normERP-এ অবদান রেখেছি, যা একটি স্কেলেবল বিজনেস রিসোর্স প্ল্যানিং টুল।",
            "জ্যাঙ্গোতে দক্ষ কুয়েরি বিলিংয়ের মাধ্যমে API রেসপন্স টাইম ৪০% অপ্টিমাইজ করেছি।"
        ]
    },
];

export const projects = [
    {
        id: 1,
        title: "MY-Card (SaaS)",
        title_bn: "মাই-কার্ড (SaaS)",
        description: "A comprehensive Fullstack SaaS platform for creating and sharing digital identity cards. Features customizable themes, QR code sharing, and analytics.",
        description_bn: "ডিজিটাল আইডেন্টিটি কার্ড তৈরি এবং শেয়ার করার জন্য একটি পূর্ণাঙ্গ SaaS প্ল্যাটফর্ম। কাস্টমাইজেবল থিম, QR কোড শেয়ারিং এবং অ্যানালিটিক্স ফিচার রয়েছে।",
        tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        link: "https://github.com/Ehasan07/E-card",
        live: "https://mycard.dupno.com",
        icon: CreditCard,
        color: "from-pink-500 to-rose-500",
        featured: true,
    },
    {
        id: 2,
        title: "normERP",
        title_bn: "নরম-ইআরপি",
        description: "Enterprise Resource Planning system designed for scalability and modular business management. Handles inventory, HR, and accounting.",
        description_bn: "স্কেলেবিলিটি এবং মডুলার বিজনেস ম্যানেজমেন্টের জন্য ডিজাইন করা এন্টারপ্রাইজ রিসোর্স প্ল্যানিং সিস্টেম। ইনভেন্টরি, এইচআর এবং অ্যাকাউন্টিং মডিউল রয়েছে।",
        tech: ["Python", "Django", "PostgreSQL", "Bootstrap"],
        link: "https://github.com/Ehasan07/normERP",
        live: null,
        icon: Database,
        color: "from-blue-500 to-cyan-500",
        featured: true,
    },
    {
        id: 3,
        title: "Interesting Cursor Hover",
        title_bn: "কার্সার হোভার ইফেক্ট",
        description: "An experimental project showcasing fluid cursor interactions and particle effects using vanilla JavaScript and CSS.",
        description_bn: "জাভাস্ক্রিপ্ট এবং সিএসএস ব্যবহার করে ফ্লুইড কার্সার ইন্টারঅ্যাকশন এবং পার্টিকেল ইফেক্ট প্রদর্শনের একটি এক্সপেরিমেন্টাল প্রজেক্ট।",
        tech: ["JavaScript", "HTML5", "CSS3"],
        link: "https://github.com/Ehasan07/interesting-cursor-hover",
        live: null,
        icon: MousePointer,
        color: "from-purple-500 to-indigo-500",
        featured: true,
    },
    {
        id: 4,
        title: "AI Chatbot Assistant",
        title_bn: "AI চ্যাটবট অ্যাসিস্ট্যান্ট",
        description: "An intelligent chatbot integrated into the portfolio to answer visitor queries in real-time. Supports bilingual (English/Bangla) conversations.",
        description_bn: "পোর্টফোলিওতে যুক্ত একটি বুদ্ধিমান চ্যাটবট যা ভিজিটরদের প্রশ্নের উত্তর রিয়েল-টাইমে দেয়। দ্বিভাষিক (ইংরেজি/বাংলা) কথোপকথন সমর্থন করে।",
        tech: ["OpenAI API", "React", "Node.js", "Web Speech API"],
        link: "#",
        live: "#",
        icon: Brain,
        color: "from-purple-500 to-indigo-500",
        featured: false,
    },
    {
        id: 5,
        title: "Fluid Hover Effects",
        description: "Physics-based hover animations simulating fluid dynamics on web elements.",
        tech: ["JavaScript", "Canvas API"],
        link: "https://github.com/Ehasan07/fluid-hover",
        live: null,
        icon: FlaskConical,
        color: "from-green-500 to-emerald-500",
        featured: false,
    },
    {
        id: 5,
        title: "Dynamic Table Filter",
        description: "Advanced client-side table filtering logic capable of handling complex datasets efficiently.",
        tech: ["JavaScript", "DOM Manipulation"],
        link: "https://github.com/Ehasan07/Dupno-table-filter",
        live: null,
        icon: Layout,
        color: "from-orange-500 to-amber-500",
        featured: false,
    },
    {
        id: 6,
        title: "Payment Gateway UI",
        description: "A secure-feeling, modern payment prototype interface with validation animations.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Ehasan07/dupno-payment",
        live: null,
        icon: ShieldCheck,
        color: "from-teal-500 to-cyan-600",
        featured: false,
    },
];

export const services = [
    {
        id: 1,
        title: "Frontend Development",
        title_bn: "ফ্রন্টএন্ড ডেভেলপমেন্ট",
        description: "Building responsive, pixel-perfect user interfaces with modern React ecosystems.",
        description_bn: "আধুনিক রিয়্যাক্ট ইকোসিস্টেম দিয়ে রেসপন্সিভ এবং পিক্সেল-পারফেক্ট ইউজার ইন্টারফেস তৈরি করা।",
        icon: Layout,
        color: "text-cyan-400"
    },
    {
        id: 2,
        title: "Backend Architecture",
        title_bn: "ব্যাকএন্ড আর্কিটেকচার",
        description: "Designing robust and scalable server-side applications using Node.js and Express.",
        description_bn: "নোড জেএস এবং এক্সপ্রেস ব্যবহার করে শক্তিশালী এবং স্কেলেবল সার্ভার-সাইড অ্যাপ্লিকেশন ডিজাইন করা।",
        icon: Server,
        color: "text-purple-400"
    },
    {
        id: 3,
        title: "Full Stack Solutions",
        title_bn: "ফুল স্ট্যাক সলিউশন",
        description: "End-to-end web application development from database design to deployment.",
        description_bn: "ডাটাবেস ডিজাইন থেকে ডিপ্লয়মেন্ট পর্যন্ত এন্ড-টু-এন্ড ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট।",
        icon: Globe,
        color: "text-green-400"
    }
];
