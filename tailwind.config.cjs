/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        card: "#11161C",
        text: "#E7ECF2",
        muted: "#9FB0C0",
        accent: "#5EEAD4",
        accent2: "#60A5FA",
        background: "#0B0F14",
        foreground: "#E7ECF2",
        border: "rgba(255,255,255,0.08)",
        input: "rgba(255,255,255,0.08)",
        ring: "#5EEAD4",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: { soft: "0 6px 30px rgba(0,0,0,0.25)" },
      transitionTimingFunction: { smooth: "cubic-bezier(.2,.8,.2,1)" },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
