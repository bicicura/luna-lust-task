/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}'], // Define qué archivos Tailwind debe analizar para las clases de utilidad.
  theme: {
    extend: {
      colors: {
        // Corrección: Cambio de "colos" a "colors".
        transparent: 'transparent',
        current: 'currentColor',
        lust: {
          100: '#A855F7',
          200: '#1fb6ff',
          300: '#1A142B',
          400: '#1A142B',
          500: '#10091F'
        }
      },
      dropShadow: {
        dark: '0 4px 3px rgb(255 255 255 / 0.07)'
      }
    }
  },
  plugins: []
}
