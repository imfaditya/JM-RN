/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'jm-red': '#F22F0B',
        'jm-yellow': '#FFC106',
        'jm-gray': '#CBCBCB',
        'jm-gray-light': '#EAEAEA',
        'jm-blue': '#008AE6',
      },
    },
  },
  plugins: [],
};
