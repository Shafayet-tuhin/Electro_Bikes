/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    animation: {
      'fade-in': 'fadeIn 0.5s ease-out'
    },
    fontFamily:{
      abc:["Comfortaa", "sans-serif"]
    }
  },
  plugins: [
    require('daisyui'),
  ],
}

