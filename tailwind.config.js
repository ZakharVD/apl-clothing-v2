/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Sawarabi Mincho'],
        'logo': ['Titan One']
      },
      screens: {
        'phone': '400px',
      }
    },
  },
  plugins: [],
}

