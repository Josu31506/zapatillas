/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#00C8E3',
        page: '#F7FAFC',
        text: '#1E293B',
        'brand-black': '#000000',
        'brand-dark': '#111111',
        'brand-cyan': '#00FFD1', // More vibrant/electric cyan
        'brand-dark-gray': '#1A1A1A',
        'brand-gray': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
