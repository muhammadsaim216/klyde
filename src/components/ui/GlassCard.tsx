import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = HTMLMotionProps<"div"> & { children: ReactNode; glow?: boolean };

export function GlassCard({ children, className = "", glow = true, ...props }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-2xl glass gradient-border p-6 transition-shadow ${glow ? "hover:shadow-[0_20px_60px_-20px_oklch(0.70_0.27_300/0.4)]" : ""} ${className}`}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), oklch(0.70 0.27 300 / 0.15), transparent 40%)",
        }}
      />
      {children}
    </motion.div>
  );
}
