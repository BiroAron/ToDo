/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/*.{vue,ts}',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Neue Haas Grotesk Display Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};