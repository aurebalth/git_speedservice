/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0F172A',  // Bleu nuit pro & sécurité
          yellow: '#EAB308', // Jaune dépannage / urgence
          red: '#DC2626',    // Rouge appel d'urgence
        }
      }
    },
  },
  plugins: [],
}