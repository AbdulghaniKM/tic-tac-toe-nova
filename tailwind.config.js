export default {
  content: [],
  theme: {
    container: {
      center: true,
      padding: {
        default: '2rem',
        sm: '0.5rem',
      }
    },
    extend: {
      screens: {
        'xs': '475px',
        'sm': { 'max': '639px' },
      },
      backgroundImage: {
        'main-bg': "url('/assets/img/home-bg.png')",
      },
      colors: {
        'red': '#A73121',
        'yellow': '#FFF9C9',
      }
    },
  },
  plugins: [],
}
