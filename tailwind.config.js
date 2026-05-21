/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': ['"Cormorant Garamond"', 'serif'],
        'sans': ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        heema: {
          navy: '#08111f',
          navy2: '#0d1b30',
          navy3: '#142545',
          navy4: '#1c3358',
          navy5: '#264470',
          gold: '#d4af37',
          'gold-light': '#f0d97a',
          'gold-dark': '#9c7a26',
        }
      },
    },
  },
  plugins: [],
}
