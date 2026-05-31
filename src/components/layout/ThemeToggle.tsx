import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [ripple, setRipple] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

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

    // Trigger ripple burst
    setRipple(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setRipple(true));
    });
    setTimeout(() => setRipple(false), 600);
  };

  return (
    <>
      <style>{`
        .theme-toggle-track {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 56px;
          height: 28px;
          border-radius: 9999px;
          padding: 3px;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: background 0.4s ease;
          outline: none;
          overflow: visible;
        }

        /* Dark mode track */
        .theme-toggle-track.is-dark {
          background: rgba(255,255,255,0.08);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 12px rgba(139,92,246,0.15);
        }

        /* Light mode track */
        .theme-toggle-track.is-light {
          background: rgba(0,0,0,0.08);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.10), 0 0 12px rgba(251,191,36,0.25);
        }

        /* Hover glow */
        .theme-toggle-track:hover.is-dark {
          background: rgba(255,255,255,0.12);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18), 0 0 18px rgba(139,92,246,0.25);
        }
        .theme-toggle-track:hover.is-light {
          background: rgba(0,0,0,0.10);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.14), 0 0 18px rgba(251,191,36,0.40);
        }

        /* Sliding thumb */
        .theme-toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, box-shadow 0.4s ease;
          will-change: transform;
        }

        .theme-toggle-track.is-light .theme-toggle-thumb {
          transform: translateX(28px);
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          box-shadow: 0 2px 8px rgba(251,191,36,0.6), 0 0 0 2px rgba(251,191,36,0.15);
          color: #fff;
        }

        .theme-toggle-track.is-dark .theme-toggle-thumb {
          transform: translateX(0px);
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          box-shadow: 0 2px 8px rgba(139,92,246,0.6), 0 0 0 2px rgba(139,92,246,0.15);
          color: #fff;
        }

        /* Icon spin+scale on switch */
        .theme-toggle-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
        }

        .theme-toggle-track.is-light .theme-toggle-icon {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }

        .theme-toggle-track.is-dark .theme-toggle-icon {
          transform: rotate(-30deg) scale(1);
          opacity: 1;
        }

        /* Stars in the dark track */
        .theme-toggle-stars {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .theme-toggle-track.is-dark .theme-toggle-stars {
          opacity: 1;
        }
        .theme-toggle-star {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255,255,255,0.7);
        }

        /* Ripple burst */
        .theme-toggle-ripple {
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          pointer-events: none;
          opacity: 0;
          border: 1.5px solid transparent;
          transform: scale(0.7);
          transition: none;
        }
        .theme-toggle-ripple.active {
          animation: toggleRipple 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .theme-toggle-track.is-light .theme-toggle-ripple {
          border-color: rgba(251,191,36,0.5);
        }
        .theme-toggle-track.is-dark .theme-toggle-ripple {
          border-color: rgba(139,92,246,0.5);
        }

        @keyframes toggleRipple {
          0%   { opacity: 0.8; transform: scale(0.85); }
          60%  { opacity: 0.3; transform: scale(1.15); }
          100% { opacity: 0;   transform: scale(1.3); }
        }
      `}</style>

      <button
        ref={btnRef}
        onClick={toggle}
        aria-label="Toggle theme"
        className={`theme-toggle-track ${light ? "is-light" : "is-dark"}`}
      >
        {/* Tiny star dots in dark mode */}
        <span className="theme-toggle-stars" aria-hidden="true">
          <span className="theme-toggle-star" style={{ width: 2, height: 2, top: "30%", left: "62%" }} />
          <span className="theme-toggle-star" style={{ width: 1.5, height: 1.5, top: "55%", left: "72%" }} />
          <span className="theme-toggle-star" style={{ width: 1.5, height: 1.5, top: "22%", left: "75%" }} />
        </span>

        {/* Ripple burst ring */}
        <span className={`theme-toggle-ripple ${ripple ? "active" : ""}`} aria-hidden="true" />

        {/* Sliding thumb */}
        <span className="theme-toggle-thumb">
          <span className="theme-toggle-icon">
            {light
              ? <Sun size={13} strokeWidth={2.5} />
              : <Moon size={12} strokeWidth={2.5} />
            }
          </span>
        </span>
      </button>
    </>
  );
}