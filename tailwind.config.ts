import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          black: "#080808",
          dark: "#0C0B10",
          surface: "#121118",
          "surface-elevated": "#1A1824",
          "surface-card": "#15131C",
          border: "#24222E",
          "border-subtle": "#1B1924",
          gold: "#F5C518",
          "gold-light": "#FFDA47",
          "gold-glow": "#FFE270",
          "gold-muted": "#D4AF37",
          "gold-dark": "#997805",
          purple: "#7E22CE",
          "purple-deep": "#0E071A",
          "purple-glow": "#2A1245",
          "purple-vibrant": "#9333EA",
          "purple-light": "#C084FC",
          cream: "#F5F3EE",
          muted: "#9E9A93",
          "muted-dark": "#5C5953",
        },
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "Figtree", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-figtree)", "Figtree", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.2em",
        "editorial-wide": "0.3em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
