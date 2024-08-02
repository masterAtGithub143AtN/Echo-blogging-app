/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/tai4.jpg')",
        'wirting-pattern': "url('./src/assets/Untitled_design-removebg-preview.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      margin: {
        '17': '4.25rem',  // 4.25rem * 16px = 68px
        '18': '4.5rem',   // 4.5rem * 16px = 72px
        '19': '4.75rem',  // 4.75rem * 16px = 76px
      },
      zIndex:{
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        'hero-pattern': '#f3f4f6',
        'writing-pattern': '#f3f4f6',
        'footer-texture': '#f3f4f6',
      }),
      colors: {
        'custom-gray': 'rgb(132, 139, 152,1)',
      },
    },

  },
  plugins: [],
}

