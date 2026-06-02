import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type Ripple = { id: number; x: number; y: number };

export function MouseGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.3 });
  const [enabled, setEnabled] = useState(true);
  const [light, setLight] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");
    setEnabled(!mq.matches);

    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const onClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 900);
    };

    if (!mq.matches) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mousedown", onClick);
    }

    // Track light/dark theme via the .light class on <html>
    const sync = () => setLight(document.documentElement.classList.contains("light"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      mo.disconnect();
    };
  }, [x, y]);

  if (!enabled) return null;

  const glowColor = light
    ? "oklch(0.70 0.22 265 / 0.35)"
    : "oklch(0.70 0.27 300 / 0.45)";
  const ringColor = light
    ? "oklch(0.55 0.22 265 / 0.55)"
    : "oklch(0.75 0.25 300 / 0.7)";
  const blendClass = light ? "mix-blend-multiply" : "mix-blend-screen";

  return (
    <>
      {/* Cursor-following soft glow */}
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[1] size-0 ${blendClass}`}
        style={{ x: sx, y: sy }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 size-[420px] rounded-full opacity-60 blur-3xl"
          style={{ background: `radial-gradient(circle, ${glowColor}, transparent 60%)` }}
        />
        {/* Small core dot */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 size-3 rounded-full opacity-70 blur-[2px]"
          style={{ background: ringColor }}
        />
      </motion.div>

      {/* Click ripples */}
      <div className={`pointer-events-none fixed inset-0 z-[1] ${blendClass}`} aria-hidden>
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute rounded-full"
              style={{
                left: r.x,
                top: r.y,
                border: `2px solid ${ringColor}`,
                boxShadow: `0 0 30px ${ringColor}`,
              }}
              initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.9 }}
              animate={{ width: 320, height: 320, x: -160, y: -160, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {ripples.map((r) => (
            <motion.span
              key={`burst-${r.id}`}
              className="absolute rounded-full blur-2xl"
              style={{
                left: r.x,
                top: r.y,
                background: `radial-gradient(circle, ${ringColor}, transparent 70%)`,
              }}
              initial={{ width: 40, height: 40, x: -20, y: -20, opacity: 0.8 }}
              animate={{ width: 220, height: 220, x: -110, y: -110, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
