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
        background: "#101D35", // Midnight Navy (Dominant base)
        surface: {
          DEFAULT: "#14223E",
          subtle: "#121F38",
          card: "#162646",
          hover: "#1A2E53",
        },
        navy: {
          deep: "#0B1426",
          DEFAULT: "#101D35",
          light: "#1C3159",
          border: "#1E335B",
        },
        dusk: {
          DEFAULT: "#91B8E3", // Dusk Blue
          hover: "#A6C7ED",
          muted: "rgba(145, 184, 227, 0.12)",
          border: "rgba(145, 184, 227, 0.22)",
        },
        sunset: {
          DEFAULT: "#FF713D", // Sunset Orange (Sparingly for CTAs)
          hover: "#FF8557",
          muted: "rgba(255, 113, 61, 0.12)",
          border: "rgba(255, 113, 61, 0.25)",
        },
        text: {
          primary: "#F5F5F2", // Off-white primary text
          secondary: "#A7B2C4", // Calm secondary text
          muted: "#7887A0", // Understated labels
        },
        border: {
          DEFAULT: "rgba(145, 184, 227, 0.14)",
          subtle: "rgba(255, 255, 255, 0.08)",
          hover: "#91B8E3",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(11, 20, 38, 0.5)",
        "card-hover": "0 10px 30px -4px rgba(11, 20, 38, 0.7)",
        orange: "0 4px 14px -2px rgba(255, 113, 61, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
