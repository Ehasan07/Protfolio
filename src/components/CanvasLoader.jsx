import { motion } from "framer-motion";

const CanvasLoader = () => {
    return (
        <div className="flex items-center justify-center w-full h-full bg-transparent">
            <motion.div
                className="relative w-16 h-16"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                <span className="absolute inset-0 border-4 border-primary/30 rounded-full"></span>
                <span className="absolute inset-0 border-4 border-t-primary rounded-full"></span>
            </motion.div>
            <motion.p
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-primary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                ...
            </motion.p>
        </div>
    );
};

export default CanvasLoader;
