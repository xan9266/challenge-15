/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0070f3',
        success: '#2ecc71',
        error: '#e74c3c',
      },
      backgroundColor: {
        main: '#f5f6fa',
      }
    },
  },
  plugins: [],
}