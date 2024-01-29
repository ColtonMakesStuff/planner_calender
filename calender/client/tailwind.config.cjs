/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "var(--color-accent1)",
          2: "var(--color-accent2)",
          3: "var(--color-accent3)",
        },
        bkg: {
          1: "var(--color-bkg)",
          2: "var(--color-bkg2)",
        },
        content: {
          DEFAULT: "var(--color-content)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};