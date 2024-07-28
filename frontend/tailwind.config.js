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
    }
  },
  plugins: [],
}

