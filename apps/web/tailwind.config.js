// tailwind.config.js
const { nextui } = require('@nextui-org/react')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#effefd',
              100: '#c8fffb',
              200: '#90fff7',
              300: '#51f7f1',
              400: '#1de4e4',
              500: '#05c4c7',
              600: '#009ca1',
              700: '#057b80',
              800: '#0a6065',
              900: '#0e4e53',
              950: '#002d32',
              DEFAULT: '#0e4e53',
            },
          },
        },
      },
    }),
  ],
}
