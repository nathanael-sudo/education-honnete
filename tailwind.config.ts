import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f1f7ee',
          100: '#ddeedd',
          200: '#bcdcbc',
          300: '#90c290',
          400: '#5f9f5f',
          500: '#3d813d',
          600: '#2b6430',
          700: '#1e4d25',
          800: '#193e1f',
          900: '#14321a',
        },
        amber: {
          warm: '#C17F3A',
          light: '#F5E6D0',
        },
        cream: '#F9F7F4',
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
