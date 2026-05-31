import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        haki: {
          black: "#050505",
          ink: "#0D0D0D",
          panel: "#111111",
          line: "rgba(255,255,255,0.11)",
          red: "#FF0F33",
          redSoft: "rgba(255,15,51,0.14)",
          white: "#F7F7F2",
          muted: "rgba(247,247,242,0.62)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "red-soft": "0 0 64px rgba(255, 15, 51, 0.18)",
        "panel": "0 28px 80px rgba(0,0,0,0.52)",
      },
      transitionTimingFunction: {
        haki: "cubic-bezier(0.23, 1, 0.32, 1)",
        mass: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
