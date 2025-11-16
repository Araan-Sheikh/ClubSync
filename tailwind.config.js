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
        },
        'dash-purple': '#2D1A55',
        'dash-purple-light': '#4A3A75',
        'dash-bg-start': '#462973',
        'dash-bg-mid': '#D9A4A4',
        'dash-bg-end': '#F2D4D4',
        'dash-event-bg': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'marble': "url('https://www.transparenttextures.com/patterns/marble-white.png')",
      }
    },
  },
  plugins: [],
};
