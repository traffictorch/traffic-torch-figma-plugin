/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#10b981',        // Traffic Torch green
        'text-light': '#1f2937',  // gray-800
        'text-dark': '#e5e7eb',   // dark gray-200
      },
    },
  },
  plugins: [],
}
