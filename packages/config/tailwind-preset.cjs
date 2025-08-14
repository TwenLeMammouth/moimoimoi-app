/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [],
  theme: {
    extend: {
      borderRadius: {
        xl: "1rem",
        '2xl': "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.07)",
      },
      colors: {
        // tokens oklch (à ajuster plus tard)
        brand: {
          DEFAULT: "oklch(70% 0.16 166)",
          fg: "oklch(25% 0.05 166)",
        }
      }
    }
  }
}