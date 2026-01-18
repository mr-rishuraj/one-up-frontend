/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 THIS FIXES YOUR ISSUE
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
