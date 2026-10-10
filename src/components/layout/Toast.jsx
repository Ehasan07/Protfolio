import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useUI } from "../../context/UIContext";

export default function Toast() {
  const { toast } = useUI();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="flex items-center gap-2 rounded-full border border-line/10 bg-elev/95 px-4 py-2.5 text-sm shadow-card backdrop-blur"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-on-primary">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
