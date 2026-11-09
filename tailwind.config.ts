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
        background: "#101114", // Rich Black (Dominant canvas)
        charcoal: "#191A1E",   // Deep Charcoal
        graphite: "#292B31",   // Graphite
        mediumgrey: "#85878D", // Medium Grey
        lightgrey: "#D5D6D8",  // Light Grey
        offwhite: "#F5F5F2",   // Off-White
        purewhite: "#FFFFFF",  // Pure White
        surface: {
          DEFAULT: "#191A1E",
          subtle: "#141518",
          card: "rgba(25, 26, 30, 0.72)",
          hover: "#22242A",
          border: "rgba(255, 255, 255, 0.12)",
        },
        electric: {
          DEFAULT: "#286BFF", // Electric Blue accent
          hover: "#4982FF",
          muted: "rgba(40, 107, 255, 0.15)",
          border: "rgba(40, 107, 255, 0.35)",
        },
        sunset: {
          DEFAULT: "#FF713D", // Sunset Orange accent
          hover: "#FF8557",
          muted: "rgba(255, 113, 61, 0.15)",
          border: "rgba(255, 113, 61, 0.35)",
        },
        text: {
          primary: "#FFFFFF",   // Pure White for high-contrast primary statements
          secondary: "#D5D6D8", // Crisp Light Grey for readability
          muted: "#85878D",     // Medium Grey for secondary annotations
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.10)",
          subtle: "rgba(255, 255, 255, 0.06)",
          hover: "rgba(255, 255, 255, 0.25)",
        },
      },
      fontFamily: {
        sans: [
          "'Space Grotesk'",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "'Space Grotesk'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
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
