import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export const GradientButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    if (variant === "ghost") {
      return (
        <button
          ref={ref}
          className={`group relative inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-foreground transition hover:bg-white/10 ${className}`}
          {...props}
        >
          {children}
        </button>
      );
    }
    return (
      <button
        ref={ref}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_oklch(0.65_0.22_265/0.6)] transition hover:shadow-[0_12px_40px_-8px_oklch(0.70_0.27_300/0.7)] ${className}`}
        style={{ background: "linear-gradient(120deg, oklch(0.65 0.22 265), oklch(0.62 0.24 295))" }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";
