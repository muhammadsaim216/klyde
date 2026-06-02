import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("klyde-theme");
    const isLight = saved === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("klyde-theme", next ? "light" : "dark");
  };
  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full glass text-foreground"
    >
      {/* Animated gradient halo */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0"
        style={{
          background: light
            ? "radial-gradient(circle at 50% 50%, oklch(0.85 0.18 80 / 0.55), transparent 70%)"
            : "radial-gradient(circle at 50% 50%, oklch(0.65 0.22 265 / 0.55), transparent 70%)",
        }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.6, 1.8] }}
        key={light ? "halo-light" : "halo-dark"}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {light ? (
          <motion.span
            key="sun"
            initial={{ y: -18, opacity: 0, rotate: -90, scale: 0.4 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 18, opacity: 0, rotate: 90, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute inline-flex"
          >
            <Sun className="size-4 drop-shadow-[0_0_6px_oklch(0.85_0.18_80_/_0.8)]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: -18, opacity: 0, rotate: 90, scale: 0.4 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 18, opacity: 0, rotate: -90, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute inline-flex"
          >
            <Moon className="size-4 drop-shadow-[0_0_6px_oklch(0.65_0.22_265_/_0.8)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
