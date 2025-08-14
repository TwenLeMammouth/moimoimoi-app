const preset = require("@oxymammoth/config/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../apps/**/src/**/*.{ts,tsx}",
  ]
}