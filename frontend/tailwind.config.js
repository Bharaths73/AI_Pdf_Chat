// tailwind.config.js
import scrollbar from 'tailwind-scrollbar'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar,  // from 'tailwind-scrollbar'
    animate     // from 'tailwindcss-animate'
  ],
}
