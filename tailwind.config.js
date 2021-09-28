module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sansSerif: ['Raleway'],
    },
    extend: {
      backgroundImage: (theme) => ({
        bgindex:
          "url('https://ableton-production.imgix.net/about/header.jpg?fit=crop&auto=format&fm=jpg')",
      }),
      colors: {
        mamon: '#ff764d',
        griseparador: '#F3F3F3',
        azulrey: '#0000FF',
        aguaMarina: '#29D2BE',
        darkAguaMarina: '#53dbcb',
        ripple: '#6eb9f7',
        aguaMarinaClaro: '#B9F0EA',
      },
    },
    ripple: (theme) => ({
      colors: theme('colors'),
    }),
    keyframes: {
      'fade-in-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'fade-in-down': 'fade-in-down 0.5s ease-out',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-ripple')()],
};
