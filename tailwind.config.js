/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9ff',
          100: '#e8eaff',
          200: '#c9ccff',
          300: '#a5a8ff',
          400: '#7c7eff',
          500: '#5753ff',
          600: '#4338fe',
          700: '#3526ed',
          800: '#2c1fd4',
          900: '#251aa8',
        },
        secondary: {
          50: '#fff8eb',
          100: '#ffecc6',
          200: '#ffd88a',
          300: '#ffc14e',
          400: '#ffa412',
          500: '#f98a03',
          600: '#dd6502',
          700: '#b74706',
          800: '#94350c',
          900: '#7a2c0d',
        },
      },
    },
  },
  plugins: [],
} 