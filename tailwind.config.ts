import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0D1526",
        cardBg: "#16223A",
        sahamaOrange: "#FF7A00",
        sahamaYellow: "#FFC700",
      },
    },
  },
  plugins: [],
};
export default config;
