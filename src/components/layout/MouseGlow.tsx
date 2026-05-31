import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const OUTER = 600;
const INNER = 200;
const DOT   = 8;

export function MouseGlow() {
  const rawX = useMotionValue(-999);
  const rawY = useMotionValue(-999);

  // Springs with different stiffness so layers drift at different speeds
  const outerX = useSpring(useTransform(rawX, v => v - OUTER / 2), { stiffness: 80,  damping: 22, mass: 0.6 });
  const outerY = useSpring(useTransform(rawY, v => v - OUTER / 2), { stiffness: 80,  damping: 22, mass: 0.6 });
  const innerX = useSpring(useTransform(rawX, v => v - INNER / 2), { stiffness: 160, damping: 18, mass: 0.3 });
  const innerY = useSpring(useTransform(rawY, v => v - INNER / 2), { stiffness: 160, damping: 18, mass: 0.3 });
  const dotX   = useSpring(useTransform(rawX, v => v - DOT / 2),   { stiffness: 400, damping: 28, mass: 0.1 });
  const dotY   = useSpring(useTransform(rawY, v => v - DOT / 2),   { stiffness: 400, damping: 28, mass: 0.1 });

  const [enabled, setEnabled] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Read initial theme
    const checkTheme = () =>
      setIsLight(document.documentElement.classList.contains("light"));

    checkTheme();

    // Watch for theme class changes on <html>
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");
    setEnabled(!mq.matches);
    if (mq.matches) return;

    const onMove = (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    const onDown = () => { setClicked(true); setTimeout(() => setClicked(false), 350); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  // Dark mode  — purple/violet on mix-blend-screen (adds light to dark bg)
  // Light mode — warm amber/orange on mix-blend-multiply (subtracts from light bg)
  const blendMode  = isLight ? "multiply"  : "screen";
  const outerBg    = isLight
    ? "radial-gradient(circle, oklch(0.75 0.18 55 / 0.22) 0%, oklch(0.70 0.20 40 / 0.08) 55%, transparent 70%)"
    : "radial-gradient(circle, oklch(0.62 0.25 300 / 0.28) 0%, oklch(0.55 0.30 260 / 0.10) 55%, transparent 70%)";
  const innerBg    = isLight
    ? "radial-gradient(circle, oklch(0.72 0.22 50 / 0.45) 0%, oklch(0.68 0.24 35 / 0.15) 50%, transparent 70%)"
    : "radial-gradient(circle, oklch(0.78 0.28 295 / 0.55) 0%, oklch(0.65 0.30 270 / 0.20) 50%, transparent 70%)";
  const dotBg      = isLight ? "oklch(0.55 0.22 45 / 0.85)"  : "oklch(0.92 0.15 290 / 0.9)";
  const dotShadow  = isLight
    ? "0 0 8px 2px oklch(0.65 0.22 50 / 0.6)"
    : "0 0 8px 2px oklch(0.80 0.28 295 / 0.7)";
  const ringColor  = isLight
    ? "oklch(0.65 0.22 50 / 0.45)"
    : "oklch(0.78 0.28 295 / 0.5)";

  return (
    <>
      {/* Layer 1 — large soft ambient bloom (slowest) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[1]"
        style={{ x: outerX, y: outerY, width: OUTER, height: OUTER, mixBlendMode: blendMode }}
      >
        <div
          className="w-full h-full rounded-full blur-[80px]"
          style={{ background: outerBg }}
        />
      </motion.div>

      {/* Layer 2 — mid sharp halo (medium speed) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[2]"
        style={{ x: innerX, y: innerY, width: INNER, height: INNER, mixBlendMode: blendMode }}
      >
        <motion.div
          className="w-full h-full rounded-full blur-[24px]"
          animate={{ scale: clicked ? 1.5 : 1, opacity: clicked ? 0.9 : 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ background: innerBg }}
        />
      </motion.div>

      {/* Layer 3 — crisp cursor dot (fastest, snaps) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[3]"
        style={{ x: dotX, y: dotY, width: DOT, height: DOT, mixBlendMode: blendMode }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          animate={{ scale: clicked ? 3 : 1, opacity: clicked ? 0.5 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ background: dotBg, boxShadow: dotShadow }}
        />
      </motion.div>

      {/* Click burst ring */}
      {clicked && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-[2] rounded-full border"
          style={{
            x: innerX,
            y: innerY,
            width: INNER,
            height: INNER,
            mixBlendMode: blendMode,
            borderColor: ringColor,
          }}
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      )}
    </>
  );
}