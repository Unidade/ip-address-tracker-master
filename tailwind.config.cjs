/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/index.html'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        darkGray: 'hsl(0, 0%, 59%)',
        verydarkGray: 'hsl(0, 0%, 17%)',
      },
    },
  },
  plugins: [],
}
