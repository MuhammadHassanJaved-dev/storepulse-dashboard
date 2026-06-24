import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        foreground: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        brand: {
          primary: "#3B82F6",
          secondary: "#8B5CF6",
          accent: "#06B6D4",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        glass: "0 8px 32px -8px rgb(15 23 42 / 0.12)",
        glow: "0 0 0 1px rgb(59 130 246 / 0.1), 0 8px 24px -4px rgb(59 130 246 / 0.25)",
        "glow-violet": "0 0 0 1px rgb(139 92 246 / 0.1), 0 8px 24px -4px rgb(139 92 246 / 0.3)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 20% 0%, rgba(59,130,246,0.10) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.10) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(6,182,212,0.08) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 20% 0%, rgba(59,130,246,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.16) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(6,182,212,0.12) 0px, transparent 50%)",
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #06B6D4 100%)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        shimmer: "shimmer 1.6s linear infinite",
        "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
