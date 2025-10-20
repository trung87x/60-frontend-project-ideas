/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0b",
        card: "#151515",
        border: "#2a2a2a",
        muted: "#9aa0a6"
      }
    },
  },
  plugins: [],
}
