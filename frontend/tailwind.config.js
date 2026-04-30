/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#1B4FD8',
        'brand-dark': '#1239A5',
        ink: '#111111',
        muted: '#737373',
        border: '#E5E5E5',
        surface: '#F8F8F6',
      },
      animation: {
        'fade-in': 'fadeIn 0.18s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
