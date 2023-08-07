/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/*/*.{vue,ts}', './index.html'],
  theme: {
    extend: {
      minWidth: {
        custom: '25px'
      },
      fontFamily: {
        custom: ['Neue Haas Grotesk Display Pro', 'sans-serif']
      },
      colors: {
        low: '#38CBCB', // Blue
        medium: '#FFAB00', // Orange
        high: '#FF481F', // Red
        primary: '#38CB89', // Green
        secondary: '#E6E6E6'
      },
      spacing: {
        128: '32rem',
        '20p': '20%'
      }
    },
    screens: {
      desktop: '751px',
      phone: { max: '750px' }
    }
  },
  plugins: []
}
