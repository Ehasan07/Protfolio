import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// Fade + rise + un-blur when scrolled into view. Used for nearly every block.
export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div", once = true, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
