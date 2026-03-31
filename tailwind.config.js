/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
        secondary: "#ff4081",
        glass: "rgba(255,255,255,0.1)"
      }
    }
  },
  plugins: []
};