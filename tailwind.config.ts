import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#edfaeb',
          100: '#d1f2ca',
          200: '#a3e498',
          300: '#70cc62',
          400: '#4ab23c',
          500: '#328e28',
          600: '#256c1e',
          700: '#1c5219',
          800: '#154214',
          900: '#0d2c0d',
        },
        amber: {
          400:  '#F0C060',
          600:  '#9A7420',
          warm: '#B98B2A',
          light: '#EDD9A8',
        },
        cream: '#F3FAF1',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
