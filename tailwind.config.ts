import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "bg-primary": "#0B0E11",
        "bg-secondary": "#1E2329",
        "bg-tertiary": "#181A20",
        "bg-elevated": "#2B3139",
        // Brand
        "brand-yellow": "#FCD535",
        "brand-yellow-dim": "#F0B90B",
        // Text
        "text-primary": "#EAECEF",
        "text-secondary": "#848E9C",
        "text-muted": "#5E6673",
        // Market
        "bull-green": "#0ECB81",
        "bear-red": "#F6465D",
        "bull-green-bg": "rgba(14,203,129,0.12)",
        "bear-red-bg": "rgba(246,70,93,0.12)",
        // Borders
        "border-default": "#2B3139",
        "border-subtle": "#1E2329",
      },
      fontFamily: {
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      animation: {
        "flash-green": "flashGreen 0.6s ease-out",
        "flash-red": "flashRed 0.6s ease-out",
      },
      keyframes: {
        flashGreen: {
          "0%": { backgroundColor: "rgba(14,203,129,0.35)" },
          "100%": { backgroundColor: "transparent" },
        },
        flashRed: {
          "0%": { backgroundColor: "rgba(246,70,93,0.35)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
