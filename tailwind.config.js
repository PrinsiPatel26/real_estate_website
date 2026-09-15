export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      screens: { xs: '420px' },
      colors: {
        ink: { DEFAULT: '#0A0A0A', 900: '#0A0A0A', 800: '#111111', 700: '#171717' },
        paper: '#F5F3EE',
        gold: { DEFAULT: '#C9A24D', bright: '#E5C36A', muted: '#9E7A35' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { micro: '0.24em' },
      maxWidth: { shell: '80rem' },
      transitionTimingFunction: { lux: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    },
  },
  plugins: [],
}
