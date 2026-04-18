
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2c6df9",
        secondary: "#1e40af",
        accent: "#f9a82c",
        "gray-light": "#f3f4f6",
        "gray-medium": "#9ca3af",
        "gray-dark": "#4b5563",
      },
    },
  },
  plugins: [],
};
export default config;
