/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        datepicker: {
          blue: '#2563eb',
          'blue-light': '#3b82f6',
          'blue-lighter': '#dbeafe',
          'blue-dark': '#1d4ed8',
          gray: '#6b7280',
          'gray-light': '#f3f4f6',
          white: '#ffffff',
          slate: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
};
