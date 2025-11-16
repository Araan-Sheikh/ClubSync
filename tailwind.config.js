/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B0A2A',
          dark: '#060518',
          light: '#1a1847'
        },
        violet: {
          soft: '#8B7FD9',
          light: '#B5ACFF',
          pastel: '#E5E1FF'
        },
        mint: {
          light: '#D4F1E8',
          soft: '#A8E6CF'
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};
