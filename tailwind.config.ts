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
        carbon: {
          950: "#07080A",
          900: "#0e1017",
          850: "#131620",
          800: "#181c28",
          750: "#1f2434",
          700: "#272e40",
          600: "#363f57",
        },
        gunmetal: {
          light: "#2B3242",
          DEFAULT: "#181b24",
          dark: "#0f1118",
          border: "#232938",
          highlight: "#353d52",
        },
        amber: {
          burnt: "#FF6B35",
          "burnt-light": "#FF8254",
          "burnt-dark": "#E5531B",
          "burnt-dim": "rgba(255, 107, 53, 0.15)",
          "burnt-glow": "rgba(255, 107, 53, 0.35)",
        },
        telemetry: {
          silver: "#E5E7EB",
          muted: "#9CA3AF",
          dim: "#6B7280",
        },
      },
      fontFamily: {
        heading: ["'Clash Display'", "sans-serif"],
        body: ["'General Sans'", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
