/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/*/*.{vue,ts}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Neue Haas Grotesk Display Pro', 'sans-serif']
      },
      colors: {
        low: '#22c55e', // Green
        medium: '#d97706', // Orange
        high: '#22c55e' // Red
      },
      spacing: {
        128: '32rem'
      }
    },
    screens: {
      desktop: '701px',
      phone: { max: '700px' }
    }
  },
  plugins: []
}
