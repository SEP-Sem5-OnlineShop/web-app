module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#FFD600',
      secondary: '#373737',
      text: '#838383',
      link: '#FF7000',
      accent: '#E5E5E5',
      white: '#fff'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'register-pattern-left': "url('/src/assets/svg/backgrounds/curve-line.svg')",
        'register-pattern-right': "url('/src/assets/svg/backgrounds/icon-grid.svg')",
        'food-style': "url('/src/assets/svg/backgrounds/food-style.svg')",
      })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
