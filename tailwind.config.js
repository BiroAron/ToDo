/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/*.{vue,ts}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Neue Haas Grotesk Display Pro', 'sans-serif']
      },
      colors: {
        low: '#34D399', // Green
        medium: '#F59E0B', // Orange
        high: '#EF4444' // Red
      }
    }
  },
  plugins: []
}
