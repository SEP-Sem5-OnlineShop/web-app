const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xxs: '300px',
      xs: '380px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#E8DFD9',
      secondary: '#373737',
      textLight: '#264A75',
      text: '#838383',
      link: '#FF7000',
      accent: '#E5E5E5',
      cardColor: '#f5ede4',
      buttonColor: '#cbc2bc',
      white: '#fff',
      danger: colors.red[600],
      warn: colors.amber[400],
      success: colors.emerald[600],
      info: colors.blue[700],
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'register-pattern-left': "url('/src/assets/svg/backgrounds/curve-line.svg')",
        'register-pattern-right': "url('/src/assets/svg/backgrounds/icon-grid.svg')",
        'food-style': "url('/src/assets/svg/backgrounds/food-style.svg')",
      }),
      borderRadius: {
        '3.5xl': '3.5rem',
        '6xl': '6rem',
      },
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape': {'raw': '(orientation: landscape)'},
      },
      minHeight: {
        '100': '100px',
        '560': '560px',
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
      },
      minWidth: {
        '115': '115px',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
      },
      maxWidth: {
        '280': '280px',
        '560': '560px',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
      },
      height: {
        '33': '8.25rem',
        '23': '5.75rem',
        '13': '3.25rem'
      },
      width: {
        '1/8': '12.5%'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
