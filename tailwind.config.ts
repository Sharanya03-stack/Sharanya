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
        background: "#0B1A2E", // Dominant deep sky canvas (70% skyblue family foundation)
        surface: {
          DEFAULT: "#101D35", // Midnight Navy (20% contrast & depth)
          subtle: "#0E2238",
          card: "#122543",
          hover: "#18325B",
        },
        skyblue: {
          DEFAULT: "#4FC3F7", // Reference sky Blue #4FC3F7
          hover: "#7DD3FC",
          light: "#BAE6FD",
          deep: "#0E2238",
          canvas: "#0B1A2E",
          surface: "#132B45",
          muted: "rgba(79, 195, 247, 0.12)",
          border: "rgba(79, 195, 247, 0.20)",
        },
        navy: {
          deep: "#0A1324",
          DEFAULT: "#101D35", // Reference Midnight Navy #101D35
          light: "#182C4F",
          border: "#1C355E",
        },
        dusk: {
          DEFAULT: "#91B8E3",
          hover: "#A6C7ED",
          muted: "rgba(145, 184, 227, 0.12)",
          border: "rgba(145, 184, 227, 0.22)",
        },
        sunset: {
          DEFAULT: "#FF713D", // Reference Sunset Orange #FF713D (10% selective accents)
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
          DEFAULT: "rgba(79, 195, 247, 0.18)",
          subtle: "rgba(255, 255, 255, 0.08)",
          hover: "#4FC3F7",
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
