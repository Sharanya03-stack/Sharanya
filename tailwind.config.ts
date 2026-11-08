import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080b11",
        surface: "#0e131f",
        "surface-card": "#131a29",
        "surface-card-hover": "#182236",
        midnight: "#070a10",
        dusk: "#162032",
        "dusk-light": "#1e2c45",
        "accent-cyan": {
          DEFAULT: "#00f0ff",
          hover: "#38f5ff",
          muted: "rgba(0, 240, 255, 0.12)",
          border: "rgba(0, 240, 255, 0.25)",
          glow: "rgba(0, 240, 255, 0.35)",
        },
        "accent-sunset": {
          DEFAULT: "#f97316",
          hover: "#fb923c",
          muted: "rgba(249, 115, 22, 0.12)",
          border: "rgba(249, 115, 22, 0.25)",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(0, 240, 255, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 240, 255, 0.25)",
        "cyan-glow-lg": "0 0 45px -5px rgba(0, 240, 255, 0.35)",
        "sunset-glow": "0 0 25px -5px rgba(249, 115, 22, 0.25)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse at top center, rgba(0, 240, 255, 0.08), transparent 70%)",
        "card-gradient": "linear-gradient(180deg, rgba(22, 32, 50, 0.6) 0%, rgba(14, 19, 31, 0.8) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
