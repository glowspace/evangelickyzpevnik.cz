/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const variations = [
  {
    key: 'zps',
    primary: {
      DEFAULT: '#44B436',
      50: '#E2FEE0',
      100: '#C1FDBD',
      150: '#92FC86',
      200: '#62FB4F',
      300: '#5BEB49',
      400: '#53D843',
      500: '#4CC63C',
      600: '#44B436',
      700: '#308526',
      800: '#1E5916',
      900: '#0C2F07',
      950: '#051C03',
    }
  },
  {
    key: 'ez',
    primary: {
      DEFAULT: '#006EB7',
      50: '#EAF7FF',
      100: '#D6EEFF',
      150: '#C2E6FF',
      200: '#ADDEFF',
      300: '#84CEFF',
      400: '#5BBEFF',
      500: '#32ADFF',
      600: '#0A9DFF',
      700: '#0087E0',
      800: '#006EB7',
      900: '#004C7F',
      950: '#003B63'
    },
  },
]

const variationKey = process.env.VARIATION || 'ez'
const variation = variations.find((v) => v.key == variationKey) || variations[0]

// note: if you change these values, you may need to restart the `yarn dev` nuxt server
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      blue: '#006EB7',
      green: '#44B436',
      greendark: '#318127',
      yellow: '#faa61b',
      primary: variation.primary,
      secondary: {
        DEFAULT: '#787579',
        10: '#FFFBFE',
        50: '#F6EDFF',
        100: '#E8DEF8',
        200: '#CCC2DC',
        300: '#B0A7C0',
        400: '#958DA5',
        500: '#7A7289',
        600: '#625B71',
        700: '#4A4458',
        800: '#332D41',
        900: '#1D192B',
      },
      error: {
        10: '#FFFBF9',
        50: '#FCEEEE',
        100: '#F9DEDC',
        200: '#F2B8B5',
        300: '#EC928E',
        400: '#E46962',
        500: '#DC362E',
        600: '#B3261E',
        700: '#8C1D18',
        800: '#601410',
        900: '#410E0B',
      },
      neutral: {
        10: '#FFFBFE',
        50: '#F4EFF4',
        100: '#E6E1E5',
        200: '#C9C5CA',
        300: '#AEAAAE',
        400: '#939094',
        500: '#787579',
        600: '#605D62',
        700: '#484649',
        800: '#313033',
        900: '#1C1B1F',
      },
      gray: {
        10: '#FFFBFE',
        50: '#F5EEFA',
        100: '#E7E0EC',
        200: '#CAC4D0',
        300: '#AEA9B4',
        400: '#938F99',
        500: '#79747E',
        600: '#605D66',
        700: '#49454F',
        800: '#322F37',
        900: '#1D1A22',
      },
      surface: {
        50: '#F8FCFF',
        100: '#F1F9FF',
        200: '#EBF7FF',
        300: '#E4F4FF',
        400: '#DDF1FF',
        500: '#D6EEFF',
      },
      surfacedark: {
        50: '#1c1b1f',
        100: '#26242a',
        200: '#2a2830',
        300: '#302d37',
        400: '#332f3a',
        500: '#36323e',
      }
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
  },
  plugins: [
    // https://tailwindcss.com/docs/functions-and-directives#using-apply-with-per-component-css
    // https://tailwindcss.com/docs/plugins
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.font-custom-light': {
          fontWeight: 300
        },
        '.font-custom-medium': {
          fontWeight: 600
        },
        '.font-custom-bold': {
          fontWeight: 700
        },
      })
    })
  ],
}
