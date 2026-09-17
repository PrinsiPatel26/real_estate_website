export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: { xs: '420px' },
      colors: {
        ink: { DEFAULT: '#111111', 900: '#0B0B0B', 800: '#171717', 700: '#1b1b1b' },
        paper: '#FFFFFF',
        gold: { DEFAULT: '#C9A227', bright: '#D4AF37', soft: '#E5D29A', muted: '#8D6D16' },
        stone: '#F8F8F6',
        border: '#E8E6E0',
        muted: '#666666',
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
