import type { Config } from "tailwindcss";

// "Afrique de l'Ouest" palette: indigo night backgrounds (adire cloth),
// orange / ochre / terracotta accents, warm sand neutrals.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B1024",
        cardBg: "#141B36",
        sahamaOrange: "#FF7A00",
        sahamaYellow: "#F0B03F",
        terracotta: "#C4532F",
        cream: "#F6EEE1",
        kola: "#2F8F5B",
        // Neutral scales re-tinted to sit on indigo instead of cold grey.
        zinc: {
          600: "#3A4468",
          700: "#2C3558",
          800: "#222A4A",
          900: "#161D3A",
        },
        gray: {
          200: "#EDE6DA",
          300: "#DDD4C4",
          400: "#B6AC9A",
          500: "#8E8574",
          600: "#6C6455",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
