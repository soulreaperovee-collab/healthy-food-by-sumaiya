/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#183D2C",
        secondary: "#78966B",
        accent: "#D5AE65",
        muted: "#6B7A6E",
        card: "#F5EBD5",
      },
    },
  },
  plugins: [],
};