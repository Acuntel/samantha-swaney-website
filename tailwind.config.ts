import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep oxblood/bordeaux anchor: nav, footer, headlines, primary CTAs.
        // The dark end of a cool-red (crimson) monochrome scheme — reads as a
        // near-black wine, red-dominant (R>B) so it never tips toward purple.
        navy: {
          DEFAULT: "#2B0A14",
          900: "#1B0610",
          800: "#2B0A14",
          700: "#471225",
          600: "#621A33",
          500: "#7E2342",
        },
        // Cool crimson accent: eyebrows, links, chips, secondary CTAs. A
        // restrained racing-red with a faint blue undertone to keep it "cool"
        // rather than orange. Pairs tonally with the oxblood anchor.
        teal: {
          DEFAULT: "#C8102E",
          700: "#8F0A20",
          600: "#AB0C27",
          500: "#C8102E",
          400: "#DC4459",
          300: "#EC8F9C",
          50: "#FBE9EC",
        },
        // Warm cool-rose neutrals. The "cream" ramp is intentionally tinted
        // toward a soft blush so no section reads as stark white; cards sit on
        // near-white cream-50 and pop against the rosier section backgrounds.
        sand: "#FAEEEF",
        cream: {
          50: "#FFFCFC",
          100: "#FBEFF0",
          200: "#F5E1E4",
          300: "#ECD0D4",
          400: "#DDB9BF",
        },
        // Dedicated blush band tints for deliberately colorful sections.
        blush: {
          DEFAULT: "#F6E7EA",
          50: "#FCF3F4",
          100: "#F8E9EC",
          200: "#F1D6DB",
          300: "#E7BFC6",
        },
        ink: "#1A1219",
        mute: "#9A8A8E",
        line: "#EBD9DD",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightish: "-0.015em",
        tighter2: "-0.025em",
        loose1: "0.18em",
      },
      maxWidth: { container: "1240px" },
      boxShadow: {
        card: "0 1px 2px rgba(43,10,20,0.05), 0 8px 24px rgba(43,10,20,0.08)",
        cardHover:
          "0 2px 4px rgba(43,10,20,0.07), 0 18px 48px rgba(43,10,20,0.16)",
        soft: "0 1px 0 rgba(43,10,20,0.05)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        loaderFade: {
          "0%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        monogramDraw: {
          "0%": { strokeDashoffset: "300", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out both",
        loaderFade: "loaderFade 1.4s ease-out 1.1s forwards",
        monogramDraw: "monogramDraw 1.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
