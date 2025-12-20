/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      // Custom breakpoints for mobile-first responsive design
      screens: {
        'xs': '475px',   // Small mobile devices
        'sm': '640px',   // Medium mobile devices
        'md': '768px',   // Large mobile / Small tablets
        'lg': '1024px',  // Tablets / Small desktop
        'xl': '1280px',  // Desktop
        '2xl': '1536px', // Large desktop
      },
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
      // Add better spacing for mobile
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
