import {
    Github,
    Linkedin,
    Mail,
    Facebook,
    Layout,
    Server,
    Code
} from "lucide-react";

export const translations = {
    en: {
        nav: {
            about: "About",
            services: "Services",
            skills: "Skills",
            skills: "Skills",
            projects: "Projects",
            experience: "Experience",
            education: "Education",
            contact: "Contact",
            hire: "Hire Me"
        },
        hero: {
            available: "✨ Available for new projects",
            greeting: "Hi, I'm",
            role: "Junior Full-Stack Web Developer",
            tagline: "Building digital products with code & creativity.",
            viewProjects: "View Projects",
            contactMe: "Contact Me",
            downloadCV: "Download CV",
            scroll: "Scroll"
        },
        about: {
            intro: "Introduction",
            overview: "Overview.",
            bio: "A passionate software engineer specialized in building production-grade applications and fluid interactive interfaces. I architect secure backends with Python/Django and craft pixel-perfect frontends using React and Tailwind. My focus is on delivering high-performance, scalable solutions that solve real-world problems.",
            frontendTitle: "Frontend",
            frontendDesc: "Crafting responsive, interactive, and pixel-perfect user interfaces using React and modern CSS.",
            backendTitle: "Backend",
            backendDesc: "Architecting scalable server-side logic and APIs with Python, Django, and secure database management."
        },
        skills: {
            intro: "What I know",
            title: "Tech Stack.",
            frontend: "Frontend",
            backend: "Backend",
            tools: "Tools & Others"
        },
        experience: {
            intro: "My Journey",
            title: "Experience."
        },
        education: {
            intro: "My Background",
            title: "Education."
        },
        projects: {
            intro: "My Work",
            title: "Projects.",
            desc: "A collection of projects showcasing my journey from building simple tools to complex SaaS platforms. Many of these are open-source and available on GitHub.",
            viewAll: "View all repositories on GitHub"
        },
        contact: {
            intro: "Get in touch",
            title: "Contact.",
            desc: "I'm currently looking for new opportunities as a Full-Stack Developer. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
            labels: {
                name: "Your Name",
                email: "Your Email",
                message: "Message",
                send: "Send Message",
                location: "Location",
                phone: "Phone"
            }
        },
        footer: {
            rights: "All rights reserved."
        }
    },
    bn: {
        nav: {
            about: "পরিচিতি",
            services: "সেবাসমূহ",
            skills: "দক্ষতা",
            skills: "দক্ষতা",
            projects: "প্রজেক্ট",
            experience: "অভিজ্ঞতা",
            education: "শিক্ষা",
            contact: "যোগাযোগ",
            hire: "নিয়োগ দিন"
        },
        hero: {
            available: "✨ নতুন প্রজেক্টের জন্য এভেইলএবল",
            greeting: "আমি",
            role: "জুনিয়র ফুল-স্ট্যাক ওয়েব ডেভেলপার",
            tagline: "কোড এবং সৃজনশীলতা দিয়ে ডিজিটাল পণ্য তৈরি করছি।",
            viewProjects: "আমার প্রজেক্ট দেখুন",
            contactMe: "যোগাযোগ করুন",
            downloadCV: "সিভি ডাউনলোড",
            scroll: "স্ক্রল করুন"
        },
        about: {
            intro: "পরিচিতি",
            overview: "সারসংক্ষেপ.",
            bio: "আমি একজন সফটওয়্যার ইঞ্জিনিয়ারিংয়ে উৎসাহী, প্রোডাকশন-গ্রেড অ্যাপ্লিকেশন এবং আধুনিক ইন্টারফেস তৈরিতে দক্ষ। আমি পাইথন/জ্যাঙ্গো দিয়ে সিকিউর ব্যাকএন্ড তৈরি করি এবং রিয়্যাক্ট/টেইলউইন্ড দিয়ে পিক্সেল-পারফেক্ট ফ্রন্টএন্ড ডিজাইন করি। আমার লক্ষ্য হলো পারফরম্যান্স এবং স্কেলেবল সলিউশন তৈরি করা যা বাস্তব সমস্যা সমাধান করে।",
            frontendTitle: "ফ্রন্টএন্ড",
            frontendDesc: "রিয়্যাক্ট এবং আধুনিক সিএসএস ব্যবহার করে রেসপন্সিভ এবং ইন্টারঅ্যাক্টিভ ইউজার ইন্টারফেস তৈরি করি।",
            backendTitle: "ব্যাকএন্ড",
            backendDesc: "পাইথন, জ্যাঙ্গো এবং সিকিউর ডাটাবেস ম্যানেজমেন্ট ব্যবহার করে স্কেলেবল ব্যাকএন্ড আর্কিটেকচার তৈরি করি।"
        },
        skills: {
            intro: "আমার দক্ষতা",
            title: "টেক স্ট্যাক.",
            frontend: "ফ্রন্টএন্ড",
            backend: "ব্যাকএন্ড",
            tools: "টুলস এবং অন্যান্য"
        },
        experience: {
            intro: "আমার যাত্রা",
            title: "কাজের অভিজ্ঞতা."
        },
        education: {
            intro: "শিক্ষাগত যোগ্যতা",
            title: "শিক্ষা."
        },
        projects: {
            intro: "আমার কাজ",
            title: "প্রজেক্টসমূহ.",
            desc: "আমার তৈরি কিছু প্রজেক্ট যা সাধারণ টুলস থেকে শুরু করে জটিল SaaS প্ল্যাটফর্ম পর্যন্ত বিস্তৃত। এর মধ্যে অনেকগুলোই ওপেন সোর্স এবং গিটহাবে পাওয়া যাবে।",
            viewAll: "গিটহাবে সব রিপোজিটরি দেখুন"
        },
        contact: {
            intro: "যোগাযোগ করুন",
            title: "যোগাযোগ.",
            desc: "আমি বর্তমানে ফুল-স্ট্যাক ডেভেলপার হিসেবে নতুন সুযোগ খুঁজছি। আপনার কোনো প্রশ্ন থাকলে বা হাই বলতে চাইলে, আমি শীঘ্রই উত্তর দেওয়ার চেষ্টা করব!",
            labels: {
                name: "আপনার নাম",
                email: "আপনার ইমেইল",
                message: "বার্তা",
                send: "বার্তা পাঠান",
                location: "অবস্থান",
                phone: "ফোন"
            }
        },
        footer: {
            rights: "সর্বস্বত্ব সংরক্ষিত।"
        }
    }
};
