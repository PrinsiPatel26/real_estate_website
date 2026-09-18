export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: { xs: '420px' },
      colors: {
        ink: { DEFAULT: '#151515', 900: '#0A0A0A', 800: '#151515', 700: '#222222' },
        paper: '#F5F3EE',
        gold: { DEFAULT: '#C9A24A', bright: '#D8B968', soft: '#E7D5A4', muted: '#8A6D2F' },
        stone: '#F5F3EE',
        border: '#D8C28A',
        muted: '#78736A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: { micro: '0.22em' },
      maxWidth: { shell: '87.5rem' },
      transitionTimingFunction: { lux: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    },
  },
  plugins: [],
}
